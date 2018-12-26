/**
 * Created by PC on 2018/11/21.
 */
/* global module */

const modelJS = require('./model');
const mdTable = require('./mdTable');

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
    // tags
    const tags = type_data.tags[0];
    // 接口概述
    const { summary } = type_data;
    // 接口请求参数 md数组
    let paramsTable = formatParametersToMdArr(type_data);
    // 格式化 接口请求参数
    let parameters = formatParametersData(type_data);
    // 格式化 接口响应数据
    let response = formatResponseData(type_data);
    itemRouteData = {
      tags,
      summary,
      url: key_url,
      method: key_type,
      paramsTable,
      parameters,
      response,
    }
  }
  return itemRouteData;
};

/**
 * 请求参数转换为表格（返回md table数组）
 * @param type_data "post"对象的数据 example: {"tags":[], ...}
 */
formatParametersToMdArr = (type_data) => {
  let mdArray = ['| 字段 | 类型 | 是否必须 | 说明 |\n|----|----|----|----|\n'];
  const { parameters = [] } = type_data;
  parameters.forEach((item) => {
    let itemParamArray = [];
    let { name='字段', type='object', required='false', description='说明', schema} = item;
    if (schema) {
      type = schema.type ? schema.type : 'object';
      const faRowArr = [`|${name}|${type}|${required}|${description}|\n`];
      let mdRowArr = [];
      if (schema.type === 'array') {
        const ref = schema.items ? schema.items['$ref'] : '';
        mdRowArr = mdTable.dealRef(ref, GlobalSwaggerData);
      } else {
        const ref = schema['$ref'] ? schema['$ref'] : '';
        mdRowArr = mdTable.dealRef(ref, GlobalSwaggerData);
      }
      itemParamArray = [...faRowArr, ...mdRowArr];
    } else {
      const row = `|${name}|${type}|${required}|${description}|\n`;
      itemParamArray.push(row);
    }
    mdArray = [...mdArray, ...itemParamArray];
  });
  return mdArray;
}

/**
 * 格式化接口请求参数（return parameters）
 * @param type_data "post"对象的数据 example: {"tags":[], ...}
 */
formatParametersData = (type_data) => {
  let parametersData = {
    "parsing": false,
    "child": []
  };
  const { parameters = [] } = type_data;
  parameters.forEach((item) => {
    const obj = {};
    const { schema } = item;
    if (schema) {
      if (schema.type && schema.type === 'array') {
        obj.type = schema.type;
        const ref = schema.items ? schema.items['$ref'] : '';
        obj[item.name] = [modelJS.dealRef(ref, GlobalSwaggerData)];
      }
      else {
        obj.type = schema.type;
        const ref = schema['$ref'] ? schema['$ref'] : '';
        obj[item.name] = modelJS.dealRef(ref, GlobalSwaggerData);
      }
    } else {
      // TODO （应该判断一下类型，再赋值的）
      obj[item.name] = 'string';
    }
    parametersData.child.push(obj);
  });
  return parametersData;
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