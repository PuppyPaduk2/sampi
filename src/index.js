#!/usr/bin/env node

const program = require('commander');
const package = require('../package.json');

program.option('-c, --config <path>', 'Path to `sampi` config', `${__dirname}/config`);

require('./core/commands/create')();
require('./core/commands/remove')();
require('./core/commands/run')();

program.version(package.version);
program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
