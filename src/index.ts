import * as dotenv from 'dotenv';
dotenv.config();
import {filePathForJS, fileToArray} from './solutions/scripts/fileToArray';
import allSolutions from './solutions/allSolutions';
import * as fs from 'fs';
import path = require('node:path');
import fetch from 'cross-fetch';
import {env} from 'process';

const YEAR = '2022';
const DAY = 14;
const AOC_INPUT_URI = `https://adventofcode.com/${YEAR}/day/${DAY}/input`;
const EXAMPLE_FILE_NAME = `src/solutions/${YEAR}/day${DAY}/example.txt`;
const INPUT_FILE_NAME = `src/solutions/${YEAR}/day${DAY}/input.txt`;
const AOC_SESSION = env.AOC_SESSION || '';
let currentFile;

try {
  currentFile = fs.readFileSync(
    path.resolve(filePathForJS(INPUT_FILE_NAME)),
    'utf8'
  );
} catch (e) {
  console.log("Couldn't read file, touching", INPUT_FILE_NAME);
  fs.writeFile(INPUT_FILE_NAME, '', a => {
    if (a !== null) {
      throw a;
    }
  });
}

(async () => {
  if (!currentFile) {
    console.log('Input file empty!');
    console.log(
      'Fetching data for year',
      YEAR,
      'day',
      DAY,
      'from',
      AOC_INPUT_URI
    );
    const result = await fetch(AOC_INPUT_URI, {
      headers: {
        cookie: `session=${AOC_SESSION}`,
      },
    });
    if (result.status === 200) {
      const content = await result.text();
      if (content) {
        fs.writeFile(INPUT_FILE_NAME, content, a => {
          if (a !== null) {
            throw a;
          }
        });
      }
    }
    if (result.status === 404) {
      console.log(`404 returned, day ${DAY} not started?`);
    }
  }

  const inputAsLines = fileToArray(INPUT_FILE_NAME);
  if (inputAsLines.at(-1) === '') {
    inputAsLines.pop();
  }
  const exampleAsLines = fileToArray(EXAMPLE_FILE_NAME);
  const exampleEmpty = exampleAsLines[0].length < 1;
  console.log('Start day', DAY);
  if (inputAsLines[0]?.length < 1) {
    console.log('File empty, exiting');
    return;
  }

  allSolutions
    .get(YEAR)
    ?.at(DAY - 1)
    ?.default.forEach((f, i) => {
      const before = performance.now();
      const result = f(inputAsLines);
      const after = performance.now();

      const exampleBefore = performance.now();
      const exampleResult = exampleEmpty
        ? 'Example file empty'
        : f(exampleAsLines);
      const exampleAfter = performance.now();

      console.log('Solution', (i + 1).toString());
      console.log(
        'Example result:',
        exampleResult || '',
        `(${(exampleAfter - exampleBefore).toFixed(3)}ms)`
      );
      console.log(
        'Result:',
        result || '',
        `(${(after - before).toFixed(3)}ms)`
      );
      console.log();
    });
})();
