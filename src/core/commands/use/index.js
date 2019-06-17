const program = require('commander');

const action = require('./action');

module.exports = () => program
  .command('use [nameModule]')
  .option('-p, --path <path>', 'Path to used template')
  .description('Link module with templates')
  .action(action);
