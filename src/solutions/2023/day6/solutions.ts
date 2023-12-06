import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const races: Race[] = zip(
      ...lines.map(l => {
        return Array.from(l.split(':')[1].matchAll(/\d+/g)).flat().map(Number);
      })
    ).map(([time, distance]) => ({
      time,
      distance,
    }));

    const result = races.reduce((acc, r) => {
      const [min, max] = findRoots(-1, r.time, -r.distance);
      return acc * (Math.ceil(max) - Math.floor(min) - 1);
    }, 1);
    return result;
  },
  // Solution part 2
  (lines: string[]) => {
    const [time, dist] = lines
      .map(l => l.split(':')[1].trim().split(' ').join(''))
      .map(Number);

    const [min, max] = findRoots(-1, time, -dist);
    return Math.ceil(max) - Math.floor(min) - 1;
  },
];

function zip<T>(...args: T[][]) {
  return args[0].map((_, i) => args.map(arg => arg[i]));
}

function findRoots(a: number, b: number, c: number) {
  const discriminant = b * b - 4 * a * c;
  if (discriminant > 0) {
    return [
      (-b + Math.sqrt(discriminant)) / (2 * a),
      (-b - Math.sqrt(discriminant)) / (2 * a),
    ];
  } else if (discriminant === 0) {
    return [-b / (2 * a), -b / (2 * a)];
  }
  return [NaN, NaN];
}

interface Race {
  time: number;
  distance: number;
}

export default solutions;
