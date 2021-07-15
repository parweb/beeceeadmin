const { objectType } = require('nexus');

const PermissionsOnRoles = objectType({
  name: 'PermissionsOnRoles',
  definition(t) {
    t.model.permission();
    t.model.role();
    t.model.state();
  }
});

module.exports = PermissionsOnRoles;
