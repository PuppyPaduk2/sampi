const fs = require('fs');
const ora = require('ora');

const config = require('../../../config');

// Path to modules.json
const { modulesJson } = config.paths;

/**
 * @param {String} nameModule
 * @param {Object} options
 * @param {String} [options.path]
 */
const main = async ({ nameModule, path }) => {
  if (!fs.existsSync(modulesJson)) {
    fs.writeFileSync(modulesJson, '{}');
  }

  const modules = require(modulesJson);
  let result = false;

  if (!modules[nameModule]) {
    modules[nameModule] = path;
    fs.writeFileSync(modulesJson, JSON.stringify(modules, null, '  '));
    result = true;
  }

  return result;
};

/**
 * Get path to module
 * @param {String} nameModule
 */
const getPath = async (nameModule) => {
  const modules = require(modulesJson);
  return modules[nameModule];
};

/**
 * @param {String} nameModule
 * @param {Object} options
 * @param {String} [options.path]
 */
module.exports = async (nameModule, { path }) => {
  const indicator = ora('Create link').start();
  const result = await main({
    path: process.cwd() + (path ? `/${path}` : ''),
    nameModule,
  });

  if (result) {
    indicator.succeed('Link to module created');
  } else {
    indicator.fail(`Module with name '${nameModule}' exiest yet!`);
  }

  return result;
};

module.exports.main = main;
module.exports.getPath = getPath;
