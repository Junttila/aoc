import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    return lines
      .map(l => {
        const split = Array.from(l.matchAll(/\d/g));
        return `${split.at(0)}${split.at(-1)}`;
      })
      .reduce((acc, l) => acc + Number(l) || 0, 0);
  },
  // Solution part 2
  (lines: string[]) =>
    (numbers =>
      lines
        .map(l =>
          (s => `${s.at(0)}${s.at(-1)}`)(
            Array.from(
              l.matchAll(
                new RegExp(`(?=(\\d|${Object.keys(numbers).join('|')}))`, 'g')
              )
            )
              .flat()
              .filter(m => m)
              .map(m => Number(m) || numbers[m])
          )
        )
        .reduce((acc, l) => acc + Number(l), 0))({
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
    } as {[_: string]: number}),
];

export default solutions;
