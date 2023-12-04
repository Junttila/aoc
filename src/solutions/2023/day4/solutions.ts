import {Solution} from '../../../types';
import {setIntersect} from '../../scripts/setIntersect';
import {mapIter} from '../../scripts/mapIter';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    return lines.reduce((acc, l) => {
      const [winning, my] = l
        .split(':')[1]
        .split('|')
        .map(ns => new Set<number>([...ns.matchAll(/\d+/g)].map(Number)));
      const intersection = setIntersect(winning, my);
      return acc + (intersection.size > 0 ? 2 ** (intersection.size - 1) : 0);
    }, 0);
  },
  // Solution part 2
  (lines: string[]) => {
    const copies = Array.from({length: lines.length}, () => 1);
    return lines.reduce((acc, l, i) => {
      const [winning, my] = l
        .split(':')[1]
        .split('|')
        .map(ns => new Set<string>(mapIter(ns.matchAll(/\d+/g), n => n[0])));
      const intersection = setIntersect(winning, my);
      for (let j = 1; j <= intersection.size; j++) {
        copies[i + j] += copies[i];
      }
      return acc + copies[i];
    }, 0);
  },
];

export default solutions;
