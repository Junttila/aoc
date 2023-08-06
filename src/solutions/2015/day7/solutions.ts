import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    // const end = 'a';
    const circuit: Circuit = new Map<string, Wire>();
    const wireOut = new Map<string, number>();

    lines.forEach(l => {
      const [src, dest] = l.split(' -> ').map(w => w.split(' '));
      // console.log(src);
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
    // const end = 'a';
    const circuit: Circuit = new Map<string, Wire>();
    const wireOut = new Map<string, number>();

    lines.forEach(l => {
      const [src, dest] = l.split(' -> ').map(w => w.split(' '));
      // console.log(src);
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
    console.log(newb);
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

  // console.log('resolving', wireName);
  if (!Number.isNaN(Number(wireName))) {
    return Number(wireName);
  }
  const wire = circuit.get(wireName) as Wire;
  // console.log(typeof wire);
  if (typeof wire !== 'object') {
    const possibleNumber = Number(wire);
    if (Number.isNaN(possibleNumber)) {
      return resolve(wire, circuit, wireOut);
    }
    return possibleNumber;
  }

  switch (wire.op) {
    case 'AND':
      wireOut.set(
        wire.operands[0],
        resolve(wire.operands[0], circuit, wireOut)
      );
      wireOut.set(
        wire.operands[1],
        resolve(wire.operands[1], circuit, wireOut)
      );
      return wireOut.get(wire.operands[0])! & wireOut.get(wire.operands[1])!;
    case 'OR':
      wireOut.set(
        wire.operands[0],
        resolve(wire.operands[0], circuit, wireOut)
      );
      wireOut.set(
        wire.operands[1],
        resolve(wire.operands[1], circuit, wireOut)
      );
      return wireOut.get(wire.operands[0])! | wireOut.get(wire.operands[1])!;
    case 'LSHIFT':
      wireOut.set(
        wire.operands[0],
        resolve(wire.operands[0], circuit, wireOut)
      );
      return wireOut.get(wire.operands[0])! << Number(wire.operands[1]);
    case 'RSHIFT':
      wireOut.set(
        wire.operands[0],
        resolve(wire.operands[0], circuit, wireOut)
      );
      return wireOut.get(wire.operands[0])! >> Number(wire.operands[1]);
    case 'NOT':
      wireOut.set(
        wire.operands[0],
        resolve(wire.operands[0], circuit, wireOut)
      );
      return ~wireOut.get(wire.operands[0])!;
  }
}

type Wire =
  | string
  | {
      op: Op;
      operands: string[];
    };

type Op = 'AND' | 'OR' | 'LSHIFT' | 'RSHIFT' | 'NOT';

export default solutions;
