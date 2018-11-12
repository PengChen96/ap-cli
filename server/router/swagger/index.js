/* global require */
/* global module */
const cfs = require('../../../common/cfs');
const Logger = require('../../../common/logger');
const parseSwagger = require('./parseSwagger');
const config = require('../../../config');
const { PROJ } = config;

/**
 * swagger转换为接口模板文件
 * @param fileName 需转换的swagger.json文件名
 */
const convertToJsonTpl = (fileName) => {
  cfs.readFile(`${PROJ}/${fileName}`).then((result) => {
    const resp = JSON.parse(result);
    // 要写入的新文件
    const filePath = `${PROJ}\\${fileName.split('.')[0]}_new.json`;
    // 要写入的内容
    const content = parseSwagger.formatSwaggerData(resp);
    cfs.writeFile(filePath, JSON.stringify(content)).then((data) => {
      if (data) {
        Logger.SUCCESS(`生成${filePath}成功！`);
      }
    }).catch((error) => {
      Logger.ERROR(`writeFile -- ${error}`);
    });
  }).catch((error) => {
    Logger.ERROR(error);
  });
};

module.exports = {
  convertToJsonTpl
}