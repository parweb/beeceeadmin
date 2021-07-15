const { objectType } = require('nexus');

const Permission = objectType({
  name: 'Permission',
  definition(t) {
    t.model.id();
    t.model.subject();
    t.model.action();
    t.model.users();
    t.model.roles();
  }
});

module.exports = Permission;
