const fs = require('fs');
const txt = fs.readFileSync('scripts/tecno_jvrh.js', 'utf8');
const idx = txt.indexOf('key_glod');
console.log('Around key_glod:', txt.slice(Math.max(0, idx - 500), idx + 1500));
const idx2 = txt.indexOf('urlLink');
if (idx2 !== -1 && Math.abs(idx2 - idx) > 1000) {
  console.log('\nAround urlLink:', txt.slice(Math.max(0, idx2 - 200), idx2 + 600));
}
