import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const root = createFileSystem(lines);
    const dSizes = new Map<string, number>();
    size(root, dSizes);
    return Array.from(dSizes.entries()).reduce(
      (a, v) => (v[1] <= 100000 ? a + v[1] : a),
      0
    );
  },
  // Solution part 2
  (lines: string[]) => {
    const root = createFileSystem(lines);
    const dSizes = new Map<string, number>();
    const rootSize = size(root, dSizes);
    const unused = 70000000 - rootSize;
    const toRemove = 30000000 - unused;

    return (
      Array.from(dSizes.entries())
        .filter(v => v[1] > toRemove)
        .sort((a, b) => b[1] - a[1])
        .at(-1)
        ?.at(1) || ''
    );
  },
];

interface Dir {
  name: string;
  parent: Dir | null;
  children: Dir[];
  files: File[];
}

interface File {
  name: string;
  size: number;
}

function createFileSystem(lines: string[]): Dir {
  const root: Dir = {name: '', parent: null, children: [], files: []};
  let currentDir: Dir = root;
  lines.forEach(l => {
    const symbols = l.split(' ');
    if (symbols.length === 3 && symbols[1] === 'cd') {
      if (symbols[2] === '..') {
        currentDir = currentDir.parent || currentDir;
      } else {
        currentDir =
          currentDir.children.find(d => d.name === symbols[2]) || currentDir;
      }
    } else if (symbols[0] !== '$' && symbols[0] !== 'dir') {
      const [size, name] = symbols;
      currentDir.files.push({size: Number(size), name});
    } else if (symbols[0] === 'dir') {
      currentDir.children.push({
        name: symbols[1],
        parent: currentDir,
        children: [],
        files: [],
      });
    }
  });
  return root;
}

function size(d: Dir, dSizes: Map<string, number>): number {
  const dSize = d.children.reduce((a, v) => a + size(v, dSizes), 0);
  const fSize = d.files.reduce((a, v) => a + v.size, 0);

  dSizes.set(fullPath(d), dSize + fSize);

  return dSize + fSize;
}

function fullPath(d: Dir): string {
  let path = '';
  let currentDir: Dir | null = d;

  while (currentDir) {
    path = currentDir.name + '/' + path;
    currentDir = currentDir.parent;
  }

  return path;
}

export default solutions;
