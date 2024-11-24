import {Solution} from '../../../types';
import * as md5 from 'md5';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const zeroes = 5;
    const zeroesString = ''.padStart(zeroes, '0');
    let i = 1;
    for (; i < Number.MAX_SAFE_INTEGER; i++) {
      const hash = md5(`${lines[0]}${i}`);
      if (hash.slice(0, zeroes) === zeroesString) {
        break;
      }
    }
    return `${i}`;
  },
  // Solution part 2
  (lines: string[]) => {
    const zeroes = 6;
    const zeroesString = ''.padStart(zeroes, '0');
    let i = 1;
    for (; i < Number.MAX_SAFE_INTEGER; i++) {
      const hash = md5(`${lines[0]}${i}`);
      if (hash.slice(0, zeroes) === zeroesString) {
        break;
      }
    }
    return `${i}`;
  },
];

export default solutions;
