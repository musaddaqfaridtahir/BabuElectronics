import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSlug } from '@/lib/slugify';
import { fallbackCatalogCategories } from '@/lib/catalogBackup';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: 'asc' },
    }).catch(() => []);

    if (!categories || categories.length === 0) {
      return NextResponse.json(fallbackCatalogCategories);
    }

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(fallbackCatalogCategories);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, image } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    // Auto-generate slug if not passed
    let finalSlug = slug ? createSlug(slug) : createSlug(name);
    if (!finalSlug) {
      finalSlug = `cat-${Date.now()}`;
    }

    // Check duplicate slug
    const existing = await prisma.category.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      finalSlug = `${finalSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    const category = await prisma.category.create({
      data: { name: name.trim(), slug: finalSlug, image: image || '' },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Failed to create category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
