async function run() {
  try {
    const res = await fetch('https://www.daraz.pk/products/dawlance-fully-automatic-top-load-washing-machine-dwt-260-es-10-kg-i221782252.html', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    const imgs = html.match(/https:\/\/[^"'\s]+(?:slatic\.net|drz\.lazcdn\.com)[^"'\s]+\.(?:jpg|jpeg|png|webp)/gi);
    console.log('Washer images:', imgs ? imgs.slice(0, 5) : 'none');
  } catch (e) {
    console.error(e);
  }
}
run();
