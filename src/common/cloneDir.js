const fs = require('fs');

const createDir = require('./createDir');
const cloneFile = require('./cloneFile');

/**
 * @param {String} pathFrom
 * @param {String} pathTo
 * @param {Function} callback
 */
const cloneDir = async (pathFrom, pathTo, callback) => {
  const isCreated = await createDir(pathTo);
  let result = false;

  if (isCreated) {
    fs.readdirSync(pathFrom).forEach((fileName) => {
      const pathFromFile = `${pathFrom}/${fileName}`;
      const pathToFile = `${pathTo}/${fileName}`;

      if (fs.statSync(pathFromFile).isDirectory()) {
        cloneDir(pathFromFile, pathToFile, callback);
      } else {
        cloneFile(pathFromFile, pathToFile, callback);
      }
    });

    result = true;
  }

  return result;
};

module.exports = cloneDir;
