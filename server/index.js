/* global require */

const Koa = require('koa');
const cors = require('koa2-cors');
const Logger = require('../common/logger');
// commander options
const options = require('../bin/build/option.js');
// 扫描文件添加的路由
const myRouter = require('./router/index');
//
const app = new Koa();
// 跨域
app.use(cors());

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
  Logger.TRACE(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// add router middleware:
app.use(myRouter.routes());

if (options.mock) {
  app.listen(options.port || 3000);
  Logger.SUCCESS(`app started at port ${options.port || 3000}...`);
}

