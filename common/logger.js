/* 2018/10/02 created by pc */
/* global require */
/* global module */

const config = require('../config');
const cfs = require('./cfs');
const utils = require('./utils');
const COLOR = require('./color');

/*
 * 生成log.text
 * @param level 级别
 * @param text 日志文本
 * @param tips 描述提示
 * @param fileName 文件名
 */
const appendLogText = (level, text, tips = '', fileName = 'log.txt') => {
  // 获取当前系统时间
  const currentTime = utils.getCurrentTime();
  // 文件路径
  const filePath = `${ config.PROJ }/${ fileName }`;
  // 文本内容
  let content = `${ level }--${ currentTime }\n`;
  content += `----${ text }--${ tips }\n\n`;
  // 写入文件（追加方式）
  cfs.appendFile(filePath, content);
};
/*
 * 生成日志
 * @param text 日志文本
 * @param tips 描述提示
 */
const TRACE = (text, tips = '描述无') => {
  console.log(COLOR.white, text);
  appendLogText('TRACE', text, tips);
};

const DEBUG = (text, tips = '描述无') => {
  console.log(COLOR.magenta, text);
  appendLogText('DEBUG', text, tips);
};

const INFO = (text, tips = '描述无') => {
  console.log(COLOR.cyan, text);
  appendLogText('INFO', text, tips);
};

const WARN = (text, tips = '描述无') => {
  console.log(COLOR.yellow, text);
  appendLogText('WARN', text, tips);
};

const ERROR = (text, tips = '描述无') => {
  console.log(COLOR.red, text);
  appendLogText('ERROR', text, tips);
};

const SUCCESS = (text, tips = '描述无') => {
  console.log(COLOR.green, text);
  appendLogText('SUCCESS', text, tips);
};

module.exports = {
  TRACE,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  SUCCESS,
};
