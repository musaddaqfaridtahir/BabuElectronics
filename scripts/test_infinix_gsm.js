async function testImgs() {
  const candidates = [
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-note60-pro.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-note60.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-gt50-pro.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-gt20-pro.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-smart20.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-smart8.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-hot50-pro-plus-4g.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-hot50-pro.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-hot-50.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-hot50-5g.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-note40-pro-4g.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-note40-pro-5g.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-note40-4g.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-zero40-5g.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-zero-40.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-hot40-pro.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-hot40i.jpg'
  ];
  for (const c of candidates) {
    try {
      const res = await fetch(c, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.status === 200) {
        console.log('200 OK:', c);
      }
    } catch(e) {}
  }
}
testImgs();
