import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const map = lines.map(l => l.split(''));
    // const distances = new Set<number>();

    const start = {x: 0, y: 0};

    for (let x = 0, y = 0; y < map.length; y++) {
      for (; x < map[0].length; x++) {
        if (map[y][x] === 'S') {
          start.x = x;
          start.y = y;
          break;
        }
      }
    }

    // travel(start, map, distances);

    // console.log(distances);

    // const shortest = Array.from(distances.values())
    //   .sort((a, b) => b - a)
    //   .at(-1);
    // return shortest || -1;
    const result = bfs(start, map);
    // console.log(result?.path);
    return result?.res;
  },
  // Solution part 2
  (lines: string[]) => {
    lines.length++;
    return 'no answer';
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
        console.log(path.reduce((a, p) => `${a}\n${p.x},${p.y}`, ''));
        return {res: path.length - 1, path};
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
}

function travel(
  current: Position,
  map: string[][],
  distances: Set<number>,
  distance = 0,
  visited = new Set<string>(),
  log: Position[] = [],
  shortest = new Map<string, number>()
) {
  // console.log(distance);
  const {x, y} = current;
  // console.log(visited);
  const visitedString = `${x},${y}`;
  log.push(current);
  if (distance >= (shortest.get(visitedString) || Number.MAX_SAFE_INTEGER)) {
    return;
  }
  const newVisited = new Set(visited);
  newVisited.add(visitedString);
  shortest.set(visitedString, distance);
  // console.log(visitedString);
  if (map[y][x] === 'E') {
    distances.add(distance);
    // console.log(log.reduce((a, l) => `${a}\n${l.x},${l.y}`, ''));
    console.log(distance - log.length);
    return;
  }

  if (visitedString === '28,25') {
    const _a = 1 + 1;
  }

  const dests: Position[] = [
    {x: x + 1, y},
    {x: x - 1, y},
    {x, y: y + 1},
    {x, y: y - 1},
  ].filter(
    d => d.x < map[0].length && d.x >= 0 && d.y < map.length && d.y >= 0
  );
  // .sort((a, b) => height(map[b.y][b.x]) - height(map[a.y][a.x]));
  dests.forEach(d => {
    if (
      !newVisited.has(`${d.x},${d.y}`) &&
      height(map[d.y][d.x]) <= height(map[y][x]) + 1
    ) {
      travel(
        {x: d.x, y: d.y},
        map,
        distances,
        distance + 1,
        newVisited,
        Array.from(log),
        shortest
      );
    }
  });
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
