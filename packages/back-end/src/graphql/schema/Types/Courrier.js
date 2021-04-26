const { objectType } = require('nexus');

const Courrier = objectType({
  name: 'Courrier',
  definition(t) {
    t.model.id();
    t.model.name();
  }
});

module.exports = Courrier;
