import { setDiff } from './setDiff';

export function setEq<T>(setA: Set<T>, setB: Set<T>) {
  return setDiff(setA, setB).size === 0 && setDiff(setB, setA).size === 0;
}
