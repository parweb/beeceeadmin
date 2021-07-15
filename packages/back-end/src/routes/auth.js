const { PrismaClient, TokenType } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

const prisma = new PrismaClient();

const SECRET = process.env.SECRET || 'SUPER_ROOT_SECRET';
const JWT_ALGORITHM = 'HS256';

const tokenize = id => jwt.sign({ id }, SECRET, { algorithm: JWT_ALGORITHM });
const hasher = password => md5(SECRET + password + SECRET);

module.exports = (app, _, next) => {
  app.post('/auth/login', async (request, reply) => {
    const { username, password } = request.body;
    const hash = hasher(password);

    console.log({ hash });

    try {
      const user = await prisma.user.findUnique({ where: { username } });

      if (user.password !== hash) {
        throw new Error('unauthorized');
      }

      const token = tokenize(user.id);
      await prisma.user.update({ where: { username }, data: { token } });

      reply.code(200).send(
        await prisma.user.findUnique({
          where: { username },
          select: {
            id: true,
            username: true,
            token: true,
            role: {
              select: {
                permissions: {
                  select: {
                    permission: true,
                    state: true
                  }
                }
              }
            },
            permissions: {
              select: {
                permission: true,
                state: true
              }
            }
          }
        })
      );
    } catch (error) {
      console.log({ error });
      reply.code(401).send(error);
    }
  });

  app.post('/auth/register', async (request, reply) => {
    const { username, password } = request.body;

    console.log({ username, password });

    try {
      const already = await prisma.user.findUnique({
        where: { username },
        select: { id: true }
      });

      if (already?.id) {
        throw new Error('Username already taken');
      }

      const user = await prisma.user.create({
        data: {
          username,
          password: hasher(password)
        }
      });

      const token = tokenize(user.id);
      await prisma.user.update({ where: { username }, data: { token } });

      return reply.code(200).send(
        await prisma.user.findUnique({
          where: { username },
          select: { id: true, username: true, token: true, role: true }
        })
      );
    } catch (error) {
      console.log({ error });
      reply.code(401).send(error);
    }
  });

  next();
};
