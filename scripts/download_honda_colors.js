const fs = require('fs');
const path = require('path');

const hondaColors = [
  // CG 125 Self Start
  { name: 'cg125s-red', url: 'https://www.atlashonda.com.pk/wp-content/uploads/2021/04/CG125-S-Red-1000x1000-1.webp' },
  { name: 'cg125s-black', url: 'https://www.atlashonda.com.pk/wp-content/uploads/2021/04/CG125-S-Black-1000x1000-1.webp' },
  // CG 125 Kick Start
  { name: 'cg125-black', url: 'https://www.atlashonda.com.pk/wp-content/uploads/2021/04/CG125-Black-1000x1000-1.webp' },
  { name: 'cg125-red', url: 'https://www.atlashonda.com.pk/wp-content/uploads/2021/04/CG125-Red-1000x1000-1.webp' },
  // CG 125 Gold
  { name: 'cg125-gold-black', url: 'https://www.atlashonda.com.pk/wp-content/uploads/2021/04/CG125-Gold-Black-1000x1000-1.webp' },
  { name: 'cg125-gold-red', url: 'https://www.atlashonda.com.pk/wp-content/uploads/2021/04/CG125-Gold-Red-1000x1000-1.webp' },
  // CD 70
  { name: 'cd70-blue', url: 'https://www.atlashonda.com.pk/wp-content/uploads/2026/09/CD70-Blue.webp' },
  { name: 'cd70-red', url: 'https://www.atlashonda.com.pk/wp-content/uploads/2026/09/CD70-Red.webp' },
  { name: 'cd70-black', url: 'https://www.atlashonda.com.pk/wp-content/uploads/2026/09/CD70-Black.webp' },
  // CD 70 Dream
  { name: 'cd70dream-red', url: 'https://www.atlashonda.com.pk/wp-content/uploads/2026/07/CD70Dream-Red.webp' },
  { name: 'cd70dream-black', url: 'https://www.atlashonda.com.pk/wp-content/uploads/2026/07/CD70Dream-Black.webp' },
  // CB 125F
  { name: 'cb125f-blue', url: 'https://www.atlashonda.com.pk/wp-content/uploads/2021/04/CB125F-Blue-2.webp' },
  { name: 'cb125f-red', url: 'https://www.atlashonda.com.pk/wp-content/uploads/2021/04/CB125F-Red-1.webp' },
  { name: 'cb125f-black', url: 'https://www.atlashonda.com.pk/wp-content/uploads/2021/04/CB125F-Black-1.webp' },
  // CB 150F
  { name: 'cb150f-blue', url: 'https://www.atlashonda.com.pk/wp-content/uploads/2021/04/CB150F-blue-1.webp' },
  { name: 'cb150f-red', url: 'https://www.atlashonda.com.pk/wp-content/uploads/2021/04/CB150F-red-1.webp' },
  { name: 'cb150f-black', url: 'https://www.atlashonda.com.pk/wp-content/uploads/2021/04/CB150F-black-1.webp' }
];

async function run() {
  const dir = path.join(__dirname, '../public/uploads/honda');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const item of hondaColors) {
    const dest = path.join(dir, `${item.name}.webp`);
    try {
      const res = await fetch(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.ok) {
        const buf = await res.arrayBuffer();
        fs.writeFileSync(dest, Buffer.from(buf));
        console.log(`Saved: ${dest} (${buf.byteLength} bytes)`);
      } else {
        console.log(`Failed (${res.status}): ${item.url}`);
      }
    } catch (e) {
      console.error(`Error downloading ${item.name}:`, e.message);
    }
  }
}

run();
