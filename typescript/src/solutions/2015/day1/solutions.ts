import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    return lines[0].split('').reduce((a, c) => {
      return a + (c === '(' ? 1 : -1);
    }, 0);
  },
  // Solution part 2
  (lines: string[]) => {
    const dirs = lines[0];

    let floor = 0;
    let step = 0;

    while (floor > -1) {
      floor += dirs[step] === '(' ? 1 : -1;
      step++;
    }
    return step;
  },
];

export default solutions;
