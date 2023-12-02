import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const limit: GameSet = {red: 12, green: 13, blue: 14};
    const games: Game[] = lines.map(l => {
      const [gameString, setsString] = l.split(':');

      const gameSets = setsString.split(';').map(s => {
        const setColors = s.split(',').map(c => {
          const [_, number, color] = c.split(' ');
          return [color, Number(number)];
        });
        return Object.fromEntries(setColors);
      });
      return {
        id: Number(gameString.split(' ')[1]),
        sets: gameSets,
      };
    });
    return games
      .filter(
        g =>
          !g.sets.some(s =>
            (['red', 'green', 'blue'] as GameColor[]).some(c => s[c] > limit[c])
          )
      )
      .reduce((acc, g) => acc + g.id, 0);
  },
  // Solution part 2
  (lines: string[]) => {
    const games: Game[] = lines.map(l => {
      const [gameString, setsString] = l.split(':');

      const gameSets = setsString.split(';').map(s => {
        const setColors = s.split(',').map(c => {
          const [_, number, color] = c.split(' ');
          return [color, Number(number)];
        });
        return Object.fromEntries(setColors);
      });
      return {
        id: Number(gameString.split(' ')[1]),
        sets: gameSets,
      };
    });
    return games
      .map(g => {
        const minSet: GameSet = g.sets.reduce(
          (min, s) => ({
            red: s.red ? Math.max(s.red, min.red) : min.red,
            green: s.green ? Math.max(s.green, min.green) : min.green,
            blue: s.blue ? Math.max(s.blue, min.blue) : min.blue,
          }),
          {
            red: 0,
            green: 0,
            blue: 0,
          }
        );
        return Object.values(minSet).reduce((acc, c) => (c ? acc * c : acc), 1);
      })
      .reduce((acc, p) => acc + p, 0);
  },
];
interface Game {
  id: number;
  sets: GameSet[];
}
interface GameSet {
  red: number;
  green: number;
  blue: number;
}
type GameColor = keyof GameSet;

export default solutions;
