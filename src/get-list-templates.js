const fs = require('fs');

/**
 * @param {string} path
 * @param {string} [prefix]
 *
 * @returns {Array<string>}
 */
const getListTemplates = (path, prefix = '') => fs.readdirSync(path).reduce((result, file) => {
  if (fs.existsSync(`${path}/${file}/template`)) {
    result.push(`${prefix}${file}`);
  } else {
    result = [...result, ...getListTemplates(`${path}/${file}`, `${file}/`)];
  }

  return result;
}, []);

module.exports = getListTemplates;
