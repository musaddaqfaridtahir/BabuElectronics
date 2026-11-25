const fs = require('fs');
const html = fs.readFileSync('scripts/vivo_products.html', 'utf8');

const productCards = [...html.matchAll(/<li[^>]*class="[^"]*product-item[^"]*"[^>]*>([\s\S]*?)<\/li>/gi)];
console.log('Total product items:', productCards.length);

const items = [];
for (const card of productCards) {
  const cardHtml = card[1];
  const nameMatch = cardHtml.match(/class="[^"]*product-name[^"]*"[^>]*>([^<]+)</i);
  const name = nameMatch ? nameMatch[1].trim() : 'Unknown';
  
  const descMatch = cardHtml.match(/class="[^"]*product-desc[^"]*"[^>]*>([^<]+)</i);
  const desc = descMatch ? descMatch[1].trim() : '';

  const imgMatch = cardHtml.match(/<img[^>]*src="([^"]+)"/i) || cardHtml.match(/data-src="([^"]+)"/i);
  const img = imgMatch ? imgMatch[1] : '';

  const linkMatch = cardHtml.match(/href="([^"]+)"/i);
  const link = linkMatch ? linkMatch[1] : '';

  items.push({ name, desc, img, link });
}

console.log(JSON.stringify(items, null, 2));
fs.writeFileSync('scripts/vivo_extracted.json', JSON.stringify(items, null, 2));
