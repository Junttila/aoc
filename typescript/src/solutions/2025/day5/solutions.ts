import {Solution} from '../../../types';
import {splitArray} from '../../scripts/splitArray';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const [freshRangesData, ingredientsData] = splitArray(lines, '');
    const freshRanges = freshRangesData.map(r => {
      const [from, to] = r.split('-').map(Number);
      return {from, to};
    });
    const ingredients = ingredientsData.map(Number);

    const freshIngredients = ingredients.filter(i =>
      freshRanges.some(r => i >= r.from && i <= r.to)
    ).length;

    return freshIngredients;
  },
  // Solution part 2
  (lines: string[]) => {
    const freshRanges = splitArray(lines, '')[0].map(r => {
      const [from, to] = r.split('-').map(Number);
      return {from, to};
    });
    // console.log({freshRanges});

    const res = freshRanges.reduce((acc, r, i) => {
      const otherRanges = freshRanges.filter((_, i2) => i2 < i);
      const rangeSize = r.to - r.from + 1;
      const overlaps = otherRanges.reduce(
        (acc2, r2) => acc2 + rangeOverlap(r, r2),
        0
      );
      console.log({
        r,
        rangeSize,
        overlaps,
        newAcc: acc + rangeSize - Math.min(overlaps, rangeSize),
      });
      return acc + rangeSize - Math.min(overlaps, rangeSize);
    }, 0);

    return res;
  },
];

function rangeOverlap(
  a: {from: number; to: number},
  b: {from: number; to: number}
) {
  if (
    (a.to <= b.to && a.from >= b.from) ||
    (b.to <= a.to && b.from >= a.from)
  ) {
    console.log('complete overlap', {a, b});
    return Math.min(a.to - a.from, b.to - b.from) + 1;
  }
  if (
    (a.from < b.from && a.to < b.from) ||
    (b.from < a.from && b.to < a.from)
  ) {
    console.log('no overlap', {a, b});
    return 0;
  }
  if (a.to > b.to) {
    console.log('partial overlap 1', {a, b});
    return b.to - a.from + 1;
  }
  if (a.from < b.from) {
    console.log('partial overlap 2', {a, b});
    return a.to - b.from + 1;
  }
  console.log('null case');
  return 0;
}

export default solutions;
