import {readFile, sumArray} from "../../utils.js";

function getCalibrationValue(input) {
  const calibrationValues = input.split('\n').map(row => {
    const digits = row.match(/\d/g)
    return parseInt(digits[0] + digits[digits.length - 1]); // note: this is a string concatenation
  })

  return sumArray(calibrationValues);
}

console.log(getCalibrationValue(readFile('./example.txt'))) // expected: 142
console.log(getCalibrationValue(readFile('./puzzle.txt'))) // expected: 54990