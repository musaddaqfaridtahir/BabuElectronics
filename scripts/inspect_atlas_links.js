const fs = require('fs');

const html = fs.readFileSync('scripts/atlas_home.html', 'utf8');
// Find links to motorcycles on atlashonda.com.pk
const links = [...html.matchAll(/href=["'](https?:\/\/www\.atlashonda\.com\.pk\/product[^"']*)["']/gi)].map(m => m[1]);
console.log('Atlas Honda product links:', Array.from(new Set(links)));

// Find mentions of 2026/2027/CG125 around 125s-gold or 125-silver-banner
const idx = html.indexOf('125-silver-banner');
if (idx !== -1) {
  console.log('\nAround 125-silver-banner:\n', html.slice(Math.max(0, idx - 500), idx + 800));
}
const idx2 = html.indexOf('CG125-Self-news-and-event');
if (idx2 !== -1) {
  console.log('\nAround CG125-Self-news-and-event:\n', html.slice(Math.max(0, idx2 - 500), idx2 + 800));
}
