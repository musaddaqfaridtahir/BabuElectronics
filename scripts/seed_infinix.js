const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const infinixPhones = [
  {
    title: 'Infinix Note 60 Pro 5G (108MP OIS + 70W FastCharge)',
    slug: 'infinix-note-60-pro-5g',
    cashPrice: 79999,
    imgUrl: 'https://fdn2.gsmarena.com/vv/bigpic/infinix-note60-pro.jpg',
    localImg: '/uploads/infinix/infinix-note-60-pro.jpg',
    specs: {
      'Brand': 'Infinix Official',
      'Processor': 'MediaTek Dimensity 7020 (6nm High-Speed 5G)',
      'Camera': '108MP Super-Zoom OIS Camera + 32MP Clear Selfie',
      'Battery': '5000mAh Ultra-Charge Battery (70W All-Round FastCharge + 20W Wireless)',
      'Display': '120Hz 3D-Curved AMOLED Eye-Care Display',
      'RAM & Storage': '12GB (+12GB Extended) / 256GB High-Speed Storage',
      'Audio': 'Dual Stereo Speakers Tuned by JBL',
      'Colors': 'Titan Gold, Vintage Green, Obsidian Black'
    }
  },
  {
    title: 'Infinix Note 60 5G (120Hz AMOLED + Wireless Charging)',
    slug: 'infinix-note-60-5g',
    cashPrice: 64999,
    imgUrl: 'https://fdn2.gsmarena.com/vv/bigpic/infinix-note60.jpg',
    localImg: '/uploads/infinix/infinix-note-60.jpg',
    specs: {
      'Brand': 'Infinix Official',
      'Processor': 'Dimensity 7020 5G Ultra Gaming Chipset',
      'Camera': '108MP Triple AI Camera + Active Halo Lighting',
      'Battery': '5000mAh Battery (45W Multi-Speed FastCharge + 20W MagCharge)',
      'Display': '6.78-inch 120Hz FHD+ AMOLED Sunlight Display',
      'RAM & Storage': '8GB (+8GB Extended) / 256GB',
      'Sound': 'Sound by JBL Dual Speakers',
      'Colors': 'Breeze Green, Palm Blue, Titan Gold'
    }
  },
  {
    title: 'Infinix GT 50 Pro 5G (Flagship Cyber Mecha Gaming)',
    slug: 'infinix-gt-50-pro-5g',
    cashPrice: 119999,
    imgUrl: 'https://fdn2.gsmarena.com/vv/bigpic/infinix-gt50-pro.jpg',
    localImg: '/uploads/infinix/infinix-gt-50-pro.jpg',
    specs: {
      'Brand': 'Infinix Official',
      'Processor': 'MediaTek Dimensity 8200 Ultimate 4nm + Dedicated Gaming Display Chip',
      'Camera': '108MP OIS Ultra-Clear Triple Camera',
      'Battery': '5000mAh Esports Battery with Bypass Charging & 45W FastCharge',
      'Display': '144Hz 10-bit FHD+ AMOLED Borderless Screen',
      'Design': 'Cyber Mecha RGB Interactive Backlight Interface',
      'RAM & Storage': '12GB (+12GB Extended) / 256GB UFS 3.1',
      'Colors': 'Mecha Silver, Mecha Blue, Cyber Orange'
    }
  },
  {
    title: 'Infinix GT 20 Pro 5G (Esports Pro Performance)',
    slug: 'infinix-gt-20-pro-5g',
    cashPrice: 99999,
    imgUrl: 'https://fdn2.gsmarena.com/vv/bigpic/infinix-gt20-pro.jpg',
    localImg: '/uploads/infinix/infinix-gt-20-pro.jpg',
    specs: {
      'Brand': 'Infinix Official',
      'Processor': 'Dimensity 8200 Ultimate (4nm TSMC)',
      'Camera': '108MP OIS Anti-Shake Gaming Camera',
      'Battery': '5000mAh Battery (45W Hyper Charge)',
      'Display': '144Hz Bezel-less AMOLED Gaming Display',
      'RAM & Storage': '12GB (+12GB Extended) / 256GB',
      'Colors': 'Mecha Orange, Mecha Silver, Mecha Blue'
    }
  },
  {
    title: 'Infinix Hot 60 Pro (Helio G100 6nm + 120Hz AMOLED)',
    slug: 'infinix-hot-60-pro',
    cashPrice: 44999,
    imgUrl: 'https://fdn2.gsmarena.com/vv/bigpic/infinix-hot-60-pro.jpg',
    localImg: '/uploads/infinix/infinix-hot-60-pro.jpg',
    specs: {
      'Brand': 'Infinix Official',
      'Processor': 'MediaTek Helio G100 (6nm High Performance)',
      'Camera': '50MP Ultra-Clear Dual Camera + LED Flash',
      'Battery': '5000mAh 5-Year Durable Battery (33W FastCharge)',
      'Display': '120Hz 3D-Curved AMOLED Ultra-Slim Display',
      'RAM & Storage': '8GB (+8GB Extended) / 256GB',
      'Colors': 'Sleek Black, Titanium Grey, Dreamy Purple'
    }
  },
  {
    title: 'Infinix Hot 70 4G (Ultra-Slim 50MP AI Camera)',
    slug: 'infinix-hot-70-4g',
    cashPrice: 36999,
    imgUrl: 'https://fdn2.gsmarena.com/vv/bigpic/infinix-hot70-4g.jpg',
    localImg: '/uploads/infinix/infinix-hot-70-4g.jpg',
    specs: {
      'Brand': 'Infinix Official',
      'Processor': 'Helio G100 Gaming Processor',
      'Camera': '50MP Clear AI Camera + Quad Flash',
      'Battery': '5000mAh Long-Life Battery (18W FastCharge)',
      'Display': '6.78-inch 120Hz FHD+ Punch-Hole Screen',
      'RAM & Storage': '6GB (+6GB Extended) / 128GB',
      'Colors': 'Sleek Black, Sage Green, Shadow Blue'
    }
  },
  {
    title: 'Infinix Smart 20 (90Hz Dynamic Island Display)',
    slug: 'infinix-smart-20',
    cashPrice: 26999,
    imgUrl: 'https://fdn2.gsmarena.com/vv/bigpic/infinix-smart20.jpg',
    localImg: '/uploads/infinix/infinix-smart-20.jpg',
    specs: {
      'Brand': 'Infinix Official',
      'Processor': 'Octa-Core Helio Processor',
      'Camera': '13MP Dual AI Camera + Ring Flashlight',
      'Battery': '5000mAh All-Day Battery (Type-C Charging)',
      'Display': '90Hz Interactive Dynamic Punch-Hole Display',
      'RAM & Storage': '4GB (+4GB Extended) / 64GB',
      'Colors': 'Galaxy White, Timber Black, Shiny Gold'
    }
  },
  {
    title: 'Infinix Smart 8 (90Hz Magic Ring Daily Driver)',
    slug: 'infinix-smart-8',
    cashPrice: 22999,
    imgUrl: 'https://fdn2.gsmarena.com/vv/bigpic/infinix-smart8.jpg',
    localImg: '/uploads/infinix/infinix-smart-8.jpg',
    specs: {
      'Brand': 'Infinix Official',
      'Processor': 'Unisoc T606 Octa-Core Processor',
      'Camera': '13MP Dual AI Camera with Quad-LED Ring',
      'Battery': '5000mAh Big Battery (Type-C USB)',
      'Display': '90Hz Fluid Punch-Hole Sunlight Display',
      'RAM & Storage': '3GB (+3GB Extended) / 64GB',
      'Colors': 'Timber Black, Galaxy White, Crystal Green'
    }
  }
];

