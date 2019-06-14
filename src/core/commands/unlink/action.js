const inquirer = require('inquirer');
const ora = require('ora');
const fs = require('fs');

const config = require('../../../config');

/**
 * Delete module from modules.json
 * @param {String} nameModule
 */
const deleteModule = async (nameModule) => {
  const modules = require(config.paths.modulesJson);
  let result = false;

  if (modules[nameModule]) {
    delete modules[nameModule];
    fs.writeFileSync(config.paths.modulesJson, JSON.stringify(modules, null, '  '));
    result = true;
  }

  return result;
};

const getNameModule = async () => {
  const modules = require(config.paths.modulesJson);
  const { nameModule } = await inquirer.prompt([
    {
      type: 'list',
      name: 'nameModule',
      message: 'Select module',
      choices: Object.keys(modules),
    },
  ]);
  return nameModule;
};

const unlink = async (nameModule) => {
  const indicator = ora('Unlink module').start();

  if (fs.existsSync(config.paths.modulesJson)) {
    if (!nameModule) {
      indicator.stop();

      // Get name module
      nameModule = await getNameModule();
      indicator.start();
    }

    const resultDelete = await deleteModule(nameModule);
    if (resultDelete) {
      indicator.succeed('Module unlink');
    } else {
      indicator.fail(`Module with name \`${nameModule}\` doesn't exist`);
    }
  } else {
    indicator.fail("Modules doesn't exist");
  }
};

module.exports = (...args) => {
  unlink(...args);
};
module.exports.deleteModule = deleteModule;
module.exports.getNameModule = getNameModule;
