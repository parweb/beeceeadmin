const { objectType } = require('nexus');

const Environnement = objectType({
  name: 'Environnement',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.services({
      ordering: {
        id: true,
        name: true
      }
    });
  }
});

module.exports = Environnement;
