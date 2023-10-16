import {Solution} from '../../../types';
import {createMatrix} from '../../scripts/createMatrix';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const uniquePaths = Array.from(new Set(lines).values());
    const map = createMap(uniquePaths);
    lines.length++;
    console.log(_drawCanvas(map));

    return 'no answer';
  },
  // Solution part 2
  (lines: string[]) => {
    lines.length++;
    return 'no answer';
  },
];

interface Position {
  x: number;
  y: number;
}

function dropSand(map: string[][]) {
  let x = map[0].indexOf('+');
  let y = 0;

  let newX = x;
  let newY = y + 1;

  while (y < map.length) {
    if (newY >= map.length || newX < 0 || newX >= map[0].length) {
      return null;
    }
    if (map[newY][newX] === '#' || map[newY][newX] === 'o') {
      newX += -1;
    } else {
      map[y][x] = 'o';
      return map;
    }
  }
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
    // console.log(p);
    // console.log(start);
    // console.log(dests);
    let s = start;
    dests.forEach(d => {
      let x = s.x,
        y = s.y;
      for (; Math.abs(x - d.x) !== 0 || Math.abs(y - d.y) !== 0; ) {
        // console.log('drawing rock at ', x, y);
        canvas[y][x] = '#';
        x += x < d.x ? 1 : x > d.x ? -1 : 0;
        y += y < d.y ? 1 : y > d.y ? -1 : 0;
      }
      canvas[y][x] = '#';
      s = d;
    });
  });

  // console.log(_drawCanvas(canvas));

  return canvas;
}

function _drawCanvas(canvas: string[][]) {
  return canvas.map(l => l.join('')).join('\n');
}

export default solutions;
