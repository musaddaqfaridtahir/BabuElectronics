const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
sharp.cache(false);
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const uploadsRoot = path.join(__dirname, '../public/uploads');

async function optimizeDirectory() {
  const urlMap = new Map(); // old public path -> new public path
  const allFiles = [];

  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const st = fs.statSync(full);
      if (st.isDirectory()) walk(full);
      else allFiles.push(full);
    }
  }
  walk(uploadsRoot);

  let beforeBytes = 0;
  let afterBytes = 0;
  let optimizedCount = 0;

  for (const fullPath of allFiles) {
    if (fullPath.endsWith('.tmp.webp')) {
      try { fs.unlinkSync(fullPath); } catch {}
      continue;
    }
    const ext = path.extname(fullPath).toLowerCase();
    if (!['.png', '.jpg', '.jpeg', '.webp', '.jfif'].includes(ext)) {
      const size = fs.statSync(fullPath).size;
      beforeBytes += size;
      afterBytes += size;
      continue;
    }

    const origSize = fs.statSync(fullPath).size;
    beforeBytes += origSize;

    const relFromPublic = '/' + path.relative(path.join(__dirname, '../public'), fullPath).replace(/\\/g, '/');
    const dir = path.dirname(fullPath);
    const base = path.basename(fullPath, ext);
    const destPath = path.join(dir, `${base}.webp`);
    const newRelFromPublic = '/' + path.relative(path.join(__dirname, '../public'), destPath).replace(/\\/g, '/');

    // Target max 640px for crisp mobile/desktop retina cards & detail stages while tiny in KB
    const maxDim = relFromPublic.includes('cg125s-red') || relFromPublic.includes('honda/') ? 760 : 640;

    try {
      const inputBuf = fs.readFileSync(fullPath);
      const outBuf = await sharp(inputBuf)
        .rotate()
        .resize({
          width: maxDim,
          height: maxDim,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({
          quality: 80,
          alphaQuality: 85,
          effort: 5,
        })
        .toBuffer();

      const newSize = outBuf.byteLength;

      if (ext === '.webp' && newSize >= origSize) {
        afterBytes += origSize;
      } else {
        fs.writeFileSync(destPath, outBuf);
        if (destPath !== fullPath && fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
        urlMap.set(relFromPublic, newRelFromPublic);
        afterBytes += newSize;
        optimizedCount++;
        console.log(`✓ ${relFromPublic} (${Math.round(origSize / 1024)}KB) -> ${newRelFromPublic} (${Math.round(newSize / 1024)}KB)`);
      }
    } catch (err) {
      console.error(`Failed optimizing ${relFromPublic}:`, err.message);
      afterBytes += origSize;
    }
  }

  console.log(`\n=== IMAGE OPTIMIZATION SUMMARY ===`);
  console.log(`Files optimized: ${optimizedCount}`);
  console.log(`Total size BEFORE: ${(beforeBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total size AFTER:  ${(afterBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Saved:             ${(((beforeBytes - afterBytes) / beforeBytes) * 100).toFixed(1)}%`);

  // Update all products in SQLite database
  console.log('\nUpdating database imageUrl and colorImages paths...');
  const products = await prisma.product.findMany();
  let dbUpdated = 0;

  for (const prod of products) {
    let changed = false;
    let newImageUrl = prod.imageUrl;

    if (urlMap.has(prod.imageUrl)) {
      newImageUrl = urlMap.get(prod.imageUrl);
      changed = true;
    } else if (prod.imageUrl && prod.imageUrl.startsWith('/uploads/') && !prod.imageUrl.endsWith('.webp')) {
      const candidate = prod.imageUrl.replace(/\.(png|jpg|jpeg|jfif)$/i, '.webp');
      if (fs.existsSync(path.join(__dirname, '../public', candidate))) {
        newImageUrl = candidate;
        changed = true;
      }
    }

    let newSpecsJson = prod.specsJson;
    if (prod.specsJson) {
      try {
        const parsed = JSON.parse(prod.specsJson);
        if (parsed.colorImages && typeof parsed.colorImages === 'object') {
          for (const [k, v] of Object.entries(parsed.colorImages)) {
            if (typeof v === 'string') {
              if (urlMap.has(v)) {
                parsed.colorImages[k] = urlMap.get(v);
                changed = true;
              } else if (v.startsWith('/uploads/') && !v.endsWith('.webp')) {
                const candidate = v.replace(/\.(png|jpg|jpeg|jfif)$/i, '.webp');
                if (fs.existsSync(path.join(__dirname, '../public', candidate))) {
                  parsed.colorImages[k] = candidate;
                  changed = true;
                }
              }
            }
          }
        }
        newSpecsJson = JSON.stringify(parsed);
      } catch {}
    }

    if (changed) {
      await prisma.product.update({
        where: { id: prod.id },
        data: {
          imageUrl: newImageUrl,
          specsJson: newSpecsJson,
        },
      });
      dbUpdated++;
    }
  }

  console.log(`Updated ${dbUpdated} products in database with optimized .webp image URLs!`);
}

optimizeDirectory()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
