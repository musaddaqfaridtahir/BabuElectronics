import React from 'react';
import { prisma } from '@/lib/prisma';
import HomePageClient from '@/components/HomePageClient';
import { fallbackCatalogProducts, fallbackCatalogCategories } from '@/lib/catalogBackup';

// Ensure server always retrieves fresh inventory
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let products: any[] = [];
  let categories: any[] = [];

  try {
    const [dbProducts, dbCategories] = await Promise.all([
      prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: 'desc' },
      }).catch(() => []),
      prisma.category.findMany({
        where: { products: { some: {} } },
        orderBy: { name: 'asc' },
      }).catch(() => []),
    ]);

    if (Array.isArray(dbProducts) && dbProducts.length > 0) {
      products = JSON.parse(JSON.stringify(dbProducts));
    } else {
      products = fallbackCatalogProducts as any;
    }

    if (Array.isArray(dbCategories) && dbCategories.length > 0) {
      categories = JSON.parse(JSON.stringify(dbCategories));
    } else {
      categories = fallbackCatalogCategories as any;
    }
  } catch (error) {
    console.error('Server DB fetch error, using baked catalog fallback:', error);
    products = fallbackCatalogProducts as any;
    categories = fallbackCatalogCategories as any;
  }

  return (
    <HomePageClient
      initialProducts={products}
      initialCategories={categories}
    />
  );
}
