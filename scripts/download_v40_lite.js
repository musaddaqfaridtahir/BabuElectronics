const fs = require('fs');

async function download(url, dest) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  if (res.ok) {
    const buf = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buf));
    console.log(`Saved ${dest} (${buf.byteLength} bytes)`);
  }
}
download('https://fdn2.gsmarena.com/vv/bigpic/vivo-v40-lite-4g.jpg', 'public/uploads/vivo/vivo-v40-lite.jpg');
