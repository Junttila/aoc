export function splitArray<T>(a: T[], s: T): T[][] {
  let temp: T[] = [];
  const result: T[][] = [];
  a.forEach(v => {
    if (v !== s) {
      temp.push(v);
    } else {
      result.push(temp);
      temp = [];
    }
  });

  result.push(temp);
  return result;
}
