/* global require */
/* global module */

const cfs = require('../../../common/cfs');
const Logger = require('../../../common/logger');
const Markdown = require('../../../common/createMarkdown');
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
      const {
        summary = 'xxx接口', // 接口概述
        URI = '/', // 接口地址
        method = 'post', // 接口请求方法
        parameters = [], // 接口请求参数
        response = '返回数据', // 接口响应数据
      } = item;
      // router
      Logger.TRACE(`[${fileName}] init router ${summary}【${URI}】`);
      router[method](URI, async (ctx, next) => {
        ctx.response.body = response;
      });
    });
  }).catch((error) => {
    Logger.ERROR(`${fileName}--readFileInitRouter--${error}`);
  });
};

module.exports = {
  readFileInitRouter
};