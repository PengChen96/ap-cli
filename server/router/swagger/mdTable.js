/* global require */
/* global module */

/**
 * 处理$ref （return formatted data）
 * @param ref   example: "#/definitions/apiVO"
 * @param swaggerData
 */
const dealRef = (ref, swaggerData, padding = 2) => {
  let padd = padding;
  let space = '';
  for (let i=0; i<padd; i++) {
    space += '&emsp;';
  }
  let result = [];
  let definitionsVo = queryDataVo(ref, swaggerData);
  let type = definitionsVo && definitionsVo.type ? definitionsVo.type : '';
  if (type) {
    if (type === 'object') {
      const { properties } = definitionsVo;
      if (properties) {
        for (let key in properties) {
          if (properties[key].type) {
            const rowArr = convertRowArr(ref, properties, key, swaggerData, padd);
            result = [...result, ...rowArr];
          }
          /**
           * 处理 {"data": {"$ref": "#/definitions/VO"} 这种情况
           * properties[key]['$ref'] !== ref，判断一下这个【$refs】和上一个【$refs】是否一样，避免死循环
           */
          if (properties[key]['$ref'] && properties[key]['$ref'] !== ref) {
            const { type='object', required='false', description='说明' } = properties[key];
            const faRowArr = [`|${space}${key}|${type}|${required}|${description}|\n`];
            let pd = padding + 2;
            const rowArr = dealRef(properties[key]['$ref'], swaggerData, pd);
            result = [...result, ...faRowArr, ...rowArr];
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
 *  转换为md数组（一维数组）
 */
const convertRowArr = (ref, properties, key, swaggerData, padding) => {
  let RowArr = [];
  // 空格
  let space = convertToSpace(padding);
  const { type='object', required='false', description='说明', items } = properties[key];
  if (type == 'array') {
    // items['$ref']!==ref，判断一下这个【$refs】和上一个【$refs】是否一样，避免死循环
    if (items && items['$ref'] && items['$ref']!==ref) {
      const faRowArr = [`|${space}${key}|${type}|${required}|${description}|\n`];
      const mdRowArr = dealRef(items['$ref'], swaggerData, padding + 2);
      RowArr = [...faRowArr, ...mdRowArr]; 
    } else {
      // 这个情况考虑下 "items": {"type": "object"}
      // RowArr = [];
    }
  } 
  else if (type === 'object') {}
  else {
    if (items && items['$ref'] && items['$ref']!==ref) {
      const faRowArr = [`|${space}${key}|${type}|${required}|${description}|\n`];
      const mdRowArr = dealRef(items['$ref'], swaggerData, padding + 2);
      RowArr = [...faRowArr, ...mdRowArr]; 
    } else {
      RowArr = [`|${space}${key}|${type}|${required}|${description}|\n`];
    }
  }
  return RowArr;
};

// 转换成‘&emsp’空格
const convertToSpace = (padding) => {
  let space = '';
  for (let i = 0; i < padding; i++) {
    space += '&emsp;';
  }
  return space;
};

module.exports = {
  dealRef
};