import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const res = lines[0].split(',').reduce((acc, range) => {
      const [start, end] = range.split('-').map(Number);
      const invalids: number[] = [];
      for (let i = start; i <= end; i++) {
        if (!isValid1(i)) {
          invalids.push(i);
        }
      }
      return acc + invalids.reduce((sum, num) => sum + num, 0);
    }, 0);
    return res;
  },
  // Solution part 2
  (lines: string[]) => {
    const res = lines[0].split(',').reduce((acc, range) => {
      const [start, end] = range.split('-').map(Number);
      const invalids: number[] = [];
      for (let i = start; i <= end; i++) {
        if (!isValid2(i)) {
          invalids.push(i);
        }
      }
      return acc + invalids.reduce((sum, num) => sum + num, 0);
    }, 0);
    return res;
  },
];

function isValid1(id: number) {
  const str = id.toString();
  if (!(str.length % 2 === 0)) {
    return true;
  }
  const [first, second] = [
    str.slice(0, str.length / 2),
    str.slice(str.length / 2),
  ];
  return !(first === second);
}

function isValid2(id: number) {
  const str = id.toString();
  if (str.length < 2) {
    return true;
  }
  for (let i = 0; i < str.length / 2; i++) {
    const repeatCount = Math.floor(str.length / (i + 1));
    const strToRepeat = str.slice(0, i + 1);
    const repeated = strToRepeat.repeat(repeatCount);
    if (repeated === str) {
      return false;
    }
  }
  return true;
}

export default solutions;
