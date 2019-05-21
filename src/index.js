#!/usr/bin/env node

const program = require('commander');

const package = require('../package.json');

program.version(package.version);

program
  .command('create')
  .alias('crt')
  .action(() => {
    console.log('action create');
  });

program.parse(process.argv);
