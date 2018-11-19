/**
 * Created by Administrator on 2018/11/17.
 */
/* global require */
/* global module */

const Markdown = require('./markdown/index');
const DefaultRouteData = require('./defaultRouteData');

const route = (itemRouteData, router) => {
  // 设置默认值
  const RD = DefaultRouteData.defaultSet(itemRouteData);
  // router
  router[RD.method](RD.url, async (ctx, next) => {
    ctx.response.body = RD.response;
  });
};

const init = (itemRouteData, router) => {
  // 生成markdown接口文档
  Markdown.createMd(itemRouteData);
  // 初始化接口
  route(itemRouteData, router);
};

module.exports = {
  init
};