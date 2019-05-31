#!/usr/bin/env node

const program = require('commander');
const package = require('../package.json');
const packageConfig = require('./config');

require('./core/commands/create')(packageConfig);
require('./core/commands/remove')(packageConfig);
require('./core/commands/run')(packageConfig);

program.version(package.version);
program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
