const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const prods = await prisma.product.findMany({
    where: { category: { slug: 'refrigerators' } },
    select: { id: true, title: true, slug: true, cashPrice: true, imageUrl: true }
  });
  console.log(`Found ${prods.length} refrigerators in DB:`);
  prods.forEach(p => console.log(`${p.slug} | ${p.title} | Rs. ${p.cashPrice} | ${p.imageUrl}`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
