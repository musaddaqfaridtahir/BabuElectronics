import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import ProductDetailClient from '@/components/ProductDetailClient';
import { calculateInstallmentPlan } from '@/lib/installments';
import { fallbackCatalogProducts } from '@/lib/catalogBackup';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let product: any = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  }).catch(() => null);

  if (!product) {
    product = (fallbackCatalogProducts as any[]).find((p) => p.slug === slug);
  }

  if (!product) {
    return {
      title: 'Product Not Found | Babu Electronics Pakpattan',
      description: 'The requested product is not available at Babu Electronics Pakpattan.',
    };
  }

  const plan = calculateInstallmentPlan(product);

  return {
    title: `${product.title} on Easy Monthly Installments in Pakpattan | Babu Electronics`,
    description: `Buy ${product.title} on easy monthly installments (Rs. ${plan.monthlyPayment.toLocaleString()}/mo) in Pakpattan. Cash price: Rs. ${product.cashPrice.toLocaleString()}. Genuine product with fast local showroom verification at Babu Electronics.`,
    keywords: [
      product.title,
      product.category?.name || 'Electronics',
      'Pakpattan Installments',
      'Babu Electronics',
      'Monthly Installment',
      'Easy Installment Plan',
    ],
    openGraph: {
      title: `${product.title} on Installments | Babu Electronics Pakpattan`,
      description: `Rs. ${plan.monthlyPayment.toLocaleString()}/mo. Cash price: Rs. ${product.cashPrice.toLocaleString()}. Verified showroom financing.`,
      images: [
        {
          url: product.imageUrl,
          alt: product.title,
        },
      ],
      type: 'website',
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let product: any = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  }).catch(() => null);

  if (!product) {
    product = (fallbackCatalogProducts as any[]).find((p) => p.slug === slug);
  }

  if (!product) {
    notFound();
  }

  let relatedProducts: any[] = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 3,
    include: { category: true },
  }).catch(() => []);

  if (!relatedProducts || relatedProducts.length === 0) {
    relatedProducts = (fallbackCatalogProducts as any[])
      .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
      .slice(0, 3);
  }

  // Schema.org Product JSON-LD structured data for Google Search SEO
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    image: product.imageUrl,
    description: `Buy ${product.title} on easy monthly installments in Pakpattan from Babu Electronics. Cash Price: Rs. ${product.cashPrice.toLocaleString()}.`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'PKR',
      price: product.cashPrice,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Babu Electronics Pakpattan',
        telephone: '0300-4191281',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
