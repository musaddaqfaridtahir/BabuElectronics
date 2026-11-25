const fs = require('fs');

async function getImagesFromProduct(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const html = await res.text();
    const imgs = html.match(/https:\/\/img\.drz\.lazcdn\.com\/static\/pk\/p\/[a-f0-9]+\.jpg_[0-9x]+q[0-9]+\.jpg_\.webp/gi);
    return imgs || [];
  } catch (e) {
    return [];
  }
}

async function download(url, dest) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  if (res.ok) {
    const buf = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buf));
    console.log(`Saved ${dest} (${buf.byteLength} bytes)`);
  }
}

async function main() {
  const avanteImgs = await getImagesFromProduct('https://www.daraz.pk/products/dawlance-refrigerator-91999-avante-inverter-glass-door-large-size-20-cft-i347596001.html');
  console.log('Avante images:', avanteImgs);
  if (avanteImgs[0]) {
    await download(avanteImgs[0], 'public/uploads/dawlance/ref-black-glass.webp');
  }

  const washerImgs = await getImagesFromProduct('https://www.daraz.pk/products/dawlance-10-kg-top-load-fully-automatic-washing-machine-dwt-11467-es-i442562208.html');
  console.log('Washer 2 images:', washerImgs);
  if (washerImgs[0]) {
    await download(washerImgs[0], 'public/uploads/dawlance/washer-topload-silver.webp');
  }
}
main().catch(console.error);
