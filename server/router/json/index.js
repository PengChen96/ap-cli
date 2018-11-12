/* global require */
/* global module */

const cfs = require('../../../common/cfs');
const Logger = require('../../../common/logger');
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
    resp.forEach((item) => {
      // router
      Logger.TRACE(`[${fileName}] init router 【${item.URI}】`);
      router[item.method](item.URI, async (ctx, next) => {
        ctx.response.body = item.response;
      });
    });
  }).catch((error) => {
    Logger.ERROR(`${fileName}--readFileInitRouter--${error}`);
  });
};

module.exports = {
  readFileInitRouter
};