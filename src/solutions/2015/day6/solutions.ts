import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const width = 1000;
    const height = 1000;
    const grid = Array.from({length: height}, () =>
      Array.from({length: width}, () => false)
    );
    let onCount = 0;

    lines.forEach(l => {
      const [fromS, toS] = l
        .split(' ')
        .filter(s => s.indexOf(',') > -1)
        .map(s => s.split(',').map(Number));

      const instr: Instr = {
        op: l.split(',')[0].split(' ').slice(0, -1).join(' ') as Op,
        from: {x: fromS[0], y: fromS[1]},
        to: {x: toS[0], y: toS[1]},
      };

      for (let y = instr.from.y; y <= instr.to.y; y++) {
        for (let x = instr.from.x; x <= instr.to.x; x++) {
          const prevState = grid[y][x];
          grid[y][x] =
            instr.op === 'turn on'
              ? true
              : instr.op === 'turn off'
              ? false
              : !grid[y][x];

          onCount += grid[y][x] === prevState ? 0 : grid[y][x] ? 1 : -1;
        }
      }
    });
    return onCount;
  },
  // Solution part 2
  (lines: string[]) => {
    const width = 1000;
    const height = 1000;
    const grid = Array.from({length: height}, () =>
      Array.from({length: width}, () => 0)
    );
    let totalBrightness = 0;

    lines.forEach(l => {
      const [fromS, toS] = l
        .split(' ')
        .filter(s => s.indexOf(',') > -1)
        .map(s => s.split(',').map(Number));

      const instr: Instr = {
        op: l.split(',')[0].split(' ').slice(0, -1).join(' ') as Op,
        from: {x: fromS[0], y: fromS[1]},
        to: {x: toS[0], y: toS[1]},
      };

      for (let y = instr.from.y; y <= instr.to.y; y++) {
        for (let x = instr.from.x; x <= instr.to.x; x++) {
          const prevState = grid[y][x];
          grid[y][x] +=
            instr.op === 'turn on'
              ? 1
              : instr.op === 'toggle'
              ? 2
              : grid[y][x] > 0
              ? -1
              : 0;

          totalBrightness += grid[y][x] - prevState;
        }
      }
    });
    return totalBrightness;
  },
];

interface Instr {
  op: Op;
  from: Pos;
  to: Pos;
}

type Op = 'turn on' | 'toggle' | 'turn off';

interface Pos {
  x: number;
  y: number;
}

export default solutions;
