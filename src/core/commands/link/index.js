const program = require('commander');

const action = require('./action');

module.exports = () => program
  .command('link <nameModule>')
  .option('-p, --path <path>', 'Path to module')
  .description('Link module with templates')
  .action(action);
