#!/usr/bin/env node
const fs = require('fs');

function fileCheck(args) { 
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
    let regex = new RegExp('{ .abc }', 'g');
    let count = (content.match(regex)|| []).length;
    // let alteredText = content.replace(/{ .(abc|test123) }/g, "#!#").replace(/{ .[A-Za-z0-9]+ }/g, "!#!");
    let alteredText = content.replace(/{ \.[A-Za-z0-9]+ }/g, "#!#").replace(/{ \.[^ ]+ }/g, '!#!');

    if(count == 0) console.log("There's no occurrence of the string '{ .abc }'")
    else console.log(`This file contains ${count} times the string '{ .abc }'`);

    if(content !== alteredText) {  // if change (replacement) occurred write it to file
        try {
                fs.writeFileSync(file + '_altered', alteredText, 'utf8');
                console.log('Created new file:', file + '_altered');
        } catch(err) {
                console.error(err);
        }
    } else console.log('Nothing to replace')
    
    const lines = alteredText.split(/\r?\n/);
    let stack = [];
    
    for(let line = 0; line < lines.length; line++) {
        for (var i = 0; i < lines[line].length; i++) {
            if(lines[line].charAt(i) === '{') {
                stack.push(['open', line + 1, i+1]);
            } else if(lines[line].charAt(i) === '}') {
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