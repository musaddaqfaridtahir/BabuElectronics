const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const cat = await prisma.category.findFirst({
    where: { name: { contains: 'Electric' } },
    include: { products: true }
  });
  console.log('Category:', cat?.name, 'id:', cat?.id, 'slug:', cat?.slug, 'products:', cat?.products?.length);
  for (const p of (cat?.products || [])) {
    console.log('  Product:', p.title, 'categoryId:', p.categoryId);
  }
}
main().finally(() => prisma.$disconnect());
