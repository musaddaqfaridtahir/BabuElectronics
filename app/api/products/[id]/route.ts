import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSlug } from '@/lib/slugify';

function formatUpdateError(error: any, defaultMsg: string): string {
  const msg = String(error?.message || '');
  if (
    msg.includes('READONLY') ||
    msg.includes('readonly database') ||
    msg.includes('EROFS') ||
    msg.includes('read-only file system')
  ) {
    return 'Vercel par SQLite database read-only hai is liye changes save nahi ho rahay. Live website/mobile se edit save karne ke liye Vercel Dashboard > Storage mein Neon Postgres connect karein (local PC par changes save hotay hain).';
  }
  return msg ? `${defaultMsg}: ${msg.split('\n').pop()?.trim() || msg}` : defaultMsg;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found in database.' }, { status: 404 });
    }

    const dataToUpdate: any = {};
    if (title !== undefined) dataToUpdate.title = title.trim();

    if (slug && slug !== existingProduct.slug) {
      let cleanSlug = createSlug(slug) || `product-${Date.now()}`;
      const conflict = await prisma.product.findFirst({
        where: { slug: cleanSlug, NOT: { id } },
      });
      if (conflict) {
        cleanSlug = `${cleanSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
      }
      dataToUpdate.slug = cleanSlug;
    }

    if (categoryId !== undefined) dataToUpdate.categoryId = categoryId;
    if (cashPrice !== undefined && !isNaN(Number(cashPrice))) dataToUpdate.cashPrice = Number(cashPrice);
    if (installmentPrice !== undefined && !isNaN(Number(installmentPrice))) {
      dataToUpdate.installmentPrice = Number(installmentPrice);
    }
    if (downpaymentBase !== undefined && !isNaN(Number(downpaymentBase))) {
      dataToUpdate.downpaymentBase = Number(downpaymentBase);
    }
    if (durationMonths !== undefined && !isNaN(Number(durationMonths)) && Number(durationMonths) > 0) {
      dataToUpdate.durationMonths = Number(durationMonths);
    }
    if (imageUrl !== undefined) dataToUpdate.imageUrl = imageUrl;
    if (specsJson !== undefined) {
      if (typeof specsJson === 'string') {
        dataToUpdate.specsJson = specsJson;
      } else if (specsJson && typeof specsJson === 'object') {
        dataToUpdate.specsJson = JSON.stringify(specsJson);
      }
    }
    if (isFeatured !== undefined) dataToUpdate.isFeatured = Boolean(isFeatured);
    if (stock !== undefined && stock !== '' && !isNaN(Number(stock))) {
      dataToUpdate.stock = Number(stock);
    }

    const product = await prisma.product.update({
      where: { id },
      data: dataToUpdate,
      include: { category: true },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Failed to update product:', error);
    return NextResponse.json(
      { error: formatUpdateError(error, 'Failed to update product') },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: formatUpdateError(error, 'Failed to delete product') },
      { status: 500 }
    );
  }
}
