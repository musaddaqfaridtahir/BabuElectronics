const fs = require('fs');

async function run() {
  const r = await fetch('https://www.atlashonda.com.pk/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await r.text();
  fs.writeFileSync('scripts/atlas_home.html', html);
  const imgs = [...html.matchAll(/https?:\/\/[^"'\s<>]+\.(?:webp|png|jpg)/gi)]
    .map(m => m[0])
    .filter(u => /cg|cd|2025|2026|2027|banner|slider|hero|125/i.test(u));
  console.log('Atlas Honda Home Images:', Array.from(new Set(imgs)));

  const r2 = await fetch('https://www.atlashonda.com.pk/product/cg125s/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const h2 = await r2.text();
  console.log('CG125S title:', h2.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]);
  const imgs2 = [...h2.matchAll(/https?:\/\/www\.atlashonda\.com\.pk\/wp-content\/uploads\/[^"'\s<>]+\.(?:webp|png|jpg)/gi)]
    .map(m => m[0]);
  console.log('CG125S page uploads:', Array.from(new Set(imgs2)).filter(u => /cg125|2025|2026|2027/i.test(u)));
}

run().catch(console.error);
