const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const vivoProducts = [
  {
    title: 'Vivo V40 5G (ZEISS Optics)',
    slug: 'vivo-v40-5g',
    cashPrice: 139999,
    imageUrl: '/uploads/vivo/vivo-v40.png',
    specs: {
      'Processor': 'Snapdragon 7 Gen 3 (4nm)',
      'Camera': 'ZEISS 50MP OIS + 50MP Ultra Wide + 50MP Selfie',
      'Battery': '5500mAh BlueVolt (80W FlashCharge)',
      'Display': '1.5K 120Hz 3D Curved AMOLED',
      'RAM & Storage': '12GB (+12GB Extended) / 256GB',
      'Colors': 'Stellar Silver, Moonlight White, Nebula Purple'
    }
  },
  {
    title: 'Vivo V40 Lite 5G',
    slug: 'vivo-v40-lite',
    cashPrice: 67999,
    imageUrl: '/uploads/vivo/vivo-v40.png',
    specs: {
      'Processor': 'Snapdragon 4 Gen 2',
      'Camera': '50MP Sony IMX882 + AI Aura Light',
      'Battery': '5000mAh (80W FlashCharge)',
      'Display': '120Hz Ultra Vision AMOLED (1800 nits)',
      'RAM & Storage': '8GB (+8GB Extended) / 128GB',
      'Colors': 'Titanium Silver, Dynamic Black'
    }
  },
  {
    title: 'Vivo V30 5G (Studio Aura Light)',
    slug: 'vivo-v30-5g',
    cashPrice: 129999,
    imageUrl: '/uploads/vivo/vivo-v30.png',
    specs: {
      'Processor': 'Snapdragon 7 Gen 3',
      'Camera': '50MP VCS True Color OIS + 50MP AF Ultra Wide',
      'Battery': '5000mAh (80W FlashCharge)',
      'Display': '1.5K 120Hz 3D Curved AMOLED',
      'RAM & Storage': '12GB (+12GB Extended) / 256GB',
      'Colors': 'Peacock Green, Waving Aqua, Noble Black'
    }
  },
  {
    title: 'Vivo V30e (Aura Light Portrait)',
    slug: 'vivo-v30e',
    cashPrice: 86999,
    imageUrl: '/uploads/vivo/vivo-v30e.jpg',
    specs: {
      'Processor': 'Snapdragon 6 Gen 1 (4nm)',
      'Camera': '50MP Sony IMX882 + Studio Aura Light',
      'Battery': '5500mAh Ultra-Slim (44W FlashCharge)',
      'Display': '120Hz 3D Curved AMOLED',
      'RAM & Storage': '8GB (+8GB Extended) / 256GB',
      'Colors': 'Velvet Red, Silk Blue'
    }
  },
  {
    title: 'Vivo Y100 4G (120Hz AMOLED)',
    slug: 'vivo-y100',
    cashPrice: 55999,
    imageUrl: '/uploads/vivo/vivo-y100.png',
    specs: {
      'Processor': 'Snapdragon 685 (6nm)',
      'Camera': '50MP Ultra Clear + Flicker Sensor',
      'Battery': '5000mAh (80W FlashCharge)',
      'Display': '120Hz Ultra Vision AMOLED (Dual Stereo Speakers)',
      'RAM & Storage': '8GB (+8GB Extended) / 256GB',
      'Colors': 'Crystal Black, Breeze Green'
    }
  },
  {
    title: 'Vivo Y28 (6000mAh Monster Battery)',
    slug: 'vivo-y28',
    cashPrice: 49999,
    imageUrl: '/uploads/vivo/vivo-y28.png',
    specs: {
      'Processor': 'MediaTek Helio G85 Gaming Processor',
      'Camera': '50MP Ultra Clear + Dynamic Light',
      'Battery': '6000mAh 4-Year Health Battery (44W FlashCharge)',
      'Display': '90Hz High Brightness (1000 nits)',
      'RAM & Storage': '8GB (+8GB Extended) / 128GB',
      'Colors': 'Gleaming Orange, Agate Green'
    }
  },
  {
    title: 'Vivo Y18 (Sunlight Display)',
    slug: 'vivo-y18',
    cashPrice: 31999,
    imageUrl: '/uploads/vivo/vivo-y18.jpg',
    specs: {
      'Processor': 'MediaTek Helio G85',
      'Camera': '50MP Ultra Clear AI Camera',
      'Battery': '5000mAh Long-Lasting Battery',
      'Display': '90Hz Sunlight Eye-Protection Display',
      'RAM & Storage': '6GB (+6GB Extended) / 128GB',
      'Colors': 'Wave Aqua, Mocha Brown'
    }
  },
  {
    title: 'Vivo Y03 (Budget King)',
    slug: 'vivo-y03',
    cashPrice: 24999,
    imageUrl: '/uploads/vivo/vivo-y03.jpg',
    specs: {
      'Processor': 'MediaTek Helio G85 Gaming Processor',
      'Camera': '13MP AI Dual Camera',
      'Battery': '5000mAh Long-Lasting Battery (15W)',
      'Display': '90Hz Sunlight Display (TÜV Rheinland Certified)',
      'RAM & Storage': '4GB (+4GB Extended) / 64GB',
      'Colors': 'Space Black, Gem Green'
    }
  }
];

async function main() {
  const cat = await prisma.category.findFirst({ where: { slug: 'mobiles' } });
  if (!cat) throw new Error('Mobiles category not found');

  console.log('Seeding Vivo smartphones under Mobiles & Tablets category...');

  for (const item of vivoProducts) {
    const min30Down = Math.round((item.cashPrice * 0.3) / 100) * 100;
    // 12-month tenure standard
    const financed = item.cashPrice - min30Down;
    const markup = Math.round(financed * 0.25);
    const totalInst = min30Down + financed + markup;
    const rawMo = (financed + markup) / 12;
    const roundMo = Math.round(rawMo / 100) * 100;

    await prisma.product.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        cashPrice: item.cashPrice,
        downpaymentBase: min30Down,
        durationMonths: 12,
        installmentPrice: min30Down + (roundMo * 12),
        imageUrl: item.imageUrl,
        specsJson: JSON.stringify(item.specs),
        stock: 12,
        isFeatured: item.cashPrice > 80000
      },
      create: {
        title: item.title,
        slug: item.slug,
        categoryId: cat.id,
        cashPrice: item.cashPrice,
        downpaymentBase: min30Down,
        durationMonths: 12,
        installmentPrice: min30Down + (roundMo * 12),
        imageUrl: item.imageUrl,
        specsJson: JSON.stringify(item.specs),
        stock: 12,
        isFeatured: item.cashPrice > 80000
      }
    });

    console.log(`Seeded [${item.title}] -> Rs. ${item.cashPrice} (30% Adv: Rs. ${min30Down}, Mo: Rs. ${roundMo}/mo)`);
  }

  console.log(`Seeded ${vivoProducts.length} Vivo mobiles successfully!`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
