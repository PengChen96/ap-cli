
const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors');
const cfs = require('../common/cfs');
const utils = require('../common/utils');
const config = require('../config');
// commander options
const options = require('../bin/build/option.js');
//
const app = new Koa();
app.use(cors());

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// add url-route:
router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>当前启动的文件${config.PROJ}${ options.mock || '' }</h1>`;
});
// add router middleware:
app.use(router.routes());

// 在端口3000监听:
app.listen(options.port || 3000);
console.log(`app started at port ${options.port || 3000}...`);

/************** 扫描文件添加Api **************/
// 扫描当前目录下的文件夹 读取文件夹下的文件名
cfs.readdir(`${config.PROJ}`).then((result) => {
  // 指定文件执行
  if (options.mock) {
    // 异步读取文件内容
    readFileInitRouter(`${options.mock}`);
  } else { // 执行当前目录下的文件
    let filterResult = result;
    // 正则匹配文件
    if (options.regexp) {
      // 转换为正则
      const regexp = utils.strToRegExp(options.regexp);
      filterResult = result.filter((item) => regexp.test(item));
    }
    console.log(`扫描到 ${filterResult} 这${filterResult.length}个文件`);
    filterResult.forEach((fileName) => {
      // 异步读取文件内容
      readFileInitRouter(fileName);
    });
  }
}).catch((error) => {
  console.log(error);
});
// 异步读取文件内容 初始化路由
const readFileInitRouter = (fileName) => {
  cfs.readFile(`${config.PROJ}/${fileName}`).then((result) => {
    const resp = JSON.parse(result);
    console.log(`[${fileName}] 添加 ${resp.length} 个接口`);
    resp.forEach((item) => {
      // router
      console.log(`[${fileName}] init router 【${item.URI}】`);
      router[item.method](item.URI, async (ctx, next) => {
        ctx.response.body = item.response;
      });
    });
  }).catch((error) => {
    console.log(error);
  });
};