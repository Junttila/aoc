import {Solution} from '../../../types';
import {splitArray} from '../../scripts/splitArray';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const [ruleStrings, updateStrings] = splitArray(lines, '');
    const rules = ruleStrings
      .map(s => s.split('|'))
      .reduce((rules, [first, second]) => {
        const rule = rules.get(second);
        if (!rule) {
          rules.set(second, new Set<string>([first]));
        } else {
          rule.add(first);
        }
        return rules;
      }, new Map<string, Set<string>>());
    const updates = updateStrings.map(s => s.split(','));

    const result = updates.reduce((acc, u) => {
      const ordered = u.every(
        (p, i) => !u.slice(i + 1).some(ap => rules.get(p)?.has(ap))
      );

      return acc + Number(ordered ? u[(u.length - 1) / 2] : 0);
    }, 0);
    return result;
  },
  // Solution part 2
  (lines: string[]) => {
    const [ruleStrings, updateStrings] = splitArray(lines, '');
    const rules = ruleStrings
      .map(s => s.split('|'))
      .reduce((rules, [first, second]) => {
        const rule = rules.get(second);
        if (!rule) {
          rules.set(second, new Set<string>([first]));
        } else {
          rule.add(first);
        }
        return rules;
      }, new Map<string, Set<string>>());
    const updates = updateStrings.map(s => s.split(','));

    const result = updates.reduce((acc, u) => {
      const unordered = u.some((p, i) =>
        u.slice(i + 1).some(ap => rules.get(p)?.has(ap))
      );
      const ordered = correctOrder(u, rules);
      return acc + Number(unordered ? ordered[(ordered.length - 1) / 2] : 0);
    }, 0);
    return result;
  },
];

function correctOrder(pages: string[], rules: Map<string, Set<string>>) {
  let toPlace = [...pages];

  const placed: string[] = [];

  while (toPlace.length > 0) {
    for (let i = 0; i < toPlace.length; i++) {
      const p = toPlace[i];
      const after = [...toPlace.slice(0, i), ...toPlace.slice(i + 1)];

      if (!after.some(ap => rules.get(p)?.has(ap))) {
        placed.push(p);
        toPlace = [...after];
        break;
      }
    }
  }

  return placed;
}

export default solutions;
