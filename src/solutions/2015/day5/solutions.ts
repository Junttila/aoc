import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const niceWords = lines.filter(w => {
      let threeVowels = false;
      let vowelCount = 0;

      let twice = false;
      let lastChar = '';

      let noForbidden = true;

      return w.split('').reduce((_n, c) => {
        vowelCount += vowels.has(c) ? 1 : 0;
        threeVowels = vowelCount >= 3;

        twice = twice ? true : c === lastChar;

        noForbidden = noForbidden ? !forbidden.has(`${lastChar}${c}`) : false;

        lastChar = c;
        return threeVowels && twice && noForbidden;
      }, false);
    });
    return niceWords.length;
  },
  // Solution part 2
  (lines: string[]) => {
    console.log('GO-------------------');
    const niceWords = lines.filter(w => {
      const pairs = new Set<string>();
      let twoPairs = false;
      let repeat = false;
      let lastPair = '';

      w.split('').forEach((c, i, a) => {
        const currentPair = `${a[i - 1]}${c}`;
        twoPairs = twoPairs
          ? true
          : currentPair === lastPair
          ? false
          : i >= 3
          ? pairs.has(currentPair)
          : false;

        repeat = repeat ? true : i >= 2 ? c === a[i - 2] : false;

        i > 0 ? pairs.add(currentPair) : null;
        lastPair = currentPair;
      });
      const nice = twoPairs && repeat;

      console.log(JSON.stringify({w, twoPairs, repeat}, null, 2));

      return nice;
    });
    return niceWords.length;
  },
];

const vowels = new Set<string>(['a', 'e', 'i', 'o', 'u']);
const forbidden = new Set<string>(['ab', 'cd', 'pq', 'xy']);

export default solutions;
