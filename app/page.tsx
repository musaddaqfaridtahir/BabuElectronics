import React from 'react';
import { prisma } from '@/lib/prisma';
import HomePageClient from '@/components/HomePageClient';

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
      }),
      prisma.category.findMany({
        orderBy: { name: 'asc' },
      }),
    ]);

    products = JSON.parse(JSON.stringify(dbProducts || []));
    categories = JSON.parse(JSON.stringify(dbCategories || []));
  } catch (error) {
    console.error('Server DB fetch error:', error);
  }

  return (
    <HomePageClient
      initialProducts={products}
      initialCategories={categories}
    />
  );
}
