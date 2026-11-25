import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSlug } from '@/lib/slugify';

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

    const dataToUpdate: any = {};
    if (title !== undefined) dataToUpdate.title = title.trim();
    if (slug) {
      dataToUpdate.slug = createSlug(slug);
    } else if (title) {
      dataToUpdate.slug = createSlug(title);
    }
    if (categoryId !== undefined) dataToUpdate.categoryId = categoryId;
    if (cashPrice !== undefined) dataToUpdate.cashPrice = Number(cashPrice);
    if (installmentPrice !== undefined) dataToUpdate.installmentPrice = Number(installmentPrice);
    if (downpaymentBase !== undefined) dataToUpdate.downpaymentBase = Number(downpaymentBase);
    if (durationMonths !== undefined) dataToUpdate.durationMonths = Number(durationMonths);
    if (imageUrl !== undefined) dataToUpdate.imageUrl = imageUrl;
    if (specsJson !== undefined) {
      if (typeof specsJson === 'string') {
        dataToUpdate.specsJson = specsJson;
      } else if (specsJson && typeof specsJson === 'object') {
        dataToUpdate.specsJson = JSON.stringify(specsJson);
      }
    }
    if (isFeatured !== undefined) dataToUpdate.isFeatured = Boolean(isFeatured);
    if (stock !== undefined) dataToUpdate.stock = Number(stock);

    const product = await prisma.product.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
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
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
