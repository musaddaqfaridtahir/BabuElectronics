const fs = require('fs');

async function run() {
  const xml = await fetch('https://www.tecno-mobile.com/pak/sitemap.xml', { headers: { 'User-Agent': 'Mozilla/5.0' } }).then(r => r.text());
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map(m => m[1]);
  console.log('Total sitemap locs:', locs.length);
  console.log(locs.filter(u => /phone|camon|spark|pova|phantom|pop/i.test(u)));

  const sm = await fetch('https://www.tecno-mobile.com/pak/site-map/', { headers: { 'User-Agent': 'Mozilla/5.0' } }).then(r => r.text());
  fs.writeFileSync('scripts/tecno_sitemap.html', sm);
  const hrefs = [...sm.matchAll(/href=["']([^"']*product[^"']*)["']/gi)].map(m => m[1]);
  console.log('Sitemap HTML hrefs:', Array.from(new Set(hrefs)));
}
run().catch(console.error);
