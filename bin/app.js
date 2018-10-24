#!/usr/bin/env node

const shell = require('shelljs');
const commander = require('./build/option.js');
const config = require('../config');
const Logger = require('../common/logger');

// Logger.TRACE('****** API MOCK CLI ******');
// Logger.DEBUG('****** API MOCK CLI ******');
// Logger.INFO('****** API MOCK CLI ******');
// Logger.WARN('****** API MOCK CLI ******');
// Logger.ERROR('****** API MOCK CLI ******');
Logger.SUCCESS('****** API MOCK CLI ******');

Logger.INFO('------------------------------------------↓↓↓', 'app.js');
// console.log('commander:', commander);
// console.log('process.argv:', process.argv);
Logger.INFO(`PROJ（当前目录）: ${ config.PROJ } `);
Logger.INFO(`ROOT（项目目录）: ${ config.ROOT } `);

let params = '';
// $ ap-cli -a [des]
if (commander.api) {
  params += ` --api ${ commander.api }`;
  Logger.INFO(`api: ${ commander.api }`);
}

/* 
 * $ ap-cli -r [regexp]
 * 正则匹配当前目录要进行mock的文件
 */
if (commander.regexp) {
  params += ` --regexp ${ commander.regexp }`;
  Logger.INFO(`regexp: ${ commander.regexp }`);
}

/* 
 * $ ap-cli -m [path]
 * 指定当前目录要进行mock的文件
 */
if (commander.mock) {
  params += ` --mock ${ commander.mock }`;
  Logger.INFO(`mock: ${ commander.mock }`);
}

/* 
 * $ ap-cli -p [port]
 * 指定mock的api端口（默认3000）
 */
if (commander.port) {
  params += ` --port ${commander.port}`;
  Logger.INFO(`port: ${ commander.port }`);
}

/* 
 * $ ap-cli -sw [swagger]
 * 指定mock的swagger文件
 */
if (commander.swagger) {
  params += ` --swagger ${commander.swagger}`;
  Logger.INFO(`swagger: ${ commander.swagger }`);
}

Logger.INFO('------------------------------------------↑↑↑');

// const argv = process.argv.splice(2, process.argv.length - 1);
// console.log(`node ${config.ROOT}server ${argv.join(' ')}`);
// finally exec
Logger.SUCCESS(`node ${config.ROOT}server${params}`);
shell.exec(`node ${config.ROOT}server${params}`);

