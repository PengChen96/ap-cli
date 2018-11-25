# ap-cli [![npm version](https://badge.fury.io/js/ap-cli.svg)](http://badge.fury.io/js/ap-cli) [![Build Status](https://travis-ci.org/PengChen96/ap-cli.svg?branch=master)](https://travis-ci.org/PengChen96/ap-cli)
<!--[![NPM version](https://img.shields.io/npm/v/ap-cli.svg?style=flat)](https://www.npmjs.com/package/ap-cli)-->
依据接口定义，帮助你快速的完成接口模拟工作。

### 目录
- [开始](#开始)
- [使用](#使用)
  * [通过js方式生成数据](#通过js方式生成数据)
  * [通过swagger文件模拟数据](#通过swagger文件模拟数据)
  * [通过正则匹配指定要模拟的文件](#通过正则匹配指定要模拟的文件)
- [CLI用法](#CLI用法)
- [完整模板及说明](#完整模板及说明)

### 开始
下载ap-cli
```
$ npm install ap-cli -g
```
创建data.json
```
[
  {
    "url": "/api/get/index",
    "method": "get",
    "response": {
      "name": "pc",
      "status": "success"
    }
  }
]
```
运行
```
$ ap-cli -m data.json
```
现在打开http://localhost:3000/api/get/index，你会得到
```
{ "name": "pc", "status": "success" }
```
同时会在当前文件目录生成一个简单的markdown接口文档  
json模板格式查看[完整模板及说明](#完整模板及说明)

### 使用
#### 1. 通过js方式生成数据ss
格式查看[完整模板及说明](#完整模板及说明)
##### data.js
```javascript
const getUserList = () => {
  const data = {
    "summary": "获取用户列表(get方式)",
    "url": "/api/get/userList",
    "method": "get",
    "parameters": "",
    "response": {
      "count": 100,
      "userList": []
    }
  }
  for (let i = 0; i < 100; i++) {
    data.response.userList.push({ id: i, name: `user${i}` })
  }
  return data
};

module.exports = {
  getUserList
};
```
##### 运行
```
$ ap-cli -m data.js
```
##### 查看接口
http://localhost:3000/api/get/userList

#### 2. 通过swagger文件模拟数据
这种方式主要是通过swagger生成一个xx_new.json文件，然后进行模拟数据
```
# 运行会生成一个swagger_new.json文件
$ ap-cli -s swagger.json
# 模拟数据
$ ap-cli -m swagger_new.json
```

#### 3. 通过正则匹配指定要模拟的文件
当前目录下有3个文件a1.json、a2.js、b1.js,你可以通过正则只模拟a1.json和a2.js文件的数据。
```
$ ap-cli -m all -r /^a/
```

### CLI用法
|#|缩写|完整|默认|说明|
|--|----|------|------|------|
|1|-m|--mock [fileName]|'all'|模拟接口服务，[fileName]当前目录下要mock的文件名，[all]默认当前目录下的所有文件|
|2|-r|--regexp [regexp]|无|通过正则匹配需要mock的文件|
|3|-s|--swagger [fileName]|无|通过swagger生成json模板文件，[fileName]当前目录下的swagger文件名|
|4|-p|--port [port]|3000|指定mock的端口|

### 完整模板及说明
不管是json、js、swagger文件，最终都是转换成下面的格式进行处理。
##### 示例
```
[
  {
    "summary": "获取用户信息接口json",
    "url": "/api/get/userinfo",
    "method": "post",
    "parameters": {
      "parsing": true,
      "child": [
        {
          "key": "userid",
          "type": "string",
          "required": true,
          "description": "user id"
        }
      ]
    },
    "response": {
      "body": {
        "id": "0001",
        "status": "success",
        "userinfo": {
          "name": "pc",
          "age": 18,
          "gender": "boy"
        }
      }
    }
  }
]
```

##### 主要属性说明
| # | 字段 | 类型 | 说明 | 默认 | 是否必须 | 备注 |
|---|------|----|----|----|----|----|
|1| summary | string | 接口概述 | xxx接口 | 否 | 无 |
|2| url | string | 接口地址 | /api | 是 | 无 |
|3| method | string | http请求方式 | get | 是 | 无 |
|4| parameters | / | 接口请求参数 | 无 | 否 | 可显示为表格（详见下1-1.parameters属性说明） |
|5| response | / | 接口响应数据 | 无 | 是 | 无 |

##### 1-1. parameters属性说明
| # | 字段 | 类型 | 说明 | 默认 | 是否必须 | 备注 |
|---|------|----|----|----|----|----|
|1| parsing | boolean | 是否解析 | false | 否 | 无 |
|2| child | object [] | 子节点 | 无 | 否 | 子节点属性（详见1-1-1.child属性说明） |

##### 1-1-1. child属性说明
| # | 字段 | 类型 | 说明 | 默认 | 是否必须 |
|---|------|----|----|----|----|
|1| key | string | 字段名称 | - | 是 |
|2| type | string | 字段类型 | string | 是 |
|3| description | string | 字段说明 | 无 | 否 |
|4| required | boolean | 是否必须 | false | 否 |
|5| child | object [] | 子节点数据 | 无 | 否 |

---
