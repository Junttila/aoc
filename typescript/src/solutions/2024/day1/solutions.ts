import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const [left, right] = lines
      .reduce(
        ([l, r], line) => {
          const [first, second] = line.split('   ');
          l.push(Number(first));
          r.push(Number(second));
          return [l, r];
        },
        [[], []] as number[][]
      )
      .map(l => l.sort((a, b) => a - b));

    let sum = 0;
    for (let i = 0; i < left.length; i++) {
      sum += Math.abs(left[i] - right[i]);
    }
    return sum;
  },
  // Solution part 2
  (lines: string[]) => {
    const appearances = new Map<number, number>();
    const [left, right] = lines.reduce(
      ([l, r], line) => {
        const [first, second] = line.split('   ');
        l.push(Number(first));
        appearances.set(
          Number(second),
          (appearances.get(Number(second)) || 0) + 1
        );
        return [l, r];
      },
      [[], []] as number[][]
    );

    right.forEach(n => appearances.set(n, (appearances.get(n) || 0) + 1));
    let sum = 0;
    for (let i = 0; i < left.length; i++) {
      sum += left[i] * (appearances.get(left[i]) ?? 0);
    }
    return sum;
  },
];

export default solutions;
