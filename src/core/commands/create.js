const program = require('commander');
const ora = require('ora');
const fs = require('fs');
const pt = require('path');

const { remove, create, clone } = require('../common/shell');

const action = (nameTemplate, { path = '.', templateConfig }) => {
  const sampiConfig = require(program.config);
  const templatePath = `${sampiConfig.paths.templates}/${nameTemplate}`;
  const indicator = ora('Create template').start();
  const cbSucceed = () => indicator.succeed('Create template!');

  remove(templatePath, () => {
    let pathTo = `${templatePath}/template`;

    create(pathTo, () => {
      if (fs.statSync(path).isDirectory() === false) {
        pathTo = `${pathTo}/${pt.basename(path)}`;
      }

      clone(path, pathTo, (err) => {
        if (err) {
          indicator.fail(err.message);
        } else if (templateConfig) {
          clone(templateConfig, `${templatePath}/config.js`, cbSucceed);
        } else {
          cbSucceed();
        }
      });
    });
  });
};

module.exports = () => program
  .command('create <nameTemplate>')
  .option('-p, --path <path>', 'Path to template')
  .option('-c, --template-config <path>', 'Path to config template')
  .description('Create template')
  .action(action);
