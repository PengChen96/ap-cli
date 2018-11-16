/* 2018/11/16 created by pc */
/* global require */
/* global module */

const config = require('../config');
const cfs = require('./cfs');
const utils = require('./utils');

// 生成Markdown接口文档
const createMd = (object, fileName = "接口文档.md") => {
  // 文件路径
  const filePath = `${ config.PROJ }/${ fileName }`;
  // 文本内容
  let content = `
  ### ${object.summary} 
  ##### urI: ${object.URI}
  ##### method: ${object.method}
  ##### parameters: 
  \`\`\`
  ${ utils.formatJson(object.parameters) }
  \`\`\`
  ##### response:
  \`\`\`
  ${ utils.formatJson(object.response) }
  \`\`\`
  \n
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
