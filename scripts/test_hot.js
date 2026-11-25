async function checkHot() {
  const list = [
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-hot70-4g.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-hot70-pro.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-hot-60-pro.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-hot40-pro.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-hot40i.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-zero-40.jpg',
    'https://fdn2.gsmarena.com/vv/bigpic/infinix-zero40-5g.jpg'
  ];
  for (const u of list) {
    const res = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    console.log(res.status, u);
  }
}
checkHot();
