const fs = require('fs');

const tecnoHtml = fs.readFileSync('scripts/tecno_list.html', 'utf8');
// Look for API endpoints, Nuxt/Next data, or JSON objects or links to product pages
const apiMatches = [...tecnoHtml.matchAll(/(https?:\/\/[^"'\s<>]*(?:api|json|product|pak)[^"'\s<>]*)/gi)].map(m => m[1]);
console.log('API/URLs in tecno:', Array.from(new Set(apiMatches)).slice(0, 40));

// Find all hrefs inside tecnoHtml
const hrefs = [...tecnoHtml.matchAll(/href=["']([^"']*\/pak\/phones\/[^"']*)["']/gi)].map(m => m[1]);
console.log('Phone hrefs in tecno:', Array.from(new Set(hrefs)).slice(0, 50));

// Also print around the first occurrence of SPARK or CAMON
const idx = tecnoHtml.search(/CAMON|SPARK|POVA|PHANTOM/i);
if (idx !== -1) {
  console.log('\nSnippet around first phone mention:\n', tecnoHtml.slice(Math.max(0, idx - 300), idx + 800));
}
