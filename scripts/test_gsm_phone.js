async function run() {
  const r = await fetch('https://www.gsmarena.com/infinix_note_60_pro_5g-14499.php', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const text = await r.text();
  const imgs = [...text.matchAll(/<img[^>]+src="([^">]+)"[^>]*>/gi)].map(m => m[1]);
  console.log('Imgs on phone page:', imgs);
}
run();
