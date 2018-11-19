/* global module */

/**
 * 默认值
 */
const defaultData = {
  // 接口概述
  summary: 'xxx接口',
  // 接口地址（重要）
  url: '/api',
  // 接口请求方式（重要）
  method: 'get',
  // 接口请求参数
  parameters: '接口请求参数',
  // 接口响应数据（重要）
  response: '接口响应数据',
};

/**
 * 设置默认值
 * @param itemRouteData 读取的单个路由数据
 */
const defaultSet = (itemRouteData) => {
  const data = Object.assign(defaultData, itemRouteData);
  return data
};

module.exports = {
  defaultSet
};