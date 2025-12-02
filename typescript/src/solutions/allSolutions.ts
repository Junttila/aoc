import {solutions as solutions2022} from './2022/solutions';
import {solutions as solutions2023} from './2023/solutions';
import {solutions as solutions2015} from './2015/solutions';
import {solutions as solutions2024} from './2024/solutions';
import {solutions as solutions2025} from './2025/solutions';

const solutionsObject = {
  '2025': solutions2025,
  '2024': solutions2024,
  '2023': solutions2023,
  '2022': solutions2022,
  '2015': solutions2015,
};
Object.entries(solutionsObject);

const allSolutions = new Map<string, typeof solutions2022>(
  Object.entries(solutionsObject)
);

export default allSolutions;
