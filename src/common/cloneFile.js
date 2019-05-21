const fs = require('fs');

/**
 * @param {String} pathFrom
 * @param {String} pathTo
 * @param {Function} [callback]
 */
module.exports = (pathFrom, pathTo, callback) => {
  const file = fs.readFileSync(pathFrom);
  let fileStr = file.toString();

  if (callback) {
    fileStr = callback({
      fileStr,
      file,
      pathFrom,
      pathTo,
    });
  }

  fs.writeFileSync(pathTo, fileStr);
};
