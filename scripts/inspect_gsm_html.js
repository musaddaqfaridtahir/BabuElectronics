const fs = require('fs');
const html = fs.readFileSync('scripts/gsm_infinix.html', 'utf8');
console.log('HTML length:', html.length);
// Find img tags
const imgMatches = [...html.matchAll(/<img[^>]+src="([^">]+)"[^>]*>/gi)];
console.log('Total img tags:', imgMatches.length);
imgMatches.forEach(m => {
  if (m[0].includes('infinix') || m[0].includes('bigpic') || m[0].includes('cdn')) {
    console.log(m[0]);
  }
});

// Find any links with -phones- or -
const links = [...html.matchAll(/href="([^">]*infinix[^">]*\.php)"/gi)].map(m => m[1]);
console.log('Infinix links:', Array.from(new Set(links)).slice(0, 20));
