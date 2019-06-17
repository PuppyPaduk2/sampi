const program = require('commander');

const action = require('./action');

module.exports = () => program
  .command('unlink [nameModule]')
  .description('Unlink module')
  .action(action);
