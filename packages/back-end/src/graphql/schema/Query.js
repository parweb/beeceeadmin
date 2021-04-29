const { queryType } = require('nexus');

const Query = queryType({
  definition(t) {
    t.crud.extension();
    t.crud.extensions({
      filtering: true,
      pagination: true,
      ordering: true
    });

    t.crud.group();
    t.crud.groups({
      filtering: true,
      pagination: true,
      ordering: true
    });

    t.crud.courrier();
    t.crud.courriers({
      filtering: true,
      pagination: true,
      ordering: true
    });

    t.crud.environnement();
    t.crud.environnements({
      filtering: true,
      pagination: true,
      ordering: true
    });

    t.crud.service();
    t.crud.services({
      filtering: true,
      pagination: true,
      ordering: true
    });
  }
});

module.exports = Query;
