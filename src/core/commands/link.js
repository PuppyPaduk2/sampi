const program = require('commander');
const fs = require('fs');
const ora = require('ora');

// Path to modules.json
const modulesPath = `${__dirname}/../../modules.json`;

const action = (nameModule, { path }) => {
  const modules = require(modulesPath);
  const indicator = ora('Create link').start();

  if (modules[nameModule]) {
    indicator.fail(`Module with name '${nameModule}' exiest yet!`);
  } else {
    modules[nameModule] = process.cwd();
    modules[nameModule] += path ? `/${path}` : '';

    fs.writeFileSync(modulesPath, JSON.stringify(modules, null, '  '));
    indicator.succeed('Link to module created');
  }
};

module.exports = () => program
  .command('link <nameModule>')
  .description('Link module with templates')
  .action(action);
