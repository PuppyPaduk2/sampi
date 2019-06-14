const ora = require('ora');
const inquirer = require('inquirer');
const fs = require('fs');

const createAction = require('../create/action');
const getListTemplates = require('../../common/get-list-templates');
const cloneDir = require('../../common/clone-dir');
const package = require('../../../index');

const use = async (nameModule, { path }) => {
  const indicator = ora('Use template').start();

  // Get path to module
  const pathModule = await createAction.getPathToModule(nameModule);
  indicator.info(`Path to module: ${pathModule}`);

  // Get name template
  const { nameTemplate } = await inquirer.prompt([
    {
      type: 'list',
      name: 'nameTemplate',
      message: 'Select template',
      choices: getListTemplates(pathModule),
    },
  ]);

  // Clone template
  const pathTo = process.cwd() + (path ? `/${path}` : '');
  const pathTemplate = `${pathModule}/${nameTemplate}`;
  const pathFrom = `${pathTemplate}/template`;
  const pathIndex = `${pathTemplate}/index.js`;

  // Check `index.js`, if exist run his
  if (fs.existsSync(pathIndex)) {
    await require(pathIndex)(
      {
        pathModule,
        pathTemplate,
        pathFrom,
        pathTo,
      },
      package,
      { inquirer, ora },
    );
  } else {
    indicator
      .info(`From: ${pathFrom}`)
      .info(`To: ${pathTo}`)
      .start('Setup template');
    cloneDir(pathFrom, pathTo);
  }

  indicator.succeed('Template used');
};

module.exports = (...args) => {
  use(...args);
};
