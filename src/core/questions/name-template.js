const program = require('commander');

const getListTemplates = require('../common/get-list-templates');

module.exports = () => {
  const config = require(program.config);

  return [
    {
      type: 'list',
      name: 'nameTemplate',
      message: 'Select template',
      choices: getListTemplates(`${config.paths.templates}`),
    },
  ];
};
