/* 2018/10/02 created by pc */
/* global module */

/* 
 * 字符串 转 正则表达式
 * "/^t.*$/" or "^t.*$" => new RegExp
 */
const strToRegExp = (regStr) => {
  let regexp = '';
  const regParts = regStr.match(new RegExp('^/(.*?)/([gimy]*)$'));
  if (regParts) {
    regexp = new RegExp(regParts[1], regParts[2]);
  } else {
    regexp = new RegExp(regStr);
  }
  return regexp;
};

/*
 * 获取当前系统时间
 */
const getCurrentTime = () => {
  const myDate = new Date();
  const date = myDate.toLocaleDateString()
  const time = myDate.toLocaleTimeString();
  return `${ date } ${ time }`;
};

/*
 * 获取文件名后缀
 * @param fileName 文件名  example: "exam.js"
 */
const getFileNameSuffix = (fileName) => {
  let suffix = '';
  if (fileName) {
    suffix = fileName.split('.').reverse()[0];
  }
  return suffix;
};

module.exports = {
  strToRegExp,
  getCurrentTime,
  getFileNameSuffix
};