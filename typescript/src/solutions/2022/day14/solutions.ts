import {Solution} from '../../../types';
import {createMatrix} from '../../scripts/createMatrix';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const uniquePaths = Array.from(new Set(lines).values());
    const map = createMap(uniquePaths);

    let sand = dropSand(map);
    let grains = 0;
    while (sand) {
      const {x, y} = sand;
      grains++;
      map[y][x] = 'o';
      sand = dropSand(map);
    }

    return grains;
  },
  // Solution part 2
  (lines: string[]) => {
    const uniquePaths = Array.from(new Set(lines).values());
    const map = createMap2(uniquePaths);
    const start = {x: map[0].indexOf('+'), y: 0} as Position;

    let sand = dropSand(map);
    let grains = 1;
    while (!(sand?.x === start.x && sand.y === start.y)) {
      const {x, y} = sand!;
      grains++;
      map[y][x] = 'o';
      sand = dropSand(map);
    }

    return grains;
  },
];

interface Position {
  x: number;
  y: number;
}

function dropSand(map: string[][]): Position | null {
  let x = map[0].indexOf('+');
  let y = 0;

  let newX = x;
  let newY = y;

  while (y < map.length) {
    newY += 1;
    if (newY >= map.length || newX < 1 || newX >= map[0].length - 1) {
      return null;
    }
    const [l, m, r] = [
      map[newY][newX - 1] !== '.',
      map[newY][newX] !== '.',
      map[newY][newX + 1] !== '.',
    ];
    if (l && m && r) {
      return {x, y};
    }
    if (m) {
      newX += !l ? -1 : !r ? 1 : 0;
    }
    x = newX;
    y = newY;
  }
  return null;
}

function createMap(input: string[]) {
  const {minX, maxX, maxY} = input
    .map(l => l.split(' -> '))
    .flat()
    .reduce(
      (a, p) => {
        const [x, y] = p.split(',').map(Number);
        return {
          minX: x < a.minX ? x : a.minX,
          maxX: x > a.maxX ? x : a.maxX,
          maxY: y > a.maxY ? y : a.maxY,
        };
      },
      {minX: 1000, maxX: 0, maxY: 0}
    );

  const canvas = createMatrix(maxX - minX + 1, maxY + 1, '.') as string[][];

  canvas[0][500 - minX] = '+';

  input.forEach(p => {
    const [start, ...dests] = p.split(' -> ').map(
      pos =>
        ({
          x: Number(pos.split(',')[0]) - minX,
          y: Number(pos.split(',')[1]),
        }) as Position
    );

    let s = start;
    dests.forEach(d => {
      let x = s.x,
        y = s.y;
      for (; Math.abs(x - d.x) !== 0 || Math.abs(y - d.y) !== 0; ) {
        canvas[y][x] = '#';
        x += x < d.x ? 1 : x > d.x ? -1 : 0;
        y += y < d.y ? 1 : y > d.y ? -1 : 0;
      }
      canvas[y][x] = '#';
      s = d;
    });
  });

  return canvas;
}

function createMap2(input: string[]) {
  const {maxY} = input
    .map(l => l.split(' -> '))
    .flat()
    .reduce(
      (a, p) => {
        const [x, y] = p.split(',').map(Number);
        return {
          minX: x < a.minX ? x : a.minX,
          maxX: x > a.maxX ? x : a.maxX,
          maxY: y > a.maxY ? y : a.maxY,
        };
      },
      {minX: 1000, maxX: 0, maxY: 0}
    );

  const canvas = createMatrix((maxY + 2) * 2 + 1, maxY + 1, '.') as string[][];
  canvas.push(
    ...[
      new Array<string>(canvas[0].length).fill('.'),
      new Array<string>(canvas[0].length).fill('#'),
    ]
  );

  const xOffset = 500 - Math.floor(canvas[0].length / 2);

  canvas[0][500 - xOffset] = '+';

  input.forEach(p => {
    const [start, ...dests] = p.split(' -> ').map(
      pos =>
        ({
          x: Number(pos.split(',')[0]) - xOffset,
          y: Number(pos.split(',')[1]),
        }) as Position
    );

    let s = start;
    dests.forEach(d => {
      let x = s.x,
        y = s.y;
      for (; Math.abs(x - d.x) !== 0 || Math.abs(y - d.y) !== 0; ) {
        canvas[y][x] = '#';
        x += x < d.x ? 1 : x > d.x ? -1 : 0;
        y += y < d.y ? 1 : y > d.y ? -1 : 0;
      }
      canvas[y][x] = '#';
      s = d;
    });
  });

  return canvas;
}

export default solutions;
