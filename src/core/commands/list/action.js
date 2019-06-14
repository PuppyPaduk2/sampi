const config = require('../../../config');

const action = async (what) => {
  if (what === 'modules') {
    const modules = require(config.paths.modulesJson);
    console.log(Object.keys(modules).join('  '));
  }
};

module.exports = (...args) => {
  action(...args);
};
