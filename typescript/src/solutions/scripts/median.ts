export function median(array: number[], f: (a: number, b: number) => number) {
  const sorted = array.slice().sort(f);

  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 !== 0) {
    return sorted[middle];
  }
  return (sorted[middle - 1] + sorted[middle]) / 2;
}
