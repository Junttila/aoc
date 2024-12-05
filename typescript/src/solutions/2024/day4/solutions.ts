import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const word = 'XMAS';

    const occurrences = lines.reduce((acc, line, i, arr) => {
      let wordsFound = 0;

      line.split('').forEach((c, j) => {
        if (c === word[0]) {
          dirs.forEach(d => {
            const pos = {x: j + d.x, y: i + d.y};
            let charPos = 1;

            while (
              pos.x >= 0 &&
              pos.x < line.length &&
              pos.y >= 0 &&
              pos.y < arr.length &&
              charPos < word.length &&
              arr[pos.y][pos.x] === word[charPos]
            ) {
              if (charPos === word.length - 1) {
                wordsFound++;
                break;
              }
              pos.x += d.x;
              pos.y += d.y;
              charPos++;
            }
          });
        }
      });
      return acc + wordsFound;
    }, 0);
    return occurrences;
  },
  // Solution part 2
  (lines: string[]) => {
    const word = 'MAS';

    const occurrences = lines.reduce((acc, line, y, arr) => {
      let wordsFound = 0;

      if (y >= 1 && y < arr.length - 1) {
        line.split('').forEach((c, x) => {
          if (x >= 1 && x < line.length - 1 && c === word[1]) {
            const [nw, ne, sw, se] = [
              arr[y - 1][x - 1],
              arr[y - 1][x + 1],
              arr[y + 1][x - 1],
              arr[y + 1][x + 1],
            ];

            if (
              ((nw === word[0] && se === word[2]) ||
                (nw === word[2] && se === word[0])) &&
              ((ne === word[0] && sw === word[2]) ||
                (ne === word[2] && sw === word[0]))
            ) {
              wordsFound++;
            }
          }
        });
      }
      return acc + wordsFound;
    }, 0);
    return occurrences;
  },
];

const dirs = [
  {x: -1, y: -1},
  {x: 0, y: -1},
  {x: 1, y: -1},
  {x: -1, y: 0},
  {x: 1, y: 0},
  {x: -1, y: 1},
  {x: 0, y: 1},
  {x: 1, y: 1},
];

export default solutions;
