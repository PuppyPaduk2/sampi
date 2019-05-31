const getListTemplates = require('../common/get-list-templates');

module.exports = packageConfig => [
  {
    type: 'list',
    name: 'nameTemplate',
    message: 'Select template',
    choices: getListTemplates(`${packageConfig.paths.templates}`),
  },
];
