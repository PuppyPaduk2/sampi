#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

const package = require('../package.json');

const { remove, create, clone } = require('./shell');
const cloneDir = require('./clone-dir');

program.version(package.version);

program.command('init').action(() => console.log('init'));

program
  .command('remove <nameTemplate>')
  .description('Remove template')
  .action(nameTemplate => {
    remove(`${__dirname}/templates/${nameTemplate}`, () => console.log('Remove template!'));
  });

program
  .command('create <nameTemplate>')
  .option('-p, --path <path>', 'Path to template')
  .option('-c, --config <path>', 'Path to config')
  .description('Create template')
  .action((nameTemplate, { path = '.', config }) => {
    const templatePath = `${__dirname}/templates/${nameTemplate}`;

    remove(templatePath, () => {
      create(templatePath, () => {
        clone(path, `${templatePath}/template`, () => {
          if (config) {
            clone(config, `${templatePath}/config.js`, () => {
              console.log('Create template!');
            });
          } else {
            console.log('Create template!');
          }
        });
      });
    });
  });

program
  .command('run <nameTemplate>')
  .option('-p, --path <path>', 'Path to template')
  .description('Run template')
  .action((nameTemplate, { path = '.' }) => {
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
        cloneDir(`${templatePath}/template`, `${path}/${commandConfig.path || ''}`, config);
      });
    } else {
      cloneDir(`${templatePath}/template`, path);
    }
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
