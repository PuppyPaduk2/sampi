const modules = require('../../common/modules');

const action = async (what) => {
  if (what === 'modules') {
    const list = await modules.getListModules();
    console.log(list.join('  '));
  }
};

module.exports = (...args) => {
  action(...args);
};
