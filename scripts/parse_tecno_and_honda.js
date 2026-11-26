const fs = require('fs');

// 1. Inspect Honda CG125S HTML
const hondaHtml = fs.readFileSync('scripts/honda_cg125s.html', 'utf8');
const hondaImgs = [...hondaHtml.matchAll(/https?:\/\/[^"'\s<>]+\.(?:webp|png|jpg)/gi)]
  .map(m => m[0])
  .filter(u => /cg125|2025|2026|2027|self|upload/i.test(u));
console.log('=== HONDA CG125S IMAGES ===');
console.log(Array.from(new Set(hondaImgs)));
const hondaYears = [...hondaHtml.matchAll(/202[4-9]\s*(?:Model|Edition|Sticker)?/gi)].map(m => m[0]);
console.log('Honda Years/Models mentioned:', Array.from(new Set(hondaYears)));

// Also check Atlas Honda home page for 2026/2027 model stickers
// 2. Inspect Tecno HTML
const tecnoHtml = fs.readFileSync('scripts/tecno_list.html', 'utf8');
console.log('\n=== TECNO HTML ANALYSIS ===');
// Look for product cards / titles / images / JSON
const tecnoImgs = [...tecnoHtml.matchAll(/https?:\/\/[^"'\s<>]+\.(?:png|jpg|webp|jpeg)/gi)]
  .map(m => m[0])
  .filter(u => /tecno|product|camon|spark|pova|phantom|pop/i.test(u));
console.log('Tecno image URLs count:', tecnoImgs.length);
console.log('Sample Tecno images:', Array.from(new Set(tecnoImgs)).slice(0, 20));

const tecnoTitles = [...tecnoHtml.matchAll(/(?:SPARK|CAMON|POVA|PHANTOM|POP)\s+[A-Za-z0-9\+\-\s]{1,25}/gi)]
  .map(m => m[0].replace(/\s+/g, ' ').trim());
console.log('Tecno model matches:', Array.from(new Set(tecnoTitles)).slice(0, 40));
