async function testApi() {
  try {
    const res = await fetch('https://www.daraz.pk/api/catalog/?q=dawlance+washing+machine', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const data = await res.json();
    console.log('Result keys:', Object.keys(data));
    if (data.mods && data.mods.listItems) {
      console.log('Found items:', data.mods.listItems.length);
      data.mods.listItems.slice(0, 5).forEach(item => {
        console.log(item.name, '-->', item.image);
      });
    }
  } catch (e) {
    console.error(e.message);
  }
}
testApi();
