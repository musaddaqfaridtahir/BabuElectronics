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
    console.error(`Error downloading ${url}:`, e.message);
    return false;
  }
}

async function main() {
  await download('https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1724299274550/c3ec6883e368956ed04f64504e860273.png', 'public/uploads/vivo/vivo-v40.png');
  await download('https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1792059914451/e926b31025f4eec10a3bb50018ff1bee.png', 'public/uploads/vivo/vivo-v30.png');
  await download('https://asia-exstatic-vivofs.vivo.com/PSee2l50xoirPK7y/1715063961330/5eda7f2b71c5ea21c63d6bcfc7f0c92e.png', 'public/uploads/vivo/vivo-y28.png');
}

main();
