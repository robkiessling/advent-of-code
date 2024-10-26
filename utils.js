import fs from 'fs';


export function sumArray(arr) {
  return arr.reduce((acc, currentValue) => acc + currentValue, 0);
}

export function readFile(filename) {
  return fs.readFileSync(filename, 'utf8').trim()
}