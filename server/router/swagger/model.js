/* global require */
/* global module */

/**
 * 处理$ref （return formatted data）
 * @param ref   example: "#/definitions/apiVO"
 * @param swaggerData
 */
const dealRef = (ref, swaggerData) => {
  let result = {};
  let definitionsVo = queryDataVo(ref, swaggerData);
  let type = definitionsVo && definitionsVo.type ? definitionsVo.type : '';
  if (type) {
    if (type === 'object') {
      const { properties } = definitionsVo;
      if (properties) {
        for (let key in properties) {
          if (properties[key].type) {
            result[key] = convertType(properties, key, swaggerData);
          }
          /**
           * 处理 {"data": {"$ref": "#/definitions/VO"} 这种情况
           */
          if (properties[key]['$ref']) {
            result[key] = dealRef(properties[key]['$ref'], swaggerData);
          }
        }
      }
    }
  }
  return result;
};

/**
 * 返回$ref对应的definitionsVo
 * @param ref  example: "#/definitions/apiVO"
 */
const queryDataVo = (ref, swaggerData) => {
  const arr = ref.split('/');
  arr.shift();
  // 返回数据引用对象
  let dataVo = swaggerData;
  arr.forEach(function(item) {
    dataVo = dataVo[item];
  });
  return dataVo;
};

/**
 *  根据type转换成假数据
 */
const convertType = (properties, key, swaggerData) => {
  let data = {};
  const { type, items } = properties[key];
  if (type == 'string') {
    data = 'string';
  }
  if (type == 'integer') {
    data = 0;
  }
  if (type == 'number') {
    data = 0.01;
  }
  if (type == 'boolean') {
    data = false;
  }
  if (type == 'object') {
    data = {};
  }
  if (type == 'array') {
    // 最好判断一下这个【$refs】和上一个【$refs】是否一样，避免死循环
    if (items && items['$ref']) {
      data = [dealRef(items['$ref'], swaggerData)];
    } else {
      // 这个情况考虑下 "items": {"type": "object"}
      data = [];
    }
  }
  return data;
};

module.exports = {
  dealRef
};