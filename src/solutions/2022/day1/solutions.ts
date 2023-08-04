import { splitArray } from "../../scripts/splitArray";

const solutions: Array<(lines: string[]) => string | number> = [
  // Solution part 1
  (lines: string[]) => {
    const result = splitArray(lines, "").map((v) => {
      return v.map((v2) => Number.parseInt(v2)).reduce((v2, a) => v2 + a);
    }, 0);
    return Math.max(...result).toString();
  },
  // Solution part 2
  (lines: string[]) => {
    const result = splitArray(lines, "").map((v) => {
      return v.map((v2) => Number.parseInt(v2)).reduce((v2, a) => v2 + a);
    }, 0);
    const sort = result.sort((a, b) => b - a);
    return sort[0] + sort[1] + sort[2];
  },
];

export default solutions;
