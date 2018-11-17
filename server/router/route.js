/**
 * Created by Administrator on 2018/11/17.
 */
/* global module */

const init = (item, router) => {
  const {
    summary = 'xxx接口', // 接口概述
    URI = '/', // 接口地址
    method = 'post', // 接口请求方法
    parameters = '接口请求参数', // 接口请求参数
    response = '接口响应数据', // 接口响应数据
  } = item;
  // router
  router[method](URI, async (ctx, next) => {
    ctx.response.body = response;
  });
};

module.exports = {
  init
};