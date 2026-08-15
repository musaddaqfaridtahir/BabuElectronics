'use client';

import React from 'react';
import Link from 'next/link';
import { CreditCard, CheckCircle2, ArrowRight, Percent } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export interface Product {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  category?: {
    name: string;
    slug: string;
  };
  cashPrice: number;
  installmentPrice: number;
  downpaymentBase: number;
  durationMonths: number;
  imageUrl: string;
  specsJson?: string;
  isFeatured: boolean;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onApplyInstallment: (product: Product) => void;
}

export default function ProductCard({ product, onApplyInstallment }: ProductCardProps) {
  const downpayment = product.downpaymentBase || Math.round(product.cashPrice * 0.20);
  const remaining = Math.max(0, product.cashPrice - downpayment);

  // Exact Rule: 30% markup on items under Rs. 100,000
  const isUnder100k = product.cashPrice < 100000;
  const markupRate = isUnder100k ? 0.30 : 0.20;
  const totalFinanced = Math.round(remaining + (remaining * markupRate));

  const tenure = product.durationMonths > 0 ? product.durationMonths : 12;
  const monthlyRate = Math.round(totalFinanced / tenure);

  let specsObj: Record<string, string> = {};
  if (product.specsJson) {
    try {
      specsObj = JSON.parse(product.specsJson);
    } catch (e) {
      specsObj = {};
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Hi Babu Electronics Pakpattan, I want to order/inquire about "${product.title}" (Cash Price: Rs. ${product.cashPrice.toLocaleString()}, Monthly Installment: Rs. ${monthlyRate.toLocaleString()}/mo). Please share details.`
  );
  const whatsappUrl = `https://wa.me/923001122782?text=${whatsappMessage}`;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group font-sans">
      
      <div>
        {/* Product Image Preview Box */}
        <Link href={`/product/${product.slug}`} className="block h-52 bg-slate-50 relative p-4 border-b border-slate-100">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
          />

          <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-white border border-slate-200 text-slate-700 text-[10px] font-bold rounded-md uppercase">
            {product.category?.name || 'Electronics'}
          </span>

          {isUnder100k ? (
            <span className="absolute top-3 right-3 px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 font-bold text-[10px] rounded-md flex items-center gap-1 uppercase">
              <Percent className="w-3 h-3" /> 30% Markup
            </span>
          ) : (
            <span className="absolute top-3 right-3 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded-md flex items-center gap-1 uppercase">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> In Stock
            </span>
          )}
        </Link>

        {/* Product Content Body */}
        <div className="p-4 space-y-3">
          
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Specs Snippets */}
          {Object.keys(specsObj).length > 0 && (
            <div className="flex flex-wrap gap-1 text-[10px] text-slate-500 font-medium">
              {Object.entries(specsObj).slice(0, 3).map(([k, v]) => (
                <span key={k} className="px-2 py-0.5 bg-slate-50 rounded-md border border-slate-200">
                  <strong className="text-slate-600">{k}:</strong> {v}
                </span>
              ))}
            </div>
          )}

          {/* Pricing Box */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-baseline text-xs">
              <span className="text-slate-500 font-medium">Cash Price:</span>
              <span className="text-slate-900 font-bold">
                Rs. {product.cashPrice?.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-baseline text-xs pt-1.5 border-t border-slate-200">
              <span className="text-slate-500 font-medium">Min Downpayment:</span>
              <span className="text-red-600 font-bold text-xs">
                Rs. {downpayment.toLocaleString()}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                Monthly ({tenure} Mo):
              </span>
              <span className="px-2.5 py-1 bg-slate-900 text-white font-black text-xs rounded-lg">
                Rs. {monthlyRate.toLocaleString()}/mo
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-0 space-y-2 font-sans">
        <button
          onClick={() => onApplyInstallment(product)}
          className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-2xs flex items-center justify-center gap-2 transition-all"
        >
          <CreditCard className="w-3.5 h-3.5 fill-white" />
          <span>Apply on Installment</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 flex items-center justify-center gap-2 transition-all"
        >
          <WhatsAppIcon className="w-3.5 h-3.5 text-slate-700" size={14} />
          <span>WhatsApp Order</span>
        </a>
      </div>

    </div>
  );
}
