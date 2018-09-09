#!/usr/bin/env node
console.log('****** API MOCK CLI ******');

const shell = require('shelljs');
const commander = require('./build/option.js');
const config = require('../config');

console.log('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 参数 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓');
//console.log('commander:', commander);
//console.log('process.argv:', process.argv);
console.log('PROJ:', config.PROJ);
console.log('ROOT:', config.ROOT);
console.log('↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 参数 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑');

let params = '';
// $ ap-cli -a [des]
if (commander.api) {
  params += ` --api ${commander.api}`;
  console.log('api:', commander.api);
}

// $ ap-cli -m [path]
if (commander.mock) {
  params += ` --mock ${commander.mock}`;
  console.log('mock:', commander.mock);
}

// $ ap-cli -p [port]
if (commander.port) {
  params += ` --port ${commander.port}`;
  console.log('port:', commander.port);
}


// const argv = process.argv.splice(2, process.argv.length - 1);
// console.log(`node ${config.ROOT}server ${argv.join(' ')}`);
// finally exec
console.log(`node ${config.ROOT}server${params}`);
shell.exec(`node ${config.ROOT}server${params}`);

