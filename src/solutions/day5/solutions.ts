const solutions: Array<(lines: string[]) => string> = [
  // Solution part 1
  (lines: string[]) => {
    const nrOfStacks = Number(
      lines
        .find((v) => v[1] === '1')
        ?.split('   ')
        .at(-1),
    );
    const endOfDrawing = lines.findIndex((v) => v[1] === '1');
    const stacks: Stack[] = Array.from({ length: nrOfStacks }, () => Array(0));
    for (let line = 0; line < endOfDrawing; line++) {
      for (let sn = 0; sn < nrOfStacks; sn++) {
        const crate: Crate = lines[line][sn * 4 + 1];
        if (crate !== ' ') {
          stacks[sn].unshift(crate);
        }
      }
    }

    const moves = lines.slice(endOfDrawing + 2).map((m): Move => {
      const move = m
        .replace(/[a-z]/g, '')
        .split('  ')
        .map((n) => Number(n));
      return {
        amount: move[0],
        from: move[1],
        to: move[2],
      };
    });

    moves.forEach((m) => {
      move(stacks, m);
    });
    return stacks.map((s) => s.at(-1) || '').reduce((a, v) => a + v, '');
  },
  // Solution part 2
  (lines: string[]) => {
    const nrOfStacks = Number(
      lines
        .find((v) => v[1] === '1')
        ?.split('   ')
        .at(-1),
    );
    const endOfDrawing = lines.findIndex((v) => v[1] === '1');
    let stacks: Stack[] = Array.from({ length: nrOfStacks }, () => Array(0));
    for (let line = 0; line < endOfDrawing; line++) {
      for (let sn = 0; sn < nrOfStacks; sn++) {
        const crate: Crate = lines[line][sn * 4 + 1];
        if (crate !== ' ') {
          stacks[sn].unshift(crate);
        }
      }
    }

    const moves = lines.slice(endOfDrawing + 2).map((m): Move => {
      const move = m
        .replace(/[a-z]/g, '')
        .split('  ')
        .map((n) => Number(n));
      return {
        amount: move[0],
        from: move[1],
        to: move[2],
      };
    });

    moves.forEach((m) => {
      stacks = move2(stacks, m);
    });

    return stacks.map((s) => s.at(-1) || '').reduce((a, v) => a + v, '');
  },
];

type Stack = Crate[];
type Crate = string;
interface Move {
  amount: number;
  from: number;
  to: number;
}

function move(stacks: Stack[], { amount, from, to }: Move) {
  for (; amount > 0; amount--) {
    stacks[to - 1].push(stacks[from - 1].pop() as string);
  }
}

function move2(stacks: Stack[], { amount, from, to }: Move) {
  const s = Array.from(stacks);
  const craneStack = s[from - 1].slice(-amount);
  s[to - 1] = s[to - 1].concat(craneStack);
  s[from - 1] = s[from - 1].slice(0, -amount);
  return s;
}

export default solutions;
