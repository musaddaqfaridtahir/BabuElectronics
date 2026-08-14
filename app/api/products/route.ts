import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');
    const isFeatured = searchParams.get('isFeatured');

    const where: any = {};

    if (categoryId && categoryId !== 'all') {
      where.categoryId = categoryId;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { slug: { contains: search } },
      ];
    }

    if (isFeatured === 'true') {
      where.isFeatured = true;
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
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

    if (!title || !categoryId || !cashPrice || !installmentPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        categoryId,
        cashPrice: parseFloat(cashPrice),
        installmentPrice: parseFloat(installmentPrice),
        downpaymentBase: parseFloat(downpaymentBase || 0),
        durationMonths: parseInt(durationMonths || 12),
        imageUrl: imageUrl || '/uploads/placeholder.jpg',
        specsJson: typeof specsJson === 'object' ? JSON.stringify(specsJson) : specsJson || '{}',
        isFeatured: Boolean(isFeatured),
        stock: parseInt(stock || 10),
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
