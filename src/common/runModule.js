const inquirer = require('inquirer');
const fs = require('fs');

const getOnlyDir = require('./getOnlyDir');

/**
 * @param {string} path
 */
module.exports = async (path) => {
  const modules = getOnlyDir(path);
  let result = {};

  if (modules.length) {
    result = inquirer
      .prompt([
        {
          type: 'list',
          name: 'moduleName',
          message: 'Select module',
          choices: modules,
        },
      ])
      .then(({ moduleName }) => {
        if (fs.existsSync(`${path}/${moduleName}/index.js`)) {
          require(`${path}/${action}`)();
        } else {
          throw new Error("Module don't have `index.js`!");
        }
      });
  } else {
    throw new Error("Modules does't exist!");
  }

  return result;
};
