import { splitArray } from '../scripts/splitArray';

const solutions: Array<(lines: string[]) => string | number> = [
  // Solution part 1
  (lines: string[]) => {
    const textMonkeys = splitArray(lines, '');

    const monkeys: Monkey[] = textMonkeys.map(constructMonkey);

    for (let _i = 0; _i < 20; _i++) {
      monkeys.forEach((m) => {
        m.items.forEach((it) => {
          m.inspectCount++;
          const opResult = Math.floor(m.operation(it) / 3);
          const testResult = m.test(opResult);
          monkeys[testResult].items.push(opResult);
        });
        m.items = [];
      });
    }

    return monkeys
      .sort((a, b) => b.inspectCount - a.inspectCount)
      .slice(0, 2)
      .reduce((a, v) => v.inspectCount * a, 1);
  },
  // Solution part 2
  (lines: string[]) => {
    const textMonkeys = splitArray(lines, '');

    const monkeys: Monkey[] = textMonkeys.map(constructMonkey);
    const commonDenominator = monkeys.reduce((a, v) => a * v.divBy, 1);

    for (let _i = 0; _i < 10000; _i++) {
      monkeys.forEach((m) => {
        m.items.forEach((it) => {
          m.inspectCount++;
          const opResult = m.operation(it);
          const testResult = m.test(opResult);
          monkeys[testResult].items.push(opResult % commonDenominator);
        });
        m.items = [];
      });
    }

    return monkeys
      .sort((a, b) => b.inspectCount - a.inspectCount)
      .slice(0, 2)
      .reduce((a, v) => v.inspectCount * a, 1);
  },
];

interface Monkey {
  items: Worry[];
  operation: (w: Worry) => Worry;
  test: (w: Worry) => number;
  inspectCount: number;
  divBy: number;
}

const constructMonkey = (v: string[]): Monkey => {
  const [_nameString, itemString, opString, ...testStrings] = v;
  const opSymbols = opString.slice(23).split(' ');
  const divBy = Number(testStrings[0].split(' ').at(-1));
  const trueThrow = Number(testStrings[1].split(' ').at(-1));
  const falseThrow = Number(testStrings[2].split(' ').at(-1));

  opSymbols[0];

  return {
    items: itemString
      .slice(18)
      .split(', ')
      .map((n) => Number.parseInt(n)),
    operation:
      opSymbols[0] === '*'
        ? (w) => w * (opSymbols[1] === 'old' ? w : Number(opSymbols[1]))
        : (w) => w + (opSymbols[1] === 'old' ? w : Number(opSymbols[1])),
    test: (w) => (w % divBy === 0 ? trueThrow : falseThrow),
    inspectCount: 0,
    divBy,
  };
};

type Worry = number;

export default solutions;
