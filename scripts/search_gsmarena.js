async function searchGSMArena(query) {
  const url = `https://www.gsmarena.com/res.php3?sSearch=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const html = await res.text();
  const matches = [...html.matchAll(/<img src="([^"]*bigpic[^"]*)" title="([^"]*)"/gi)];
  console.log(`Query: ${query}`, matches.map(m => ({ title: m[2], img: m[1] })));
}

async function run() {
  await searchGSMArena('Infinix Note 40');
  await searchGSMArena('Infinix Hot 50');
  await searchGSMArena('Infinix Zero 40');
  await searchGSMArena('Infinix Hot 40');
}

run().catch(console.error);
