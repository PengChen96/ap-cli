/**
 * Created by PC on 2018/10/28.
 */

/**
 * 将swagger.json转换成下面格式的JSON文件
 * {
 *    URI: '/api/get/index',
 *    method: 'get',
 *    response: {...}
 * }
 * @param swaggerData swagger.json数据
 */
const formatSwaggerData = (swaggerData) => {
  const interfaceData = [];
  const { paths } = swaggerData;
  for (const uri in paths) {
    const method = Object.keys(paths[uri])[0];
    // http状态200的返回数据对象
    const schema = paths[uri][method].responses[200].schema;
    const arr = schema.$ref.split('/');
    arr.shift();
    // 返回数据引用对象
    let respData = swaggerData;
    arr.forEach(function(item) {
      respData = respData[item];
    });
    const response = formatResponseData(respData);
    const itemObj = {
      URI: uri,
      method: method,
      response: response
    };
    interfaceData.push(itemObj);
  }
  console.log(JSON.stringify(interfaceData), 'final');
  return interfaceData;
}
/**
  * 组成response接口返回数据
  * @param respDataModel 接口返回数据模型
  */
const formatResponseData = (respDataModel) => {
  const response = createType(respDataModel.type);
  createProp(response, respDataModel.properties);
  return response;
};
const createProp = (target, props) => {
  for (const prop in props) {
    if (Object.keys(props[prop]).length === 1) {
      target[prop] = createType(props[prop].type);
    } else {
      if (prop !== 'type') {
        target[prop] = createType(props[prop].type);
        createProp(target[prop], props[prop]);
      }
    }
  }
  return target;
};
createType = (type) => {
  let data = 'type1---';
  if (type === 'object') {
    data = {};
  }
  if (type === 'array') {
    data = ['array--'];
  }
  return data;
};

module.exports = {
  formatSwaggerData
}