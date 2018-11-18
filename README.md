# ap-cli

<!--[![NPM version](https://img.shields.io/npm/v/ap-cli.svg?style=flat)](https://www.npmjs.com/package/ap-cli)-->
[![npm version](https://badge.fury.io/js/ap-cli.svg)](http://badge.fury.io/js/ap-cli)
[![Build Status](https://travis-ci.org/PengChen96/ap-cli.svg?branch=master)](https://travis-ci.org/PengChen96/ap-cli)

### install
```
$ npm install ap-cli -g
```

### usage
#### 1. 通过json方式
##### data.json
```json
[
  {
    "summary": "get接口",
    "URI": "/api/get/index",
    "method": "get",
    "parameters": [],
    "response": {
      ...
    }
  },
  {
    "summary": "post接口",
    "URI": "/api/post/index",
    "method": "post",
    "parameters": [],
    "response": {
      ...
    }
  }
]
```

##### 运行
```
$ ap-cli -m data.json
```
##### 查看接口
http://localhost:3000/api/get/index

#### 2. 通过js方式生成数据
##### data.js
```javascript
const interface01 = () => {
  const data = {
    "summary": "interface01接口",
    "URI": "/api/get/interface",
    "method": "get",
    "parameters": [],
    "response": {
      "user": [],
      ...
    }
  }
  for (let i = 0; i < 100; i++) {
    data.response.user.push({ id: i, name: `user${i}` })
  }
  return data
};

const interface02 = () => {
  const data = {
    "summary": "interface01接口",
    "URI": "/api/post/interface",
    "method": "post",
    "parameters": [],
    "response": {
      "user": [],
      ...
    }
  }
  for (let i = 0; i < 100; i++) {
    data.response.user.push({ id: i, name: `user${i}` })
  }
  return data
};

module.exports = {
  interface01,
  interface02
};
```
##### 运行
```
$ ap-cli -m data.js
```
##### 查看接口
http://localhost:3000/api/get/interface

### 参数
|#|缩写|完整|默认|说明|
|--|----|------|------|------|
|1|-r|--regexp [regexp]|无|通过正则匹配需要mock的文件|
|2|-m|--mock [fileName]|'all'|[fileName]当前目录下要mock的文件名，[all]默认当前目录下的所有文件|
|3|-p|--port [port]|3000|指定mock的端口|

<!--### TODO-->
<!--- [x] 正则匹配指定要mock的文件-->
<!--- [x] 通过js方式生成接口数据-->
<!--- [ ] 通过swagger文件mock数据-->

---