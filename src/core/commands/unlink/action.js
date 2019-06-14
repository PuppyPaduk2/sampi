const inquirer = require('inquirer');
const ora = require('ora');
const fs = require('fs');

const config = require('../../../config');

/**
 * Delete module from modules.json
 * @param {String} nameModule
 */
const deleteModule = (nameModule) => {
  const modules = require(config.paths.modulesJson);

  console.log(nameModule);

  if (modules[nameModule]) {
    delete modules[nameModule];
    fs.writeFileSync(config.paths.modulesJson, JSON.stringify(modules, null, '  '));
  }
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
    if (nameModule) {
      deleteModule(nameModule);
    } else {
      indicator.stop();

      // Get name module
      nameModule = await getNameModule();
      indicator.start();
      deleteModule(nameModule);
    }
    indicator.succeed('Module unlink');
  } else {
    indicator.fail("Modules doesn't exist");
  }
};

module.exports = (...args) => {
  unlink(...args);
};
module.exports.deleteModule = deleteModule;
