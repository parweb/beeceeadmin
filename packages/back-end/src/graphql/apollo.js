const { makeSchema } = require('nexus');
const { PrismaClient } = require('@prisma/client');
const { ApolloServer } = require('apollo-server-fastify-no-upload');
const path = require('path');
const { nexusPrisma } = require('nexus-plugin-prisma');

const types = require('./schema/Types');
const Query = require('./schema/Query');
const Mutation = require('./schema/Mutation');

const prisma = new PrismaClient();

const apollo = new ApolloServer({
  context: () => ({ prisma }),
  schema: makeSchema({
    plugins: [
      nexusPrisma({
        experimentalCRUD: true
      })
    ],
    experimentalCRUD: true,
    prismaClient: prisma,
    typegenAutoConfig: {
      contextType: '{ prisma: PrismaClient.PrismaClient }',
      sources: [{ source: '.prisma/client', alias: 'PrismaClient' }]
    },
    outputs: {
      typegen: path.join(
        __dirname,
        '../../node_modules/@types/nexus-typegen/index.d.ts'
      ),
      schema: path.join(__dirname, './schema.graphql')
    },
    shouldExitAfterGenerateArtifacts: Boolean(
      process.env.NEXUS_SHOULD_EXIT_AFTER_REFLECTION
    ),
    types: [...types, Query, Mutation]
  })
});

module.exports = apollo;
