const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true, slug: true }
  });

  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      category: {
        select: { id: true, name: true, slug: true }
      }
    }
  });

  const content = `/**
 * BAKED CATALOG BACKUP
 * Synchronized with Babu Electronics inventory database.
 * Total Products: ${products.length}
 * Total Categories: ${categories.length}
 */

export const fallbackCatalogCategories = ${JSON.stringify(categories, null, 2)};

export const fallbackCatalogProducts = ${JSON.stringify(products, null, 2)};
`;

  fs.writeFileSync('lib/catalogBackup.ts', content, 'utf8');
  console.log(`Successfully exported ${products.length} products and ${categories.length} categories to lib/catalogBackup.ts!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
