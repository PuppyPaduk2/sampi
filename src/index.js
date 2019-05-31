#!/usr/bin/env node

const program = require('commander');

const package = require('../package.json');

program.version(package.version);

program.command('init').action(() => console.log('init'));

require('./core/commands/create')();
require('./core/commands/remove')();
require('./core/commands/run')();

program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
