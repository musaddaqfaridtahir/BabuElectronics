const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  const allProducts = await prisma.product.findMany({
    include: { category: true }
  });

  console.log(`Checking ${allProducts.length} products for image updates...`);

  let updatedCount = 0;
  for (const p of allProducts) {
    let newImg = p.imageUrl;
    const titleLower = p.title.toLowerCase();
    const catSlug = p.category?.slug || '';

    if (titleLower.includes('dawlance') || p.slug.includes('dawlance')) {
      if (catSlug === 'washing-machines' || titleLower.includes('wash') || titleLower.includes('dwt')) {
        newImg = '/uploads/dawlance/dawlance-washer-official.png';
      } else if (catSlug === 'air-conditioners' || titleLower.includes('ton')) {
        newImg = '/uploads/images-1786709527717.jfif';
      } else if (catSlug === 'refrigerators' || titleLower.includes('refrigerator') || titleLower.includes('single door') || titleLower.includes('double door')) {
        if (titleLower.includes('red') || titleLower.includes('coral') || titleLower.includes('burgundy')) {
          newImg = '/uploads/dawlance/ref-burgundy.webp';
        } else if (titleLower.includes('silver') || titleLower.includes('chrome')) {
          newImg = '/uploads/dawlance/ref-silver.webp';
        } else {
          newImg = '/uploads/dawlance/ref-inox.webp';
        }
      }
    }

    // Also check if any product has /uploads/cat-refrigerator.jpg or /uploads/cat-washer.jpg
    if (newImg === '/uploads/cat-refrigerator.jpg') {
      newImg = '/uploads/dawlance/ref-inox.webp';
    }
    if (newImg === '/uploads/cat-washer.jpg') {
      newImg = '/uploads/dawlance/dawlance-washer-official.png';
    }

    if (newImg !== p.imageUrl) {
      await prisma.product.update({
        where: { id: p.id },
        data: { imageUrl: newImg }
      });
      updatedCount++;
      console.log(`Updated [${p.title}] -> ${newImg}`);
    }
  }

  console.log(`Updated ${updatedCount} products in SQLite database!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
