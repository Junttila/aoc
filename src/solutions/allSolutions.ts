import {solutions as solutions2022} from './2022/solutions';

const solutionsObject = {
  '2022': solutions2022,
};
Object.entries(solutionsObject);

const allSolutions = new Map<string, typeof solutions2022>(
  Object.entries(solutionsObject)
);

export default allSolutions;
