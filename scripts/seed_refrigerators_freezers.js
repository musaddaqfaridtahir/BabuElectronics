const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const haierRefrigerators = [
  {
    title: 'Haier HRF-585SFFGU1 Space Fit 4-Door Inverter Refrigerator',
    slug: 'haier-hrf-585sffgu1',
    cashPrice: 245000,
    pageUrl: 'https://www.haier.com/pk/refrigerators/hrf-585sffgu1.shtml',
    localImg: '/uploads/haier/hrf-585.jpg',
    specs: {
      'Brand': 'Haier Official',
      'Type': '4-Door Space Fit French Door Refrigerator',
      'Capacity': '585 Liters (20.6 Cu.Ft)',
      'Cooling Technology': 'Twin Inverter & Multi Air Flow 360',
      'Door Glass': 'T-Door Toughened Safety Glass Finish',
      'Energy Rating': 'A+++ Super Energy Saving (Runs on UPS/Solar)',
      'Compressor Warranty': '10 Years Official Brand Warranty',
      'Colors': 'Glass Black, Inox Grey'
    }
  },
  {
    title: 'Haier HRF-538IPPA Smart Inverter Refrigerator',
    slug: 'haier-hrf-538ippa',
    cashPrice: 165000,
    pageUrl: 'https://www.haier.com/pk/refrigerators/hrf-538ippa.shtml',
    localImg: '/uploads/haier/hrf-538.jpg',
    specs: {
      'Brand': 'Haier Official',
      'Type': 'Double Door Top Mount Refrigerator',
      'Capacity': '538 Liters (19.0 Cu.Ft)',
      'Cooling Technology': 'Digital Inverter & 1-Hour Icing Tech (HIT)',
      'Energy Consumption': 'Runs on Less than 1 Unit / Day (UPS Compatible)',
      'Compressor Warranty': '10 Years Official Warranty',
      'Colors': 'Platinum Grey, Velvet Maroon, Glass Black'
    }
  },
  {
    title: 'Haier HRF-458IPPA Smart Inverter Refrigerator',
    slug: 'haier-hrf-458ippa',
    cashPrice: 142000,
    pageUrl: 'https://www.haier.com/pk/refrigerators/hrf-458ippa.shtml',
    localImg: '/uploads/haier/hrf-458.jpg',
    specs: {
      'Brand': 'Haier Official',
      'Type': 'Double Door Smart Inverter Refrigerator',
      'Capacity': '458 Liters (16.2 Cu.Ft)',
      'Cooling Technology': 'Twin Inverter Compressor & Turbo Cooling',
      'Energy Efficiency': 'Up to 55% Energy Saving',
      'Compressor Warranty': '10 Years Official Brand Warranty',
      'Colors': 'Inox Silver, Burgundy Red, Midnight Black'
    }
  },
  {
    title: 'Haier HRF-418IPPA Smart Inverter Refrigerator',
    slug: 'haier-hrf-418ippa',
    cashPrice: 132000,
    pageUrl: 'https://www.haier.com/pk/refrigerators/hrf-418ippa.shtml',
    localImg: '/uploads/haier/hrf-418.jpg',
    specs: {
      'Brand': 'Haier Official',
      'Type': 'Double Door Inverter Refrigerator',
      'Capacity': '418 Liters (14.8 Cu.Ft)',
      'Cooling Technology': 'Digital Smart Inverter & Fast Freezing',
      'Energy Efficiency': 'High Voltage Tolerance (105V - 260V)',
      'Compressor Warranty': '10 Years Official Warranty',
      'Colors': 'Platinum Silver, Velvet Red'
    }
  },
  {
    title: 'Haier HRF-346IPPA Smart Inverter Refrigerator',
    slug: 'haier-hrf-346ippa',
    cashPrice: 115000,
    pageUrl: 'https://www.haier.com/pk/refrigerators/hrf-346ippa.shtml',
    localImg: '/uploads/haier/hrf-346.jpg',
    specs: {
      'Brand': 'Haier Official',
      'Type': 'Double Door Smart Inverter Refrigerator',
      'Capacity': '346 Liters (12.2 Cu.Ft)',
      'Cooling Technology': 'Digital Inverter & 100 Hours Cooling Retention',
      'Compressor Warranty': '10 Years Official Warranty',
      'Colors': 'Metallic Grey, Ruby Red'
    }
  },
  {
    title: 'Haier HRF-316IPPA Smart Inverter Refrigerator',
    slug: 'haier-hrf-316ippa',
    cashPrice: 105000,
    pageUrl: 'https://www.haier.com/pk/refrigerators/hrf-316ippa.shtml',
    localImg: '/uploads/haier/hrf-316.jpg',
    specs: {
      'Brand': 'Haier Official',
      'Type': 'Compact Double Door Inverter Refrigerator',
      'Capacity': '316 Liters (11.2 Cu.Ft)',
      'Cooling Technology': 'Fast Icing & Power Saving Inverter',
      'Compressor Warranty': '10 Years Brand Warranty',
      'Colors': 'Metallic Silver, Velvet Red'
    }
  }
];

