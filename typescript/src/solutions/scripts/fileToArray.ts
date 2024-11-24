import * as fs from 'fs';
import path = require('node:path');

export function fileToArray(fileName: string) {
  const fileString = fs.readFileSync(
    path.resolve(filePathForJS(fileName)),
    'utf8'
  );
  return fileString.split('\n');
}

export function filePathForJS(path: string) {
  return `${path}`;
}
