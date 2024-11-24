import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const {code, mem} = lines.reduce(
      (a, l) => {
        let mem = 0;
        for (let i = 1; i < l.length - 1; i++) {
          mem++;
          i += l.slice(i, i + 2) === '\\x' ? 3 : l[i] === '\\' ? 1 : 0;
        }
        return {mem: a.mem + mem, code: a.code + l.length};
      },
      {mem: 0, code: 0}
    );
    return code - mem;
  },
  // Solution part 2
  (lines: string[]) => {
    const {enc, code} = lines.reduce(
      (a1, l) => {
        const enc =
          // Surrounding quotes
          2 +
          // Original length
          l.length +
          // Count of escaped characters
          l
            .split('')
            .reduce((a2, c) => a2 + (c === '"' || c === '\\' ? 1 : 0), 0);

        return {enc: a1.enc + enc, code: a1.code + l.length};
      },
      {enc: 0, code: 0}
    );
    return enc - code;
  },
];

export default solutions;
