const fs = require('fs');

const cloneFile = require('./clone-file');

/**
 *
 * @param {String} path
 */
const createDir = (path) => {
  const isExist = fs.existsSync(path);
  if (isExist === false) {
    fs.mkdirSync(path);
  }
};

/**
 *
 * @param {String} path
 */
const createRecursiveDir = (path) => {
  path.split('/').reduce((memo, element) => {
    createDir(memo);
    return `${memo}${element}/`;
  }, '/');
  createDir(path);
};

/**
 * @param {String} pathFrom
 * @param {String} pathTo
 * @param {{ [nameProp: string]: Function }} [extenstions]
 */
const cloneDir = (pathFrom, pathTo, extenstions) => {
  const isDir = fs.statSync(pathFrom).isDirectory();

  if (isDir) {
    createRecursiveDir(pathTo);
    fs.readdirSync(pathFrom).forEach((fileName) => {
      cloneDir(`${pathFrom}/${fileName}`, `${pathTo}/${fileName}`, extenstions);
    });
  } else {
    cloneFile(pathFrom, pathTo, extenstions);
  }
};

module.exports = cloneDir;
module.exports.createRecursiveDir = createRecursiveDir;
module.exports.createDir = createDir;
