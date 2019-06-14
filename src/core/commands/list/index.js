const program = require('commander');

const action = require('./action');

module.exports = () => program
  .command('list <what>')
  .description('Get list [modules]')
  .action(action);
