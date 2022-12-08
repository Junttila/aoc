const solutions: Array<(lines: string[]) => string | number> = [
  // Solution part 1
  (lines: string[]) => {
    const forest: Forest = lines.map((l) =>
      l.split('').map((t) => Number.parseInt(t)),
    );
    const visibilityMatrix = forest.map((l, y) =>
      l
        .map((_t, x) => Array.from(visible(forest, { x, y })))
        .map((v) => v.length > 0),
    );

    return visibilityMatrix.flat().reduce((a, v) => (v ? a + 1 : a), 0);
  },
  // Solution part 2
  (lines: string[]) => {
    const forest: Forest = lines.map((l) =>
      l.split('').map((t) => Number.parseInt(t)),
    );
    const scenicMatrix = forest.map((l, y) =>
      l.map((_t, x) => scenic(forest, { x, y })),
    );
    return Math.max(
      ...scenicMatrix
        .flat()
        .map((m) => Array.from(m.values()).reduce((a, v) => a * v, 1))
        .filter((v) => v !== 0),
    );
  },
];

type Tree = number;
type Forest = Tree[][];

interface Position {
  x: number;
  y: number;
}

enum Direction {
  NORTH,
  EAST,
  SOUTH,
  WEST,
}

function visible(forest: Forest, tree: Position): Set<Direction> {
  const dirs = new Set<Direction>();
  const height = forest[tree.y][tree.x];

  for (let d = 0; d < 4; d++) {
    const dir = Direction[d];
    switch (dir) {
      case 'NORTH': {
        let visible = true;
        for (let y = tree.y - 1; y >= 0; y--) {
          visible = height > forest[y][tree.x];
          if (!visible) {
            break;
          }
        }
        visible ? dirs.add(Direction.NORTH) : null;
        break;
      }
      case 'EAST': {
        let visible = true;
        for (let x = tree.x + 1; x < forest[0].length; x++) {
          visible = height > forest[tree.y][x];
          if (!visible) {
            break;
          }
        }
        visible ? dirs.add(Direction.EAST) : null;
        break;
      }
      case 'SOUTH': {
        let visible = true;
        for (let y = tree.y + 1; y < forest.length; y++) {
          visible = height > forest[y][tree.x];
          if (!visible) {
            break;
          }
        }
        visible ? dirs.add(Direction.SOUTH) : null;
        break;
      }
      case 'WEST': {
        let visible = true;
        for (let x = tree.x - 1; x >= 0; x--) {
          visible = height > forest[tree.y][x];
          if (!visible) {
            break;
          }
        }
        visible ? dirs.add(Direction.WEST) : null;
        break;
      }
    }
  }

  return dirs;
}

function scenic(forest: Forest, tree: Position): Map<Direction, number> {
  const scores = new Map<Direction, number>();
  const height = forest[tree.y][tree.x];
  const [maxX, maxY] = [forest[0].length - 1, forest.length - 1];

  for (let d = 0; d < 4; d++) {
    const dir = Direction[d];
    switch (dir) {
      case 'NORTH': {
        if (tree.y <= 0) {
          scores.set(Direction.NORTH, 0);
          break;
        }
        let visible = true;
        for (let y = tree.y - 1; y >= 0; y--) {
          visible = height > forest[y][tree.x];
          if (!visible || y <= 0) {
            scores.set(Direction.NORTH, tree.y - y);
            break;
          }
        }
        break;
      }
      case 'EAST': {
        if (tree.x >= maxX) {
          scores.set(Direction.EAST, 0);
          break;
        }
        let visible = true;
        for (let x = tree.x + 1; x <= maxX; x++) {
          visible = height > forest[tree.y][x];
          if (!visible || x >= maxX) {
            scores.set(Direction.EAST, x - tree.x);
            break;
          }
        }
        break;
      }
      case 'SOUTH': {
        if (tree.y >= maxY) {
          scores.set(Direction.SOUTH, 0);
          break;
        }
        let visible = true;
        for (let y = tree.y + 1; y < forest.length; y++) {
          visible = height > forest[y][tree.x];
          if (!visible || y >= maxY) {
            scores.set(Direction.SOUTH, y - tree.y);
            break;
          }
        }
        break;
      }
      case 'WEST': {
        if (tree.x <= 0) {
          scores.set(Direction.WEST, 0);
          break;
        }
        let visible = true;
        for (let x = tree.x - 1; x >= 0; x--) {
          visible = height > forest[tree.y][x];
          if (!visible || x <= 0) {
            scores.set(Direction.WEST, tree.x - x);
            break;
          }
        }
        break;
      }
    }
  }

  return scores;
}

export default solutions;
