// const child_process = require('child_process');

const inquirer = require('inquirer');

const create = require('./create');
const getOnlyDir = require('../../common/getOnlyDir');
const moveStyled = require('./move-styled');

const PATH_COMPONENTS = `${__dirname}/../../templates/components`;

const configComponents = {
  FC: {
    cloneDirCallack: ({ name }) => ({ fileStr }) =>
      fileStr.replace(/{{ COMPONENT_NAME }}/g, name),
    afterCreate: moveStyled
  },
  Container: {},
};

inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));

module.exports = async () => {
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'Select type component',
      choices: getOnlyDir(PATH_COMPONENTS)
    }
  ]);
  const configComponent = configComponents[type];
  const { isCreate, resultQuestions } = await create(
    `${PATH_COMPONENTS}/${type}`,
    configComponent.cloneDirCallack
  );

  if (isCreate && configComponent.afterCreate) {
    configComponent.afterCreate(resultQuestions);
  }
};
