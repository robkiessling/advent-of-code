import {readFile} from "../../utils.js";
import {iterateParts} from "./part1.js";

function getGearRatio(input) {
  const char2dArray = input.split('\n').map(str => str.split(''));

  /**
   * This will hold information for each gear about what parts are adjacent to it. It's structure will be:
   *
   * {
   *   '1,3': [467, 35], // represents the gear located at [row 1, col 3]
   *   '4,3': [617],
   *   ...
   * }
   */
  const gearLookup = {};

  iterateParts(char2dArray, (partString, rowIndex, colIndex) => {
    findAdjGears(char2dArray, partString, rowIndex, colIndex).forEach(gear => {
      if (gearLookup[gear] === undefined) { gearLookup[gear] = []; }
      gearLookup[gear].push(parseInt(partString));
    })
  });

  return Object.values(gearLookup)
    .filter(adjacentParts => adjacentParts.length === 2)
    .map(adjacentParts => adjacentParts[0] * adjacentParts[1])
    .reduce((sum, part) => sum + part, 0);
}

function findAdjGears(char2dArray, partString, rowIndex, colIndex) {
  const gears = [];
  for (let adjRow = rowIndex - 1; adjRow <= rowIndex + 1; adjRow++) {
    for (let adjCol = colIndex - 1; adjCol <= colIndex + partString.length; adjCol++) {
      if (char2dArray[adjRow] && char2dArray[adjRow][adjCol] === '*') {
        gears.push([adjRow, adjCol])
      }
    }
  }
  return gears;
}

console.log(getGearRatio(readFile('./example.txt'))) // expected: 467835
console.log(getGearRatio(readFile('./puzzle.txt'))) // expected: 77509019