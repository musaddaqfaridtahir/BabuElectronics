const fs = require('fs');

const html = fs.readFileSync('scripts/infinix_home.html', 'utf8');

// Find all image URLs with hot, note, zero, smart, gt
const imgRegex = /(https?:\/\/[^\s"'<>]+\.(?:png|jpg|jpeg|webp))/gi;
let m;
const imgs = new Set();
while ((m = imgRegex.exec(html)) !== null) {
  const url = m[1];
  if (/note|hot|zero|smart|gt/i.test(url)) {
    imgs.add(url);
  }
}
console.log('Product images found:', Array.from(imgs).slice(0, 25));

// Check for phone names
const phoneNames = new Set();
const nameRegex = /(Note\s*\d+\s*(?:Pro\+?|VIP|5G)?|Hot\s*\d+\s*(?:Pro\+?|Play|i)?|Zero\s*\d+\s*(?:Ultra|5G)?|Smart\s*\d+\s*(?:HD|Plus)?|GT\s*\d+\s*(?:Pro)?)/gi;
while ((m = nameRegex.exec(html)) !== null) {
  phoneNames.add(m[1].trim());
}
console.log('Phone models detected:', Array.from(phoneNames));
