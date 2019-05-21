const fs = require('fs');

module.exports = async (path) => {
  let result = false;

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);

    result = true;
  }

  return result;
}
