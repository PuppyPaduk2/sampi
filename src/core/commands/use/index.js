const program = require('commander');

const action = require('./action');

module.exports = () => program
  .command('use [nameTemplate]')
  .option('-p, --path <path>', 'Path to used template')
  .option('-m, --name-module <nameModule>', 'Name module')
  .description('Link module with templates')
  .action(action);
