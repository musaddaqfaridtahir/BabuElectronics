const fs = require('fs');

async function run() {
  const res = await fetch('https://pk.infinixmobility.com/smartphones', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const html = await res.text();
  fs.writeFileSync('scripts/infinix_smartphones.html', html);
  console.log('Saved smartphones page, length:', html.length);

  // Search for images on transsion CDN or infinix CDN
  const imgMatches = [...html.matchAll(/(https?:\/\/[^\s"'<>]+\.(?:png|webp|jpg))/gi)].map(m => m[1]);
  const cdnImgs = imgMatches.filter(x => x.includes('transsion') || x.includes('infinix') || x.includes('product'));
  console.log('CDN Images:', Array.from(new Set(cdnImgs)).slice(0, 30));
}

run().catch(console.error);
