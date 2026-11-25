const fs = require('fs');
const html = fs.readFileSync('scripts/infinix_smartphones.html', 'utf8');

// Search for any JSON state in script tags
const scriptMatches = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
for (const sm of scriptMatches) {
  const content = sm[1];
  if (content.includes('window.__NUXT__') || content.includes('products') || content.includes('series')) {
    console.log('Found script tag with length:', content.length);
    // Find strings with .png or .webp
    const matches = [...content.matchAll(/([a-zA-Z0-9_\-\/]+\.(?:png|webp|jpg))/gi)].map(m => m[1]);
    console.log('Image files mentioned in script:', matches.slice(0, 20));
  }
}
