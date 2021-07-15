const { objectType } = require('nexus');

const Activity = objectType({
  name: 'Activity',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.user();
    t.model.type();
    t.model.type_id();
    t.model.data();
  }
});

module.exports = Activity;
