const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const latestVivoList = [
  {
    name: 'Vivo V80 (ZEISS Professional Optics)',
    slug: 'vivo-v80',
    cashPrice: 159999,
    imgUrl: 'https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1793675604258/8ca9b4e54f529a73a6d4773dbd2f5525.png',
    localImg: '/uploads/vivo/vivo-v80.png',
    specs: {
      'Brand': 'Vivo Official',
      'Processor': 'Snapdragon 7 Gen 4 (4nm Flagship)',
      'Camera': 'ZEISS 50MP OIS True Color + 50MP Ultra Wide + 50MP Group Selfie',
      'Battery': '6500mAh BlueVolt Mega Battery (90W FlashCharge)',
      'Display': '1.5K 120Hz 3D Curved AMOLED (4500 nits Peak)',
      'RAM & Storage': '12GB (+12GB Extended) / 256GB UFS 3.1',
      'Durability': 'IP68 & IP69 Dust and Water Resistant',
      'Colors': 'Titanium Silver, Moonlight Blue, Velvet Black'
    }
  },
  {
    name: 'Vivo V80 Lite 5G (Studio Aura Light)',
    slug: 'vivo-v80-lite-5g',
    cashPrice: 79999,
    imgUrl: 'https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1787042134153/eed22030f61b93ffe7e1f409c814e0e5.png',
    localImg: '/uploads/vivo/vivo-v80-lite.png',
    specs: {
      'Brand': 'Vivo Official',
      'Processor': 'Snapdragon 4 Gen 2 (5G High Efficiency)',
      'Camera': '50MP Sony IMX Sensor + Studio AI Aura Light',
      'Battery': '6500mAh 4-Year Health Battery (90W FlashCharge)',
      'Display': '120Hz Ultra Vision AMOLED Display (Dual Stereo Speakers)',
      'RAM & Storage': '8GB (+8GB Extended) / 256GB',
      'Colors': 'Titanium Gold, Phantom Black'
    }
  },
  {
    name: 'Vivo V70 FE (Portrait Master)',
    slug: 'vivo-v70-fe',
    cashPrice: 94999,
    imgUrl: 'https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1776739938831/f35f869a6dcfe33cf8df58915a21f83a.png',
    localImg: '/uploads/vivo/vivo-v70-fe.png',
    specs: {
      'Brand': 'Vivo Official',
      'Processor': 'MediaTek Dimensity 7200 (4nm)',
      'Camera': '50MP Sony VCS OIS + Aura Light Portrait System',
      'Battery': '6000mAh Ultra-Thin Battery (80W FlashCharge)',
      'Display': '120Hz 3D Curved Screen (HDR10+)',
      'RAM & Storage': '12GB (+12GB Extended) / 256GB',
      'Colors': 'Ocean Blue, Crystal Black'
    }
  },
  {
    name: 'Vivo X300 FE (ZEISS Flagship Telephoto)',
    slug: 'vivo-x300-fe',
    cashPrice: 229999,
    imgUrl: 'https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1783584596796/a9d7843aa7d70689aaf44ccc85d8abd3.png',
    localImg: '/uploads/vivo/vivo-x300-fe.png',
    specs: {
      'Brand': 'Vivo Official Flagship',
      'Processor': 'MediaTek Dimensity 9400 (3nm Flagship Engine)',
      'Camera': 'ZEISS 50MP Periscope Telephoto (100x Zoom) + 50MP 1-inch Main',
      'Battery': '6500mAh BlueVolt (100W FlashCharge + 50W Wireless)',
      'Display': '2K 144Hz LTPO AMOLED (5000 nits)',
      'RAM & Storage': '16GB (+16GB Extended) / 512GB UFS 4.0',
      'Colors': 'Space Black, Titanium Silver, Alpine White'
    }
  },
  {
    name: 'Vivo X200 FE (ZEISS Professional Camera)',
    slug: 'vivo-x200-fe',
    cashPrice: 189999,
    imgUrl: 'https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1751888408565/43880ac865e0a47b14c11da6a080f2a6.png',
    localImg: '/uploads/vivo/vivo-x200-fe.png',
    specs: {
      'Brand': 'Vivo Official Flagship',
      'Processor': 'Dimensity 9300+ Flagship Processor',
      'Camera': 'ZEISS APO Telephoto + 50MP Ultra-Sensing Main',
      'Battery': '6500mAh Battery (90W FlashCharge)',
      'Display': '1.5K 120Hz Eye Protection AMOLED',
      'RAM & Storage': '12GB (+12GB Extended) / 256GB',
      'Colors': 'Aurora Green, Midnight Black'
    }
  },
  {
    name: 'Vivo Y500 (Monster Battery & Armor)',
    slug: 'vivo-y500',
    cashPrice: 62999,
    imgUrl: 'https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1781686497055/6b92a9a97bb378e45f416d0bb7042ab5.png',
    localImg: '/uploads/vivo/vivo-y500.png',
    specs: {
      'Brand': 'Vivo Official',
      'Processor': 'Snapdragon 6 Gen 1 (4nm)',
      'Camera': '50MP Ultra Clear AI Camera + Dynamic Aura Glow',
      'Battery': '6500mAh 4-Year Health Battery (80W FlashCharge)',
      'Display': '120Hz High Brightness Sunlight Display (Dual Speakers 300%)',
      'RAM & Storage': '8GB (+8GB Extended) / 256GB',
      'Protection': 'Military Grade Shockproof + IP64 Dust/Water',
      'Colors': 'Armor Black, Desert Gold, Forest Green'
    }
  },
  {
    name: 'Vivo Y32 (Long-Life Battery)',
    slug: 'vivo-y32',
    cashPrice: 47999,
    imgUrl: 'https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1792059909582/a91ee10a30bc596d818a5235da49a762.png',
    localImg: '/uploads/vivo/vivo-y32.png',
    specs: {
      'Brand': 'Vivo Official',
      'Processor': 'MediaTek Helio G85 Gaming Chip',
      'Camera': '50MP Ultra Clear Main Camera + AI Portrait',
      'Battery': '5500mAh 4-Year Long Life Battery (44W FlashCharge)',
      'Display': '90Hz High Brightness Sunlight Display (1000 nits)',
      'RAM & Storage': '8GB (+8GB Extended) / 128GB',
      'Colors': 'Starlight Blue, Agate Black'
    }
  },
  {
    name: 'Vivo Y31d (Eye-Care Sunlight Display)',
    slug: 'vivo-y31d',
    cashPrice: 39999,
    imgUrl: 'https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1774583424778/1879d672f2bb633dd8d8a2c71df71148.png',
    localImg: '/uploads/vivo/vivo-y31d.png',
    specs: {
      'Brand': 'Vivo Official',
      'Processor': 'Snapdragon 680 Energy Saver',
      'Camera': '50MP HD Dual Camera',
      'Battery': '5000mAh Battery (44W Fast Charge)',
      'Display': '90Hz Sunlight Display (TÜV Rheinland Low Blue Light)',
      'RAM & Storage': '6GB (+6GB Extended) / 128GB',
      'Colors': 'Deep Sea Blue, Pearl White'
    }
  },
  {
    name: 'Vivo Y11d (Reliable Daily Driver)',
    slug: 'vivo-y11d',
    cashPrice: 31999,
    imgUrl: 'https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1773301234607/a01e5f51f990239aa8da4a4e3a2428c6.png',
    localImg: '/uploads/vivo/vivo-y11d.png',
    specs: {
      'Brand': 'Vivo Official',
      'Processor': 'Octa-Core Helio Processor',
      'Camera': '50MP Clear AI Camera',
      'Battery': '5000mAh Long-Lasting Battery (15W Type-C)',
      'Display': '90Hz High Brightness Display',
      'RAM & Storage': '6GB (+6GB Extended) / 128GB',
      'Resistance': 'IP54 Water and Dust Splash Resistance',
      'Colors': 'Wave Aqua, Mocha Brown'
    }
  },
  {
    name: 'Vivo Y05 (Budget Smartphone)',
    slug: 'vivo-y05',
    cashPrice: 24999,
    imgUrl: 'https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1770641034728/0768f187d8bf7cf8fdab23e45f55ed25.png',
    localImg: '/uploads/vivo/vivo-y05.png',
    specs: {
      'Brand': 'Vivo Official',
      'Processor': 'MediaTek Helio G85 Gaming Processor',
      'Camera': '13MP Clear Dual Camera',
      'Battery': '5000mAh All-Day Battery',
      'Display': '90Hz Sunlight Display',
      'RAM & Storage': '4GB (+4GB Extended) / 64GB',
      'Colors': 'Space Black, Gem Green'
    }
  }
];

