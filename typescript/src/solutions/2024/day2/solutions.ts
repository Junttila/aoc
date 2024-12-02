import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const safeReports = lines.reduce(
      (acc, l) => {
        const analysis = analyzeReport(l.split(' ').map(Number));

        analysis.gradualChange &&
          analysis.noFlat &&
          analysis.sameDirection &&
          acc.push({report: l, analysis});
        return acc;
      },
      [] as Array<{
        report: string;
        analysis: Analysis;
      }>
    );
    return safeReports.length;
  },
  // Solution part 2
  (lines: string[]) => {
    const safeReports = lines.reduce(
      (acc, l) => {
        const analysis = analyzeReport(l.split(' ').map(Number));

        const safe =
          analysis.gradualChange && analysis.noFlat && analysis.sameDirection;

        if (safe) {
          acc.push({report: l, analysis});
          return acc;
        }

        const dampenerReports = l.split(' ').map((_, i, rep) => {
          return [...rep.slice(0, i), ...rep.slice(i + 1)];
        });

        for (const rep of dampenerReports) {
          const dAnalysis = analyzeReport(rep.map(Number));
          const dSafe =
            dAnalysis.gradualChange &&
            dAnalysis.noFlat &&
            dAnalysis.sameDirection;
          if (dSafe) {
            acc.push({report: rep.join(' '), analysis: dAnalysis});
            return acc;
          }
        }
        return acc;
      },
      [] as Array<{
        report: string | number[];
        analysis: Analysis;
      }>
    );
    return safeReports.length;
  },
];

interface Analysis {
  sameDirection: boolean;
  gradualChange: boolean;
  noFlat: boolean;
}

function analyzeReport(levels: number[]) {
  const analysis: Analysis = {
    sameDirection: true,
    gradualChange: true,
    noFlat: true,
  };
  let direction = levels[0] - levels[1];
  if (direction === 0) {
    analysis.noFlat = false;
    return analysis;
  }
  for (let i = 1; i < levels.length; i++) {
    const [first, second] = levels.slice(i - 1, i + 1);
    const newDirection = first - second;
    if (newDirection === 0) {
      analysis.noFlat = false;
      return analysis;
    }
    if (Math.sign(newDirection) !== Math.sign(direction)) {
      analysis.sameDirection = false;
      return analysis;
    }
    if (Math.abs(newDirection) > 3 || Math.abs(newDirection) < 1) {
      analysis.gradualChange = false;
      return analysis;
    }
    direction = newDirection;
  }
  return analysis;
}

export default solutions;
