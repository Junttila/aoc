import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const map = lines.map(l => l.split(''));
    const mapSize = {x: lines[0].length, y: lines.length};
    let accessibleRolls = 0;
    // console.log(map);
    for (let x = 0; x < lines[0].length; x++) {
      for (let y = 0; y < lines.length; y++) {
        if (map[y][x] !== '@') continue;
        const positionsToSearch = adjacentPositions({x, y}, mapSize);
        const adjacentRolls = positionsToSearch.reduce(
          (acc, p) => acc + (map[p.y][p.x] === '@' ? 1 : 0),
          0
        );
        accessibleRolls += adjacentRolls < 4 ? 1 : 0;
      }
    }
    return accessibleRolls;
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

function adjacentPositions({x, y}: Position, mapSize: Position): Position[] {
  return [
    {x: x - 1, y: y - 1},
    {x: x - 1, y: y},
    {x: x - 1, y: y + 1},
    {x: x + 1, y: y - 1},
    {x: x + 1, y: y},
    {x: x + 1, y: y + 1},
    {x: x, y: y - 1},
    {x: x, y: y + 1},
  ].filter(p => p.x >= 0 && p.y >= 0 && p.x < mapSize.x && p.y < mapSize.y);
}

export default solutions;
