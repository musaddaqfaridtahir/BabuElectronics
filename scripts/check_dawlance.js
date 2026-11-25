const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const prods = await prisma.product.findMany({
    where: { title: { contains: 'Dawlance' } },
    select: { id: true, title: true, imageUrl: true }
  });
  console.log('Total Dawlance products:', prods.length);
  for (const p of prods.slice(0, 20)) {
    console.log(p.title, '-->', p.imageUrl);
  }
}
main().finally(() => prisma.$disconnect());
