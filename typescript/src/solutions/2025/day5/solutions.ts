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
    const freshRanges = splitArray(lines, '')[0]
      .map(r => {
        const [from, to] = r.split('-').map(Number);
        return {from, to};
      })
      .sort((r1, r2) => r1.from - r2.from);

    let i = 0;
    while (i < freshRanges.length) {
      const otherRanges = freshRanges.filter((_, i2) => i2 > i);

      const firstMerge = otherRanges.findIndex(r =>
        mergeRange(r, freshRanges[i])
      );
      if (firstMerge > -1) {
        const mergeIndex = firstMerge + i + 1;
        freshRanges[i] = mergeRange(otherRanges[firstMerge], freshRanges[i])!;
        freshRanges.splice(mergeIndex, 1);
        continue;
      }

      i++;
    }

    const res = freshRanges.reduce((acc, r) => acc + r.to - r.from + 1, 0);

    return res;
  },
];

function mergeRange(
  a: {from: number; to: number},
  b: {from: number; to: number}
) {
  if (
    (a.to <= b.to && a.from >= b.from) ||
    (b.to <= a.to && b.from >= a.from)
  ) {
    return a.to <= b.to ? b : a;
  }
  if (
    (a.from < b.from && a.to < b.from) ||
    (b.from < a.from && b.to < a.from)
  ) {
    return null;
  }
  if (a.to > b.to) {
    return {from: b.from, to: a.to};
  }
  if (a.from < b.from) {
    return {from: a.from, to: b.to};
  }
  return null;
}

export default solutions;
