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
    lines.length++;
    return 'no answer';
  },
];

export default solutions;
