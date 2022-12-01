const example = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`.split('\n');

const solutions: Array<(lines: string[]) => string | number> = [
  // Solution part 1
  (lines: string[]) => {
    const result = splitArray(lines, '').map((v) => {
      return v.map((v2) => Number.parseInt(v2)).reduce((v2, a) => v2 + a);
    }, 0);
    return Math.max(...result).toString();
  },
  // Solution part 2
  (lines: string[]) => {
    const result = splitArray(lines, '').map((v) => {
      return v.map((v2) => Number.parseInt(v2)).reduce((v2, a) => v2 + a);
    }, 0);
    const sort = result.sort((a, b) => b - a);
    return sort[0] + sort[1] + sort[2];
  },
];

function splitArray<T>(a: T[], s: T): T[][] {
  let temp: T[] = [];
  const result: T[][] = [];
  a.forEach((v) => {
    if (v !== s) {
      temp.push(v);
    } else {
      result.push(temp);
      temp = [];
    }
  });
  return result;
}

export default solutions;
