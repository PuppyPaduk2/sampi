const inquirer = require('inquirer');

module.exports = async () => {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Name component: ',
      validate: value => (value ? true : 'Insert name component!'),
    },
  ]);

  return [
    {
      '.tsx': ({ fileStr }) => fileStr.replace(/{{ COMPONENT_NAME }}/g, name),
    },
    {
      path: name,
    },
  ];
};
