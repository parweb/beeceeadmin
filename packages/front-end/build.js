const { readFileSync, writeFileSync: write } = require('fs');
const { join } = require('path');

const read = file => readFileSync(file).toString();

const replace = (path, find, replace) => {
  const file = read(path);
  write(path, file.replaceAll(find, replace));
};

const version = new Date().getTime();

replace(
  join(__dirname, 'build', 'index.html'),
  /.chunk.(css|js)"(\s|>)/g,
  `.chunk.$1?v=${version}"$2`
);
