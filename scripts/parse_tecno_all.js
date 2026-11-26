const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('scripts').filter(f => f.startsWith('tecno_detail_'));
for (const file of files) {
  const slug = file.replace('tecno_detail_', '').replace('.html', '');
  const dHtml = fs.readFileSync(path.join('scripts', file), 'utf8');
  const sFile = file.replace('tecno_detail_', 'tecno_specs_');
  const sHtml = fs.existsSync(path.join('scripts', sFile)) ? fs.readFileSync(path.join('scripts', sFile), 'utf8') : '';

  const title = (dHtml.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || '').trim();
  // Filter CDN images specifically referencing the phone folder or phone name
  const allImgs = [...(dHtml + ' ' + sHtml).matchAll(/https:\/\/d13pvy8xd75yde\.cloudfront\.net\/[^"'\s<>]+\.(?:png|webp|jpg)/gi)]
    .map(m => m[0])
    .filter(u => !/headerLogo|footer|x_new|videoClose|down\.png|gua\.png|AE10|CN7C|ph\/3\.png|spark50pro_ko5|4bde4ab163|Frame%20374/i.test(u));

  // Extract specs text from tech-specs page
  const specText = sHtml.replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' | ')
    .replace(/\s+/g, ' ')
    .trim();

  console.log(`\n=== ${slug} ===`);
  console.log('Title:', title);
  console.log('Specific Images (first 6):', Array.from(new Set(allImgs)).slice(0, 6));
  const summaryIdx = specText.indexOf('Processor') !== -1 ? specText.indexOf('Processor') : (specText.indexOf('Display') !== -1 ? specText.indexOf('Display') : 200);
  console.log('Specs excerpt:', specText.slice(Math.max(0, summaryIdx - 100), summaryIdx + 500));
}
