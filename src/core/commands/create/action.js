const ora = require('ora');
const fs = require('fs');

const linkAction = require('../link/action');
const cloneDir = require('../../common/clone-dir');

// Config default module
const defaultNameModule = 'main';
const defaultPathModule = `${__dirname}/../../../../templates`;

/**
 *
 * @param {String} nameModule
 */
const getPathToModule = async (nameModule) => {
  let result = await linkAction.getPath(nameModule || defaultNameModule);
  if (!result && nameModule) {
    indicator.warn(`Insert doesn't correct name-module, will be use ${defaultNameModule} module`);
    result = await linkAction.getPath(defaultNameModule);
  }
  return result;
};

const create = async (nameTemplate, { nameModule, path }) => {
  const indicator = ora('Create template').start();

  // Create link to `main` module
  if (!nameModule) {
    linkAction.main({ nameModule: defaultNameModule, path: defaultPathModule });
  }

  // Get path to module by `nameModule`
  const pathToModule = await getPathToModule(nameModule);

  // Create folder
  const pathTo = `${pathToModule}/${nameTemplate}/template`;
  if (fs.existsSync(pathTo)) {
    indicator.fail('Template exist already');
  } else {
    cloneDir.createRecursiveDir(pathTo);

    // Clone template
    const pathFrom = process.cwd() + (path ? `/${path}` : '');
    indicator.info(`From: ${pathFrom}`);
    indicator.info(`To: ${pathTo}`);
    cloneDir(pathFrom, pathTo);

    indicator.succeed('Template created');
  }
};

module.exports = (...args) => {
  create(...args);
};
module.exports.getPathToModule = getPathToModule;
