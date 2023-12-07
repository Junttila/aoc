import {Solution} from '../../../types';

const solutions: Array<Solution> = [
  // Solution part 1
  (lines: string[]) => {
    const bids: Bid[] = lines.map(l => {
      const [hand, value] = l.trim().split(' ');
      return {
        bid: Number(value),
        hand,
      };
    });
    const ranking = bids.sort((a, b) => handCompare(b.hand, a.hand));
    return ranking.reduce((acc, b, i) => acc + b.bid * (i + 1), 0);
  },
  // Solution part 2
  (lines: string[]) => {
    const bids: Bid[] = lines.map(l => {
      const [hand, value] = l.trim().split(' ');
      return {
        bid: Number(value),
        hand,
      };
    });
    const ranking = bids.sort((a, b) => handCompare2(b.hand, a.hand));
    return ranking.reduce((acc, b, i) => acc + b.bid * (i + 1), 0);
  },
];

type Hand = string;

interface Bid {
  bid: number;
  hand: Hand;
}

function cardValue(card: string) {
  return Number(card) || {T: 10, J: 11, Q: 12, K: 13, A: 14}[card] || 0;
}

function cardValue2(card: string) {
  return Number(card) || {T: 10, J: 1, Q: 12, K: 13, A: 14}[card] || 0;
}

function handValue(hand: Hand) {
  const cardMap = hand.split('').reduce((acc, c) => {
    acc.set(c, (acc.get(c) || 0) + 1);
    return acc;
  }, new Map<string, number>());
  const maxValue = 6;
  const cardAmounts = new Set(cardMap.values());
  if ([...cardMap.keys()].length === 1) {
    return maxValue;
  }
  if (cardAmounts.has(4)) {
    return maxValue - 1;
  }
  if (cardAmounts.has(3)) {
    if (cardAmounts.has(2)) {
      return maxValue - 2;
    }
    return maxValue - 3;
  }
  if ([...cardMap.values()].filter(v => v === 2).length === 2) {
    return maxValue - 4;
  }
  if (cardAmounts.has(2)) {
    return maxValue - 5;
  }
  return 0;
}

function handValue2(hand: Hand) {
  const cardMap = hand.split('').reduce((acc, c) => {
    acc.set(c, (acc.get(c) || 0) + 1);
    return acc;
  }, new Map<string, number>());
  const jokers = cardMap.get('J') || 0;
  const cardMapNoJokers = new Map(cardMap);
  cardMapNoJokers.delete('J');
  const maxValue = 6;
  // const cardAmounts = new Set(cardMap.values());
  const cardAmountsNoJoker = new Set(cardMapNoJokers.values());

  if (!jokers) {
    return handValue(hand);
  }

  if (jokers >= 4) {
    return maxValue;
  }
  if (jokers >= 3) {
    if (cardAmountsNoJoker.has(2)) {
      return maxValue;
    }
    return maxValue - 1;
  }
  if (jokers >= 2) {
    if (cardAmountsNoJoker.has(3)) {
      return maxValue;
    }
    if (cardAmountsNoJoker.has(2)) {
      return maxValue - 1;
    }
    return maxValue - 3;
  }
  if (jokers >= 1) {
    if (cardAmountsNoJoker.has(4)) {
      return maxValue;
    }
    if (cardAmountsNoJoker.has(3)) {
      return maxValue - 1;
    }
    if ([...cardMapNoJokers.values()].filter(v => v === 2).length === 2) {
      return maxValue - 2;
    }
    if (cardAmountsNoJoker.has(2)) {
      return maxValue - 3;
    }
    return maxValue - 5;
  }
  return 0;
}

function handCompare(a: Hand, b: Hand) {
  return (
    handValue(b) - handValue(a) ||
    ((i: number) => cardValue(b[i]) - cardValue(a[i]))(
      a.split('').findIndex((c, i) => c !== b[i])
    )
  );
}

function handCompare2(a: Hand, b: Hand) {
  return (
    handValue2(b) - handValue2(a) ||
    ((i: number) => cardValue2(b[i]) - cardValue2(a[i]))(
      a.split('').findIndex((c, i) => c !== b[i])
    )
  );
}

export default solutions;
