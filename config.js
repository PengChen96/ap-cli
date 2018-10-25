
// 当前启动所在目录
const PROJ = process.cwd();

// 项目的根目录
const path = require('path');
const ROOT = path.join(__dirname, './');

// 读取文件的白名单
const FILE_WHITE_LIST = ['js', 'json'];

module.exports = {
  PROJ,
  ROOT,
  FILE_WHITE_LIST
};