#!/usr/bin/env node

const program = require('commander');

const package = require('../package.json');
const runModule = require('./common/runModule');

const CONFIG = {
  paths: {
    actions: `${__dirname}/actions`,
  },
};

program.version(package.version);

program.command('init').action(() => console.log('init'));

program.parse(process.argv);

runModule({
  path: CONFIG.paths.actions,
  message: 'Select action:',
});
