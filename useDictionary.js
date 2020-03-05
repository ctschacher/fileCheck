#!/usr/bin/env node
/**
 * This program uses a dictionary (see dictionary file in main folder) to 
 * replace placeholders by the values defined in the dictionary
 * 
 * As input file you can use testFiles/dictionaryTest
 */

const fs = require('fs');

/**
 * Load file and return its content as string
 * @param {String} file The file which is to be loaded
 * @returns Returns the content of a file as a string
 */
function loadFile(file) {
    if(fs.existsSync(file)) {
        return fs.readFileSync(file, 'utf8');  
    } else {
        console.error('File not found: ', file);
        process.exit(1);
    };
}

/**
 * Function which read a dictionary file and return its content as an object
 * @param {String} dict  Name of the dictionary to load
 * @returns Returns an object that contains all found key/value pairs
 */
function loadDictionary(dict) {
    let dictionaryObj = {};
    const content = loadFile(dict);
    const regex = /(\w+)\s*=\s*(\w+)/g;
    let matches;

    while ((matches = regex.exec(content)) !== null) {
            dictionaryObj[matches[1]] = matches[2];   // adds key/value to dictionary object
    }

    return dictionaryObj;
}

// ---- main ----
let dictionary = 'dictionary';

// check if input file was provided
if(process.argv.length !== 3) {
    console.error('Check your parameters\nUsage: ./useDictionary <INPUT_FILE>\n');
    process.exit(1);
}

let inputFile = process.argv[2];
let inputFileContent = loadFile(inputFile);
let dictObj = loadDictionary(dictionary);
let alteredText = inputFileContent.replace(/{ \.([A-Za-z0-9]+) }/g, function(_, variable){
    return dictObj[variable];
});

if(inputFileContent !== alteredText) {  // if change (replacement) occurred write it to file
    try {
            fs.writeFileSync(inputFile + '_result', alteredText, 'utf8');
            console.log('Created new file:', inputFile + '_result');
    } catch(err) {
            console.error(err);
    }
}




