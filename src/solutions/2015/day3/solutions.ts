import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const instr = lines[0];
    const visited = new Set<string>(['0,0']);
    let pos = {x: 0, y: 0};

    (instr.split('') as Array<Dir>).forEach(v => {
      pos = move(pos, v);
      visited.add(`${pos.x},${pos.y}`);
    });

    return visited.size;
  },
  // Solution part 2
  (lines: string[]) => {
    const instr = lines[0];
    const visited = new Set<string>(['0,0']);
    const poss = [
      {x: 0, y: 0},
      {x: 0, y: 0},
    ];

    (instr.split('') as Array<Dir>).forEach((v, i) => {
      const si = i % 2;

      poss[si] = move(poss[si], v);
      visited.add(`${poss[si].x},${poss[si].y}`);
    });

    return visited.size;
  },
];

function move(pos: Pos, dirC: Dir) {
  const dir = dirs[dirC];
  pos.x += dir.x;
  pos.y += dir.y;
  return pos;
}

interface Pos {
  x: number;
  y: number;
}

type Dir = '^' | 'v' | '<' | '>';

const dirs = {
  '^': {
    x: 0,
    y: -1,
  },
  v: {
    x: 0,
    y: 1,
  },
  '<': {
    x: -1,
    y: 0,
  },
  '>': {
    x: 1,
    y: 0,
  },
};

export default solutions;
