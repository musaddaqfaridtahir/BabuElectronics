const fs = require('fs');

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
  await download('https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80', 'public/uploads/dawlance/ref-inox.webp');
}
main().catch(console.error);
