export function* mapIter<T, U>(
  iterable: Iterable<T>,
  callback: (value: T) => U
) {
  for (const x of iterable) {
    yield callback(x);
  }
}
