/* global require */
/* global module */

const inquirer = require('inquirer');

const cfs = require('../../common/cfs');
const template = require('./tpl/index');
const Logger = require('../../common/logger');
const config = require('../../config');
const path = require('path');
const { PROJ } = config;

const initTpl = (templateName) => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'template name',
      default: templateName
    },
    {
      type: 'list',
      name: 'type',
      message: 'template type',
      choices: ['json','js'],
      default: 'json'
    }
  ]).then((result) => {
    const fileName = `${ result.name }.${ result.type }`;
    const filePath = path.join(PROJ, fileName);
    // 模板内容
    let fileContent = template.jsonTpl;
    if (result.type === 'js') {
      fileContent = template.jsTpl;
    }
    cfs.writeFile(filePath, fileContent).then(data => {
      if (data) {
        Logger.SUCCESS('generate template success');
      }
    });
  })
};

module.exports = {
  initTpl
};
