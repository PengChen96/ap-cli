/* global require */
/* global module */

const fs = require('fs');

let timer = null;
const cwatch = (path) => {
  return new Promise((resolve, reject) => {
    fs.watch(path, {
      persistent: true, // 设为false时，不会阻塞进程。
      recursive: false
    }, (event, filename) => {
      if (event === 'change') {
        console.log('+++++++++++++检测到变化');
        resolve(filename);
      }
    });
  });
}

// 判断文件夹是否存在（同步）
const existsSync = (path) => {
  return fs.existsSync(path);
};

// 创建文件夹（同步）
const mkdirSync = (path) => {
  return fs.mkdirSync(path);
};

// 判断文件夹是否存在 (异步)
const exists = (path) => {
  return new Promise((resolve, reject) => {
    fs.exists(path, function(err, data){
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// 创建文件夹(异步)
const mkdir = (path) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, function(err, data){
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// 读取path下【文件夹的名字和文件名】  返回 Array
const readdir = (path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
// 读取文件内容   返回 String
const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  });
};

// 写入文件（追加方式）
const appendFile = (path, text) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, text, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

// 写入文件（覆盖方式）
const writeFile = (path, text) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, text, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

module.exports = {
  cwatch,
  existsSync,
  mkdirSync,
  exists,
  mkdir,
  readdir,
  readFile,
  appendFile,
  writeFile
};