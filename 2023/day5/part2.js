import {readFile} from "../../utils.js";
import {parseInput} from "./part1.js";

function findLowestLocation(input) {
  const { seeds, gardenMaps } = parseInput(input)

  // Since every other seed is actually a range, we convert our seed data
  const validRanges = [];
  for (let i = 0; i < seeds.length; i += 2) {
    validRanges.push([seeds[i], seeds[i] + seeds[i + 1]]);
  }

  let currentLocation = 0;
  while (true) {
    // To find the seed value we start with our currentLocation and pass it backwards through every GardenMap
    let seed = currentLocation;
    for (let i = gardenMaps.length - 1; i >= 0; i--) {
      seed = gardenMaps[i].revert(seed);
    }

    // If the seed falls within one of our validRanges, then our currentLocation is valid
    if (validRanges.some(range => seed >= range[0] && seed < range[1])) {
      break;
    }

    // Else try the next location
    currentLocation++;
  }

  return currentLocation;
}

console.log(findLowestLocation(readFile('./example.txt'))) // expected: 46
console.log(findLowestLocation(readFile('./puzzle.txt'))) // expected: 37806486
