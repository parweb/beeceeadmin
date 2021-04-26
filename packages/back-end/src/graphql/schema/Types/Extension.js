const { objectType } = require('nexus');

const Extension = objectType({
  name: 'Extension',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.description();
    t.model.group();
  }
});

module.exports = Extension;
