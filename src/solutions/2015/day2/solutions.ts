import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    return lines.reduce((a, b) => {
      const [l, w, h] = b.split('x').map(Number);
      const sides = [l * w, w * h, h * l];

      return (
        a +
        sides.reduce((a2, v) => a2 + 2 * v, 0) +
        sides.sort((a, b) => a - b)[0]
      );
    }, 0);
  },
  // Solution part 2
  (lines: string[]) => {
    return lines.reduce((a, b) => {
      const dims = b.split('x').map(Number);

      const wrap = dims
        .sort((a, b) => a - b)
        .slice(0, 2)
        .reduce((a2, v) => a2 + 2 * v, 0);

      const bow = dims.reduce((a2, v) => a2 * v, 1);

      return a + wrap + bow;
    }, 0);
  },
];

export default solutions;
