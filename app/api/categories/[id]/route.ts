import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSlug } from '@/lib/slugify';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, slug, image } = body;

    const dataToUpdate: any = {};
    if (name !== undefined) dataToUpdate.name = name.trim();
    if (slug) {
      let cleanSlug = createSlug(slug) || `cat-${Date.now()}`;
      const conflict = await prisma.category.findFirst({ where: { slug: cleanSlug, NOT: { id } } });
      if (conflict) cleanSlug = `${cleanSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
      dataToUpdate.slug = cleanSlug;
    }
    if (image !== undefined) dataToUpdate.image = image;

    const category = await prisma.category.update({
      where: { id },
      data: dataToUpdate,
    });

    return NextResponse.json(category);
  } catch (error: any) {
    console.error('Failed to update category:', error);
    const msg = String(error?.message || '');
    const hint = msg.includes('READONLY') || msg.includes('readonly') || msg.includes('EROFS')
      ? 'Vercel par SQLite read-only hai; cloud database (Neon Postgres) connect karein.'
      : msg || 'Failed to update category';
    return NextResponse.json({ error: hint }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
