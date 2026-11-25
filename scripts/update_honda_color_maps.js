const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const hondaMappings = [
  {
    slugs: ['honda-cg125s-self-start', 'honda-cg-125-self-start-2025'],
    defaultImg: '/uploads/honda/cg125s-red.webp',
    colors: 'Red (سرخ), Black (سیاہ)',
    colorImages: {
      'Red (سرخ)': '/uploads/honda/cg125s-red.webp',
      'Black (سیاہ)': '/uploads/honda/cg125s-black.webp',
      'Red': '/uploads/honda/cg125s-red.webp',
      'Black': '/uploads/honda/cg125s-black.webp'
    }
  },
  {
    slugs: ['honda-cg125'],
    defaultImg: '/uploads/honda/cg125-black.webp',
    colors: 'Black (سیاہ), Red (سرخ)',
    colorImages: {
      'Black (سیاہ)': '/uploads/honda/cg125-black.webp',
      'Red (سرخ)': '/uploads/honda/cg125-red.webp',
      'Black': '/uploads/honda/cg125-black.webp',
      'Red': '/uploads/honda/cg125-red.webp'
    }
  },
  {
    slugs: ['honda-cg125s-gold'],
    defaultImg: '/uploads/honda/cg125-gold-black.webp',
    colors: 'Black & Gold (سیاہ سنہرا), Red & Gold (سرخ سنہرا)',
    colorImages: {
      'Black & Gold (سیاہ سنہرا)': '/uploads/honda/cg125-gold-black.webp',
      'Red & Gold (سرخ سنہرا)': '/uploads/honda/cg125-gold-red.webp',
      'Black': '/uploads/honda/cg125-gold-black.webp',
      'Red': '/uploads/honda/cg125-gold-red.webp'
    }
  },
  {
    slugs: ['honda-cd70'],
    defaultImg: '/uploads/honda/cd70-blue.webp',
    colors: 'Blue (نیلا), Red (سرخ), Black (سیاہ)',
    colorImages: {
      'Blue (نیلا)': '/uploads/honda/cd70-blue.webp',
      'Red (سرخ)': '/uploads/honda/cd70-red.webp',
      'Black (سیاہ)': '/uploads/honda/cd70-black.webp',
      'Blue': '/uploads/honda/cd70-blue.webp',
      'Red': '/uploads/honda/cd70-red.webp',
      'Black': '/uploads/honda/cd70-black.webp'
    }
  },
  {
    slugs: ['honda-cd70-dream'],
    defaultImg: '/uploads/honda/cd70dream-red.webp',
    colors: 'Red (سرخ), Black (سیاہ)',
    colorImages: {
      'Red (سرخ)': '/uploads/honda/cd70dream-red.webp',
      'Black (سیاہ)': '/uploads/honda/cd70dream-black.webp',
      'Red': '/uploads/honda/cd70dream-red.webp',
      'Black': '/uploads/honda/cd70dream-black.webp'
    }
  },
  {
    slugs: ['honda-cb125f'],
    defaultImg: '/uploads/honda/cb125f-blue.webp',
    colors: 'Blue (نیلا), Red (سرخ), Black (سیاہ)',
    colorImages: {
      'Blue (نیلا)': '/uploads/honda/cb125f-blue.webp',
      'Red (سرخ)': '/uploads/honda/cb125f-red.webp',
      'Black (سیاہ)': '/uploads/honda/cb125f-black.webp',
      'Blue': '/uploads/honda/cb125f-blue.webp',
      'Red': '/uploads/honda/cb125f-red.webp',
      'Black': '/uploads/honda/cb125f-black.webp'
    }
  },
  {
    slugs: ['honda-cb150f'],
    defaultImg: '/uploads/honda/cb150f-blue.webp',
    colors: 'Blue (نیلا), Red (سرخ)',
    colorImages: {
      'Blue (نیلا)': '/uploads/honda/cb150f-blue.webp',
      'Red (سرخ)': '/uploads/honda/cb150f-red.webp',
      'Blue': '/uploads/honda/cb150f-blue.webp',
      'Red': '/uploads/honda/cb150f-red.webp'
    }
  }
];

async function main() {
  for (const m of hondaMappings) {
    for (const slug of m.slugs) {
      const prod = await prisma.product.findUnique({ where: { slug } });
      if (!prod) continue;
      let specs = {};
      try { specs = JSON.parse(prod.specsJson || '{}'); } catch(e) {}
      specs['Colors'] = m.colors;
      specs['colorImages'] = m.colorImages;

      await prisma.product.update({
        where: { slug },
        data: {
          imageUrl: m.defaultImg,
          specsJson: JSON.stringify(specs)
        }
      });
      console.log(`Updated ${prod.title} (${slug}) with colorImages map!`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
