import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    return lines.map(l => l.split(' ')).reduce((a, v) => a + gameScore(v), 0);
  },
  // Solution part 2
  (lines: string[]) => {
    return lines
      .map(l => l.split(' '))
      .map(v => [v[0], strat(v)])
      .reduce((a, v) => a + gameScore(v), 0);
  },
];

const map: {[_: string]: string} = {
  X: 'A',
  Y: 'B',
  Z: 'C',
};

function strat(strat: string[]): string {
  let move = '';
  switch (strat[0]) {
    case 'A':
      switch (strat[1]) {
        case 'X': //lose
          move = 'Z';
          break;
        case 'Y': //draw
          move = 'X';
          break;
        case 'Z': //win
          move = 'Y';
          break;
      }
      break;
    case 'B':
      switch (strat[1]) {
        case 'X': //lose
          move = 'X';
          break;
        case 'Y': //draw
          move = 'Y';
          break;
        case 'Z': //win
          move = 'Z';
          break;
      }
      break;
    case 'C':
      switch (strat[1]) {
        case 'X': //lose
          move = 'Y';
          break;
        case 'Y': //draw
          move = 'Z';
          break;
        case 'Z': //win
          move = 'X';
          break;
      }
      break;
  }
  return move;
}

function gameScore(game: string[]): number {
  let resultScore = 0;
  let choiceScore = 0;
  // console.log(game);

  switch (game[1]) {
    case 'X':
      choiceScore = 1;
      break;
    case 'Y':
      choiceScore = 2;
      break;
    case 'Z':
      choiceScore = 3;
      break;
  }

  if (game[0] === map[game[1]]) {
    resultScore = 3;
  } else if (game[1] === 'Y') {
    resultScore = game[0] === 'A' ? 6 : 0;
  } else if (game[1] === 'Z') {
    resultScore = game[0] === 'A' ? 0 : 6;
  } else if (game[1] === 'X') {
    resultScore = game[0] === 'B' ? 0 : 6;
  }

  // console.log(resultScore === 6 ? 'win' : resultScore === 0 ? 'lose' : 'draw');
  return resultScore + choiceScore;
}

export default solutions;
