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

module.exports = {
  strToRegExp
};