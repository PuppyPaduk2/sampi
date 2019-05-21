const inquirer = require('inquirer');
const fs = require('fs');

const moveFile = require('../../common/moveFile');

module.exports = async ({ path, name }) => {
  const pathToStyledComponent = `${path}/styled/${name}.ts`;

  if (fs.existsSync(pathToStyledComponent)) {
    let { isMove } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'isMove',
        message: "Move styled component? ",
        default: true
      }
    ]);

    if (isMove) {
      moveFile(pathToStyledComponent, `${path}/${name}/styled/index.ts`);
    }
  }
};