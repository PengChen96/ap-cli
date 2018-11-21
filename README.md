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
```
[
  {
    "summary": "get接口",
    "url": "/api/get/index",
    "method": "get",
    "parameters": {},
    "response": {
      ...
    }
  },
  {
    "summary": "post接口",
    "url": "/api/post/index",
    "method": "post",
    "parameters": {},
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
    "url": "/api/get/interface",
    "method": "get",
    "parameters": {},
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
    "summary": "interface02接口",
    "url": "/api/post/interface",
    "method": "post",
    "parameters": {},
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

### CLI usage
|#|缩写|完整|默认|说明|
|--|----|------|------|------|
|1|-m|--mock [fileName]|'all'|模拟接口服务，[fileName]当前目录下要mock的文件名，[all]默认当前目录下的所有文件|
|2|-r|--regexp [regexp]|无|通过正则匹配需要mock的文件|
|3|-s|--swagger [fileName]|无|通过swagger生成json模板文件，[fileName]当前目录下的swagger文件名|
|4|-p|--port [port]|3000|指定mock的端口|

<!--### TODO-->
<!--- [x] 正则匹配指定要mock的文件-->
<!--- [x] 通过js方式生成接口数据-->
<!--- [x] 通过swagger文件mock数据-->

---

### 模板文件
#### 示例
```json
[
  {
    "summary": "获取用户信息接口json",
    "url": "/api/post/userinfo",
    "method": "post",
    "parameters": {
      "parsing": true,
      "child": [
        {
          "key": "userid",
          "type": "string",
          "required": true,
          "description": "用户ID"
        }
      ]
    },
    "response": {
      "head": {
        "code": "00000000",
        "description": "成功",
        "msg": "success",
        "time": "2018-11-16 00:00:00",
        "status": "Y"
      },
      "body": {
        "id": 123456,
        "status": "success",
        "userinfo": {
          "username": "张三",
          "age": 18,
          "gender": "男"
        }
      }
    }
  }
]
```

#### 主要属性说明
| # | 字段 | 类型 | 说明 | 默认 | 是否必须 | 备注 |
|---|------|----|----|----|----|----|
|1| url | string | 接口地址 | /api | 是 | 无 |
|2| method | string | http请求方式 | get | 是 | 无 |
|3| response | / | 接口响应数据 | 无 | 是 | 无 |
|4| summary | string | 接口概述 | xxx接口 | 否 | 无 |
|5| parameters | / | 接口请求参数 | 无 | 否 | 可显示为表格（详见下1-1.parameters属性说明） |

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

