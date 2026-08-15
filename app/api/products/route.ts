import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fallbackProducts } from '@/lib/mockProducts';

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
    });

    if (!products || products.length === 0) {
      products = fallbackProducts as any;
    }

    return NextResponse.json(products);
  } catch (error) {
    console.warn('Prisma DB lookup error, returning fallback catalog', error);
    return NextResponse.json(fallbackProducts);
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

    if (!title || !slug || !categoryId || !cashPrice || !installmentPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        categoryId,
        cashPrice: Number(cashPrice),
        installmentPrice: Number(installmentPrice),
        downpaymentBase: Number(downpaymentBase) || 0,
        durationMonths: Number(durationMonths) || 12,
        imageUrl: imageUrl || '',
        specsJson: specsJson || '{}',
        isFeatured: Boolean(isFeatured),
        stock: Number(stock) || 1,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
