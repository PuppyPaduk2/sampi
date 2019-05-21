const fs = require('fs');

const cloneFile = require('./cloneFile');

/**
 * @param {String} pathFrom
 * @param {String} pathTo
 * @param {Function} [callback]
 */
module.exports = (pathFrom, pathTo, callback) => {
  cloneFile(pathFrom, pathTo, callback);

  fs.unlinkSync(pathFrom);
};