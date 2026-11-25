const fs = require('fs');

async function download(url, dest) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buf));
  console.log(`Saved ${dest} (${buf.byteLength} bytes)`);
}

async function main() {
  await download('https://img.drz.lazcdn.com/static/pk/p/eea7e630b4b1b24e50453cddb91a33b5.jpg_720x720q80.jpg_.webp', 'public/uploads/dawlance/ref-burgundy.webp');
  await download('https://img.drz.lazcdn.com/static/pk/p/35e29a41cb0ae5afc7613fd5929b208e.jpg_720x720q80.jpg_.webp', 'public/uploads/dawlance/ref-silver.webp');
}
main().catch(console.error);
