const { objectType } = require('nexus');

const Role = objectType({
  name: 'Role',
  definition(t) {
    t.model.id();
    t.model.type();
    t.model.permissions();
    t.model.user();
  }
});

module.exports = Role;