async function download(url, dest) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    if (res.ok) {
      const buf = await res.arrayBuffer();
      fs.writeFileSync(dest, Buffer.from(buf));
      console.log(`Saved image: ${dest} (${buf.byteLength} bytes)`);
      return true;
    }
  } catch (e) {
    console.error(`Download failed for ${url}:`, e.message);
  }
  return false;
}

async function main() {
  const cat = await prisma.category.findFirst({ where: { slug: 'mobiles' } });
  if (!cat) throw new Error('Mobiles category not found');

  console.log('Downloading official latest Vivo images and seeding products...');

  for (const item of latestVivoList) {
    const dest = `public${item.localImg}`;
    await download(item.imgUrl, dest);

    const cashPrice = item.cashPrice;
    const min30Adv = Math.round((cashPrice * 0.3) / 100) * 100;
    // 12-Month financing calculation
    const financed = cashPrice - min30Adv;
    const markup = Math.round(financed * 0.25);
    const rawMo = (financed + markup) / 12;
    const roundMo = Math.round(rawMo / 100) * 100;
    const totalInst = min30Adv + (roundMo * 12);

    await prisma.product.upsert({
      where: { slug: item.slug },
      update: {
        title: item.name,
        cashPrice,
        downpaymentBase: min30Adv,
        durationMonths: 12,
        installmentPrice: totalInst,
        imageUrl: item.localImg,
        specsJson: JSON.stringify(item.specs),
        stock: 15,
        isFeatured: item.cashPrice > 70000
      },
      create: {
        title: item.name,
        slug: item.slug,
        categoryId: cat.id,
        cashPrice,
        downpaymentBase: min30Adv,
        durationMonths: 12,
        installmentPrice: totalInst,
        imageUrl: item.localImg,
        specsJson: JSON.stringify(item.specs),
        stock: 15,
        isFeatured: item.cashPrice > 70000
      }
    });

    console.log(`Seeded Latest Vivo: [${item.name}] -> Cash: Rs. ${cashPrice}, 30% Adv: Rs. ${min30Adv}, 12M: Rs. ${roundMo}/mo`);
  }

  console.log('All latest Vivo products seeded successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
