import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    lines.length++;
    const sensors: Sensor[] = lines.map(l =>
      (s => ({
        x: s[0],
        y: s[1],
        closestBeacon: {x: s[2], y: s[3]},
      }))([...l.matchAll(/=(-*\d+)/g)].flatMap(m => Number(m[1])))
    );
    console.log(sensors);
    return 'no answer';
  },
  // Solution part 2
  (lines: string[]) => {
    lines.length++;
    return 'no answer';
  },
];

interface Sensor {
  x: number;
  y: number;
  closestBeacon: Beacon;
}

interface Beacon {
  x: number;
  y: number;
}

export default solutions;
