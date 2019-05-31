const program = require('commander');

const getListTemplates = require('../common/get-list-templates');

const config = require(program.config);

module.exports = () => [
  {
    type: 'list',
    name: 'nameTemplate',
    message: 'Select template',
    choices: getListTemplates(`${config.paths.templates}`),
  },
];
