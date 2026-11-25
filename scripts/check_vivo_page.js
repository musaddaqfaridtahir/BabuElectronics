const fs = require('fs');

async function checkVivoProducts() {
  try {
    const res = await fetch('https://www.vivo.com/pk/products', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    console.log('HTML size:', html.length);
    fs.writeFileSync('scripts/vivo_products.html', html);
    // Find all model names or links
    const matches = [...html.matchAll(/class="[^"]*product-name[^"]*"[^>]*>([^<]+)</gi)].map(m => m[1].trim());
    console.log('Product names found via class:', matches);
    const linkMatches = [...html.matchAll(/href="(\/[a-z0-9\-\/]+)"[^>]*>([^<]+)<\/a>/gi)]
      .filter(m => m[1].includes('/pk/products/'))
      .map(m => ({ href: m[1], text: m[2].trim() }));
    console.log('Links found:', linkMatches.slice(0, 20));
  } catch (e) {
    console.error(e.message);
  }
}

checkVivoProducts();
