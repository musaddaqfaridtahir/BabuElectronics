const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('1. Finding products created before 2026-11-25...');
  const oldProducts = await prisma.product.findMany({
    where: {
      createdAt: {
        lt: new Date('2026-11-25T00:00:00.000Z')
      }
    }
  });

  console.log(`Found ${oldProducts.length} old products created before today.`);
  for (const p of oldProducts) {
    // Check if application exists for this product
    await prisma.installmentApplication.deleteMany({ where: { productId: p.id } });
    await prisma.product.delete({ where: { id: p.id } });
    console.log(`  Deleted old product: [${p.title}]`);
  }

  console.log('2. Removing discontinued Vivo models added earlier...');
  const oldVivo = await prisma.product.findMany({
    where: {
      OR: [
        { slug: { startsWith: 'vivo-v40' } },
        { slug: { startsWith: 'vivo-v30' } },
        { slug: { startsWith: 'vivo-y28' } },
        { slug: { startsWith: 'vivo-y18' } },
        { slug: { startsWith: 'vivo-y03' } },
        { slug: { startsWith: 'vivo-y100' } }
      ]
    }
  });
  console.log(`Found ${oldVivo.length} discontinued Vivo models.`);
  for (const p of oldVivo) {
    await prisma.installmentApplication.deleteMany({ where: { productId: p.id } });
    await prisma.product.delete({ where: { id: p.id } });
    console.log(`  Deleted discontinued Vivo: [${p.title}]`);
  }

  const remaining = await prisma.product.count();
  console.log(`Cleanup complete! Remaining products in DB: ${remaining}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
