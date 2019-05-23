const inquirer = require('inquirer');
const fs = require('fs');

const getOnlyDir = require('./getOnlyDir');

/**
 * @param {Object} props
 * @param {string} props.path
 * @param {string} props.message
 */
module.exports = async ({ path, message }) => {
  const modules = getOnlyDir(path);
  const result = {};

  if (modules.length) {
    const { moduleName } = await inquirer.prompt([
      {
        type: 'list',
        name: 'moduleName',
        choices: modules,
        message,
      },
    ]);

    if (fs.existsSync(`${path}/${moduleName}/index.js`)) {
      require(`${path}/${moduleName}`)();
    } else {
      throw new Error("Module don't have `index.js`!");
    }
  } else {
    throw new Error("Modules does't exist!");
  }

  return result;
};
