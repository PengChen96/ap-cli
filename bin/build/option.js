/* global require */
/* global module */
/* global process */

const program = require('commander');
// const path = require('path');

/* eslint-disable import/no-dynamic-require */
// const packages = require(path.resolve(PROJ, 'package.json'));
// const packages = require('../../package.json');

program.version('packages.version1.0.0')
  .allowUnknownOption(true)
  .option('-a, --api [des]', 'api mock cli')
  .option('-r, --regexp [regexp]', 'Using regular matching file names')
  .option('-m, --mock [path]', 'mock api')
  .option('-s, --swagger [file]', 'mock api by swagger file')
  .option('-p, --port [port]', 'set port');

program
  .command('init <project>')
  .description('init project')
  .action((projectName) => {
    console.log(`init ${ projectName }`);
  });

program.parse(process.argv);

module.exports = program;
