import {Solution} from '../../../types';
import {splitArray} from '../../scripts/splitArray';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const pairs = splitArray(lines, '');
    // console.log(pairs[0][0]);
    // console.log(toPacket(pairs[0][0]));
    // console.log(sorted([9], [[8, 7, 6]]));
    const depth = '';
    return pairs.reduce((a, p, i) => {
      const s = sorted(toPacket(p[0]), toPacket(p[1]), depth);
      console.log(s, '\n');
      // if (sorted(toPacket(p[0]), toPacket(p[1])) === null) console.log(p);
      return a + (s ? i + 1 : 0);
    }, 0);
  },
  // Solution part 2
  (lines: string[]) => {
    lines.length++;
    return 'no answer';
  },
];

type Packet = Array<Packet> | number;

function sorted(l: Packet, r: Packet, depth: string): boolean | null {
  depth = depth + ' ';
  // console.log(depth, 'comparing\n', depth, l, '\n', depth, 'and\n', depth, r);
  if (Number.isInteger(l) && Number.isInteger(r)) return l === r ? null : l < r;
  if (Array.isArray(l) && !Array.isArray(r)) return sorted(l, [r], depth);
  if (!Array.isArray(l) && Array.isArray(r)) return sorted([l], r, depth);

  if (Array.isArray(r) && Array.isArray(l)) {
    // if (l.length === 0 && r.length === 0) return true;
    for (let i = 0; i < Math.max(l.length, r.length); i++) {
      if (l.at(i) === undefined && r.at(i) !== undefined) return true;
      if (r.at(i) === undefined && l.at(i) !== undefined) return false;
      const s = sorted(l[i], r[i], depth);
      if (s !== null) return s;
    }
  }
  console.log('returning null', l, r);
  return null;
}

function toPacket(p: string) {
  return JSON.parse(p) as Packet;
}

export default solutions;
