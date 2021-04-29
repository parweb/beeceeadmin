const { mutationType } = require('nexus');

const Mutation = mutationType({
    definition(t) {
        t.crud.createOneExtension();
        t.crud.updateOneExtension();
        t.crud.upsertOneExtension();
        t.crud.deleteOneExtension();
        t.crud.updateManyExtension();
        t.crud.deleteManyExtension();

        t.crud.createOneGroup();
        t.crud.updateOneGroup();
        t.crud.upsertOneGroup();
        t.crud.deleteOneGroup();
        t.crud.updateManyGroup();
        t.crud.deleteManyGroup();

        t.crud.createOneCourrier();
        t.crud.updateOneCourrier();
        t.crud.upsertOneCourrier();
        t.crud.deleteOneCourrier();
        t.crud.updateManyCourrier();
        t.crud.deleteManyCourrier();

        t.crud.createOneEnvironnement();
        t.crud.updateOneEnvironnement();
        t.crud.upsertOneEnvironnement();
        t.crud.deleteOneEnvironnement();
        t.crud.updateManyEnvironnement();
        t.crud.deleteManyEnvironnement();

        t.crud.createOneService();
        t.crud.updateOneService();
        t.crud.upsertOneService();
        t.crud.deleteOneService();
        t.crud.updateManyService();
        t.crud.deleteManyService();
    }
});

module.exports = Mutation;
