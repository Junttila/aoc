import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    let pc = 0;
    let x = 1;
    let signalStrengths = new Map<number, number>();
    const result: {
      x: number;
      pc: number;
      signalStrengths: Map<number, number>;
      drawing: Map<number, boolean> | undefined;
    }[] = [];

    for (let i = 0; i < lines.length; i++) {
      const symbols = lines.at(i)?.split(' ');
      if (!symbols) {
        continue;
      }
      const instr: Instruction = {
        command: symbols[0] as Command,
        arg: Number(symbols.at(1)) || null,
      };

      result.push(runInstr(instr, x, pc, signalStrengths));
      pc = result[result.length - 1].pc;
      x = result[result.length - 1].x;
      signalStrengths = result[result.length - 1].signalStrengths;
    }

    return Array.from(signalStrengths.values()).reduce((a, v) => a + v, 0);
  },
  // Solution part 2
  (lines: string[]) => {
    let pc = 0;
    let x = 1;
    let signalStrengths = new Map<number, number>();
    let drawing = new Map<number, boolean>();
    const result: {
      x: number;
      pc: number;
      signalStrengths: Map<number, number>;
      drawing: Map<number, boolean> | undefined;
    }[] = [];

    for (let i = 0; i < lines.length; i++) {
      const symbols = lines.at(i)?.split(' ');
      if (!symbols) {
        continue;
      }
      const instr: Instruction = {
        command: symbols[0] as Command,
        arg: Number(symbols.at(1)) || null,
      };

      result.push(runInstr(instr, x, pc, signalStrengths, drawing));
      pc = result[result.length - 1].pc;
      x = result[result.length - 1].x;
      signalStrengths = result[result.length - 1].signalStrengths;
      drawing = result[result.length - 1].drawing as Map<number, boolean>;
    }

    drawImage(result[result.length - 1].drawing!);

    return '\n' + drawImage(result[result.length - 1].drawing!);
  },
];

type Command = 'addx' | 'noop';

interface Instruction {
  command: Command;
  arg: number | null;
}

function runInstr(
  instr: Instruction,
  x: number,
  pc: number,
  signalStrengths: Map<number, number>,
  drawing?: Map<number, boolean>,
  offset = 20
) {
  let newPC = pc + 1;
  let newX = x;
  if ((newPC + offset) % 40 === 0) {
    signalStrengths.set(newPC, newX * newPC);
  }

  drawing?.set(newPC, draw(newPC, newX));

  if (instr.command === 'addx') {
    newPC++;
    if ((newPC + offset) % 40 === 0) {
      signalStrengths.set(newPC, newX * newPC);
    }
    drawing?.set(newPC, draw(newPC, newX));
    newX += instr.arg || 0;
  }
  return {
    x: newX,
    pc: newPC,
    signalStrengths,
    drawing,
  };
}

function draw(cycle: number, sprite: number) {
  return Math.abs((cycle % 40) - sprite - 1) < 2;
}

function drawImage(drawing: Map<number, boolean>) {
  let lines = '';
  let line = '';
  for (let i = 0; i < Array.from(drawing.values()).length; i++) {
    const element = Array.from(drawing.values())[i];

    if (i % 40 === 0 && line !== '') {
      lines += line + '\n';
      line = '';
    }
    line = line + (element ? '#' : '.');
  }
  lines += line;
  return lines;
}

export default solutions;
