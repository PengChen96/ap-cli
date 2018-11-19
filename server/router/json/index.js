/* global require */
/* global module */

const cfs = require('../../../common/cfs');
const Logger = require('../../../common/logger');
const Route = require('../route');
const config = require('../../../config');
const { PROJ } = config;

/**
 * 通过读取文件内容 初始化路由
 * @param fileName 文件名  example: exam.json
 */
const readFileInitRouter = (fileName, router) => {
  cfs.readFile(`${PROJ}/${fileName}`).then((result) => {
    const resp = JSON.parse(result);
    Logger.SUCCESS(`[${fileName}] 添加 ${resp.length} 个接口`);
    resp.forEach((itemRouteData) => {
      // 初始化接口
      Route.init(itemRouteData, router);
      Logger.TRACE(`[${fileName}] init router ${itemRouteData.summary||'xxx接口'}【${itemRouteData.url||'/api'}】`);
    });
  }).catch((error) => {
    Logger.ERROR(`${fileName}--readFileInitRouter--${error}`);
  });
};

module.exports = {
  readFileInitRouter
};