const program = require('commander');
const ora = require('ora');
const inquirer = require('inquirer');

const { remove } = require('../common/shell');
const questions = require('../questions');

const config = require('../../config');

const removeTemplate = (nameTemplate) => {
  const indicator = ora('Removing template').start();

  remove(`${config.paths.templates}/${nameTemplate}`, () => indicator.succeed('Remove template!'));
};

const action = (nameTemplate) => {
  if (!nameTemplate) {
    inquirer.prompt(questions.nameTemplate()).then(({ nameTemplate }) => {
      removeTemplate(nameTemplate);
    });
  } else {
    removeTemplate(nameTemplate);
  }
};

module.exports = () => program
  .command('remove [nameTemplate]')
  .description('Remove template')
  .action(action);
