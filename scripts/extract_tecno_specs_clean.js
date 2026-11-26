const fs = require('fs');
const path = require('path');

const specsFiles = fs.readdirSync('scripts').filter(f => f.startsWith('tecno_specs_'));
for (const file of specsFiles) {
  const html = fs.readFileSync(path.join('scripts', file), 'utf8');
  const slug = file.replace('tecno_specs_', '').replace('.html', '');
  const imgs = [...html.matchAll(/https:\/\/d13pvy8xd75yde\.cloudfront\.net\/[^"'\s<>]+\.(?:png|webp|jpg)/gi)]
    .map(m => m[0])
    .filter(u => !/headerLogo|footer|x_new|videoClose|down\.png|gua\.png|AE10|CN7C|ph\/3\.png|spark50pro_ko5|4bde4ab163|Frame%20374|whatsapp|favicon|android-chrome/i.test(u));

  // extract Memory / Battery / Display / Processor / Camera / Colors cleanly
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, '\n')
    .replace(/\n+/g, '\n')
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean);

  console.log(`\n==================== ${slug} ====================`);
  console.log('Clean Imgs:', Array.from(new Set(imgs)));
  const start = text.findIndex(l => l === 'Summary' || l === 'Operating System' || l === 'Processor');
  if (start !== -1) {
    console.log('Specs lines:', text.slice(start, start + 55).join(' | '));
  }
}
