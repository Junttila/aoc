const solutions: Array<(lines: string[]) => string | number> = [
  // Solution part 1
  (lines: string[]) => {
    const bps = lines.map(
      (v) =>
        ({
          c1: v.substring(0, v.length / 2).split(''),
          c2: v.substring(v.length / 2, v.length).split(''),
        } as Backpack),
    );
    // console.log(bps[0]);
    // console.log(commonItem(bps[0]));

    return bps
      .map((v, i) => {
        if (!commonItem(v)) {
          console.log('no common item in backpack number', i, v);
        }
        return itemPriority(commonItem(v));
      })
      .reduce((a, v) => a + v, 0);
  },
  // Solution part 2
  (lines: string[]) => {
    const bps: Backpack2[] = [];
    let temp: string[] = [];

    lines.forEach((v, i) => {
      temp.push(v);
      if (temp.length >= 3) {
        bps.push({
          c1: temp[2].split(''),
          c2: temp[1].split(''),
          c3: temp[0].split(''),
        });
        temp = [];
      }
    });

    return bps
      .map((v, i) => {
        if (!commonItem2(v)) {
          console.log('no common item in backpack number', i, v);
        }
        return itemPriority(commonItem2(v));
      })
      .reduce((a, v) => a + v, 0);
  },
];

interface Backpack {
  c1: string[];
  c2: string[];
}
interface Backpack2 {
  c1: string[];
  c2: string[];
  c3: string[];
}

function commonItem(bp: Backpack): string {
  const itemSet = new Set<string>(bp.c1);
  let common: string = '';
  bp.c2.forEach((v) => {
    if (itemSet.has(v)) {
      common = v;
    }
  });
  return common;
}

function commonItem2(bp: Backpack2): string {
  const itemSet = new Set<string>(bp.c1);
  const itemSet2 = new Set<string>(bp.c3);
  let common: string = '';
  bp.c2.forEach((v) => {
    if (itemSet.has(v) && itemSet2.has(v)) {
      common = v;
    }
  });
  return common;
}

function itemPriority(c: string): number {
  const code = c.charCodeAt(0);
  if (code <= 91) {
    return code - 64 + 26;
  }
  return code - 96;
}

export default solutions;
