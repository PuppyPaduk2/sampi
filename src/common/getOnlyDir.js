const fs = require('fs');

/**
 * @param {string} path
 */
module.exports = (path) => {
  let result = [];

  if (path && fs.existsSync(path)) {
    result = fs.readdirSync(path).filter(fileName => (
      fs.statSync(`${path}/${fileName}`).isDirectory()
    ));
  }

  return result;
};
