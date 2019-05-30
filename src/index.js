#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const ora = require('ora');
const inquirer = require('inquirer');

const package = require('../package.json');

const { remove, create, clone } = require('./shell');
const cloneDir = require('./clone-dir');
const getListTemplates = require('./get-list-templates');

const selectTemplate = () =>
  inquirer.prompt([
    {
      type: 'list',
      name: 'nameTemplate',
      message: 'Select template',
      choices: getListTemplates(`${__dirname}/templates`),
    },
  ]);

const removeTemplate = nameTemplate => {
  const indicator = ora('Removing template').start();

  remove(`${__dirname}/templates/${nameTemplate}`, () => indicator.succeed('Remove template!'));
};

const runTemplate = ({ nameTemplate, path }) => {
  const templatePath = `${__dirname}/templates/${nameTemplate}`;

  if (fs.existsSync(`${templatePath}/config.js`)) {
    /**
     * getConfig = () => Promise<[
     *    config: { [propName: string]: () => string },
     *    commandConfig: { path: string }
     * ]>
     */
    const getConfig = require(`${templatePath}/config.js`);

    getConfig().then(([config, commandConfig]) => {
      const indicator = ora('Running template').start();

      cloneDir(`${templatePath}/template`, `${path}/${commandConfig.path || ''}`, config);

      indicator.succeed('Run template!');
    });
  } else {
    const indicator = ora('Running template').start();
    cloneDir(`${templatePath}/template`, path);

    indicator.succeed('Run template!');
  }
};

program.version(package.version);

program.command('init').action(() => console.log('init'));

program
  .command('remove [nameTemplate]')
  .description('Remove template')
  .action(nameTemplate => {
    if (!nameTemplate) {
      selectTemplate().then(({ nameTemplate }) => {
        removeTemplate(nameTemplate);
      });
    } else {
      removeTemplate(nameTemplate);
    }
  });

program
  .command('create <nameTemplate>')
  .option('-p, --path <path>', 'Path to template')
  .option('-c, --config <path>', 'Path to config')
  .description('Create template')
  .action((nameTemplate, { path = '.', config }) => {
    const templatePath = `${__dirname}/templates/${nameTemplate}`;
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
  });

program
  .command('run [nameTemplate]')
  .option('-p, --path <path>', 'Path to template')
  .description('Run template')
  .action((nameTemplate, { path = '.' }) => {
    if (!nameTemplate) {
      selectTemplate().then(({ nameTemplate }) => {
        runTemplate({ nameTemplate, path });
      });
    } else {
      runTemplate({ nameTemplate, path });
    }
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
