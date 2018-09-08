
const Koa = require('koa');
const router = require('koa-router')();
const cors = require('koa2-cors');
//
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
    ctx.response.body = '<h1>Index</h1>';
});
// add router middleware:
app.use(router.routes());

// 在端口3000监听:
app.listen(options.port || 3000);
console.log(`app started at port ${options.port || 3000}...`);