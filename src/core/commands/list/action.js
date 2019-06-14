// Path to modules.json
const modulesPath = `${__dirname}/../../../../modules.json`;

const action = async (what) => {
  if (what === 'modules') {
    const modules = require(modulesPath);
    console.log(Object.keys(modules).join('  '));
  }
};

module.exports = (...args) => {
  action(...args);
};
