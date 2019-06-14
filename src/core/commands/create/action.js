const ora = require('ora');
const fs = require('fs');

const linkAction = require('../link/action');
const cloneDir = require('../../common/clone-dir');
const conifg = require('../../../config');

/**
 *
 * @param {String} nameModule
 */
const getPathToModule = async (nameModule) => {
  let result = await linkAction.getPath(nameModule || conifg.defaultModuleName);
  if (!result && nameModule) {
    indicator.warn(
      `Insert doesn't correct name-module, will be use ${conifg.defaultModuleName} module`,
    );
    result = await linkAction.getPath(conifg.defaultModuleName);
  }
  return result;
};

const create = async (nameTemplate, { nameModule, path }) => {
  const indicator = ora('Create template').start();

  // Create link to `main` module
  if (!nameModule) {
    linkAction.main({
      nameModule: conifg.defaultModuleName,
      path: conifg.paths.defaultModule,
    });
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
