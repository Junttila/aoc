import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    return lines
      .map(l => {
        const split = Array.from(l.matchAll(/\d/g));
        return `${split.at(0)}${split.at(-1)}`;
      })
      .reduce((acc, l) => acc + Number(l) || 0, 0);
  },
  // Solution part 2
  (lines: string[]) => {
    const numberRegex = new RegExp(
      `(?=(\\d|${Object.keys(numbers).join('|')}))`,
      'g'
    );
    return lines
      .map(l => {
        const split = Array.from(l.matchAll(numberRegex))
          .flat()
          .filter(m => m)
          .map(m => Number(m) || numbers[m]);
        return `${split.at(0)}${split.at(-1)}`;
      })
      .reduce((acc, l) => acc + Number(l), 0);
  },
];

const numbers: {[_: string]: number} = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export default solutions;
