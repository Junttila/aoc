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
      if (freshRanges[i + 1] && freshRanges[i + 1].from <= freshRanges[i].to) {
        freshRanges[i].to = Math.max(freshRanges[i].to, freshRanges[i + 1].to);
        freshRanges.splice(i + 1, 1);
        continue;
      }

      i++;
    }

    const res = freshRanges.reduce((acc, r) => acc + r.to - r.from + 1, 0);

    return res;
  },
];

export default solutions;
