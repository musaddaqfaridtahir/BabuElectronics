const fs = require('fs');
const txt = fs.readFileSync('scripts/tecno_jvrh.js', 'utf8');
const idx = txt.indexOf('function ajaxPost');
console.log('function ajaxPost:\n', txt.slice(idx, idx + 2500));
const idx2 = txt.indexOf('rootApiUrl');
if (idx2 !== -1) console.log('\nrootApiUrl in jvrh:\n', txt.slice(Math.max(0, idx2 - 200), idx2 + 600));
