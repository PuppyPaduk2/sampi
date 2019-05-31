const program = require('commander');
const ora = require('ora');

const { remove, create, clone } = require('../common/shell');

const action = (nameTemplate, { path = '.', config }) => {
  const sampiConfig = require(program.config);
  const templatePath = `${sampiConfig.paths.templates}/${nameTemplate}`;
  const indicator = ora('Created template').start();

  remove(templatePath, () => {
    create(templatePath, () => {
      clone(path, `${templatePath}/template`, () => {
        if (config) {
          clone(config, `${templatePath}/config.js`, () => {
            indicator.succeed('Create template!');
          });
        } else {
          indicator.succeed('Create template!');
        }
      });
    });
  });
};

module.exports = () => program
  .command('create <nameTemplate>')
  .option('-p, --path <path>', 'Path to template')
  .option('-c, --config <path>', 'Path to config template')
  .description('Create template')
  .action(action);
