#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

const package = require('../package.json');
const config = require('../config');

/**
 * Require command file and run default export function
 *
 * @param {string} commandName
 */
const initCommand = commandName => require(`${config.paths.commands}/${commandName}`)();

// Init all commands
fs.readdirSync(config.paths.commands).forEach(initCommand);

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
