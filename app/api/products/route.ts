import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSlug } from '@/lib/slugify';
import { fallbackCatalogProducts } from '@/lib/catalogBackup';

function formatSaveError(error: any, defaultMsg: string): string {
  const msg = String(error?.message || '');
  if (
    msg.includes('READONLY') ||
    msg.includes('readonly database') ||
    msg.includes('EROFS') ||
    msg.includes('read-only file system')
  ) {
    return 'Vercel par SQLite database read-only hai is liye entry save nahi ho rahi. Live mobile/admin panel se products save karne ke liye Vercel Dashboard > Storage mein Neon Postgres connect karein (ya local PC par run karein).';
  }
  return msg ? `${defaultMsg}: ${msg.split('\n').pop()?.trim() || msg}` : defaultMsg;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const isFeatured = searchParams.get('isFeatured');

    const where: any = {};
    if (categoryId) where.categoryId = categoryId;
    if (isFeatured === 'true') where.isFeatured = true;

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    }).catch(() => []);

    if (!products || products.length === 0) {
      let filtered = fallbackCatalogProducts;
      if (categoryId) filtered = filtered.filter((p: any) => p.categoryId === categoryId);
      if (isFeatured === 'true') filtered = filtered.filter((p: any) => p.isFeatured === true);
      return NextResponse.json(filtered);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Prisma DB lookup error, using fallback catalog:', error);
    return NextResponse.json(fallbackCatalogProducts || []);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      categoryId,
      cashPrice,
      installmentPrice,
      downpaymentBase,
      durationMonths,
      imageUrl,
      specsJson,
      isFeatured,
      stock,
    } = body;

    if (!title || !categoryId || cashPrice === undefined || installmentPrice === undefined) {
      return NextResponse.json({ error: 'Missing required fields (Title, Category, Prices)' }, { status: 400 });
    }

    const parsedCash = Number(cashPrice);
    const parsedInst = Number(installmentPrice);
    if (isNaN(parsedCash) || isNaN(parsedInst)) {
      return NextResponse.json({ error: 'Cash Price and Installment Total must be valid numbers' }, { status: 400 });
    }

    // Robust slug generation
    let finalSlug = slug ? createSlug(slug) : createSlug(title);
    if (!finalSlug) {
      finalSlug = `product-${Date.now()}`;
    }

    // Handle duplicate slug gracefully
    const existing = await prisma.product.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      finalSlug = `${finalSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    // Ensure specsJson is properly stringified
    let finalSpecs = '{}';
    if (typeof specsJson === 'string') {
      finalSpecs = specsJson;
    } else if (specsJson && typeof specsJson === 'object') {
      finalSpecs = JSON.stringify(specsJson);
    }

    const parsedStock = stock !== undefined && stock !== '' && !isNaN(Number(stock)) ? Number(stock) : 10;
    const parsedDuration = durationMonths !== undefined && !isNaN(Number(durationMonths)) && Number(durationMonths) > 0
      ? Number(durationMonths)
      : 12;

    const product = await prisma.product.create({
      data: {
        title: title.trim(),
        slug: finalSlug,
        categoryId,
        cashPrice: parsedCash,
        installmentPrice: parsedInst,
        downpaymentBase: Number(downpaymentBase) || 0,
        durationMonths: parsedDuration,
        imageUrl: imageUrl || '/logo.png',
        specsJson: finalSpecs,
        isFeatured: Boolean(isFeatured),
        stock: parsedStock,
      },
      include: { category: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create product:', error);
    return NextResponse.json(
      { error: formatSaveError(error, 'Failed to create product') },
      { status: 500 }
    );
  }
}
