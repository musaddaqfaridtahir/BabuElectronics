const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const prods = await prisma.product.findMany({
    where: { title: { contains: 'CG 125' } }
  });
  for (const p of prods) {
    console.log(p.title, '--> slug:', p.slug);
  }
}
main().finally(() => prisma.$disconnect());
