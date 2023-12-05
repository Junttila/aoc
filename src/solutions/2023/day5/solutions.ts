import {Solution} from '../../../types';
import {mapIter} from '../../scripts/mapIter';
import {splitArray} from '../../scripts/splitArray';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const result = splitArray(lines, '');
    const seeds: Seed[] = [...result[0][0].matchAll(/\d+/g)].flatMap(Number);

    const maps: FarmMap[] = result.slice(1).map(m => {
      const [_, sourceCat, destCat] = [
        ...(m[0].match(/(\w+)-to-(\w+)/) || []),
      ] as Category[];
      const entries = m.slice(1).map(e => {
        const [destStart, sourceStart, len] = [
          ...mapIter(e.matchAll(/\d+/g), Number),
        ];
        return {sourceStart, destStart, len} as MapEntry;
      });
      return {sourceCat, destCat, entries};
    });

    return Math.min(
      ...seeds.map(s => maps.reduce((acc, m) => mapGet(m, acc), s))
    );
  },
  // Solution part 2
  (lines: string[]) => {
    const result = splitArray(lines, '');
    const seedRanges: Range[] = [...result[0][0].matchAll(/(\d+) (\d+)/g)].map(
      m => ({from: Number(m[1]), to: Number(m[1]) + Number(m[2])})
    );

    const maps: FarmMap[] = result.slice(1).map(m => {
      const [_, sourceCat, destCat] = [
        ...(m[0].match(/(\w+)-to-(\w+)/) || []),
      ] as Category[];
      const entries = m.slice(1).map(e => {
        const [destStart, sourceStart, len] = [
          ...mapIter(e.matchAll(/\d+/g), Number),
        ];
        return {sourceStart, destStart, len} as MapEntry;
      });
      return {sourceCat, destCat, entries};
    });
    const finishedRanges = maps.reduce(
      (acc, m) => acc.map(r => mapRange(m, r)).flat(),
      seedRanges
    );
    return finishedRanges.sort((a, b) => a.from - b.from)[0].from;
  },
];

function mapGet(map: FarmMap, key: number) {
  for (let i = 0; i < map.entries.length; i++) {
    if (
      key >= map.entries[i].sourceStart &&
      key < map.entries[i].sourceStart + map.entries[i].len
    ) {
      return map.entries[i].destStart + key - map.entries[i].sourceStart;
    }
  }
  return key;
}

function mapRange(map: FarmMap, range: Range): Range[] {
  const betterMaps = map.entries.map(e => ({
    src: {
      from: e.sourceStart,
      to: e.sourceStart + e.len,
    },
    dest: {
      from: e.destStart,
      to: e.destStart + e.len,
    },
  }));
  const newRanges: Range[] = [];
  let start = range.from;

  const applicableMaps = betterMaps
    .filter(m => m.src.from <= range.to && m.src.to > range.from)
    .sort((a, b) => a.src.from - b.src.from);
  applicableMaps.forEach(e => {
    if (start < e.src.from) {
      newRanges.push({from: start, to: e.src.from});
      start = newRanges.at(-1)!.to;
    }
    const translation = e.dest.from - e.src.from;
    newRanges.push({
      from: start + translation,
      to: Math.min(e.dest.to, range.to + translation),
    });
    start = Math.min(range.to, e.src.to);
  });
  if (start < range.to) {
    newRanges.push({from: start, to: range.to});
  }
  return newRanges;
}

interface FarmMap {
  sourceCat: Category;
  destCat: Category;
  entries: MapEntry[];
}

interface MapEntry {
  sourceStart: number;
  destStart: number;
  len: number;
}

type Seed = number;

interface Range {
  from: number;
  to: number;
}

type Category =
  | 'seed'
  | 'soil'
  | 'fertilizer'
  | 'water'
  | 'light'
  | 'temperature'
  | 'humidity'
  | 'location';

export default solutions;
