const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tecnoModels = [
  {
    title: 'TECNO CAMON 50 Pro (Curved 144Hz AMOLED + 50MP 3X OIS)',
    slug: 'tecno-camon-50-pro',
    cashPrice: 109999,
    colors: [
      { name: 'Moon Shadow Black', file: 'camon50pro-black.png', url: 'https://d13pvy8xd75yde.cloudfront.net/camon/cn5c-%E6%9C%88%E5%BD%B1%E9%BB%91.png' },
      { name: 'Malachite Green', file: 'camon50pro-green.png', url: 'https://d13pvy8xd75yde.cloudfront.net/camon/cn5c-%E5%AD%94%E9%9B%80%E7%9F%B3%E7%BB%BF.png' },
      { name: 'Starlight Titanium', file: 'camon50pro-titanium.png', url: 'https://d13pvy8xd75yde.cloudfront.net/camon/cn5c-%E6%98%9F%E6%B2%B3%E9%92%9B.png' },
      { name: 'Monet Purple', file: 'camon50pro-purple.png', url: 'https://d13pvy8xd75yde.cloudfront.net/camon/cn5c-%E8%8E%AB%E8%80%90%E7%B4%AB.png' },
      { name: 'Dawn Blue', file: 'camon50pro-blue.png', url: 'https://d13pvy8xd75yde.cloudfront.net/camon/cn5c-%E6%99%A8%E6%9B%A6%E8%93%9D.png' }
    ],
    specs: {
      'Brand': 'TECNO Official Pakistan',
      'Operating System': 'Android 16 / HiOS 16',
      'Processor': 'MediaTek Helio G200 Ultimate Processor',
      'Display': '6.78" Curved AMOLED 144Hz 1.5K (1208x2644)',
      'Camera': 'Rear: 50MP OIS + 50MP 3X Telephoto + 8MP Ultra-Wide | Front: 32MP',
      'Memory': '256GB ROM + 16GB RAM (8GB + 8GB Extended)',
      'Battery': '6500mAh 5-Year Durability Battery (45W Super Charge)',
      'Audio': 'Dual Stereo Speakers with Dolby Atmos'
    }
  },
  {
    title: 'TECNO CAMON 50 (144Hz AMOLED + 6500mAh Battery)',
    slug: 'tecno-camon-50',
    cashPrice: 92999,
    colors: [
      { name: 'Moon Shadow Black', file: 'camon50-black.png', url: 'https://d13pvy8xd75yde.cloudfront.net/camon/CN5-%E6%9C%88%E5%BD%B1%E9%BB%91.png' },
      { name: 'Malachite Green', file: 'camon50-green.png', url: 'https://d13pvy8xd75yde.cloudfront.net/camon/CN5-%E5%AD%94%E9%9B%80%E7%9F%B3%E7%BB%BF.png' },
      { name: 'Starlight Titanium', file: 'camon50-titanium.png', url: 'https://d13pvy8xd75yde.cloudfront.net/camon/CN5-%E6%98%9F%E6%B2%B3%E9%92%9B.png' },
      { name: 'Monet Purple', file: 'camon50-purple.png', url: 'https://d13pvy8xd75yde.cloudfront.net/camon/CN5-%E8%8E%AB%E5%A5%88%E7%B4%AB.png' },
      { name: 'Cream Mint Green', file: 'camon50-mint.png', url: 'https://d13pvy8xd75yde.cloudfront.net/camon/CN5-%E5%A5%B6%E6%B2%B9%E8%96%84%E8%8D%B7%E7%BB%BF.png' }
    ],
    specs: {
      'Brand': 'TECNO Official Pakistan',
      'Operating System': 'Android 16 / HiOS 16',
      'Processor': 'MediaTek Helio G200 Ultimate',
      'Display': '6.78" AMOLED 144Hz 1.5K',
      'Camera': 'Rear: 50MP 1/1.56" OIS + 8MP Ultra-Wide AF | Front: 32MP',
      'Memory': '256GB ROM + 16GB RAM (8GB + 8GB Extended)',
      'Battery': '6500mAh 5-Year Battery (45W Super Charge)',
      'Audio': 'Dual Speakers with Dolby Atmos'
    }
  },
  {
    title: 'TECNO POVA Curve 2 5G (8000mAh Mega Battery + Dimensity 7100)',
    slug: 'tecno-pova-curve-2-5g',
    cashPrice: 99999,
    colors: [
      { name: 'Interstellar Titanium', file: 'pova-curve2-1.png', url: 'https://d13pvy8xd75yde.cloudfront.net/ph/1.png' },
      { name: 'Cyber Blue', file: 'pova-curve2-2.png', url: 'https://d13pvy8xd75yde.cloudfront.net/ph/2.png' },
      { name: 'Phantom Silver', file: 'pova-curve2-3.png', url: 'https://d13pvy8xd75yde.cloudfront.net/ph/3.png' }
    ],
    specs: {
      'Brand': 'TECNO Official Pakistan',
      'Operating System': 'Android 16 / HiOS 16',
      'Processor': 'MediaTek Dimensity 7100 5G (6nm, Up to 2.4GHz)',
      'Display': '6.78" 144Hz Curved AMOLED (Corning Gorilla Glass 7i, 4500 nits)',
      'Camera': 'Rear: 50MP + 2MP | Front: 13MP',
      'Memory': '256GB ROM + 24GB RAM (12GB + 12GB Extended)',
      'Battery': '8000mAh Mega Battery (45W Fast Charge Type-C)',
      'Features': 'Under-Display Fingerprint, Dolby Atmos, 5G Ready'
    }
  },
  {
    title: 'TECNO CAMON 40 Premier 5G (Dimensity 8350 + Triple 50MP)',
    slug: 'tecno-camon-40-premier-5g',
    cashPrice: 119999,
    colors: [
      { name: 'Galaxy Black', file: 'camon40prem-black.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/phones/camon/camon40/camon%2040%20premier%205g/CM8%20B.png' },
      { name: 'Emerald Green', file: 'camon40prem-green.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/phones/camon/camon40/camon%2040%20premier%205g/CM8%20G.png' }
    ],
    specs: {
      'Brand': 'TECNO Official Pakistan',
      'Operating System': 'Android 15',
      'Processor': 'MediaTek Dimensity 8350 Ultimate AI (5G)',
      'Display': '6.67" AMOLED 144Hz (1260x2800)',
      'Camera': 'Triple 50MP Rear (OIS + 3X + Wide) | 50MP AF Front',
      'Memory': '256GB ROM + 24GB RAM (12GB + 12GB Extended)',
      'Battery': '5100mAh (70W Ultra Charge)',
      'Audio': 'Dual Speakers Dolby Atmos & NFC'
    }
  },
  {
    title: 'TECNO CAMON 40 Pro (50MP OIS + 50MP Selfie + 120Hz AMOLED)',
    slug: 'tecno-camon-40-pro',
    cashPrice: 69999,
    colors: [
      { name: 'Galaxy Black', file: 'camon40pro-black.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/phones/camon/camon40/camon%2040%20pro/CM6%20B.png' },
      { name: 'Emerald Lake Green', file: 'camon40pro-green.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/phones/camon/camon40/camon%2040%20pro/CM6G.png' },
      { name: 'Glacier White', file: 'camon40pro-white.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/phones/camon/camon40/camon%2040%20pro/CM6%20W.png' },
      { name: 'Titanium Silver', file: 'camon40pro-titanium.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/phones/camon/camon40/camon%2040%20pro/CM6%20T.png' }
    ],
    specs: {
      'Brand': 'TECNO Official Pakistan',
      'Operating System': 'Android 15',
      'Processor': 'MediaTek Helio G100 Ultimate',
      'Display': '6.78" AMOLED 120Hz (1080x2436)',
      'Camera': 'Rear: 50MP OIS + 8MP Wide | Front: 50MP AF',
      'Memory': '256GB ROM + 16GB RAM (8GB + 8GB Extended)',
      'Battery': '5200mAh (45W Super Charge)'
    }
  },
  {
    title: 'TECNO SPARK 50 Pro (Helio G100 Ultimate + 60W Super Charge)',
    slug: 'tecno-spark-50-pro',
    cashPrice: 68999,
    colors: [
      { name: 'Ink Black', file: 'spark50pro-black.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark50pro_ko5/800%2A800/Ink%20Black.png' },
      { name: 'Spark Edition', file: 'spark50pro-hero.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark50pro/SPARK50Pro.png' }
    ],
    specs: {
      'Brand': 'TECNO Official Pakistan',
      'Operating System': 'Android 16',
      'Processor': 'MediaTek Helio G100 Ultimate',
      'Display': '6.78" 120Hz Display',
      'Camera': 'Rear: 50MP + AI | Front: 8MP',
      'Memory': '128GB ROM + 24GB RAM (8GB + 16GB Extended)',
      'Battery': '6000mAh Battery (60W Super Charging)',
      'Audio': 'Dual Speakers DTS Sound + FreeLink 2.0'
    }
  },
  {
    title: 'TECNO SPARK 50 (7000mAh Mega Battery + 120Hz Display)',
    slug: 'tecno-spark-50',
    cashPrice: 59999,
    colors: [
      { name: 'Halo Blue', file: 'spark50-blue.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark50_kn4_kn4n/800%2A800/halo-blue.png' },
      { name: 'Titanium Grey', file: 'spark50-grey.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark50_kn4_kn4n/800%2A800/Titanium-Grey.png' },
      { name: 'Ink Black', file: 'spark50-black.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark50_kn4_kn4n/800%2A800/ink-black.png' },
      { name: 'Aurora Purple', file: 'spark50-purple.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark50_kn4_kn4n/800%2A800/aurora-puple.png' },
      { name: 'Bloom Pink', file: 'spark50-pink.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark50_kn4_kn4n/800%2A800/bloom-pink.png' }
    ],
    specs: {
      'Brand': 'TECNO Official Pakistan',
      'Operating System': 'Android 16',
      'Processor': 'MediaTek Helio G81',
      'Display': '6.78" 120Hz Hole Screen',
      'Camera': 'Rear: 50MP Dual Flash | Front: 8MP Flash',
      'Memory': '128GB ROM + 18GB RAM (6GB + 12GB Extended)',
      'Battery': '7000mAh Mega Battery (18W Fast Charging Type-C)'
    }
  },
  {
    title: 'TECNO SPARK 40 Pro+ (144Hz 3D AMOLED + 30W Wireless Charging)',
    slug: 'tecno-spark-40-pro-plus',
    cashPrice: 74999,
    colors: [
      { name: 'Obsidian Black', file: 'spark40proplus-black.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark-40-pro-%2B/KM7%20%E9%BB%91.png' },
      { name: 'Moon White', file: 'spark40proplus-white.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark-40-pro-%2B/KM7%E7%99%BD.png' },
      { name: 'Titanium Grey', file: 'spark40proplus-titanium.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark-40-pro-%2B/KM7%20%E9%92%9B.png' },
      { name: 'Emerald Green', file: 'spark40proplus-green.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark-40-pro-%2B/KM7%20%E7%BB%BF.png' }
    ],
    specs: {
      'Brand': 'TECNO Official Pakistan',
      'Operating System': 'Android 15',
      'Processor': 'MediaTek Helio G200 (6.49mm Ultra-Slim)',
      'Display': '6.78" 144Hz 1.5K 3D Curved AMOLED',
      'Camera': 'Rear: 50MP Dual Flash | Front: 13MP Dual Flash',
      'Memory': '256GB ROM + 16GB RAM (8GB + 8GB Extended)',
      'Battery': '5200mAh (45W Super Charge + 30W Wireless Charging)'
    }
  },
  {
    title: 'TECNO SPARK 40 Pro (144Hz AMOLED + Helio G100 Ultimate)',
    slug: 'tecno-spark-40-pro',
    cashPrice: 64999,
    colors: [
      { name: 'Ink Black', file: 'spark40pro-black.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark-40-pro/KM6%20%E9%BB%91.png' },
      { name: 'Titanium Grey', file: 'spark40pro-titanium.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark-40-pro/KM6%20%E9%92%9B.png' },
      { name: 'Ocean Blue', file: 'spark40pro-blue.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark-40-pro/KM6%E8%93%9D.png' },
      { name: 'Forest Green', file: 'spark40pro-green.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark-40-pro/KM6%20%E7%BB%BF.png' }
    ],
    specs: {
      'Brand': 'TECNO Official Pakistan',
      'Operating System': 'Android 15',
      'Processor': 'MediaTek Helio G100 Ultimate',
      'Display': '6.78" 144Hz Flexible AMOLED (1224x2720)',
      'Camera': 'Rear: 50MP Dual Flash | Front: 13MP',
      'Memory': '256GB ROM + 16GB RAM (8GB + 8GB Extended)',
      'Battery': '5200mAh (45W Super Charging Type-C)'
    }
  },
  {
    title: 'TECNO SPARK 40 (50MP Camera + 45W Super Charge)',
    slug: 'tecno-spark-40',
    cashPrice: 43999,
    colors: [
      { name: 'Ink Black', file: 'spark40-black.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark-40/5_5N-black.png' },
      { name: 'Titanium Grey', file: 'spark40-grey.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark-40/5_5N-grey.png' },
      { name: 'Glacier White', file: 'spark40-white.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark-40/5_5N-white.png' },
      { name: 'Sky Blue', file: 'spark40-blue.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark-40/5_5N-blue.png' },
      { name: 'Vibrant Orange', file: 'spark40-orange.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/spark-40/5_5N-orange.png' }
    ],
    specs: {
      'Brand': 'TECNO Official Pakistan',
      'Operating System': 'Android 15',
      'Processor': 'MediaTek Helio G81',
      'Display': '6.67" 120Hz Punch-Hole Display',
      'Camera': 'Rear: 50MP Dual Flash | Front: 8MP Dual Flash',
      'Memory': '128GB ROM + 12GB RAM (6GB + 6GB Extended)',
      'Battery': '5200mAh (45W Super Charging Type-C)'
    }
  },
  {
    title: 'TECNO SPARK 40C (6000mAh Long-Lasting Battery + 120Hz)',
    slug: 'tecno-spark-40c',
    cashPrice: 29999,
    colors: [
      { name: 'Midnight Black', file: 'spark40c-black.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/phones/spark-40c/800%2A800/N%20%E9%BB%91.png' },
      { name: 'Pearl White', file: 'spark40c-white.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/phones/spark-40c/800%2A800/N%20%E7%99%BD.png' },
      { name: 'Sky Blue', file: 'spark40c-blue.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/phones/spark-40c/800%2A800/N%20%E8%93%9D.png' },
      { name: 'Titanium Grey', file: 'spark40c-titanium.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/phones/spark-40c/800%2A800/N%20%E9%92%9B.png' }
    ],
    specs: {
      'Brand': 'TECNO Official Pakistan',
      'Operating System': 'Android 15',
      'Processor': 'MediaTek Helio G81',
      'Display': '6.67" 120Hz Punch-Hole Display',
      'Camera': 'Rear: 13MP Dual Flash | Front: 8MP Dual Flash',
      'Memory': '128GB ROM + 16GB RAM (8GB + 8GB Extended)',
      'Battery': '6000mAh Long-Lasting Battery (18W Fast Charging)'
    }
  },
  {
    title: 'TECNO SPARK Go 3 (120Hz Smooth Display + 5000mAh)',
    slug: 'tecno-spark-go-3',
    cashPrice: 34999,
    colors: [
      { name: 'Midnight Black', file: 'sparkgo3-black.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/sparkgo3-pop20/800%2A800/KN3-%E9%BB%91%E8%89%B2.png' },
      { name: 'Titanium Silver', file: 'sparkgo3-silver.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/sparkgo3-pop20/800%2A800/KN3-%E9%92%9B%E8%89%B2.png' },
      { name: 'Light Purple', file: 'sparkgo3-purple.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/sparkgo3-pop20/800%2A800/KN3-%E6%B7%A1%E7%B4%AB%E8%89%B2.png' },
      { name: 'Deep Blue', file: 'sparkgo3-blue.png', url: 'https://d13pvy8xd75yde.cloudfront.net/global/sparkgo3-pop20/800%2A800/KN3-%E6%B7%B1%E8%93%9D%E8%89%B2.png' }
    ],
    specs: {
      'Brand': 'TECNO Official Pakistan',
      'Operating System': 'Android 15',
      'Processor': 'Octa-Core T7250 Processor',
      'Display': '6.75" 120Hz Dot Notch Screen',
      'Camera': 'Rear: 13MP Dual Flash | Front: 8MP',
      'Memory': '128GB ROM + 8GB RAM (4GB + 4GB Extended)',
      'Battery': '5000mAh Battery (15W Fast Charging Type-C)'
    }
  }
];

