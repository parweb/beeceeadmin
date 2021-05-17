const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log(
    await prisma.service.findFirst({
      where: {
        name: 'bca-admin-api',
        environnement: {
          name: 'intégration'
        }
      }
    })
  );
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
