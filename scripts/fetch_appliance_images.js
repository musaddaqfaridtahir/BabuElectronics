const fs = require('fs');

async function download(url, dest) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buf));
    console.log(`Saved ${dest} (${buf.byteLength} bytes)`);
    return true;
  } catch (e) {
    console.error(`Failed ${url}:`, e.message);
    return false;
  }
}

async function scrapeImages(query) {
  const url = `https://www.daraz.pk/catalog/?q=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  const matches = [...html.matchAll(/"image":"([^"]+)"/g)].map(m => m[1]);
  console.log(`Found ${matches.length} images for "${query}"`);
  return matches;
}

async function main() {
  const washerImgs = await scrapeImages('dawlance automatic washing machine');
  if (washerImgs.length > 0) {
    await download(washerImgs[0], 'public/uploads/dawlance/washer-topload-1.webp');
    if (washerImgs[1]) await download(washerImgs[1], 'public/uploads/dawlance/washer-topload-2.webp');
  }

  const acImgs = await scrapeImages('dawlance inverter ac split');
  if (acImgs.length > 0) {
    await download(acImgs[0], 'public/uploads/dawlance/ac-inverter-1.webp');
    if (acImgs[1]) await download(acImgs[1], 'public/uploads/dawlance/ac-inverter-2.webp');
  }

  const refImgs = await scrapeImages('dawlance refrigerator glass door');
  if (refImgs.length > 0) {
    await download(refImgs[0], 'public/uploads/dawlance/ref-glassdoor-1.webp');
    if (refImgs[1]) await download(refImgs[1], 'public/uploads/dawlance/ref-glassdoor-2.webp');
  }
}

main().catch(console.error);
