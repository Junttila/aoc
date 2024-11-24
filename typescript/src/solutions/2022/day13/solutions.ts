import {Solution} from '../../../types';
import {splitArray} from '../../scripts/splitArray';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const pairs = splitArray(lines, '');
    return pairs.reduce(
      (a, p, i) => a + (sorted(toPacket(p[0]), toPacket(p[1])) ? i + 1 : 0),
      0
    );
  },
  // Solution part 2
  (lines: string[]) => {
    const packets = splitArray(lines, '').flat().map(toPacket);
    packets.push([[2]], [[6]]);
    return packets
      .sort((a, b) => (sorted(a, b) ? -1 : 1))
      .reduce<number>((a, p, i) => a * (isDecoderKey(p) ? i + 1 : 1), 1);
  },
];

type Packet = Array<Packet> | number;

function sorted(l: Packet, r: Packet): boolean | null {
  if (Number.isInteger(l) && Number.isInteger(r)) return l === r ? null : l < r;
  if (Array.isArray(l) && !Array.isArray(r)) return sorted(l, [r]);
  if (!Array.isArray(l) && Array.isArray(r)) return sorted([l], r);

  if (Array.isArray(r) && Array.isArray(l)) {
    for (let i = 0; i < Math.max(l.length, r.length); i++) {
      if (l.at(i) === undefined) return true;
      if (r.at(i) === undefined) return false;
      const s = sorted(l[i], r[i]);
      if (s !== null) return s;
    }
  }
  return null;
}

function toPacket(p: string) {
  return JSON.parse(p) as Packet;
}

function isDecoderKey(p: Packet) {
  return (
    Array.isArray(p) &&
    p.length === 1 &&
    Array.isArray(p[0]) &&
    p[0].length === 1 &&
    (p[0][0] === 2 || p[0][0] === 6)
  );
}

export default solutions;
