import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    console.log('-'.repeat(10));
    const res = lines.reduce((acc, l) => {
      const digits = l.split('').map(Number);
      const firstLargestDigit = digits.slice(0, -1).reduce(
        (acc2, d, i) => {
          if (d > acc2.digit) {
            acc2.digit = d;
            acc2.i = i;
          }
          return acc2;
        },
        {digit: 0, i: -1}
      );

      const secondDigit = Math.max(...digits.slice(firstLargestDigit.i + 1));

      const joltage = Number(`${firstLargestDigit.digit}${secondDigit}`);
      acc += joltage;
      return acc;
    }, 0);
    return res;
  },
  // Solution part 2
  (lines: string[]) => {
    console.log('-'.repeat(10));
    const res = lines.reduce((acc, l) => {
      const digits = l.split('').map(Number);
      const joltage = calculateJoltage(digits, 12, []);
      acc += joltage;
      return acc;
    }, 0);
    return res;
  },
];

function calculateJoltage(
  bank: number[],
  batteryCount: number,
  turnedOnBatteries: number[]
) {
  if (batteryCount < 1 || bank.length < 1)
    return Number(turnedOnBatteries.join(''));
  if (bank.length === 1) {
    turnedOnBatteries.push(bank[0]);
    return Number(turnedOnBatteries.join(''));
  }
  const {digit, i} = bank
    .slice(0, batteryCount > 1 ? 1 - batteryCount : undefined)
    .reduce(
      (acc2, d, i) => {
        if (d > acc2.digit) {
          acc2.digit = d;
          acc2.i = i;
        }
        return acc2;
      },
      {digit: 0, i: -1}
    );
  turnedOnBatteries.push(digit);

  return calculateJoltage(
    bank.slice(i + 1),
    batteryCount - 1,
    turnedOnBatteries
  );
}

export default solutions;
