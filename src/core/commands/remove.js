const program = require('commander');
const ora = require('ora');
const inquirer = require('inquirer');

const { remove } = require('../common/shell');
const questions = require('../questions');

const removeTemplate = (packageConfig, nameTemplate) => {
  const indicator = ora('Removing template').start();

  remove(`${packageConfig.paths.templates}/${nameTemplate}`, () => indicator.succeed('Remove template!'));
};

const action = packageConfig => (nameTemplate) => {
  if (!nameTemplate) {
    inquirer.prompt(questions.nameTemplate(packageConfig)).then(({ nameTemplate }) => {
      removeTemplate(packageConfig, nameTemplate);
    });
  } else {
    removeTemplate(packageConfig, nameTemplate);
  }
};

module.exports = packageConfig => program
  .command('remove [nameTemplate]')
  .description('Remove template')
  .action(action(packageConfig));
