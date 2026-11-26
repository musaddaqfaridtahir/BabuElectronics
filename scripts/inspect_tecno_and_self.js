const fs = require('fs');

// 1. Inspect tecno_x_productlist.js
const js = fs.readFileSync('scripts/tecno_x_productlist.js', 'utf8');
const urls = [...js.matchAll(/["']([^"']*(?:api|product|list|sku|get|shop)[^"']*)["']/gi)].map(m => m[1]);
console.log('Tecno JS endpoints/strings:', Array.from(new Set(urls)).slice(0, 50));

// Print lines mentioning rootApiUrl or ajax or fetch
const ajaxIdx = js.search(/rootApiUrl|\$\.ajax|fetch\(|axios/i);
if (ajaxIdx !== -1) {
  console.log('\nTecno API call snippet:\n', js.slice(Math.max(0, ajaxIdx - 200), ajaxIdx + 1200));
}

// 2. Inspect atlas_cg125_self.html
const selfHtml = fs.readFileSync('scripts/atlas_cg125_self.html', 'utf8');
const selfImgs = [...selfHtml.matchAll(/https?:\/\/www\.atlashonda\.com\.pk\/wp-content\/uploads\/[^"'\s<>]+\.(?:webp|png|jpg)/gi)]
  .map(m => m[0]);
console.log('\n=== CG125 SELF PAGE IMAGES ===');
console.log(Array.from(new Set(selfImgs)));

// Check model year mentions
const years = [...selfHtml.matchAll(/202[4-9]/g)].map(m => m[0]);
console.log('Years on CG125-self page:', Array.from(new Set(years)));
