const { objectType } = require('nexus');

const Service = objectType({
  name: 'Service',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.url();
    t.model.environnement();
  }
});

module.exports = Service;
