const fs = require('fs');

const config = require('../../../config');

// Path to `modules.json`
const { modulesJson } = config.paths;

// Create `modules.json`
const createModulesJson = () => {
  if (!fs.existsSync(modulesJson)) {
    fs.writeFileSync(modulesJson, '{}');
  }
};

/**
 * Check exist `modules.json`
 *
 * @returns {Promise<boolean>}
 */
const existModulesJson = () => fs.existsSync(modulesJson);

/**
 * @param {String} nameModule
 * @param {String} path
 *
 * @returns {Promise<boolean>}
 */
const addModule = async (nameModule, path) => {
  // Create `modules.json`
  createModulesJson();

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
 * Delete module from `modules.json`
 * @param {String} nameModule
 *
 * @returns {Promise<boolean>}
 */
const deleteModule = async (nameModule) => {
  let result = false;

  if (existModulesJson()) {
    const modules = require(modulesJson);

    if (modules[nameModule]) {
      delete modules[nameModule];
      fs.writeFileSync(modulesJson, JSON.stringify(modules, null, '  '));
      result = true;
    }
  }

  return result;
};

/**
 * Get path to module
 * @param {String} nameModule
 *
 * @returns {Promise<string>}
 */
const getPathModule = async (nameModule) => {
  if (existModulesJson()) {
    const modules = require(modulesJson);
    return modules[nameModule] || config.paths.defaultModule;
  }
  return config.paths.defaultModule;
};

/**
 * Get list modules
 *
 * @returns {Promise<Array<string>>}
 */
const getListModules = async () => {
  if (existModulesJson()) {
    const modules = require(modulesJson);
    return Object.keys(modules);
  }

  return [];
};

module.exports.existModulesJson = existModulesJson;
module.exports.addModule = addModule;
module.exports.deleteModule = deleteModule;
module.exports.getPathModule = getPathModule;
module.exports.getListModules = getListModules;
