const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  const cat = await prisma.category.findFirst({ where: { slug: 'motorbikes' } });
  if (!cat) throw new Error('Motorbikes category not found');

  const raw = fs.readFileSync('../scratch/products111/products/atlas-honda/motorcycles.json', 'utf8');
  const data = JSON.parse(raw);

  const localImgMap = {
    'cd70': '/uploads/honda/honda-cd70.webp',
    'cd70-dream': '/uploads/honda/honda-cd70-dream.webp',
    'pridor': '/uploads/honda/honda-pridor.webp',
    'cg125': '/uploads/honda/honda-cg125.webp',
    'cg125-self': '/uploads/honda/honda-cg125s-self-start.webp',
    'cg125s-gold': '/uploads/honda/honda-cg125s-gold.webp',
    'cb125f': '/uploads/honda/honda-cb125f.webp',
    'cb150f': '/uploads/honda/honda-cb150f.webp',
  };

  for (const m of data.products) {
    const slug = m.id === 'cg125-self' ? 'honda-cg-125-self-start-2025' : `honda-${m.id}`;
    const cashPrice = m.price_pkr;
    const min30Adv = Math.round((cashPrice * 0.3) / 100) * 100;
    // 16-month financing calculation
    const financed = cashPrice - min30Adv;
    const markup = Math.round(financed * 0.28);
    const rawMo = (financed + markup) / 16;
    const roundMo = Math.round(rawMo / 100) * 100;
    const totalInst = min30Adv + (roundMo * 16);

    const specs = {
      'Brand': m.brand,
      'Engine': m.engine,
      'Starting': m.starting,
      'Transmission': m.transmission,
      'Fuel Tank': m.fuel_tank,
      'Colors': (m.colors || []).join(', '),
      ...(m.specs || {})
    };

    const img = localImgMap[m.id] || '/uploads/honda/honda-cg125.webp';

    await prisma.product.upsert({
      where: { slug },
      update: {
        title: m.name,
        cashPrice,
        downpaymentBase: min30Adv,
        durationMonths: 16,
        installmentPrice: totalInst,
        imageUrl: img,
        specsJson: JSON.stringify(specs),
        stock: 15,
        isFeatured: m.id.includes('cg125')
      },
      create: {
        title: m.name,
        slug,
        categoryId: cat.id,
        cashPrice,
        downpaymentBase: min30Adv,
        durationMonths: 16,
        installmentPrice: totalInst,
        imageUrl: img,
        specsJson: JSON.stringify(specs),
        stock: 15,
        isFeatured: m.id.includes('cg125')
      }
    });

    console.log(`Seeded Atlas Honda: [${m.name}] (slug: ${slug}) -> Cash: ${cashPrice}, 30% Adv: ${min30Adv}, 16M: ${roundMo}/mo`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
