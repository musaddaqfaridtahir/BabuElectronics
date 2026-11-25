const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    select: { id: true, title: true, slug: true, createdAt: true, categoryId: true, category: { select: { name: true, slug: true } } },
    orderBy: { createdAt: 'asc' }
  });
  console.log('Total products in DB:', products.length);
  
  // Group by date (day)
  const byDate = {};
  for (const p of products) {
    const d = p.createdAt ? p.createdAt.toISOString().slice(0, 10) : 'unknown';
    byDate[d] = (byDate[d] || 0) + 1;
  }
  console.log('Products by creation date:', byDate);

  // List products created before today (2026-11-25)
  const oldProducts = products.filter(p => {
    const d = p.createdAt ? p.createdAt.toISOString().slice(0, 10) : '';
    return d < '2026-11-25';
  });
  console.log(`Products created before 2026-11-25: ${oldProducts.length}`);
  oldProducts.forEach(p => console.log('  OLD:', p.title, `(${p.createdAt?.toISOString()})`));
}

main().finally(() => prisma.$disconnect());
