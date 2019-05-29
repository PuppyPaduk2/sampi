const fs = require('fs');
const path = require('path');

/**
 * @param {String} pathFrom
 * @param {String} pathTo
 * @param {{ [nameProp: string]: Function }} [callbacks]
 */
module.exports = (pathFrom, pathTo, callbacks = {}) => {
  const file = fs.readFileSync(pathFrom);
  let fileStr = file.toString();
  const callback = callbacks[path.extname(pathFrom)];

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
