const program = require('commander');

const getListTemplates = require('../common/get-list-templates');

module.exports = () => {
  const config = program.config ? require(program.config) : require('../../config');

  return [
    {
      type: 'list',
      name: 'nameTemplate',
      message: 'Select template',
      choices: getListTemplates(`${config.paths.templates}`),
    },
  ];
};
