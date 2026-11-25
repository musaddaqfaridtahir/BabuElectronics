const fs = require('fs');

async function run() {
  const r = await fetch('https://www.gsmarena.com/infinix-phones-119.php', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const text = await r.text();
  fs.writeFileSync('scripts/gsm_infinix.html', text);
  
  // Find <div class="makers">
  const makersIdx = text.indexOf('<div class="makers">');
  if (makersIdx !== -1) {
    const chunk = text.slice(makersIdx, makersIdx + 15000);
    const regex = /<a href="([^"]*)"><img src="([^"]*)"[^>]*><strong><span>([^<]*)<\/span><\/strong><\/a>/gi;
    let m;
    while ((m = regex.exec(chunk)) !== null) {
      console.log({ link: m[1], img: m[2], title: m[3] });
    }
  }
}
run();
