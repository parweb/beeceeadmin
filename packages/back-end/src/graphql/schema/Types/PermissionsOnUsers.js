const { objectType } = require('nexus');

const PermissionsOnUsers = objectType({
  name: 'PermissionsOnUsers',
  definition(t) {
    t.model.permission();
    t.model.user();
    t.model.state();
  }
});

module.exports = PermissionsOnUsers;