async function download(url, dest) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    if (res.ok) {
      const buf = await res.arrayBuffer();
      fs.writeFileSync(dest, Buffer.from(buf));
      console.log(`Saved Infinix image: ${dest} (${buf.byteLength} bytes)`);
      return true;
    }
  } catch (e) {
    console.error(`Failed ${url}:`, e.message);
  }
  return false;
}

async function main() {
  const cat = await prisma.category.findFirst({ where: { slug: 'mobiles' } });
  if (!cat) throw new Error('Mobiles category not found in DB');

  const uploadDir = path.join(__dirname, '../public/uploads/infinix');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  console.log('Seeding Infinix phones with 30% advance, 30% markup, and 10-month plan...');

  for (const item of infinixPhones) {
    const dest = path.join(__dirname, `../public${item.localImg}`);
    await download(item.imgUrl, dest);

    const cashPrice = item.cashPrice;
    // Store policy: Minimum 30% advance on all products
    const min30Adv = Math.round((cashPrice * 0.3) / 100) * 100;
    
    // Store policy for MOBILES: 30% markup, 10 month max duration
    const financedPrincipal = cashPrice - min30Adv;
    const markup30 = Math.round(financedPrincipal * 0.30);
    const totalFinanced = cashPrice + markup30;
    const rawMonthly = (totalFinanced - min30Adv) / 10;
    const roundMonthly = Math.round(rawMonthly / 100) * 100;
    const finalTotalInstallment = min30Adv + (roundMonthly * 10);

    await prisma.product.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        cashPrice: cashPrice,
        installmentPrice: finalTotalInstallment,
        downpaymentBase: min30Adv,
        durationMonths: 10,
        imageUrl: item.localImg,
        specsJson: JSON.stringify(item.specs),
        categoryId: cat.id,
        isFeatured: true,
        stock: 12
      },
      create: {
        title: item.title,
        slug: item.slug,
        cashPrice: cashPrice,
        installmentPrice: finalTotalInstallment,
        downpaymentBase: min30Adv,
        durationMonths: 10,
        imageUrl: item.localImg,
        specsJson: JSON.stringify(item.specs),
        categoryId: cat.id,
        isFeatured: true,
        stock: 12
      }
    });

    console.log(`✓ Seeded ${item.title}: Cash Rs. ${cashPrice.toLocaleString()} | 30% Adv Rs. ${min30Adv.toLocaleString()} | 10M Rs. ${roundMonthly.toLocaleString()}/mo (30% markup)`);
  }

  console.log('Finished seeding all Infinix smartphones successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
