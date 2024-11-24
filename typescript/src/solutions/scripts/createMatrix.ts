export function createMatrix<T>(width: number, height: number, fill: T) {
  return Array.from({length: height}, () =>
    Array.from({length: width}, () => fill)
  );
}
