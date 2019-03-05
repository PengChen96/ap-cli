#!/usr/bin/env node

/* global require */

const shell = require('shelljs');
const config = require('../config');
const Logger = require('../common/logger');
const path = require('path');
//
// Logger.SUCCESS(`
//              _______
//             /@@@@@@@\\           @@@@@                 @@@@@   @@@@      ;;;;
//            /@@@@_@@@@\\          @@@@@@@             @@@@@@@   @@@@      ;;;;
//           /@@@@/ \\@@@@\\        @@@  @@@           @@@@@@@    @@@@      @@@@
//          /@@@@/   \\@@@@\\       @@@   @@@  @@@@@  @@@@@@      @@@@      @@@@
//         /@@@@/_____\\@@@@\\      @@@   @@@  @@@@@ @@@@@        @@@@      @@@@
//        /@@@@@@@@@@@@@@@@@\\      @@@  @@@         @@@@@        @@@@      @@@@
//       /@@@@/—————————\\@@@@\\    @@@@@@'          @@@@@        @@@@      @@@@
//      /@@@@/           \\@@@@\\   @@@@              @@@@@@      @@@@      @@@@
//     /@@@@/             \\@@@@\\  @@@@               @@@@@@@@   @@@@@@@@  @@@@
//    /____/               \\____\\ @@@@                 @@@@@@   @@@@@@@@  @@@@
// `);
Logger.SUCCESS('****** MOCK REST API SERVER CLI ******');
Logger.INFO('------------------------------------------↓↓↓');
Logger.INFO(`PROJ（当前目录）: ${ config.PROJ } `);
Logger.INFO(`ROOT（项目目录）: ${ config.ROOT } `);
Logger.INFO('------------------------------------------↑↑↑');


const commander = require('./build/option.js');

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
 * $ ap-cli -s [swagger]
 * 指定swagger文件生成json模板文件
 */
if (commander.swagger) {
  params += ` --swagger ${commander.swagger}`;
  Logger.INFO(`swagger: ${ commander.swagger }`);
}


// const argv = process.argv.splice(2, process.argv.length - 1);
// console.log(`node ${config.ROOT}server ${argv.join(' ')}`);
// finally exec
if (params && params !== '') {
  const filePath = path.join(config.ROOT, "server");
  console.log(filePath, '===');
  Logger.SUCCESS(`node "${filePath}"${params}`);
  shell.exec(`node "${filePath}"${params}`);
}

