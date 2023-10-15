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
    lines.length++;
    return 'no answer';
  },
];

type Packet = Array<Packet> | number;

function sorted(l: Packet, r: Packet): boolean | null {
  if (Number.isInteger(l) && Number.isInteger(r)) return l === r ? null : l < r;
  if (Array.isArray(l) && !Array.isArray(r)) return sorted(l, [r]);
  if (!Array.isArray(l) && Array.isArray(r)) return sorted([l], r);

  if (Array.isArray(r) && Array.isArray(l)) {
    for (let i = 0; i < Math.max(l.length, r.length); i++) {
      if (l.at(i) === undefined && r.at(i) !== undefined) return true;
      if (r.at(i) === undefined && l.at(i) !== undefined) return false;
      const s = sorted(l[i], r[i]);
      if (s !== null) return s;
    }
  }
  return null;
}

function toPacket(p: string) {
  return JSON.parse(p) as Packet;
}

export default solutions;
