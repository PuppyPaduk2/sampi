// const child_process = require('child_process');

const inquirer = require('inquirer');

const create = require('./create');
const getOnlyDir = require('../../../common/getOnlyDir');
const configComponents = require('./config-components');

inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

module.exports = async () => {
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Select type component:',
      choices: getOnlyDir(`${__dirname}/templates`),
    },
  ]);
  const { cloneDirCallback, afterCreate } = configComponents[type];
  const { isCreate, resultQuestions } = await create(
    `${__dirname}/templates/${type}`,
    cloneDirCallback,
  );

  if (isCreate && afterCreate) {
    afterCreate(resultQuestions);
  }
};
