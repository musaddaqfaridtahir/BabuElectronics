const fs = require('fs');

const html = fs.readFileSync('scripts/vivo_products.html', 'utf8');

// Look for JSON or embedded product data
const jsonMatches = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Scripts count:', jsonMatches.length);

for (let i = 0; i < jsonMatches.length; i++) {
  const content = jsonMatches[i][1];
  if (content.includes('products') || content.includes('seriesList') || content.includes('productList')) {
    console.log(`Script ${i} mentions products, length: ${content.length}`);
    // Check if there is valid JSON inside
    const match = content.match(/var\s+(?:pageData|initData|productData|data)\s*=\s*(\{[\s\S]*?\});/);
    if (match) {
      console.log('Found data variable in script', i);
      fs.writeFileSync('scripts/vivo_data.json', match[1]);
    }
  }
}

// Let's also search for all product card blocks in the HTML
const productCards = [...html.matchAll(/<li[^>]*class="[^"]*product-item[^"]*"[^>]*>([\s\S]*?)<\/li>/gi)];
console.log('Product items count:', productCards.length);
if (productCards.length === 0) {
  // Try another regex
  const anyItems = [...html.matchAll(/<div[^>]*class="[^"]*item[^"]*"[^>]*>([\s\S]*?)<\/div>/gi)];
  console.log('Div items count:', anyItems.length);
}
