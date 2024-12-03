import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const matches = [...lines.join().matchAll(/mul\((\d+),(\d+)\)/g)].map(m =>
      m.slice(1).map(Number)
    );

    const sum = matches.reduce((acc, m) => acc + m[0] * m[1], 0);
    return sum;
  },
  // Solution part 2
  (lines: string[]) => {
    const doStrings = lines
      .join()
      .split('do()')
      .map(s => s.split("don't()")[0]);

    const matches = doStrings.flatMap(l =>
      [...l.matchAll(/mul\((\d+),(\d+)\)/g)].map(m => {
        return m.slice(1).map(Number);
      })
    );

    const sum = matches.reduce((acc, m) => acc + m[0] * m[1], 0);
    return sum;
  },
];

export default solutions;
