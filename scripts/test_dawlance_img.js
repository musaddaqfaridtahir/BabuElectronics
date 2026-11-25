const fs = require('fs');

async function testImg() {
  const url = 'https://www.dawlance.com.pk/media/resize/F01000000298_LO1_20231220_075034.png/1000Wx1000H/image.png';
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    console.log('Status:', res.status, res.headers.get('content-type'));
    if (res.ok) {
      const buf = await res.arrayBuffer();
      fs.writeFileSync('public/uploads/dawlance/dawlance-washer-official.png', Buffer.from(buf));
      console.log('Saved dawlance-washer-official.png:', buf.byteLength);
    }
  } catch (e) {
    console.error(e.message);
  }
}
testImg();
