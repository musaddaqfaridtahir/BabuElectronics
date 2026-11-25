const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.product.findMany({
  where: { title: { contains: 'Honda' } },
  select: { id: true, title: true, slug: true }
}).then(console.log).finally(() => prisma.$disconnect());
