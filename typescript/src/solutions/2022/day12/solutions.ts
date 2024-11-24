import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const map = lines.map(l => l.split(''));

    const start = {x: 0, y: 0};

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] === 'S') {
          start.x = x;
          start.y = y;
          break;
        }
      }
    }

    const result = bfs(start, map);
    return result.length;
  },
  // Solution part 2
  (lines: string[]) => {
    const map = lines.map(l => l.split(''));

    const starts: Position[] = [];

    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] === 'S' || map[y][x] === 'a') {
          starts.push({x, y});
        }
      }
    }

    const result = starts.reduce(
      (a, s) => Math.min(bfs(s, map).length, a),
      Number.MAX_SAFE_INTEGER
    );
    return result;
  },
];

function bfs(start: Position, map: string[][]) {
  const queue = [[start]];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const path = queue.shift()!;
    const {x, y} = path.at(-1)!;

    const currentHeight = height(map[y][x]);

    if (!visited.has(`${x},${y}`)) {
      visited.add(`${x},${y}`);

      if (map[y][x] === 'E') {
        // console.log(_paintPath(map, path));
        return {length: path.length - 1, path};
      }

      const dests: Position[] = [
        {x: x + 1, y},
        {x: x - 1, y},
        {x, y: y + 1},
        {x, y: y - 1},
      ].filter(
        d => d.x < map[0].length && d.x >= 0 && d.y < map.length && d.y >= 0
      );

      dests.forEach(d => {
        const newHeight = height(map[d.y][d.x]);

        if (newHeight <= currentHeight + 1) {
          const pathCopy = Array.from(path);
          pathCopy.push(d);
          queue.push(pathCopy);
        }
      });
    }
  }

  return {length: Number.MAX_SAFE_INTEGER, path: []};
}

function _paintPath(map: string[][], path: Position[]) {
  const canvas = Array.from(map);
  path.forEach(p => {
    canvas[p.y][p.x] = canvas[p.y][p.x].toUpperCase();
  });
  return canvas.reduce((a, c) => `${a}\n${c.join('')}`, '');
}

function height(c: string) {
  return c === 'S'
    ? 'a'.charCodeAt(0)
    : c === 'E'
    ? 'z'.charCodeAt(0)
    : c.charCodeAt(0);
}

interface Position {
  x: number;
  y: number;
}

export default solutions;
