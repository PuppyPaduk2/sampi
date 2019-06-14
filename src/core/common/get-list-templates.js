const fs = require('fs');

/**
 * getListTemplates()
 *
 * @param {string} path - path to folder with templates
 * @param {string} [prefix] - for get subtemplates (recursive `getListTemplates`)
 *
 * @returns {Array<string>} list templates
 */
const getListTemplates = (path, prefix = '') => {
  const parseFile = (result, file) => {
    if (fs.existsSync(`${path}/${file}/template`)) {
      result.push(`${prefix}${file}`);
    } else {
      result = [...result, ...getListTemplates(`${path}/${file}`, `${file}/`)];
    }

    return result;
  };

  const isDir = fs.statSync(path).isDirectory();
  if (isDir) {
    return fs.readdirSync(path).reduce(parseFile, []);
  }

  return [];
};

module.exports = getListTemplates;
