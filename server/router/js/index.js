/* global require */
/* global module */

const Logger = require('../../../common/logger');
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
    const itemRouteData = FunObj[funName](); // 接口数据
    // 初始化接口
    Route.init(itemRouteData, router);
    Logger.TRACE(`[${fileName}] init router ${itemRouteData.summary||'xxx接口'}【${itemRouteData.URI||'/'}】`);
  }
};

module.exports = {
  requireJsInitRouter
};