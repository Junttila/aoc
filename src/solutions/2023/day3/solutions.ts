import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const {numbers, symbols} = lines.reduce(
      (ns, l, i) => {
        ns.numbers.push(
          ...[...l.matchAll(/\d+/g)].map(m => ({
            value: m[0],
            start: {x: m.index!, y: i},
          }))
        );
        [...l.matchAll(/[^\d.]/g)].forEach(sm => {
          ns.symbols.add(`${sm.index},${i}`);
        });
        return ns;
      },
      {numbers: [] as PartNumber[], symbols: new Set<string>()}
    );
    return numbers
      .filter(n => {
        const toSearch = surroundingIndices(n.start, n.value.length, {
          x: lines[0].length,
          y: lines.length,
        });
        return toSearch.some(p => symbols.has(p));
      })
      .reduce((acc, n) => acc + Number(n.value), 0);
  },
  // Solution part 2
  (lines: string[]) => {
    console.log('start');
    const {numbers, gears} = lines.reduce(
      (ns, l, i) => {
        ns.numbers.push(
          ...[...l.matchAll(/\d+/g)].map(m => ({
            value: m[0],
            start: {x: m.index!, y: i},
          }))
        );
        [...l.matchAll(/\*/g)].forEach(sm => {
          ns.gears.add(`${sm.index},${i}`);
        });
        return ns;
      },
      {numbers: [] as PartNumber[], gears: new Set<string>()}
    );
    return Array.from(gears).reduce((acc, g) => {
      const [x, y] = g.split(',').map(Number);
      const adjNumbers = numbers.filter(
        n =>
          x >= n.start.x - 1 &&
          x <= n.start.x + n.value.length &&
          y >= n.start.y - 1 &&
          y <= n.start.y + 1
      );
      // console.log(adjNumbers);

      return (
        acc +
        (adjNumbers.length > 1
          ? adjNumbers.reduce((acc2, n) => acc2 * Number(n.value), 1)
          : 0)
      );
    }, 0);
  },
];

function surroundingIndices(start: Index, length: number, bounds: Index) {
  const indices = new Set<string>();
  for (let i = start.x; i < start.x + length; i++) {
    [
      [i - 1, start.y - 1],
      [i, start.y - 1],
      [i + 1, start.y - 1],
      [i - 1, start.y],
      [i + 1, start.y],
      [i - 1, start.y + 1],
      [i, start.y + 1],
      [i + 1, start.y + 1],
    ]
      .filter(p => p[0] >= 0 && p[0] < bounds.x && p[1] >= 0 && p[1] < bounds.y)
      .forEach(p => indices.add(`${p[0]},${p[1]}`));
  }
  return Array.from(indices);
}

interface PartNumber {
  value: string;
  start: Index;
  symbol?: Symbol;
}

interface Symbol {
  value: string;
  x: number;
  y: number;
}

interface Index {
  x: number;
  y: number;
}
export default solutions;
