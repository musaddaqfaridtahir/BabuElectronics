const fs = require('fs');

async function run() {
  const res = await fetch('https://pk.infinixmobility.com', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const html = await res.text();
  fs.writeFileSync('scripts/infinix_home.html', html);
  console.log('Saved infinix_home.html, len:', html.length);

  // Look for series or product links
  const links = new Set();
  const regex = /href="([^"]*(?:series|smartphones|product|note|hot|zero|smart)[^"]*)"/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    links.add(match[1]);
  }
  console.log('Matched links:', Array.from(links).slice(0, 30));
}

run().catch(console.error);