const haierFreezers = [
  {
    title: 'Haier HDF-405IG Inverter Deep Freezer (Glass Door)',
    slug: 'haier-hdf-405ig',
    cashPrice: 125000,
    pageUrl: 'https://www.haier.com/pk/freezers/hdf-405ig.shtml',
    localImg: '/uploads/haier/hdf-405.jpg',
    specs: {
      'Brand': 'Haier Official',
      'Type': 'Glass Top Inverter Deep Freezer (Chest)',
      'Capacity': '405 Liters (14.3 Cu.Ft)',
      'Cooling System': 'Super Freeze & Low Voltage Inverter (105V Operation)',
      'Freezer Feature': 'Balance Hinge & Dual Function (Fridge & Freezer)',
      'Compressor Warranty': '10 Years Brand Warranty',
      'Colors': 'Glass Grey, Glass White'
    }
  },
  {
    title: 'Haier HDF-385IG Inverter Deep Freezer (Glass Door)',
    slug: 'haier-hdf-385ig',
    cashPrice: 118000,
    pageUrl: 'https://www.haier.com/pk/freezers/hdf-385ig.shtml',
    localImg: '/uploads/haier/hdf-385.jpg',
    specs: {
      'Brand': 'Haier Official',
      'Type': 'Toughened Glass Inverter Deep Freezer',
      'Capacity': '385 Liters (13.6 Cu.Ft)',
      'Cooling System': 'Digital Inverter & 100 Hours Cooling Retention',
      'Compressor Warranty': '10 Years Official Warranty',
      'Colors': 'Glass Inox, Glass Black'
    }
  },
  {
    title: 'Haier HDF-345IG Inverter Deep Freezer',
    slug: 'haier-hdf-345ig',
    cashPrice: 108000,
    pageUrl: 'https://www.haier.com/pk/freezers/hdf-345ig.shtml',
    localImg: '/uploads/haier/hdf-345.jpg',
    specs: {
      'Brand': 'Haier Official',
      'Type': 'Inverter Chest Deep Freezer',
      'Capacity': '345 Liters (12.2 Cu.Ft)',
      'Cooling System': 'Super Freezing & 5-Side Cooling Evaporator',
      'Compressor Warranty': '10 Years Official Warranty',
      'Colors': 'Metallic Grey, Pure White'
    }
  },
  {
    title: 'Haier HDF-285IG Inverter Deep Freezer',
    slug: 'haier-hdf-285ig',
    cashPrice: 98000,
    pageUrl: 'https://www.haier.com/pk/freezers/hdf-285ig.shtml',
    localImg: '/uploads/haier/hdf-285.jpg',
    specs: {
      'Brand': 'Haier Official',
      'Type': 'Energy Saving Inverter Deep Freezer',
      'Capacity': '285 Liters (10.1 Cu.Ft)',
      'Cooling System': 'Low Voltage Start & Rapid Ice Making',
      'Compressor Warranty': '10 Years Brand Warranty',
      'Colors': 'Silver Grey, White'
    }
  },
  {
    title: 'Haier HDF-245IG Inverter Deep Freezer',
    slug: 'haier-hdf-245ig',
    cashPrice: 89000,
    pageUrl: 'https://www.haier.com/pk/freezers/hdf-245ig.shtml',
    localImg: '/uploads/haier/hdf-245.jpg',
    specs: {
      'Brand': 'Haier Official',
      'Type': 'Compact Inverter Chest Freezer',
      'Capacity': '245 Liters (8.6 Cu.Ft)',
      'Cooling System': 'Eco Inverter & Anti-Bacterial Liner',
      'Compressor Warranty': '10 Years Brand Warranty',
      'Colors': 'Silver, White'
    }
  },
  {
    title: 'Haier HDF-175IG Inverter Deep Freezer',
    slug: 'haier-hdf-175ig',
    cashPrice: 78000,
    pageUrl: 'https://www.haier.com/pk/freezers/hdf-175ig.shtml',
    localImg: '/uploads/haier/hdf-175.jpg',
    specs: {
      'Brand': 'Haier Official',
      'Type': 'Small Family Inverter Deep Freezer',
      'Capacity': '175 Liters (6.2 Cu.Ft)',
      'Cooling System': 'Deep Freezing & Minimal Power Consumption',
      'Compressor Warranty': '10 Years Brand Warranty',
      'Colors': 'White, Silver'
    }
  }
];

