const program = require('commander');
const fs = require('fs');
const ora = require('ora');
const inquirer = require('inquirer');

const questons = require('../questions');
const cloneDir = require('../common/clone-dir');

const cloneTemplate = (pathFrom, pathTo, config) => {
  const indicator = ora('Running template').start();
  cloneDir(pathFrom, pathTo, config);
  indicator.succeed('Run template!');
};

/**
 * getConfig = () => Promise<[
 *    config: { [propName: string]: () => string },
 *    commandConfig: { path: string }
 * ]>
 */
const runTemplate = ({ packageConfig, nameTemplate, path }) => {
  const templatePath = `${packageConfig.paths.templates}/${nameTemplate}`;
  const templateFilesPath = `${templatePath}/template`;

  if (fs.existsSync(`${templatePath}/config.js`)) {
    const getConfig = require(`${templatePath}/config.js`);

    getConfig().then(([config, commandConfig]) => {
      cloneTemplate(templateFilesPath, `${path}/${commandConfig.path || ''}`, config);
    });
  } else {
    cloneTemplate(templateFilesPath, path);
  }
};

const action = packageConfig => (nameTemplate, { path = '.' }) => {
  if (!nameTemplate) {
    inquirer.prompt(questons.nameTemplate(packageConfig)).then(({ nameTemplate }) => {
      runTemplate({ packageConfig, nameTemplate, path });
    });
  } else {
    runTemplate({ packageConfig, nameTemplate, path });
  }
};

module.exports = packageConfig => program
  .command('run [nameTemplate]')
  .option('-p, --path <path>', 'Path to template')
  .description('Run template')
  .action(action(packageConfig));
