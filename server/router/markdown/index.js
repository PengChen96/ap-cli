/* 2018/11/16 created by pc */
/* global require */
/* global module */

const config = require('../../../config');
const cfs = require('../../../common/cfs');
const utils = require('../../../common/utils');
const DefaultRouteData = require('../defaultRouteData');

/**
 * 解析请求参数，转成markdown格式数组
 */
const parseParam = (child, array = [], level = -1) => {
  let arr = array;
  if (array.length < 1) {
    arr.push('字段 | 类型 | 是否必须 | 说明 |\n----|----|----|----|\n');
  }
  let lev = level + 1;
  let space = '';
  for (let i = 0; i < lev; i++) {
    space += '&emsp;&emsp;';
  }
  child.forEach((item) => {
    const {
      key = '-',
      type = 'string',
      description = '无',
      required = false
    } = item;
    let row = `${space}${key||'-'}|${type||'string'}|${required||false}|${description||'无'}\n`;
    arr.push(row);
    if (item.child) {
      parseParam(item.child, arr, lev);
    }
  });
  return arr;
};

/**
 * 生成Markdown接口文档
 * @param itemRouteData 读取的单个路由数据
 * @param fileName 生成文档名称（会在前面加上年月日）
 */
const createMd = (itemRouteData, fileName = "接口文档.md") => {
  const date = utils.getCurrentDate();
  // 文件路径
  const filePath = `${ config.PROJ }/${ date }${ fileName }`;
  // 设置默认值
  const RD = DefaultRouteData.defaultSet(itemRouteData);
  // 请求参数
  let requestParam = `\`\`\`\n${utils.formatJson(RD.parameters)}\`\`\``;
  if (RD.parameters.parsing && RD.parameters.child) {
    requestParam = parseParam(RD.parameters.child).join('');
  }
  // 文本内容
  let content = `
### ${ RD.summary }
##### URL
> ${ RD.url }
##### http请求方式
> ${ RD.method }
##### 接口请求参数
${ requestParam }
##### 接口响应数据
\`\`\`
${ utils.formatJson(RD.response) }
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
   "summary": "获取用户信息接口json",
   "url": "/api/get/userinfo",
   "method": "get",
   "parameters": {
     "userid": "0001",
     "userinfo": {
       "gender": "男",
       "stature": [170, 180, 190],
       "skill": [
         {"js": 60},
         {"css": 60}
       ]
     }
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
 },
 {
   "summary": "获取用户信息接口json",
   "url": "/api/get/userinfo",
   "method": "get",
   "parameters": {
     "parsing": true,
     "child": [
       {
         "key": "userid",
         "type": "string",
         "required": true,
         "description": "用户ID"
       },
       {
         "key": "userinfo",
         "type": "object",
         "required": true,
         "description": "信息",
         "child": [
           {
             "key": "gender",
             "type": "string",
             "required": false,
             "description": "性别"
           },
           {
             "key": "stature",
             "type": "array",
             "description": "身高数组",
             "child": [
               {
                 "type": "number",
                 "description": "身高"
               }
             ]
           },
           {
             "key": "skill",
             "type": "array",
             "description": "技能",
             "child": [
               {
                 "type": "object",
                 "child": [
                   {
                     "key": "js",
                     "type": "string",
                     "description": "js技能"
                   },
                   {
                     "key": "css",
                     "type": "string",
                     "description": "css技能"
                   }
                 ]
               }
             ]
           }
         ]
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
*/
