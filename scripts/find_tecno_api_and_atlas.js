const fs = require('fs');

// Check Tecno scripts and product data endpoints
const tecnoHtml = fs.readFileSync('scripts/tecno_list.html', 'utf8');
const scripts = [...tecnoHtml.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Tecno inline scripts count:', scripts.length);
scripts.forEach((s, i) => {
  if (s[1].trim().length > 0) {
    console.log(`--- Script ${i} (${s[1].length} chars) ---`);
    console.log(s[1].slice(0, 600));
  }
});
const scriptSrcs = [...tecnoHtml.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Tecno script srcs:', scriptSrcs);

// Check Atlas Honda CG125S images in atlas_home.html
const atlasHtml = fs.readFileSync('scripts/atlas_home.html', 'utf8');
const cg125Matches = [...atlasHtml.matchAll(/CG125[^"'\s<>]*/gi)].map(m => m[0]);
console.log('\n=== Atlas Honda CG125 mentions ===');
console.log(Array.from(new Set(cg125Matches)));
const idx = atlasHtml.indexOf('05-CG125S-label');
if (idx !== -1) {
  console.log('\nAround 05-CG125S-label:\n', atlasHtml.slice(Math.max(0, idx - 800), idx + 800));
}
