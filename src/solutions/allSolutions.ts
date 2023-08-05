import {solutions as solutions2022} from './2022/solutions';
import {solutions as solutions2015} from './2015/solutions';

const solutionsObject = {
  '2022': solutions2022,
  '2015': solutions2015,
};
Object.entries(solutionsObject);

const allSolutions = new Map<string, typeof solutions2022>(
  Object.entries(solutionsObject)
);

export default allSolutions;
