const { objectType } = require('nexus');

const Group = objectType({
  name: 'Group',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.extensions({
      ordering: {
        id: true,
        name: true
      }
    });
    t.model.display();
    t.model.upload();
    t.model.size();
  }
});

module.exports = Group;
