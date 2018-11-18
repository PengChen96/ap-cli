/**
 * Created by Administrator on 2018/11/17.
 */
/* global require */
/* global module */

const Markdown = require('./markdown/index');

//const setDefaultData = (itemRouteData) => {
//  const data = JSON.parse(JSON.stringify(itemRouteData));
//  if (!data.summary) {
//    data.summary = 'xxx接口';
//  }
//  return {
//
//  }
//};

const route = (itemRouteData, router) => {
  const {
    summary = 'xxx接口', // 接口概述
    URI = '/', // 接口地址
    method = 'post', // 接口请求方法
    parameters = '接口请求参数', // 接口请求参数
    response = '接口响应数据', // 接口响应数据
  } = itemRouteData;
  // router
  router[method](URI, async (ctx, next) => {
    ctx.response.body = response;
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