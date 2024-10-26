import {readFile, sumArray} from "../../utils.js";

const REPLACEMENTS = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
}

/**
 * Using a zero-width assertion to test regex without consuming as we go. For example, for the string 'oneight', when
 * we match the 'one' we don't want to consume it, otherwise we lose the 'e' in 'eight'.
 *
 * Source: https://stackoverflow.com/a/33903830
 */
const REGEX = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

function getCalibrationValue(input) {
  const calibrationValues = input.split('\n').map(row => {
    const digits = Array.from(row.matchAll(REGEX), x => x[1])
    return parseInt(convertDigit(digits[0]) + convertDigit(digits[digits.length - 1]));
  })

  return sumArray(calibrationValues);
}

function convertDigit(str) {
  return REPLACEMENTS[str] || str;
}

console.log(getCalibrationValue(readFile('./example2.txt'))) // expected: 281
console.log(getCalibrationValue(readFile('./puzzle.txt'))) // expected: 54473