const moveStyled = require('./move-styled');

module.exports = {
  FC: {
    cloneDirCallback: ({ name }) => ({ fileStr }) => fileStr.replace(/{{ COMPONENT_NAME }}/g, name),
    afterCreate: moveStyled,
  },
  Container: {},
};
