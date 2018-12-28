/* global module */

const jsTpl = `
const getUserList = () => {
  const data = {
    "tags": "文件集合",
    "summary": "获取用户列表(get方式)",
    "url": "/api/get/userList",
    "method": "get",
    "paramsTable": [
      "| 字段 | 类型 | 是否必须 | 说明 |\\n",
      "|------|------|------|------|\\n",
      "| id | string | 是 | 无 |\\n"
    ],
    "parameters": "",
    "response": {
      "count": 100,
      "userList": []
    }
  }
  for (let i = 0; i < 100; i++) {
    data.response.userList.push({ id: i, name: \`user\${i}\` })
  }
  return data
};

module.exports = {
  getUserList
};
`;

const jsonTpl = `
[
  {
    "tags": "文件集合",
    "summary": "获取用户列表(get方式)",
    "url": "/api/get/index",
    "method": "get",
    "paramsTable": [
      "| 字段 | 类型 | 是否必须 | 说明 |\\n",
      "|------|------|------|------|\\n",
      "| id | string | 是 | 无 |\\n"
    ],
    "parameters": "",
    "response": {
      "name": "pc",
      "status": "success"
    }
  }
]
`;

module.exports = {
  jsTpl,
  jsonTpl
};