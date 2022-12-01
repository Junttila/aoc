export function setDiff<T>(fromThese: Set<T>, removeThese: Set<T>) {
  const setC = new Set<T>(fromThese);
  const setD = new Set<T>(removeThese);
  for (const c of setD) {
    if (setC.has(c)) {
      setC.delete(c);
    }
  }
  return setC;
}
