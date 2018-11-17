/* global require */
/* global module */

const cfs = require('../../../common/cfs');
const Logger = require('../../../common/logger');
const Markdown = require('../../../common/createMarkdown');
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
    resp.forEach((item) => {
      // 生成markdown接口文档
      Markdown.createMd(item);
      // 初始化接口
      Route.init(item, router);
      const {
        summary = 'xxx接口', // 接口概述
        URI = '/', // 接口地址
      } = item;
      Logger.TRACE(`[${fileName}] init router ${summary}【${URI}】`);
    });
  }).catch((error) => {
    Logger.ERROR(`${fileName}--readFileInitRouter--${error}`);
  });
};

module.exports = {
  readFileInitRouter
};