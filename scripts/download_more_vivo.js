const fs = require('fs');

async function download(url, dest) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buf));
    console.log(`Saved ${dest} (${buf.byteLength} bytes)`);
    return true;
  } catch (e) {
    console.error(`Error downloading ${url}:`, e.message);
    return false;
  }
}

async function main() {
  await download('https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/product/1719824815439/zip/img/vivo-v30e.jpg', 'public/uploads/vivo/vivo-v30e.jpg');
  await download('https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/product/1717038992940/zip/img/vivo-y18-1-mobile.jpg', 'public/uploads/vivo/vivo-y18.jpg');
  await download('https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/product/1711609527866/zip/img/vivo-y03.jpg', 'public/uploads/vivo/vivo-y03.jpg');
  await download('https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/product/1757674659699/zip/img/wap/vivo-v50-lite.png', 'public/uploads/vivo/vivo-v40-lite.png');
  await download('https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1792059918729/2f6eb023bd37d93b8e76f320f631c5cf.png', 'public/uploads/vivo/vivo-y100.png');
}

main();
