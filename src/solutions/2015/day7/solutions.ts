import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const circuit: Circuit = new Map<string, Wire>();
    const wireOut = new Map<string, number>();

    lines.forEach(l => {
      const [src, dest] = l.split(' -> ').map(w => w.split(' '));
      circuit.set(
        dest[0],
        src.length === 1
          ? src[0]
          : {
              op: src.at(-2) as Op,
              operands: src.filter(
                s => s.charCodeAt(0) > 96 || s.charCodeAt(0) < 58
              ),
            }
      );
    });
    return resolve('a', circuit, wireOut);
  },
  // Solution part 2
  (lines: string[]) => {
    const circuit: Circuit = new Map<string, Wire>();
    const wireOut = new Map<string, number>();

    lines.forEach(l => {
      const [src, dest] = l.split(' -> ').map(w => w.split(' '));
      circuit.set(
        dest[0],
        src.length === 1
          ? src[0]
          : {
              op: src.at(-2) as Op,
              operands: src.filter(
                s => s.charCodeAt(0) > 96 || s.charCodeAt(0) < 58
              ),
            }
      );
    });
    const newb = resolve('a', circuit, wireOut);
    circuit.set('b', `${newb}`);
    const wireOut2 = new Map<string, number>();
    return resolve('a', circuit, wireOut2);
  },
];

type Circuit = Map<string, Wire>;

function resolve(
  wireName: string,
  circuit: Circuit,
  wireOut: Map<string, number>
): number {
  const memo = wireOut.get(wireName);
  if (memo) {
    return memo;
  }

  if (!Number.isNaN(Number(wireName))) {
    return Number(wireName);
  }

  const wire = circuit.get(wireName) as Wire;
  if (typeof wire !== 'object') {
    return resolve(wire, circuit, wireOut);
  }

  wire.operands[0]
    ? wireOut.set(wire.operands[0], resolve(wire.operands[0], circuit, wireOut))
    : null;
  wire.operands[1]
    ? wireOut.set(wire.operands[1], resolve(wire.operands[1], circuit, wireOut))
    : null;

  const left = wireOut.get(wire.operands[0])!;
  const right = wireOut.get(wire.operands[1])!;

  return wire.op === 'AND'
    ? left & right
    : wire.op === 'OR'
    ? left | right
    : wire.op === 'LSHIFT'
    ? left << right
    : wire.op === 'RSHIFT'
    ? left >> right
    : wire.op === 'NOT'
    ? ~left
    : 0;
}

type Wire =
  | string
  | {
      op: Op;
      operands: string[];
    };

type Op = 'AND' | 'OR' | 'LSHIFT' | 'RSHIFT' | 'NOT';

export default solutions;
