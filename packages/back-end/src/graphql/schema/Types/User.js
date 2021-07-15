const { objectType } = require('nexus');

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.username();
    t.model.token();
    t.model.activites();
    t.model.permissions();
    t.model.role();
    t.model.state();
  }
});

module.exports = User;
