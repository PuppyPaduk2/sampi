const fs = require('fs');

const shell = require('./shell');
const cloneFile = require('./clone-file');

/**
 * @param {String} pathFrom
 * @param {String} pathTo
 * @param {{ [nameProp: string]: Function }} [callbacks]
 */
const cloneDir = (pathFrom, pathTo, callbacks) => {
  if (fs.statSync(pathFrom).isDirectory()) {
    shell.create(pathTo, () => {
      fs.readdirSync(pathFrom).forEach((fileName) => {
        cloneDir(`${pathFrom}/${fileName}`, `${pathTo}/${fileName}`, callbacks);
      });
    });
  } else {
    cloneFile(pathFrom, pathTo, callbacks);
  }
};

module.exports = cloneDir;
