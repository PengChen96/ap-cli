#!/usr/bin/env node
console.log('****** API MOCK CLI ******');

const shell = require('shelljs');
const commander = require('./build/option.js');
const config = require('../config');

console.log('↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 参数 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓');
console.log('commander:', commander);
console.log('process.argv:', process.argv);
console.log('PROJ:', config.PROJ);
console.log('↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 参数 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑');
// commander.version('1.0.0')
//   .option('-a, --api [des]', 'api mock cli')
//   .option('-m, --mock [path]', 'mock api')
//   .option('-p, --port [port]', 'set port')

// commander
//   .command('init <project>')
//   .description('init project')
//   .action((projectName) => {
//     console.log(`init ${projectName}`);
//   });

// commander.parse(process.argv);

// $ ap-cli -a [des]
if (commander.api) {
  console.log('ap-cli:', commander.api);
}

// $ ap-cli -m [path]
if (commander.mock) {
  console.log('ap-cli:', commander.mock);
}

// $ ap-cli -p [port]
if (commander.port) {
  const argv = process.argv.splice(2, process.argv.length - 1);
  console.log(`node ${config.PROJ} ${argv.join(' ')}`);
  shell.exec(`node ${config.PROJ} ${argv.join(' ')}`);
  // shell.exec('npm run dev1 -- --port 3001');
  // shell.exec(`node ${config.PROJ} --port ${commander.port}`);
}