async function extractAndDownloadHaier(pageUrl, localDest) {
  try {
    const res = await fetch(pageUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    if (!res.ok) return false;
    const text = await res.text();
    const imgs = [...text.matchAll(/https:\/\/image\.haier\.com\/pk\/[^"'\s<>]+\.(?:jpg|png|webp)/gi)].map(m => m[0]);
    // find product image (usually contains 500 or 1200)
    const prodImg = imgs.find(i => i.includes('_500.jpg') || i.includes('_350.jpg') || i.includes('_1200.jpg')) || imgs[0];
    if (prodImg) {
      const imgRes = await fetch(prodImg, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (imgRes.ok) {
        const buf = await imgRes.arrayBuffer();
        fs.writeFileSync(localDest, Buffer.from(buf));
        console.log(`Saved Haier image: ${localDest} (${buf.byteLength} bytes) from ${prodImg}`);
        return true;
      }
    }
  } catch (e) {
    console.error(`Failed ${pageUrl}:`, e.message);
  }
  return false;
}

async function main() {
  const cat = await prisma.category.findFirst({ where: { slug: 'refrigerators' } });
  if (!cat) throw new Error('Refrigerators category not found');

  const haierDir = path.join(__dirname, '../public/uploads/haier');
  if (!fs.existsSync(haierDir)) fs.mkdirSync(haierDir, { recursive: true });

  console.log('Seeding Haier Inverter Refrigerators...');
  for (const item of haierRefrigerators) {
    const dest = path.join(__dirname, `../public${item.localImg}`);
    await extractAndDownloadHaier(item.pageUrl, dest);

    const cashPrice = item.cashPrice;
    const min30Adv = Math.round((cashPrice * 0.3) / 100) * 100;
    // 16-month financing calculation (28% markup)
    const financedPrincipal = cashPrice - min30Adv;
    const markup = Math.round(financedPrincipal * 0.28);
    const totalFinanced = cashPrice + markup;
    const rawMonthly = (totalFinanced - min30Adv) / 16;
    const roundMonthly = Math.round(rawMonthly / 100) * 100;
    const finalTotalInstallment = min30Adv + (roundMonthly * 16);

    await prisma.product.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        cashPrice,
        installmentPrice: finalTotalInstallment,
        downpaymentBase: min30Adv,
        durationMonths: 16,
        imageUrl: fs.existsSync(dest) ? item.localImg : '/uploads/dawlance/ref-inox.webp',
        specsJson: JSON.stringify(item.specs),
        categoryId: cat.id,
        isFeatured: true,
        stock: 8
      },
      create: {
        title: item.title,
        slug: item.slug,
        cashPrice,
        installmentPrice: finalTotalInstallment,
        downpaymentBase: min30Adv,
        durationMonths: 16,
        imageUrl: fs.existsSync(dest) ? item.localImg : '/uploads/dawlance/ref-inox.webp',
        specsJson: JSON.stringify(item.specs),
        categoryId: cat.id,
        isFeatured: true,
        stock: 8
      }
    });
    console.log(`✓ Seeded ${item.title}`);
  }

  console.log('\nSeeding Haier Deep Freezers...');
  for (const item of haierFreezers) {
    const dest = path.join(__dirname, `../public${item.localImg}`);
    await extractAndDownloadHaier(item.pageUrl, dest);

    const cashPrice = item.cashPrice;
    const min30Adv = Math.round((cashPrice * 0.3) / 100) * 100;
    const financedPrincipal = cashPrice - min30Adv;
    const markup = Math.round(financedPrincipal * 0.28);
    const totalFinanced = cashPrice + markup;
    const rawMonthly = (totalFinanced - min30Adv) / 16;
    const roundMonthly = Math.round(rawMonthly / 100) * 100;
    const finalTotalInstallment = min30Adv + (roundMonthly * 16);

    await prisma.product.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        cashPrice,
        installmentPrice: finalTotalInstallment,
        downpaymentBase: min30Adv,
        durationMonths: 16,
        imageUrl: fs.existsSync(dest) ? item.localImg : '/uploads/dawlance/ref-inox.webp',
        specsJson: JSON.stringify(item.specs),
        categoryId: cat.id,
        isFeatured: true,
        stock: 10
      },
      create: {
        title: item.title,
        slug: item.slug,
        cashPrice,
        installmentPrice: finalTotalInstallment,
        downpaymentBase: min30Adv,
        durationMonths: 16,
        imageUrl: fs.existsSync(dest) ? item.localImg : '/uploads/dawlance/ref-inox.webp',
        specsJson: JSON.stringify(item.specs),
        categoryId: cat.id,
        isFeatured: true,
        stock: 10
      }
    });
    console.log(`✓ Seeded ${item.title}`);
  }

  console.log('\nFinished seeding Haier Refrigerators & Deep Freezers!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
