#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

const package = require('../package.json');

// Path to commands
const pathCommands = `${__dirname}/core/commands`;

/**
 * Require command file and run default export function
 *
 * @param {string} commandName
 */
const initCommand = commandName => require(`${pathCommands}/${commandName}`)();

// Init all commands
fs.readdirSync(pathCommands).forEach(initCommand);

// Setup main options and version
program.option(
  '-C, --config <path>',
  'Path to config `sampi`',
  value => `${process.env.PWD}/${value}`,
);
program.version(package.version);
program.parse(process.argv);

// If run only `sampi`, return `help`
if (!program.args.length) {
  program.help();
}
