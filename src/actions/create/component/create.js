const ora = require('ora');
const inquirer = require('inquirer');

const cloneDir = require('../../../common/cloneDir');

/**
 * @param {string} pathComponent
 * @param {() => () => string} [cloneDirCallback]
 */
module.exports = async (pathComponent, cloneDirCallback) => {
  const resultQuestions = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Name component: ',
      validate: value => (value ? true : 'Insert name component!'),
    },
    {
      type: 'fuzzypath',
      name: 'path',
      message: 'Select a target directory for your component:',
      itemType: 'directory',
      rootPath: './',
    },
  ]);
  let isCreate = false;
  let { name } = resultQuestions;
  const { path } = resultQuestions;

  name = name.replace(/ /g, '_');

  const pathTo = `${path}/${name}`;
  const spinner = ora('Create component').start();
  const isCloned = await cloneDir(
    pathComponent,
    pathTo,
    cloneDirCallback ? cloneDirCallback(resultQuestions) : undefined,
  );

  if (isCloned === false) {
    spinner.fail('The component with the entered name exists!');
  } else {
    spinner.succeed('The component created!');

    isCreate = true;
  }

  return {
    resultQuestions,
    isCreate,
  };
};
