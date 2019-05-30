const { exec } = require('child_process');

module.exports.remove = (path, callback) => exec(`rm -rf ${path}`, callback);

module.exports.create = (path, callback) => exec(`mkdir -p ${path}`, callback);

module.exports.clone = (from, to, callback) => exec(`cp -r ${from} ${to}`, callback);
