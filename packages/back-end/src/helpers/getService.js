const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getService = (environnement, service) =>
  prisma.service.findFirst({
    where: {
      name: service,
      environnement: {
        name: environnement
      }
    }
  });

module.exports = getService;
