import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    const slug = title
      ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + id.slice(-4)
      : undefined;

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(categoryId && { categoryId }),
        ...(cashPrice !== undefined && { cashPrice: parseFloat(cashPrice) }),
        ...(installmentPrice !== undefined && { installmentPrice: parseFloat(installmentPrice) }),
        ...(downpaymentBase !== undefined && { downpaymentBase: parseFloat(downpaymentBase) }),
        ...(durationMonths !== undefined && { durationMonths: parseInt(durationMonths) }),
        ...(imageUrl && { imageUrl }),
        ...(specsJson !== undefined && {
          specsJson: typeof specsJson === 'object' ? JSON.stringify(specsJson) : specsJson,
        }),
        ...(isFeatured !== undefined && { isFeatured: Boolean(isFeatured) }),
        ...(stock !== undefined && { stock: parseInt(stock) }),
      },
      include: { category: true },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Update error:', error);
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
