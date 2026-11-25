import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
      return NextResponse.json({ error: 'Valid URL is required (starting with http:// or https://)' }, { status: 400 });
    }

    // Fetch the target webpage with realistic browser headers
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    let html = '';
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9,ur;q=0.8',
        },
      });

      if (!response.ok) {
        return NextResponse.json(
          { error: `Target website returned status ${response.status}. Could not fetch data.` },
          { status: 400 }
        );
      }

      html = await response.text();
    } catch (fetchErr: any) {
      clearTimeout(timeout);
      return NextResponse.json(
        { error: `Failed to connect to URL: ${fetchErr.message || 'Connection failed'}` },
        { status: 400 }
      );
    } finally {
      clearTimeout(timeout);
    }

    // Helper functions for regex parsing
    const getMetaContent = (nameOrProp: string): string => {
      const regex = new RegExp(
        `<meta[^>]*(?:name|property)=["']${nameOrProp}["'][^>]*content=["']([^"']*)["']`,
        'i'
      );
      const match = html.match(regex);
      if (match && match[1]) return match[1].trim();

      // Reverse order (content before property)
      const reverseRegex = new RegExp(
        `<meta[^>]*content=["']([^"']*)["'][^>]*(?:name|property)=["']${nameOrProp}["']`,
        'i'
      );
      const reverseMatch = html.match(reverseRegex);
      return reverseMatch && reverseMatch[1] ? reverseMatch[1].trim() : '';
    };

    // 1. EXTRACT TITLE
    let title =
      getMetaContent('og:title') ||
      getMetaContent('twitter:title') ||
      getMetaContent('title');

    if (!title) {
      const titleTagMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
      if (titleTagMatch && titleTagMatch[1]) {
        title = titleTagMatch[1].trim();
      }
    }

    // Clean common e-commerce brand suffixes
    if (title) {
      title = title
        .replace(/\|\s*(Daraz|PriceOye|Telemart|Shophive|Paklap|Metro|Al-Fatah|Official Store|Pakistan).*$/i, '')
        .replace(/-\s*(Daraz|PriceOye|Telemart|Buy Online).*$/i, '')
        .replace(/\s*Best Price in Pakistan.*$/i, '')
        .replace(/\s*Price in Pakistan.*$/i, '')
        .replace(/[\n\r\t]+/g, ' ')
        .trim();
    }

    // 2. EXTRACT IMAGE
    let imageUrl =
      getMetaContent('og:image:secure_url') ||
      getMetaContent('og:image') ||
      getMetaContent('twitter:image');

    // If relative URL, convert to absolute
    if (imageUrl && !imageUrl.startsWith('http')) {
      try {
        imageUrl = new URL(imageUrl, url).href;
      } catch (e) {
        imageUrl = '';
      }
    }

    // 3. EXTRACT DESCRIPTION & SPECS
    const description =
      getMetaContent('og:description') ||
      getMetaContent('description') ||
      getMetaContent('twitter:description');

    // 4. EXTRACT PRICE
    let price: number | null = null;

    // Check OpenGraph / product meta tags
    const metaPrice =
      getMetaContent('product:price:amount') ||
      getMetaContent('og:price:amount') ||
      getMetaContent('price');

    if (metaPrice) {
      const cleanMetaPrice = parseFloat(metaPrice.replace(/[^0-9.]/g, ''));
      if (!isNaN(cleanMetaPrice) && cleanMetaPrice > 0) {
        price = cleanMetaPrice;
      }
    }

    // Check JSON-LD Structured Data
    if (!price) {
      const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
      let jsonLdMatch;
      while ((jsonLdMatch = jsonLdRegex.exec(html)) !== null) {
        try {
          const parsed = JSON.parse(jsonLdMatch[1]);
          const checkItem = (item: any) => {
            if (!item) return;
            if (item['@type'] === 'Product' || item.offers) {
              if (item.name && !title) title = item.name;
              if (item.image && !imageUrl) {
                imageUrl = Array.isArray(item.image) ? item.image[0] : item.image;
              }
              if (item.offers) {
                const offer = Array.isArray(item.offers) ? item.offers[0] : item.offers;
                const p = parseFloat(offer.price || offer.lowPrice);
                if (!isNaN(p) && p > 0) price = p;
              }
            }
          };

          if (Array.isArray(parsed)) {
            parsed.forEach(checkItem);
          } else if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
            parsed['@graph'].forEach(checkItem);
          } else {
            checkItem(parsed);
          }
        } catch (e) {
          // Ignore invalid JSON-LD chunks
        }
      }
    }

    // Regex fallback for Pakistani Rupee prices (e.g. Rs. 85,000 or PKR 85,000)
    if (!price) {
      const pkrRegex = /(?:Rs\.?|PKR)\s*([0-9]{1,3}(?:,[0-9]{3})+(?:\.[0-9]+)?|[0-9]{4,8})/i;
      const priceMatch = html.match(pkrRegex);
      if (priceMatch && priceMatch[1]) {
        const cleanPrice = parseFloat(priceMatch[1].replace(/,/g, ''));
        if (!isNaN(cleanPrice) && cleanPrice > 500 && cleanPrice < 5000000) {
          price = cleanPrice;
        }
      }
    }

    // 5. AUTO-SUGGEST CATEGORY
    const textCorpus = `${title} ${description} ${url}`.toLowerCase();
    let suggestedCategorySlug = 'home-appliances';

    if (/(bike|motorcycle|cd\s*70|cg\s*125|honda|yamaha|super\s*star|united|pridor|ybr)/i.test(textCorpus)) {
      suggestedCategorySlug = 'motorbikes';
    } else if (/(scooter|electric\s*bike|ev|battery\s*bike|e-bike|crown\s*ev)/i.test(textCorpus)) {
      suggestedCategorySlug = 'electric-vehicles';
    } else if (/(fridge|refrigerator|deep\s*freezer|freezer|dawlance\s*91|haier\s*hr)/i.test(textCorpus)) {
      suggestedCategorySlug = 'refrigerators';
    } else if (/(tv|led|smart\s*tv|android\s*tv|google\s*tv|oled|qled|4k|tcl|orient\s*led)/i.test(textCorpus)) {
      suggestedCategorySlug = 'leds-smart-tvs';
    } else if (/(ac|air\s*conditioner|inverter\s*ac|heat\s*&\s*cool|1\.5\s*ton|1\s*ton|gree|haier\s*hsu)/i.test(textCorpus)) {
      suggestedCategorySlug = 'air-conditioners';
    } else if (/(washing\s*machine|washer|dryer|spinner|fully\s*automatic|twin\s*tub)/i.test(textCorpus)) {
      suggestedCategorySlug = 'washing-machines';
    } else if (/(mobile|smartphone|phone|samsung\s*galaxy|redmi|xiaomi|infinix|vivo|oppo|tecno|iphone)/i.test(textCorpus)) {
      suggestedCategorySlug = 'mobiles';
    } else if (/(microwave|oven|baking\s*oven|grill\s*oven|microwave\s*oven)/i.test(textCorpus)) {
      suggestedCategorySlug = 'microwave-ovens';
    } else if (/(dispenser|water\s*dispenser|3\s*tap|refrigerator\s*cabinet)/i.test(textCorpus)) {
      suggestedCategorySlug = 'water-dispensers';
    }

    // Match with actual database category ID if available
    let matchedCategoryId = '';
    try {
      const category = await prisma.category.findUnique({
        where: { slug: suggestedCategorySlug },
      });
      if (category) {
        matchedCategoryId = category.id;
      } else {
        const firstCat = await prisma.category.findFirst();
        if (firstCat) matchedCategoryId = firstCat.id;
      }
    } catch (e) {
      // Database optional match
    }

    // Generate basic specs key-values from description
    const specs: Record<string, string> = {
      'Condition': '100% Brand New Box Packed',
      'Warranty': 'Official Brand Warranty',
    };

    if (/inverter/i.test(textCorpus)) specs['Technology'] = 'Energy Efficient Inverter';
    if (/1\.5\s*ton/i.test(textCorpus)) specs['Capacity'] = '1.5 Ton';
    if (/1\s*ton/i.test(textCorpus)) specs['Capacity'] = '1.0 Ton';
    if (/55\s*(inch|")/i.test(textCorpus)) specs['Screen Size'] = '55 Inch 4K UHD';
    if (/43\s*(inch|")/i.test(textCorpus)) specs['Screen Size'] = '43 Inch Smart LED';
    if (/32\s*(inch|")/i.test(textCorpus)) specs['Screen Size'] = '32 Inch HD Smart';

    const cashPrice = price || 0;
    // Calculate 20% downpayment and standard 12-month installment price
    const downpaymentBase = Math.round(cashPrice * 0.2);
    const installmentPrice = Math.round(cashPrice * 1.2);

    return NextResponse.json({
      success: true,
      extracted: {
        title: title || 'Imported Product',
        cashPrice,
        installmentPrice,
        downpaymentBase,
        durationMonths: 12,
        imageUrl: imageUrl || '',
        description: description || '',
        suggestedCategorySlug,
        categoryId: matchedCategoryId,
        specs,
      },
    });
  } catch (error: any) {
    console.error('URL Extraction Error:', error);
    return NextResponse.json(
      { error: `Extraction failed: ${error.message || 'Unknown server error'}` },
      { status: 500 }
    );
  }
}
