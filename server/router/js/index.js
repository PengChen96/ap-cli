/* global require */
/* global module */

const Logger = require('../../../common/logger');
const Markdown = require('../../../common/createMarkdown');
const Route = require('../route');
const config = require('../../../config');
const { PROJ } = config;

/**
 * 通过引入JS 初始化路由
 * @param fileName 文件名  example: exam.js
 * @param router koa2路由
 */
const requireJsInitRouter = (fileName, router) => {
  // 引入js文件
  const FunObj = require(`${PROJ}/${fileName}`);
  Logger.SUCCESS(`[${fileName}] 添加 ${Object.keys(FunObj).length} 个接口`);
  for (const funName in FunObj) {
    const item = FunObj[funName](); // 接口数据
    // 生成markdown接口文档
    Markdown.createMd(item);
    // 初始化接口
    Route.init(item, router);
    const {
      summary = 'xxx接口', // 接口概述
      URI = '/', // 接口地址
    } = item;
    Logger.TRACE(`[${fileName}] init router ${summary}【${URI}】`);
  }
};

module.exports = {
  requireJsInitRouter
};