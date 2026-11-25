import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSlug } from '@/lib/slugify';
import { fallbackCatalogProducts } from '@/lib/catalogBackup';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const isFeatured = searchParams.get('isFeatured');

    const where: any = {};
    if (categoryId) where.categoryId = categoryId;
    if (isFeatured === 'true') where.isFeatured = true;

    let products = await prisma.product.findMany({
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

    const product = await prisma.product.create({
      data: {
        title: title.trim(),
        slug: finalSlug,
        categoryId,
        cashPrice: Number(cashPrice),
        installmentPrice: Number(installmentPrice),
        downpaymentBase: Number(downpaymentBase) || 0,
        durationMonths: Number(durationMonths) || 12,
        imageUrl: imageUrl || '',
        specsJson: finalSpecs,
        isFeatured: Boolean(isFeatured),
        stock: Number(stock) || 1,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
