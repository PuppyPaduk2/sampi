const ora = require('ora');

const modules = require('../../common/modules');

/**
 * @param {String} nameModule
 * @param {Object} options
 * @param {String} [options.path]
 */
module.exports = async (nameModule, { path }) => {
  const indicator = ora('Create link').start();
  const result = await modules.addModule(nameModule, process.cwd() + (path ? `/${path}` : ''));

  if (result) {
    indicator.succeed('Link to module created');
  } else {
    indicator.fail(`Module with name '${nameModule}' exiest yet!`);
  }

  return result;
};
