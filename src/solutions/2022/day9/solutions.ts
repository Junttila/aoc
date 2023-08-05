import {range} from '../../scripts/range';

import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const tailPoss = new Set<string>();
    lines.reduce(
      (a, l) => {
        const [dir, steps] = l.split(' ') as Move;
        const ropeMove = range(1, steps).reduce(a2 => {
          const newRope = move(a2, dir);
          tailPoss.add(`${newRope.tail.x},${newRope.tail.y}`);
          return newRope;
        }, a);

        return ropeMove;
      },
      {
        head: {x: 0, y: 0},
        tail: {x: 0, y: 0},
      } as Rope
    );
    return Array.from(tailPoss).length;
  },
  // Solution part 2
  (lines: string[]) => {
    const tailPoss = new Set<string>();
    const rope: Rope2 = {
      head: {x: 0, y: 0},
      tail: Array.from({length: 9}, () => ({x: 0, y: 0})),
    };
    const moves: Move[] = lines.map(v => [
      v.split(' ')[0] as Dir,
      Number(v.split(' ')[1]),
    ]);

    moves.reduce((a, v) => {
      const [dir, steps] = v;
      const ropeMove = range(1, steps).reduce(a2 => {
        const newRope = move2(a2, dir);
        tailPoss.add(`${newRope.tail.at(-1)?.x},${newRope.tail.at(-1)?.y}`);
        return newRope;
      }, a);

      return ropeMove;
    }, rope);

    return Array.from(tailPoss).length;
  },
];

type Move = [Dir, number];

interface Pos {
  x: number;
  y: number;
}

interface Rope {
  head: Pos;
  tail: Pos;
}

interface Rope2 {
  head: Pos;
  tail: Pos[];
}

enum Dir {
  U = 'U',
  D = 'D',
  L = 'L',
  R = 'R',
}

function move({head, tail}: Rope, dir: Dir) {
  const newHead: Pos = moveHead(head, dir);

  return {head: newHead, tail: follow(newHead, tail)};
}

function move2({head, tail}: Rope2, dir: Dir): Rope2 {
  const newRope = [moveHead(head, dir), ...tail];

  for (let i = 0; i < newRope.length - 1; i++) {
    newRope[i + 1] = follow(newRope[i], newRope[i + 1]);
  }
  return {head: newRope[0], tail: newRope.slice(1)};
}

function moveHead(head: Pos, dir: Dir): Pos {
  return dir === Dir.U
    ? {x: head.x, y: head.y - 1}
    : dir === Dir.D
    ? {x: head.x, y: head.y + 1}
    : dir === Dir.L
    ? {x: head.x - 1, y: head.y}
    : dir === Dir.R
    ? {x: head.x + 1, y: head.y}
    : head;
}

function follow(a: Pos, b: Pos) {
  const diff = posDiff(a, b);

  if (Math.abs(diff.x) + Math.abs(diff.y) > 2) {
    b = {
      x: b.x + (diff.x > 0 ? 1 : -1),
      y: b.y + (diff.y > 0 ? 1 : -1),
    };
  } else if (Math.abs(diff.x) > 1) {
    b.x += diff.x > 0 ? 1 : -1;
  } else if (Math.abs(diff.y) > 1) {
    b.y += diff.y > 0 ? 1 : -1;
  }

  return b;
}

function posDiff(a: Pos, b: Pos): Pos {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  };
}

export default solutions;
