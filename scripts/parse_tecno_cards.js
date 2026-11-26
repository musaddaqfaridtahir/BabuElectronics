const fs = require('fs');
const html = fs.readFileSync('scripts/tecno_list.html', 'utf8');

// Extract all script/JSON or product cards from Tecno page
console.log('HTML size:', html.length);

// Check links to /pak/phones/product-list/<slug>
const catLinks = [...html.matchAll(/href=["']([^"']*\/pak\/phones\/[^"']*)["']/gi)].map(m => m[1]);
console.log('Category links:', Array.from(new Set(catLinks)));

// Look for any embedded JSON / window.__INITIAL_STATE__ / data- attributes / product cards
const productBlocks = [...html.matchAll(/<a[^>]+href=["']([^"']*\/pak\/phones\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
console.log('Total product-like <a> tags:', productBlocks.length);
for (const b of productBlocks.slice(0, 30)) {
  const href = b[1];
  const text = b[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const img = b[2].match(/(?:src|data-src)=["']([^"']+)["']/i)?.[1];
  if (text || img) {
    console.log({ href, text: text.slice(0, 80), img });
  }
}
