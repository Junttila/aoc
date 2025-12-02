import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const result = lines.reduce(
      (acc, l) => {
        const dir = l.substring(0, 1);
        const distance = Number(l.substring(1));
        if (Number.isNaN(distance)) return acc;
        acc.position += dir === 'R' ? distance : dir === 'L' ? -distance : 0;
        acc.position %= 100;
        acc.zeroes += acc.position === 0 ? 1 : 0;
        return acc;
      },
      {position: 50, zeroes: 0}
    );
    return result.zeroes;
  },
  // Solution part 2
  (lines: string[]) => {
    const result = lines.reduce(
      (acc, l) => {
        const dir = l.substring(0, 1);
        const distance = Number(l.substring(1));
        if (Number.isNaN(distance)) return acc;
        const movement = dir === 'R' ? distance : dir === 'L' ? -distance : 0;
        const prevPos = acc.position;
        acc.position += movement;
        acc.zeroes +=
          acc.position > 0
            ? Math.floor(acc.position / 100)
            : acc.position < 0
            ? (prevPos !== 0 ? 1 : 0) + Math.floor(Math.abs(acc.position) / 100)
            : 1;
        acc.position %= 100;
        acc.position += acc.position < 0 ? 100 : 0;
        return acc;
      },
      {position: 50, zeroes: 0}
    );
    return result.zeroes;
  },
];

export default solutions;
