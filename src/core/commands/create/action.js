const ora = require('ora');
const fs = require('fs');

const modules = require('../../common/modules');
const cloneDir = require('../../common/clone-dir');

const create = async (nameTemplate, { nameModule, path }) => {
  const indicator = ora('Create template').start();

  // Get path to module by `nameModule`
  const pathToModule = await modules.getPathModule(nameModule);

  // Create folder
  const pathTo = `${pathToModule}/${nameTemplate}/template`;
  if (fs.existsSync(pathTo)) {
    indicator.fail('Template exist already');
  } else {
    cloneDir.createRecursiveDir(pathTo);

    // Clone template
    const pathFrom = process.cwd() + (path ? `/${path}` : '');
    indicator
      .info(`From: ${pathFrom}`)
      .info(`To: ${pathTo}`)
      .start();
    cloneDir(pathFrom, pathTo);

    indicator.succeed('Template created');
  }
};

module.exports = (...args) => {
  create(...args);
};
