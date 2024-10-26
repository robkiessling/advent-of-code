import {readFile} from "../../utils.js";

function findLowestLocation(input) {
  const { seeds, gardenMaps } = parseInput(input)

  // Pass each seed through the array of GardenMaps. Each GardenMap converts the seed to its next form, the final form
  // being its "location".
  const locations = seeds.map(seed => {
    return gardenMaps.reduce((value, gardenMap) => gardenMap.convert(value), seed);
  })

  return Math.min(...locations);
}

export function parseInput(input) {
  const lines = input.split('\n');

  // Pull seed data from first row:
  const seeds = lines.shift(0).match(/seeds: (.*)/)[1].split(' ').map(str => parseInt(str));

  // Build a GardenMap for each map section:
  const gardenMaps = [];
  lines.forEach(line => {
    if (!line) { return; }

    if (/.*map:/.test(line)) {
      // Start a new GardenMap
      gardenMaps.push(new GardenMap());
    }
    else {
      // Add range data to the current (latest) GardenMap
      const [destStart, sourceStart, rangeLength] = line.split(' ').map(str => parseInt(str));
      gardenMaps[gardenMaps.length - 1].addRange(destStart, sourceStart, rangeLength)
    }
  });

  return {
    seeds: seeds,
    gardenMaps: gardenMaps
  }
}

/**
 * GardenMap is a small class that holds all the ranges for a given map, and can convert numbers according to its
 * stored ranges.
 *
 * E.g. the following would be stored in one GardenMap:
 *
 *   seed-to-soil map:
 *   50 98 2            // this will be range #1
 *   52 50 48           // this will be range #2
 *
 * For this GardenMap, calling `convert(99)` would return 51. Calling `convert(55)` would return 57.
 */
export class GardenMap {
  constructor() {
    this.ranges = [];
  }

  addRange(destStart, sourceStart, rangeLength) {
    this.ranges.push({
      destStart: destStart,
      sourceStart: sourceStart,
      rangeLength: rangeLength,
    })
  }

  convert(num) {
    // check if the num matches any stored ranges
    for (let i = 0; i < this.ranges.length; i++) {
      const range = this.ranges[i];
      if (num >= range.sourceStart && num < (range.sourceStart + range.rangeLength)) {
        return range.destStart + num - range.sourceStart;
      }
    }

    // else return num as-is
    return num;
  }

  // Note: This is for part 2
  revert(num) {
    // check if the num matches any stored ranges (in reverse; so we're using the destination as the input)
    for (let i = 0; i < this.ranges.length; i++) {
      const range = this.ranges[i];
      if (num >= range.destStart && num < range.destStart + range.rangeLength) {
        return range.sourceStart + num - range.destStart;
      }
    }

    // else return num as-is
    return num;
  }
}

console.log(findLowestLocation(readFile('./example.txt'))) // expected: 35
console.log(findLowestLocation(readFile('./puzzle.txt'))) // expected: 1181555926
