const getListTemplates = require('../common/get-list-templates');

module.exports = () => [
  {
    type: 'list',
    name: 'nameTemplate',
    message: 'Select template',
    choices: getListTemplates(`${__dirname}/../../templates`),
  },
];