function computeMobileInstallment(cashPrice) {
  // Store policy: Minimum 30% advance, 30% markup on TOTAL cash price at 10 months
  const downpaymentBase = Math.round((cashPrice * 0.3) / 100) * 100;
  const markup30OnTotal = Math.round(cashPrice * 0.30);
  const totalWithMarkup = cashPrice + markup30OnTotal;
  const rawMonthly = (totalWithMarkup - downpaymentBase) / 10;
  const monthlyPayment = Math.round(rawMonthly / 100) * 100;
  const finalTotalInstallment = downpaymentBase + (monthlyPayment * 10);
  return { downpaymentBase, monthlyPayment, finalTotalInstallment };
}

async function downloadFile(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 2000) return true;
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    if (res.ok) {
      const buf = await res.arrayBuffer();
      if (buf.byteLength > 1000) {
        fs.writeFileSync(dest, Buffer.from(buf));
        console.log(`Saved ${path.basename(dest)} (${buf.byteLength} bytes)`);
        return true;
      }
    } else {
      console.log(`HTTP ${res.status} for ${url}`);
    }
  } catch (e) {
    console.log(`Failed ${url}: ${e.message}`);
  }
  return false;
}

async function main() {
  const mobileCat = await prisma.category.findFirst({ where: { slug: 'mobiles' } });
  if (!mobileCat) throw new Error('Mobiles category not found');

  const uploadDir = path.join(__dirname, '../public/uploads/tecno');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  console.log('=== 1. Downloading & Seeding Official Tecno Pakistan Phones ===');
  for (const phone of tecnoModels) {
    const colorImages = {};
    let defaultLocalImg = '';

    for (const c of phone.colors) {
      const dest = path.join(uploadDir, c.file);
      const ok = await downloadFile(c.url, dest);
      if (ok) {
        const publicPath = `/uploads/tecno/${c.file}`;
        colorImages[c.name] = publicPath;
        if (!defaultLocalImg) defaultLocalImg = publicPath;
      }
    }

    if (!defaultLocalImg) {
      defaultLocalImg = '/logo.png';
    }

    const specsWithColors = {
      ...phone.specs,
      Colors: phone.colors.map(c => c.name).join(', '),
      colorImages
    };

    const { downpaymentBase, monthlyPayment, finalTotalInstallment } = computeMobileInstallment(phone.cashPrice);

    await prisma.product.upsert({
      where: { slug: phone.slug },
      update: {
        title: phone.title,
        cashPrice: phone.cashPrice,
        installmentPrice: finalTotalInstallment,
        downpaymentBase,
        durationMonths: 10,
        imageUrl: defaultLocalImg,
        specsJson: JSON.stringify(specsWithColors),
        categoryId: mobileCat.id,
        isFeatured: true,
        stock: 12
      },
      create: {
        title: phone.title,
        slug: phone.slug,
        cashPrice: phone.cashPrice,
        installmentPrice: finalTotalInstallment,
        downpaymentBase,
        durationMonths: 10,
        imageUrl: defaultLocalImg,
        specsJson: JSON.stringify(specsWithColors),
        categoryId: mobileCat.id,
        isFeatured: true,
        stock: 12
      }
    });

    console.log(`✓ ${phone.title}: Cash Rs.${phone.cashPrice.toLocaleString()} | 30% Adv Rs.${downpaymentBase.toLocaleString()} | 10M Rs.${monthlyPayment.toLocaleString()}/mo`);
  }

  console.log('\n=== 2. Updating All Existing Mobiles (Vivo & Infinix) to 30% Markup on TOTAL Cash Price @ 10M ===');
  const allMobiles = await prisma.product.findMany({ where: { categoryId: mobileCat.id } });
  for (const m of allMobiles) {
    const { downpaymentBase, finalTotalInstallment, monthlyPayment } = computeMobileInstallment(m.cashPrice);
    await prisma.product.update({
      where: { id: m.id },
      data: {
        installmentPrice: finalTotalInstallment,
        downpaymentBase,
        durationMonths: 10
      }
    });
    console.log(`✓ Recalculated ${m.title}: Cash Rs.${m.cashPrice.toLocaleString()} -> Total Rs.${finalTotalInstallment.toLocaleString()} (${monthlyPayment.toLocaleString()}/mo x 10M)`);
  }

  console.log('\n=== 3. Updating Honda CG125S to 2027 Model & Removing Duplicate ===');
  const primaryCG125S = await prisma.product.findUnique({ where: { slug: 'honda-cg125s-self-start' } });
  if (primaryCG125S) {
    let specs = {};
    try { specs = JSON.parse(primaryCG125S.specsJson || '{}'); } catch {}
    specs['Model Year'] = '2027 Latest Sticker Model';
    await prisma.product.update({
      where: { slug: 'honda-cg125s-self-start' },
      data: {
        title: 'Honda CG125S Self Start (2027 Model)',
        cashPrice: 286900,
        downpaymentBase: 86100,
        specsJson: JSON.stringify(specs)
      }
    });
    console.log('✓ Updated honda-cg125s-self-start to 2027 Model (Rs. 286,900)');
  }

  const dupCG125S = await prisma.product.findUnique({ where: { slug: 'honda-cg-125-self-start-2025' } });
  if (dupCG125S) {
    await prisma.product.delete({ where: { slug: 'honda-cg-125-self-start-2025' } });
    console.log('✓ Deleted duplicate honda-cg-125-self-start-2025');
  }

  const cg150 = await prisma.product.findUnique({ where: { slug: 'honda-cg150' } });
  if (cg150) {
    await prisma.product.update({
      where: { slug: 'honda-cg150' },
      data: { imageUrl: '/uploads/honda/honda-cg150.webp' }
    });
    console.log('✓ Fixed Honda CG150 imageUrl -> /uploads/honda/honda-cg150.webp');
  }

  console.log('\nAll DB updates finished cleanly!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
