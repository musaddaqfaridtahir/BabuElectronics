const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const cats = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  });
  console.log("=== CATEGORIES ===");
  console.log(cats.map(c => ({ id: c.id, name: c.name, slug: c.slug, count: c._count.products })));

  const fridges = await prisma.product.findMany({
    where: {
      category: {
        slug: { in: ['refrigerators', 'freezers'] }
      }
    },
    select: {
      id: true,
      title: true,
      slug: true,
      cashPrice: true,
      downPayment: true,
      specsJson: true,
      imageUrl: true,
      category: { select: { slug: true } }
    }
  });
  console.log("\n=== REFRIGERATORS & FREEZERS ===");
  console.log("Total:", fridges.length);
  console.log(fridges.slice(0, 10));

  const honda = await prisma.product.findMany({
    where: {
      title: { contains: 'Honda' }
    },
    select: {
      id: true,
      title: true,
      slug: true,
      imageUrl: true,
      specsJson: true
    }
  });
  console.log("\n=== HONDA PRODUCTS IN DB ===");
  console.log(honda);
}

main().catch(console.error).finally(() => prisma.$disconnect());
