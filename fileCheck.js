#!/usr/bin/env node
const fs = require('fs');
let testDir = 'testFiles/';


if(process.argv.length < 3) {
    console.error('Check your parameters\nUsage: ./fileCheck <FILE_TO_CHECK>\n');
    process.exit(1);
}

console.log('File name: ', process.argv[2]);
let fileName = testDir + process.argv[2];

if (!fs.existsSync(fileName)) {
    console.error('File not found');
    process.exit(1);
}
 
const content = fs.readFileSync(fileName, 'utf8');
const lines = content.split(/\r?\n/);
// console.log(lines);

// console.log('Linelines.length);
// lines.forEach((line) => {
for(let line = 0; line < lines.length; line++) {
    for (var i = 0; i < lines[line].length; i++) {
        // console.log(lines[line]);
        if(lines[line].charAt(i) === '{') console.log('open on line', line);
        if(lines[line].charAt(i) === '}') console.log('close on line', line);
      }
    // lines[line].charAt(line) (character) => {
    //     if(character === '{') console.log('open on line', line);
    //     if(character === '}') console.log('close on line', line);
    // });
};
// console.log(contents);
