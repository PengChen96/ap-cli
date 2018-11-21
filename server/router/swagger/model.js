/* global require */
/* global module */


const queryData = (hash) => {
  let result = (hash.substring(2, hash.length)).split('/');
  return result[1];
};

//递归替换
const dealModel = (definitions, GlobalDefinitions, prevKey) => {
    let result = {};
    let type = definitions && definitions.type ? definitions.type : '';
    if (type) {
        if (type == 'string') {
            result = 'string';
        }
        if (type == 'integer') {
            result = 0;
        }
        if (type == 'number') {
            result = 0.01;
        }
        if (type == 'boolean') {
            result = false;
        }
        if (type == 'object') {
            if (definitions.properties) {
                result = definitions.properties;
                for (let key in result) {
                    //防止递归数据造成死循环
                    if (result[key].type && result[key].type == 'array' && result[key].items['$ref'] && (queryData(result[key].items['$ref']) == prevKey)) {
                        result[key] = {};
                    } else {
                        result[key] = dealModel(result[key], GlobalDefinitions, key);
                    }
                }
            } else {
                result = {};
            }
        }
        if (type == 'array') {
            let items = definitions.items;
            if (items.type) {
                dealModel(items, GlobalDefinitions);
            } else {
                let objkey = queryData(definitions.items['$ref']);
                //防止递归数据造成死循环
                if (objkey != prevKey) {
                    result = [dealModel(GlobalDefinitions[objkey], GlobalDefinitions, objkey)];
                } else {
                    result = {};
                }
            }
        }
    } else {
        let goObject = definitions['$ref'] ? definitions['$ref'] : '';
        if (goObject) {
            let objkey = queryData(goObject);
            result = dealModel(GlobalDefinitions[objkey], GlobalDefinitions);
        } else {
            result = 'OK';
        }
    }
    return result;
};

module.exports = {
  queryData,
  dealModel
};