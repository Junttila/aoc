import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    return lines
      .map(v => {
        const [a, b] = v.split(',');
        return Number(
          contains(
            a.split('-').map(u => Number.parseInt(u)),
            b.split('-').map(u => Number.parseInt(u))
          )
        );
      })
      .reduce((a, v2) => a + v2, 0);
  },
  // Solution part 2
  (lines: string[]) => {
    return lines
      .map(v => {
        const [a, b] = v.split(',');
        return Number(
          overlaps(
            a.split('-').map(u => Number.parseInt(u)),
            b.split('-').map(u => Number.parseInt(u))
          )
        );
      })
      .reduce((a, v2) => a + v2, 0);
  },
];

function contains([a1, a2]: number[], [b1, b2]: number[]): boolean {
  return (a1 <= b1 && a2 >= b2) || (b1 <= a1 && b2 >= a2);
}

function overlaps([a1, a2]: number[], [b1, b2]: number[]): boolean {
  return (
    (a1 <= b1 && a2 >= b1) || (b2 >= a2 && b1 <= a2) || (b1 <= a1 && b2 >= a1)
  );
}

export default solutions;
