const fs = require('fs');

const slugs = [
  'camon-50-pro',
  'camon-50',
  'camon-40-premier-5g',
  'camon-40-pro',
  'camon-40',
  'spark-50',
  'spark-50-pro',
  'spark-40-pro-+',
  'spark-40-pro',
  'spark-40',
  'spark-40c',
  'spark-go-3',
  'pova-curve-2-5g',
  'camon-50-ultra'
];

async function inspectSlug(slug) {
  const detailUrl = `https://www.tecno-mobile.com/pak/phones/product-detail/product/${slug}/`;
  const specUrl = `https://www.tecno-mobile.com/pak/phones/tech-specs/techspecs/${slug}/`;
  try {
    const [dRes, sRes] = await Promise.all([
      fetch(detailUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }),
      fetch(specUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    ]);
    const dHtml = dRes.ok ? await dRes.text() : '';
    const sHtml = sRes.ok ? await sRes.text() : '';

    const title = (dHtml.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || '').trim();
    const ogImg = dHtml.match(/property=["']og:image["'][^>]*content=["']([^"']*)["']/i)?.[1] || '';
    const imgs = [...(dHtml + ' ' + sHtml).matchAll(/https:\/\/d13pvy8xd75yde\.cloudfront\.net\/[^"'\s<>]+\.(?:png|webp|jpg)/gi)]
      .map(m => m[0])
      .filter(u => !/logo|icon|svg|headerLogo|footer/i.test(u));

    console.log(`\n=== ${slug} | detail:${dRes.status} | specs:${sRes.status} ===`);
    console.log('Title:', title);
    console.log('OG Img:', ogImg);
    console.log('CDN Imgs sample:', Array.from(new Set(imgs)).slice(0, 8));

    if (sRes.ok) {
      fs.writeFileSync(`scripts/tecno_specs_${slug.replace(/[^a-z0-9]/gi, '_')}.html`, sHtml);
    }
    if (dRes.ok) {
      fs.writeFileSync(`scripts/tecno_detail_${slug.replace(/[^a-z0-9]/gi, '_')}.html`, dHtml);
    }
  } catch (e) {
    console.log(`Err ${slug}:`, e.message);
  }
}

async function run() {
  for (const s of slugs) {
    await inspectSlug(s);
  }
}

run().catch(console.error);
