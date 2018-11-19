/* 2018/11/16 created by pc */
/* global require */
/* global module */

const config = require('../../../config');
const cfs = require('../../../common/cfs');
const utils = require('../../../common/utils');
const DefaultRouteData = require('../defaultRouteData');

const pa = {
  user: {
    name: '张三',
    info: {
      age: 18,
      gender: 'boy'
    },
    arr: [1, 2, 3],
    objArr: [
      {a: 1},
      {b: 1}
    ]
  },
  xx: {}
};
const test = {
  parsing: true, // 解析
  child: [
    {
      key: 'user',
      description: '用户',
      required: true,
      type: 'object',
      child: [
        {key: 'name', type: 'string', description: '姓名'},
        {
          key: 'info',
          type: 'object',
          child: [
            {key: 'age', type: 'number', description: 18},
            {key: 'gender', type: 'string', description: 'boy'},
          ]
        },
        {
          key: 'arr',
          type: 'array',
          child: [
            {key: '', type: 'number', description: 1},
            {key: '', type: 'number', description: 2},
            {key: '', type: 'number', description: 3},
          ]
        },
        {
          key: 'objArr',
          type: 'array',
          child: [
            {
              key: '',
              type: 'object',
              child: [
                {key: 'a', type: 'number', value: 1},
                {key: 'b', type: 'number', value: 1}
              ]
            }
          ]
        }
      ]
    },
    {
      key: 'xx'
    }
  ]
};
const parse = (child, array = []) => {
  let arr = array;
  if (array.length < 1) {
    arr.push('字段 | 类型 | 说明 | 必须 |\n----|----|----|----|\n');
  }
  child.forEach((item) => {
    const {
      key = '#',
      type = 'string',
      description = '无',
      required = false
    } = item;
    let row = `${key||'#'}|${type||'string'}|${description||'无'}|${required||'false'}\n`;
    arr.push(row);
    if (item.child) {
      parse(item.child, arr);
    }
  });
  return arr;
};

// 生成Markdown接口文档
const createMd = (itemRouteData, fileName = "接口文档.md") => {
  const param = parse(test.child);
  const date = utils.getCurrentDate();
  // 文件路径
  const filePath = `${ config.PROJ }/${ date }${ fileName }`;
  // 设置默认值
  const RD = DefaultRouteData.defaultSet(itemRouteData);
  // 文本内容
  let content = `
### ${ RD.summary }
##### URL
> ${ RD.url }
##### http请求方式
> ${ RD.method }
##### 参数
${param.join('')}
##### 请求参数
\`\`\`
${ utils.formatJson(RD.parameters) }
\`\`\`
##### 响应数据
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
    "summary": "获取用户信息接口",
    "url": "/api/get/userinfo",
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
