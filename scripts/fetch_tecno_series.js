const fs = require('fs');

async function fetchSeries(path) {
  const url = `https://www.tecno-mobile.com${path}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
  console.log(url, '=>', res.status);
  const html = await res.text();
  // Find product links or names or prices or images
  const imgs = [...html.matchAll(/(?:src|data-src)=["']([^"']+)["']/gi)]
    .map(m => m[1])
    .filter(u => u.includes('cloudfront') || u.includes('phones') || u.includes('camon') || u.includes('spark') || u.includes('pova') || u.includes('phantom') || u.includes('pop'));
  console.log('  Images:', Array.from(new Set(imgs)).slice(0, 20));
  const detailLinks = [...html.matchAll(/href=["']([^"']*\/pak\/phones\/product-detail[^"']*)["']/gi)].map(m => m[1]);
  console.log('  Detail links:', Array.from(new Set(detailLinks)).slice(0, 30));
  return html;
}

async function run() {
  const html1 = await fetchSeries('/pak/phones/product-list/phantom');
  const html2 = await fetchSeries('/pak/phones/product-list/camon');
  const html3 = await fetchSeries('/pak/phones/product-list/pova');
  const html4 = await fetchSeries('/pak/phones/product-list/spark');
  fs.writeFileSync('scripts/tecno_camon.html', html2);
  fs.writeFileSync('scripts/tecno_spark.html', html4);
  fs.writeFileSync('scripts/tecno_pova.html', html3);
  fs.writeFileSync('scripts/tecno_phantom.html', html1);
}

run().catch(console.error);
