<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
  * [Installation](#installation)
* [Usage](#usage)



<!-- ABOUT THE PROJECT -->
## About The Project


### Content
In the main directory you can find 2 programs:
- fileCheck.js
- useDictionary.js

In addition to this, there is a dictionary file that is being used by the useDictionary program.

#### fileCheck.js
It checks a file for a balanced use of opening and closing curly brackets and informs the user if and where an unmatched opening or closing curly bracket were used (line number & position). 

#### useDictionary.js
A program that uses a dictionary to replace variables in a textfile. The result is written into an output file: <INPUT_FILE>_result

<!-- GETTING STARTED -->
## Getting Started


### Installation

1. Clone the repo
```sh
git clone https://github.com/ctschacher/fileCheck.git
```



<!-- USAGE EXAMPLES -->
## Usage
### 1. Run the fileCheck test
```sh
./fileCheck.js testFiles/2CloseMissing_NoReplacement
```
#### Result:
```sh
$ ./fileCheck.js testFiles/2CloseMissing_NoReplacement
Error: Found 2 open curly brackets that have no counterparts
on line 1, pos: 56
on line 2, pos: 51
```

### 2. useDictionary test
#### Content of input file:
The input file contains several placeholders with pattern: { .XXXXXXX } where every 'X' is either a letter or a number. The 'XXXXXXX' string is then used a the variable name that is looked up in the dictionary.

```sh
This is a { .item }:
Look at { .name }! He will eat { .number } { .fruit }s and all of them are { .color }.

A variable that is not defined in the dictionary: { .unknownVar }
Not a variable: { asdfa }
```

#### Content of dictionary:
The dictionary is a key/value store where key and value are seperated by a '='.
The content of my dictionary file looks a bit messy on purpose to show that it can handle different styles.

```
color=red
 fruit =apple

	number  =42 
name=  Tim
item =
test
empty =
```


#### Run the dictionary test
```sh
./useDictionary.js testFiles/dictionaryTest
```

#### Result:
```sh
This is a test:
Look at Tim! He will eat 42 apples and all of them are red.

A variable that is not defined in the dictionary: undefined
Not a variable: { asdfa }
```

