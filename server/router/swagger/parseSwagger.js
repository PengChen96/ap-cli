/**
 * Created by PC on 2018/11/21.
 */
/* global module */

const modelJS = require('./model');

let GlobalSwaggerData = {};

/**
 * 格式化swagger数据
 * @param swaggerData swagger数据
 */
const formatSwaggerData = (swaggerData) => {
  GlobalSwaggerData = swaggerData;
  // 格式化后的数据数组
  const formatted_data = [];
  const { paths } = swaggerData;
  // 遍历swagger数据的paths对象
  for (let key_url in paths) {
    // paths[key_url]: "url"对象的数据  example: {"post": {...}}
    const itemRouteData = getItemRouteData(key_url, paths[key_url]);
    formatted_data.push(itemRouteData);
  }
  // const formatted_data = getInterfaceDataArr(paths);
  return formatted_data;
};

/**
 * 读取post对象 （return 单个处理好的接口数据）
 * @param key_url  接口地址
 * @param obj  "post"对象or其他  example: {"post": {...}}
 */
const getItemRouteData = (key_url, obj) => {
  let itemRouteData = {};
  // key_type: 接口请求方式 "post"、"get"等
  for (let key_type in obj) {
    // type_data: "post"对象的数据  example: {"tags":[], ...}
    let type_data = obj[key_type];
    // 接口概述
    const { summary } = type_data;
    // 格式化 接口响应数据
    let response = formatResponseData(type_data);
    itemRouteData = {
      summary: summary,
      url: key_url,
      method: key_type,
      parameters: '无',
      response: response
    }
  }
  return itemRouteData;
};

/**
 *  格式化接口响应数据（return response）
 *  @param type_data "post"对象的数据 example: {"tags":[], ...}
 */
const formatResponseData = (type_data) => {
  let responseData = {};
  // example: {"$ref": "#/definitions/apiVO"}
  const schema = type_data.responses['200'].schema;
  // schema存在,拿到"#/definitions/apiVO",否则"";
  const ref = schema ? schema['$ref'] : ''; //此数据用于查询数据模型
  if (ref) {
    responseData = modelJS.dealRef(ref, GlobalSwaggerData);
  } else {
    // example: {"description": "OK"}
    responseData = 'OK';
  }
  return responseData;
};

module.exports = {
  formatSwaggerData
};