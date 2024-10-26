import {readFile} from "../../utils.js";

const CARD_PRIORITY = 'AKQJT98765432';

function getTotalWinnings(input) {
  const rows = input.split('\n').map(line => {
    let [hand, bid] = line.split(' ');
    bid = parseInt(bid);
    return { hand, bid }
  });

  // Sort hands from worst to best. Then multiply the hand's bid by its index+1 (since rank is 1-based)
  return rows.sort(sortRows)
    .reduce((acc, row, i) => acc + row.bid * (i + 1), 0)
}

function sortRows(rowA, rowB) {
  // Sort by type if possible
  const rowAType = getHandType(rowA.hand);
  const rowBType = getHandType(rowB.hand);
  if (rowAType !== rowBType) {
    return rowBType - rowAType; // Descending order (higher hand type = worse)
  }

  // If types were equal, sort by highest card instead
  for (let i = 0; i < rowA.hand.length; i++) {
    let cardAValue = CARD_PRIORITY.indexOf(rowA.hand[i]);
    let cardBValue = CARD_PRIORITY.indexOf(rowB.hand[i]);
    if (cardAValue !== cardBValue) {
      return cardBValue - cardAValue // Descending order (higher card value = worse)
    }
  }

  return 0;
}

// Returns a number for the hand type. A lower number is considered a better hand; it will be ranked higher.
function getHandType(hand) {
  // Count the number of each card
  // E.g. AA7JJ => { A: 2, 7: 1, J: 2 }
  const cardCounts = {};
  hand.split('').forEach(card => {
    if (cardCounts[card] === undefined) { cardCounts[card] = 0 }
    cardCounts[card] += 1
  });

  // Count the number of pairs, triples, etc.
  // E.g. { A: 2, 7: 1, J: 2 } => { 2: 2, 1: 1 }   (number of pairs: 2, number of singles: 1)
  const groupCounts = {};
  Object.values(cardCounts).forEach(numType => {
    if (groupCounts[numType] === undefined) { groupCounts[numType] = 0 }
    groupCounts[numType] += 1
  })

  if (groupCounts['5'] === 1) { return 1; } // five of a kind
  else if (groupCounts['4'] === 1) { return 2; } // four of a kind
  else if (groupCounts['3'] === 1 && groupCounts['2'] === 1) { return 3; } // full house
  else if (groupCounts['3'] === 1) { return 4; } // 3 of a kind
  else if (groupCounts['2'] === 2) { return 5; } // 2 pair
  else if (groupCounts['2'] === 1) { return 6; } // 1 pair
  else { return 7 } // high card
}

console.log(getTotalWinnings(readFile('./example.txt'))); // expected: 6440
console.log(getTotalWinnings(readFile('./puzzle.txt'))); // expected: 248453531
