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
 * 获取当前系统时间
 * @param s1 splice参数1
 * @param s2 splice参数2
 * @param sym 连接符
 */
const getCurrentDate = (s1 = 0, s2= 3, sym = '') => {
  const myDate = new Date();
  const Year = myDate.getFullYear();
  const Month = myDate.getMonth() + 1;
  const Day = myDate.getDate();
  const Hour = myDate.getHours();
  const Minute = myDate.getMinutes();
  const Second = myDate.getSeconds();
  const dateArr = [Year, Month, Day, Hour, Minute, Second];
  const date = dateArr.splice(s1, s2).join(sym);
  return date;
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

// 格式化json数据
const formatJson = (json) => {
  let formatted = '';     //转换后的json字符串
  let padIdx = 0;       //换行后是否增减PADDING的标识
  let PADDING = '    ';   //4个空格符
  /**
   * 将对象转化为string
   */
  if (typeof json !== 'string') {
    json = JSON.stringify(json);
  }
  /**
   *利用正则类似将{'name':'ccy','age':18,'info':['address':'wuhan','interest':'playCards']}
   *---> \r\n{\r\n'name':'ccy',\r\n'age':18,\r\n
         *'info':\r\n[\r\n'address':'wuhan',\r\n'interest':'playCards'\r\n]\r\n}\r\n
   */
  json = json.replace(/([\{\}])/g, '\r\n$1\r\n')
    .replace(/([\[\]])/g, '\r\n$1\r\n')
    .replace(/(\,)/g, '$1\r\n')
    .replace(/(\r\n\r\n)/g, '\r\n')
    .replace(/\r\n\,/g, ',');
  /**
   * 根据split生成数据进行遍历，一行行判断是否增减PADDING
   */
  (json.split('\r\n')).forEach((node, index) => {
    let indent = 0;
    let padding = '';
    if (node.match(/\{$/) || node.match(/\[$/)) {
      indent = 1;
    }
    else if (node.match(/\}/) || node.match(/\]/)) {
      padIdx = padIdx !== 0 ? --padIdx : padIdx;
    }
    else {
      indent = 0;
    }
    for (let i = 0; i < padIdx; i++) {
      padding += PADDING;
    }
    formatted += padding + node + '\r\n';
    padIdx += indent;
    // console.log('index:'+index+',indent:'+indent+',padIdx:'+padIdx+',node-->'+node);
  });
  return formatted;
};

module.exports = {
  strToRegExp,
  formatJson,
  getCurrentTime,
  getCurrentDate,
  getFileNameSuffix,
};