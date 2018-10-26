/* global require */

const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors');
const cfs = require('../common/cfs');
const utils = require('../common/utils');
const Logger = require('../common/logger');
const config = require('../config');
// commander options
const options = require('../bin/build/option.js');
//
const app = new Koa();
// 跨域
app.use(cors());
// 参数
const { PROJ, FILE_WHITE_LIST } = config;
// const { mock, port, regexp } = options;

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
  Logger.TRACE(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// add url-route:
router.get('/', async (ctx, next) => {
  ctx.response.body = `<h1>当前启动的文件${PROJ}${ options.mock || '' }</h1>`;
});
// add router middleware:
app.use(router.routes());

// 在端口3000监听:
app.listen(options.port || 3000);
Logger.SUCCESS(`app started at port ${options.port || 3000}...`);

/************** 扫描文件添加Api **************/
// 扫描当前目录下的文件夹 读取文件夹下的文件名
cfs.readdir(`${PROJ}`).then((res) => {
  // 指定文件执行
  if (options.mock) {
    // 异步读取文件内容
    initRouter(options.mock);
  } else { // 执行当前目录下的文件
    // 获取白名单内的文件数组
    const result = res.filter((fileName) => {
      let flag = false;
      const suffix = utils.getFileNameSuffix(fileName);
      // 文件后缀白名单
      if (FILE_WHITE_LIST.includes(suffix)) {
        flag = true;
      } else {
        Logger.WARN(`${fileName}不在白名单内！`);
      }
      return flag;
    });
    let filterResult = result;
    // 正则匹配文件
    if (options.regexp) {
      // 转换为正则
      const regexp = utils.strToRegExp(options.regexp);
      filterResult = result.filter((item) => regexp.test(item));
    }
    Logger.INFO(`扫描到 ${filterResult} 这${filterResult.length}个文件`);
    filterResult.forEach((fileName) => {
      // 异步读取文件内容
      initRouter(fileName);
    });
  }
}).catch((error) => {
  Logger.ERROR(error);
});

const initRouter = (fileName) => {
  const suffix = utils.getFileNameSuffix(fileName);
  if (suffix === 'js') {
    requireJsInitRouter(fileName);
  } else {
    readFileInitRouter(fileName);
  }
}
// 异步读取文件内容 初始化路由
const readFileInitRouter = (fileName) => {
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
// 通过引入JS 初始化路由
const requireJsInitRouter = (fileName) => {
  // 引入js文件
  const FunObj = require(`${PROJ}/${fileName}`);
  Logger.SUCCESS(`[${fileName}] 添加 ${Object.keys(FunObj).length} 个接口`);
  for (const funName in FunObj) {
    const item = FunObj[funName](); // 接口数据
    Logger.TRACE(`[${fileName}] init router 【${item.URI}】`);
    router[item.method](item.URI, async (ctx, next) => {
      ctx.response.body = item.response;
    });
  }
};

// swagger解析 TODO
if (options.swagger) {
  Logger.DEBUG(options.swagger);
  const fileName = options.swagger;
  cfs.readFile(`${PROJ}/${fileName}`).then((result) => {
    const resp = JSON.parse(result);
    // console.log(resp);
    // console.log(resp.definitions.SbFhbzctzfqjnBaDeleteVO.properties);
    formatData(resp);
  }).catch((error) => {
    Logger.ERROR(error);
  });
}

const formatData = (sw) => {
  var interfaceArr = [];
  var paths = sw.paths;
  for (var uri in paths) {
    var method = Object.keys(paths[uri])[0];
    var schema = paths[uri][method].responses[200].schema;
    var arr = schema.$ref.split('/');
    arr.shift();
    var respData = sw;
    arr.forEach(function(item) {
      respData = respData[item];
    });
    var itemObj = {
      URI: uri,
      method: method,
      response: ''
    };
    interfaceArr.push(itemObj);
  }
  console.log(interfaceArr, 'final');
}