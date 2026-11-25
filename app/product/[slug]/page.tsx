import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import ProductDetailClient from '@/components/ProductDetailClient';
import { calculateInstallmentPlan } from '@/lib/installments';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

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

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) {
    notFound();
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 3,
    include: { category: true },
  });

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
