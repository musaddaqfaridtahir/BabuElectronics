async function run() {
  const res = await fetch('https://www.haier.com/pk/refrigerators/hrf-585sffgu1.shtml', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  console.log('Status:', res.status);
  const text = await res.text();
  const imgs = [...text.matchAll(/https?:\/\/[^"'\s<>]+\.(?:jpg|png|webp)/gi)].map(m => m[0]);
  console.log('Haier imgs:', imgs.filter(i => i.includes('haier') || i.includes('product')).slice(0, 15));
}
run();
