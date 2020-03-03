#!/usr/bin/env node
const fs = require('fs');

function fileCheck(args) { 
    let testDir = 'testFiles/';

    if(args.length !== 3) {
        console.error('Check your parameters\nUsage: ./fileCheck <FILE_TO_CHECK>\n');
        process.exit(1);
    }

    let file = args[2];
    
    if (!fs.existsSync(file)) {
        console.error('File not found: ', file);
        process.exit(1);
    }
    const content = fs.readFileSync(file, 'utf8');

    
    let searchString = '{ .abc }';
    let regex = new RegExp(searchString, 'g');
    let count = (content.match(regex)|| []).length;


    if(count == 0) console.log("There's no occurrence of the string '{ .abc }'")
    else {
        console.log(`This file contains ${count} times the string '{ .abc }', will replace it by '#!#'`);
        try {
            fs.writeFileSync(file, content.replace(/{ .abc }/g, "#!#"), 'utf8');
            console.log('File updated successfully')
          } catch(err) {
            console.error(err);
          }
    }


    const lines = content.split(/\r?\n/);
    let stack = [];
    
    for(let line = 0; line < lines.length; line++) {

        for (var i = 0; i < lines[line].length; i++) {
    
            if(lines[line].charAt(i) === '{') {
                // console.log(`Found opening brackets on line ${line + 1} on position ${i + 1}`);
                stack.push(['open', line + 1, i+1]);
            }
            if(lines[line].charAt(i) === '}') {
                // console.log(`Found closing brackets on line ${line + 1} on position ${i + 1}`);
                (stack.length > 0) ? stack.pop() : stack.push(['close', line+1, i+1]);
            }
          }
    };
    return stack;
    
}

exports.fileCheck = fileCheck;
let result = fileCheck(process.argv);
if(result.length == 0) console.log('No error found')
else {
    console.log(`Error: Found ${result.length} ${result[0][0]} curly brackets that have no counterparts`);
    result.forEach((entry) => console.log(`on line ${entry[1]}, pos: ${entry[2]}`)) 
}


