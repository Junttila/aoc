export function setIntersect<T>(a: Set<T>, b: Set<T>): Set<T> {
  const intersection = new Set<T>();
  for (const t of a) {
    if (b.has(t)) {
      intersection.add(t);
    }
  }
  return intersection;
}
