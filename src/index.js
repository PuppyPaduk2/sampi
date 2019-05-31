#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const package = require('../package.json');

const commandsPath = `${__dirname}/core/commands`;

const initCommand = commandName => require(`${commandsPath}/${commandName}`)();

// Init all commands
fs.readdirSync(commandsPath).forEach(initCommand);

program.version(package.version);
program.parse(process.argv);

if (!program.args.length) {
  program.help();
}
