const fs = require('fs');

for (const name of ['spark_50_pro', 'pova_curve_2_5g', 'camon_40', 'camon_50_pro', 'camon_50', 'spark_40_pro', 'spark_40_pro__', 'spark_40', 'spark_40c', 'spark_go_3']) {
  const f = `scripts/tecno_detail_${name}.html`;
  if (!fs.existsSync(f)) continue;
  const html = fs.readFileSync(f, 'utf8');
  const imgs = [...html.matchAll(/https:\/\/d13pvy8xd75yde\.cloudfront\.net\/[^"'\s<>]+\.(?:png|webp|jpg)/gi)]
    .map(m => m[0])
    .filter(u => !/headerLogo|footer|x_new|videoClose|down\.png|gua\.png|whatsapp|favicon|android-chrome|story\.png|softwaret|hios16/i.test(u));
  console.log(`\n=== ${name} detail imgs ===`);
  console.log(Array.from(new Set(imgs)).slice(0, 12));
}
