const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
sharp.cache(false);
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const microwaves = JSON.parse(
  fs.readFileSync('D:/Web_Data/scratch/products111/products/haier/microwaves.json', 'utf8')
).products;

async function fetchMicrowaveImg(pageUrl, modelSlug) {
  try {
    const res = await fetch(pageUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    if (!res.ok) return null;
    const text = await res.text();
    const imgs = [...text.matchAll(/https:\/\/image\.haier\.com\/pk\/[^"'\s<>]+\.(?:jpg|png|webp)/gi)].map(m => m[0]);
    const prodImg = imgs.find(i => i.includes('_500.') || i.includes('_350.') || i.includes('_1200.') || i.includes('/microwaves/')) || imgs[0];
    if (!prodImg) return null;

    const imgRes = await fetch(prodImg, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    if (!imgRes.ok) return null;
    const rawBuf = Buffer.from(await imgRes.arrayBuffer());
    const outBuf = await sharp(rawBuf)
      .rotate()
      .resize({ width: 640, height: 640, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80, alphaQuality: 85, effort: 5 })
      .toBuffer();

    const destFile = `mw-${modelSlug}.webp`;
    const destPath = path.join(__dirname, '../public/uploads/haier', destFile);
    fs.writeFileSync(destPath, outBuf);
    console.log(`✓ Saved ${destFile} (${Math.round(outBuf.byteLength / 1024)}KB)`);
    return `/uploads/haier/${destFile}`;
  } catch (e) {
    console.log(`Failed ${modelSlug}:`, e.message);
    return null;
  }
}

async function main() {
  // 1. Optimize public/logo.png cleanly (keep exact 482x600 size or lossless palette compression)
  const logoPath = path.join(__dirname, '../public/logo.png');
  const origLogoSize = fs.statSync(logoPath).size;
  const logoBuf = fs.readFileSync(logoPath);
  const optLogo = await sharp(logoBuf)
    .resize({ width: 320, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toBuffer();
  if (optLogo.byteLength < origLogoSize) {
    fs.writeFileSync(logoPath, optLogo);
    console.log(`✓ Optimized logo.png: ${Math.round(origLogoSize / 1024)}KB -> ${Math.round(optLogo.byteLength / 1024)}KB`);
  }

  // 2. Download & compress all 12 Haier microwave oven images
  for (const m of microwaves) {
    const cleanModel = m.model.toLowerCase().replace(/\s+/g, '-');
    const dbSlug = `haier-microwave-oven-${cleanModel}`;
    const imgUrl = await fetchMicrowaveImg(m.source_url, cleanModel);
    if (imgUrl) {
      await prisma.product.updateMany({
        where: { slug: dbSlug },
        data: { imageUrl: imgUrl }
      });
    }
  }

  // Fallback check if any microwave still references cat-microwave
  const left = await prisma.product.findMany({ where: { imageUrl: { contains: 'cat-microwave' } } });
  console.log('Remaining cat-microwave items:', left.length);
}

main().catch(console.error).finally(() => prisma.$disconnect());
