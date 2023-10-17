import {Solution} from '../../../types';
import {createMatrix} from '../../scripts/createMatrix';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const uniquePaths = Array.from(new Set(lines).values());
    const map = createMap(uniquePaths);

    let drawing = _drawMap(map);

    dropSand(map);

    let newDrawing = _drawMap(map);

    let grains = 0;
    while (newDrawing !== drawing) {
      grains++;
      drawing = newDrawing;
      dropSand(map);
      newDrawing = _drawMap(map);
    }
    console.log(drawing);
    return grains;
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
  let newY = y;

  while (y < map.length) {
    newY += 1;
    if (newY >= map.length || newX < 1 || newX >= map[0].length - 1) {
      return map;
    }
    const [l, m, r] = [
      map[newY][newX - 1] !== '.',
      map[newY][newX] !== '.',
      map[newY][newX + 1] !== '.',
    ];
    if (l && m && r) {
      map[y][x] = 'o';
      return map;
    }
    if (m) {
      newX += !l ? -1 : !r ? 1 : 0;
    }
    x = newX;
    y = newY;
  }
  return map;
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

function _drawMap(canvas: string[][]) {
  return canvas.map(l => l.join('')).join('\n');
}

export default solutions;
