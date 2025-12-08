import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const width = lines[0].split(' ').filter(l => l).length;
    const problems = lines.reduce<
      {operator: '+' | '*' | null; operands: number[]}[]
    >(
      (acc, l, i) => {
        if (i === lines.length - 1) {
          const operators = l.split(' ').filter(o => o);
          operators.forEach((o, i) => {
            if (o !== '+' && o !== '*') return;
            acc[i].operator = o;
          });
          return acc;
        }

        const operands = l.split(' ').filter(o => o);
        operands.forEach((o, i) => {
          const operand = Number(o);
          if (Number.isNaN(operand)) return;
          acc[i].operands.push(operand);
        });
        return acc;
      },
      Array.from({length: width}, () => ({operator: null, operands: []}))
    );

    const result = problems.reduce(
      (acc, p) =>
        acc +
        (p.operator === '+'
          ? p.operands.reduce((acc2, o) => acc2 + o, 0)
          : p.operator === '*'
          ? p.operands.reduce((acc2, o) => acc2 * o, 1)
          : 0),
      0
    );
    return result;
  },
  // Solution part 2
  (lines: string[]) => {
    const operators = lines
      .at(-1)
      ?.split(' ')
      .filter(o => o === '*' || o === '+') as ('*' | '+')[] | undefined;

    const width = lines[0].split('').length;
    const columns = lines.slice(0, -1).reduce<string[][]>(
      (acc, l, i) => {
        l.split('').forEach((c, j) => c !== ' ' && (acc[j][i] = c));
        return acc;
      },
      Array.from({length: width}, () =>
        Array.from({length: lines.length - 1}, () => '')
      )
    );

    const problems = columns
      .reduce<number[][]>(
        (acc, c) => {
          if (c.filter(n => n).length === 0) {
            acc.push([]);
            return acc;
          }
          acc.at(-1)?.push(Number(c.filter(n => n).join('')));
          return acc;
        },
        [[]]
      )
      .reduce<{operator: '+' | '*' | null; operands: number[]}[]>(
        (acc, c, i) => {
          acc.push({operands: c, operator: operators?.[i] || null});
          return acc;
        },
        []
      );
    const result = problems.reduce(
      (acc, p) =>
        acc +
        (p.operator === '+'
          ? p.operands.reduce((acc2, o) => acc2 + o, 0)
          : p.operator === '*'
          ? p.operands.reduce((acc2, o) => acc2 * o, 1)
          : 0),
      0
    );
    return result;
  },
];

export default solutions;
