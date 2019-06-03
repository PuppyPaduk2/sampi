#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

const package = require('../package.json');
const defaultConfig = require('./default-config');

let config = null;

try {
  config = require('./config');
} catch (e) {
  config = null;
}

const commandsPath = config ? config.paths.commands : defaultConfig.paths.commands;

/**
 * Require command file and run default export function
 *
 * @param {string} commandName
 */
const initCommand = commandName => require(`${commandsPath}/${commandName}`)();

// Init all commands
fs.readdirSync(commandsPath).forEach(initCommand);

// Setup main options and version
program.option(
  '-C, --config <path>',
  'Path to config `sampi`',
  value => `${process.env.PWD}/${value}`,
  `${__dirname}/${config ? 'config' : 'default-config'}`,
);
program.version(package.version);
program.parse(process.argv);

// If run only `sampi`, return `help`
if (!program.args.length) {
  program.help();
}
