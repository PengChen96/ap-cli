/**
 * Created by PC on 2018/11/21.
 */
/* global module */

const modelJS = require('./model');

let GlobalDefinitions = {};
/**
 * 遍历swagger数据的paths对象 (return 处理好的json模板数据)
 * @paths paths对象
 */
const getInterfaceDataArr = (paths) => {
  const interfaceDataArr = [];
  // key_url: 接口地址
  for (let key_url in paths) {
    // paths[key_url]: "url"对象的数据  example: {"post": {...}}
    const itemRouteData = getItemRouteData(key_url, paths[key_url]);
    interfaceDataArr.push(itemRouteData);
  }
  return interfaceDataArr;
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
    // 响应数据
    let response = makeMockJson(type_data);
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
 *  模拟数据（return response）
 *  @param type_data "post"对象的数据 example: {"tags":[], ...}
 */
const makeMockJson = (type_data) => {
  let mockJson = {};
  // example: {"$ref": "#/definitions/apiVO"}
  let schema = type_data.responses['200'].schema;
  // schema存在,拿到"#/definitions/apiVO",否则"";
  let mockJsonKey = schema ? schema['$ref'] : ''; //此数据用于查询数据模型
  if (mockJsonKey) {
    let tempkey = modelJS.queryData(mockJsonKey);
    mockJson = modelJS.dealModel(GlobalDefinitions[tempkey], GlobalDefinitions, tempkey);
  } else {
    let model = schema ? schema : type_data.responses['200'];
    mockJson = modelJS.dealModel(model, GlobalDefinitions);
  }
  // 目前是只返回response数据
  return mockJson;
};

/**
 * 格式化swagger数据
 * @param swaggerData swagger数据
 */
const formatSwaggerData = (swaggerData) => {
  GlobalDefinitions = swaggerData.definitions;
  let paths = swaggerData.paths;
  const formatted_data = getInterfaceDataArr(paths);
  return formatted_data;
};

module.exports = {
  formatSwaggerData
};