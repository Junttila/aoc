import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    return findStart(lines[0]) || 0;
  },
  // Solution part 2
  (lines: string[]) => {
    return findStart(lines[0], 14) || 0;
  },
];

function findStart(data: string, nrOfDiff = 4): number | null {
  let allDiff = false;
  let i = nrOfDiff - 1;
  while (!allDiff) {
    if (i >= data.length) {
      return null;
    }
    const sub = data.slice(i - nrOfDiff + 1, i + 1);
    const set = new Set<string>(sub.split(''));
    if (Array.from(set).length >= nrOfDiff) {
      allDiff = true;
      i++;
      return i;
    }
    i++;
  }
  return null;
}

export default solutions;
