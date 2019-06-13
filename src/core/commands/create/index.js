const program = require('commander');

const action = require('./action');

module.exports = () => program
  .command('create <nameTemplate>')
  .option('-p, --path <path>', 'Path to template')
  .option('-m, --name-module <nameModule>', 'Name module')
  .description('Create template')
  .action(action);
