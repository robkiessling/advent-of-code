import {readFile} from "../../utils.js";

function sumPartNumbers(input) {
  const char2dArray = input.split('\n').map(str => str.split(''));
  const validParts = [];

  iterateParts(char2dArray, (partString, rowIndex, colIndex) => {
    if (isValidPart(char2dArray, partString, rowIndex, colIndex)) {
      validParts.push(parseInt(partString));
    }
  });

  return validParts.reduce((sum, part) => sum + part, 0);
}

export function iterateParts(char2dArray, callback) {
  char2dArray.forEach((row, rowIndex) => {
    for (let anchor = 0; anchor < row.length; anchor++) {
      if (!isNumber(row[anchor])) { continue; }

      for (let runner = anchor; runner < row.length; runner++) {
        if (isNumber(row[runner + 1])) { continue; }

        const partString = char2dArray[rowIndex].slice(anchor, runner + 1).join(''); // E.g. "467"
        callback(partString, rowIndex, anchor); // Pass the part-number as a string, and the row/col of the part's first char

        anchor = runner;
        break;
      }
    }
  });
}

// Returns true if any space adjacent to the partString (which starts at the given rowIndex/colIndex) is a symbol.
function isValidPart(char2dArray, partString, rowIndex, colIndex) {
  for (let adjRow = rowIndex - 1; adjRow <= rowIndex + 1; adjRow++) {
    for (let adjCol = colIndex - 1; adjCol <= colIndex + partString.length; adjCol++) {
      // Note: Need to check if char2dArray[adjRow] is defined since the row may be outside of char2dArray bounds
      if (char2dArray[adjRow] && isSymbol(char2dArray[adjRow][adjCol])) {
        return true;
      }
    }
  }
  return false;
}

function isNumber(char) {
  return char && /\d/.test(char);
}

function isSymbol(char) {
  return char && /[^\d.]/.test(char); // We consider a symbol to be any char that is not a digit or a .
}

console.log(sumPartNumbers(readFile('./example.txt'))) // expected: 4361
console.log(sumPartNumbers(readFile('./puzzle.txt'))) // expected: 529618