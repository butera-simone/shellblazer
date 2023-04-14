# shellblazer

A Node.js module for executing shell commands with less boilerplate.

## Installation
To install the module, run the following command in your terminal:
```bash
npm i shellblazer
```

## Usage

The module will provide you with a function. 
Just pass the commands as arrays of strings.

```javascript
let sh = require('shellblazer')

sh(['mkdir', 'foo'])
```

The commands are executed with spawnSync() with {shell: false}, so you cannot pipe output from one command to another.


You can change directory by passing a cwd option to the .configure() method. The method will return a new shellblazer function, that will have the required working directory set:

```javascript
sh = sh.configure({ cwd: './foo' })
sh(['touch', 'a.txt'])
//this will create the file a.txt inside the foo directory
```

Shellblazer can execute commands in sequence with a single function call, by taking any number of arrays as arguments

```javascript
let sh = require ('./index')

sh(['mkdir', 'alpha'], ['mkdir', 'beta'])
```