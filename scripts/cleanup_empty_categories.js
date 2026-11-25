const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cats = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  console.log('Categories before cleanup:');
  cats.forEach(c => console.log(`${c.name} (${c.slug}): ${c._count.products} products`));

  for (const c of cats) {
    if (c._count.products === 0) {
      await prisma.category.delete({ where: { id: c.id } });
      console.log(`Deleted empty category: ${c.name} (${c.slug})`);
    }
  }

  const remaining = await prisma.category.findMany({
    include: { _count: { select: { products: true } } }
  });
  console.log('\nRemaining active categories:');
  remaining.forEach(c => console.log(`✓ ${c.name} (${c.slug}): ${c._count.products} products`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
