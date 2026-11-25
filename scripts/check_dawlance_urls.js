const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const prods = await prisma.product.findMany({
    where: { title: { contains: 'Dawlance' } },
    select: { id: true, title: true, imageUrl: true }
  });
  console.log('Total Dawlance products:', prods.length);
  const byUrl = {};
  for (const p of prods) {
    byUrl[p.imageUrl] = (byUrl[p.imageUrl] || 0) + 1;
  }
  console.log('Image URLs distribution:', byUrl);
}
main().finally(() => prisma.$disconnect());
