#!/usr/bin/env node

const program = require('commander');

const package = require('../package.json');

const { remove, create, clone } = require('./shell');
const cloneDir = require('./clone-dir');

program.version(package.version);

program.command('init').action(() => console.log('init'));

program
  .command('remove [nameTemplate]')
  .alias('rm')
  .description('Remove template')
  .action(nameTemplate => {
    remove(`${__dirname}/templates/${nameTemplate}`, () => console.log('Remove template!'));
  });

program
  .command('create [nameTemplate]')
  .alias('cr')
  .option('-p, --path <path>', 'Path to template')
  .description('Create template')
  .action((nameTemplate, { path = '.' }) => {
    const templatePath = `${__dirname}/templates/${nameTemplate}`;

    remove(templatePath, () => {
      create(templatePath, () => {
        clone(path, templatePath, () => {
          console.log('Create template!');
        });
      });
    });
  });

program
  .command('run [nameTemplate]')
  .option('-p, --path <path>', 'Path to template')
  .option('-c, --config <path>', 'Path to config')
  .description('Run template')
  .action((nameTemplate, { path = '.' }) => {
    const templatePath = `${__dirname}/templates/${nameTemplate}`;

    cloneDir(templatePath, path);
  });

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
