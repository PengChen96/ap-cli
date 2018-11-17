/* 2018/11/16 created by pc */
/* global require */
/* global module */

const config = require('../config');
const cfs = require('./cfs');
const utils = require('./utils');

// 生成Markdown接口文档
const createMd = (item, fileName = "接口文档.md") => {
  const date = utils.getCurrentDate();
  // 文件路径
  const filePath = `${ config.PROJ }/${ date }${ fileName }`;
  const {
    summary = 'xxx接口', // 接口概述
    URI = '/', // 接口地址
    method = 'post', // 接口请求方法
    parameters = '接口请求参数', // 接口请求参数
    response = '接口响应数据', // 接口响应数据
  } = item;
  // 文本内容
  let content = `
### ${summary}
##### URL
> ${URI}
##### http请求方式
> ${method}
##### 请求参数
\`\`\`
${ utils.formatJson(parameters) }
\`\`\`
##### 响应数据
\`\`\`
${ utils.formatJson(response) }
\`\`\`
`;
  // 写入文件（追加方式）
  cfs.appendFile(filePath, content);
};

module.exports = {
  createMd
};

/**
 * 示例
[
  {
    "summary": "获取用户信息接口",
    "URI": "/api/get/userinfo",
    "method": "get",
    "parameters": [{
      "userid": {
        "description": "用户id",
        "required": true,
        "type": "string"
      }
    }],
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
        "userInfo": {
          "username": "张三",
          "age": 18,
          "gender": "男"
        }
      }
    }
  }
]
*/
