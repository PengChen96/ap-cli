
## 介绍
> 主要是解决前端mock数据的问题，依据接口定义，帮助你快速的完成接口模拟工作。  

**实现的功能：**  
- [x] 通过json、js、swagger文件模拟接口数据
- [x] 通过正则匹配指定需要mock的文件
- [x] 生成简单markdown接口文档

## 目录结构介绍

	|-- bin                              // CLI命令目录
	|   |-- build                        //
	|       |-- option.js                // 
	|   |-- app.js                       // 
	|-- common                           // 公共方法目录
	|-- server                           // koa2服务目录
	|   |-- router                       // 接口路由目录
	|       |-- js                       // 处理js
	|       |-- json                     // 处理json
	|       |-- swagger                  // 处理swagger
	|       |-- markdown                 // 生成md文件
	|       |-- defaultRouteData.js      // 默认接口数据
	|       |-- route.js                 // 初始路由
	|       |-- index.js                 // router主要文件
	|   |-- index.js                     // 服务主文件
	|-- test                             // 单元测试目录
	|-- .travis.yml                      // Travis CI配置文件
	|-- config.js                        // 配置文件
	|-- package.json                     // 项目及工具的依赖配置文件
	

## 脚手架小示例
### 零. 开始
1. 新建一个配置文件`package.json`
```
# 初始化 package.json
$ npm init
```
2. 在`package.json`中添加下面这项
```
{
    ...,
    "bin": {
        "cp-cli": "bin/app.js"
    }
}
```
3. 然后在根目录下新建一个**bin**文件夹，再在**bin**下新建`app.js`  
在`app.js`中添加`#!/usr/bin/env node`，然后可以写脚手架的内容。

```
#!/usr/bin/env node
console.log('****** my first CLI ******');
```  
4. 本地调试，在根目录下使用
```
$ npm link
```
5. 查看效果  
在 cmd 中输入 cp-cli 会打印出消息  
<img src="https://user-gold-cdn.xitu.io/2018/5/23/1638c14a123deac8?w=299&h=58&f=png&s=1503">

### 一. 添加提示
使用commander
```
$ npm install commander --save
```
代码：
```
#!/usr/bin/env node
console.log('****** my first CLI ******');

const commander = require('commander');

commander.version('1.0.0')
  .option('-a, --aa', 'a description')
  .option('-b, --bb [name]', 'b description');

commander
  .command('init <project>')
  .description('init project')
  .action((projectName) => {
    console.log(`init ${projectName}`);
  });

commander.parse(process.argv);

if (commander.aa) {
  console.log('aa******');
}
if (commander.bb) {
  console.log('bb******', commander.bb);
}
```
效果：  
<img src="https://user-gold-cdn.xitu.io/2018/5/23/1638cc760f1965ca?w=326&h=179&f=png&s=4396">
 
我用koa2来模拟服务，如果不了解koa2，可以看下这个
[koa2小示例](https://note.youdao.com/share/?id=12bdc66a9e4dd3280aaa21d0aeed7e3a&type=note#/)

我们只要通过CLI命令根据参数执行代码读取模板文件，启动koa2服务，这样就可以访问接口了。

<!--
[前端脚手架小示例](https://note.youdao.com/share/?id=8b46dbe500a520258d4dfcfd4e7a69b5&type=note#/)
[koa2小示例](https://note.youdao.com/share/?id=12bdc66a9e4dd3280aaa21d0aeed7e3a&type=note#/)
-->

