const inquirer = require('inquirer');
const chalkPipe = require('chalk-pipe');

const getOnlyDir = require('./getOnlyDir');

/**
 * @param {string} path
 * @param {Object} [propsQuestion]
 */
module.exports = async (path, propsQuestion = {}, errorMessage = "Actions does't exist!") => {
  const actions = getOnlyDir(path);
  let result = {};

  if (actions.length) {
    result = inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select action',
          choices: actions,
          ...propsQuestion,
        },
      ])
      .then(({ action }) => {
        require(`${path}/${action}`)();
      });
  } else {
    console.log(chalkPipe('red')(errorMessage));
  }

  return result;
};
