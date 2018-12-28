/* global require */
/* global module */
/* global process */
const program = require('commander');
const package = require('../../package');
const cInquirer = require('./c_inquirer');

/* eslint-disable import/no-dynamic-require */
// const packages = require(path.resolve(PROJ, 'package.json'));
// const packages = require('../../package.json');

program.version(package.version)
  .allowUnknownOption(true)
  .option('-v, --version', 'output the version number')
  .option('-a, --api [des]', 'api mock cli')
  .option('-m, --mock [file]', 'Mock interface service')
  .option('-r, --regexp [regexp]', 'Using regular matching file names')
  .option('-s, --swagger [file]', 'Generate the json template file through swagger')
  .option('-p, --port [port]', 'Set port');

program
  .command('init <template>')
  .description('init template')
  .action((template) => {
    console.log(`init template`);
    cInquirer.initTpl(template);
  });

program.parse(process.argv);

module.exports = program;
