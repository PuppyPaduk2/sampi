const ora = require('ora');
const inquirer = require('inquirer');
const fs = require('fs');

const createAction = require('../create/action');
const getListTemplates = require('../../common/get-list-templates');
const cloneDir = require('../../common/clone-dir');
const package = require('../../../index');

const use = async (nameTemplate, { nameModule, path }) => {
  const indicator = ora('Use template').start();

  // Get path to module
  const pathToModule = await createAction.getPathToModule(nameModule);
  indicator.info(`Path to module: ${pathToModule}`);

  // Get correct name template
  if (!nameTemplate) {
    const resQuestions = await inquirer.prompt([
      {
        type: 'list',
        name: 'nameTemplate',
        message: 'Select template',
        choices: getListTemplates(pathToModule),
      },
    ]);
    nameTemplate = resQuestions.nameTemplate;
  }

  // Clone template
  const pathTo = process.cwd() + (path ? `/${path}` : '');
  const pathTemplate = `${pathToModule}/${nameTemplate}`;
  const pathFrom = `${pathTemplate}/template`;
  const pathIndex = `${pathTemplate}/index.js`;

  // Check `index.js`, if exist run his
  if (fs.existsSync(pathIndex)) {
    indicator.start('Setup template');
    await require(pathIndex)({ indicator, pathFrom, pathTo, pathTemplate });
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
