'use client';

import React from 'react';
import Link from 'next/link';
import { CreditCard, CheckCircle2, ArrowRight, Percent, Sparkles } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { calculateInstallmentPlan } from '@/lib/installments';

export interface Product {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  category?: {
    name: string;
    slug: string;
    [key: string]: any;
  } | null;
  cashPrice: number;
  installmentPrice: number;
  downpaymentBase: number;
  durationMonths: number;
  imageUrl: string;
  specsJson?: string | null;
  isFeatured: boolean;
  stock: number;
  [key: string]: any;
}

interface ProductCardProps {
  product: Product;
  onApplyInstallment: (product: Product) => void;
}

export default function ProductCard({ product, onApplyInstallment }: ProductCardProps) {
  const plan = calculateInstallmentPlan(product);
  const downpayment = plan.downpaymentAmount;
  const tenure = plan.tenureMonths;
  const monthlyRate = plan.monthlyPayment;

  let specsObj: Record<string, string> = {};
  if (product.specsJson) {
    try {
      specsObj = JSON.parse(product.specsJson);
    } catch (e) {
      specsObj = {};
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Hi Babu Electronics Pakpattan, I want to inquire about "${product.title}" (Cash Price: Rs. ${product.cashPrice.toLocaleString()}, Monthly Installment: Rs. ${monthlyRate.toLocaleString()}/mo). Please share installment details.`
  );
  const whatsappUrl = `https://wa.me/923001122782?text=${whatsappMessage}`;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group font-sans h-full">
      
      <div>
        {/* Product Image Stage */}
        <Link
          href={`/product/${product.slug}`}
          className="block h-40 sm:h-52 bg-gradient-to-b from-slate-50 to-white relative p-3 sm:p-4 border-b border-slate-100 overflow-hidden"
        >
          <img
            src={product.imageUrl}
            alt={product.title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/logo.png';
            }}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />

          {/* Category Tag */}
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-700 text-[9px] sm:text-[10px] font-bold rounded-lg uppercase truncate max-w-[100px] shadow-2xs">
            {product.category?.name || 'Electronics'}
          </span>

          {/* Markup Tier Badge */}
          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-[9px] sm:text-[10px] rounded-lg flex items-center gap-0.5 uppercase shadow-xs shadow-blue-500/20">
            <Percent className="w-2.5 h-2.5" />
            <span>{plan.markupRatePercentage}% Markup</span>
          </span>
        </Link>

        {/* Product Details Body */}
        <div className="p-3.5 sm:p-4 space-y-2.5 sm:space-y-3">
          
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Key Specs Pills */}
          {Object.keys(specsObj).length > 0 && (
            <div className="hidden sm:flex flex-wrap gap-1 text-[10px] text-slate-500 font-medium">
              {Object.entries(specsObj).slice(0, 2).map(([k, v]) => (
                <span key={k} className="px-2 py-0.5 bg-slate-50 rounded-md border border-slate-200/80 truncate">
                  <strong className="text-slate-700">{k}:</strong> {v}
                </span>
              ))}
            </div>
          )}

          {/* Professional Installment Breakdown Box */}
          <div className="bg-gradient-to-br from-blue-50/60 via-indigo-50/20 to-slate-50 p-2.5 sm:p-3 rounded-xl border border-blue-100/80 space-y-1.5">
            <div className="flex justify-between items-baseline text-[11px] sm:text-xs">
              <span className="text-slate-500 font-medium">Cash Price:</span>
              <span className="text-slate-900 font-black">
                Rs. {product.cashPrice?.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-baseline text-[10px] sm:text-[11px] text-slate-500">
              <span>Advance Downpayment:</span>
              <span className="text-blue-700 font-extrabold">
                Rs. {downpayment.toLocaleString()}
              </span>
            </div>

            <div className="pt-1.5 border-t border-blue-100 flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] text-slate-600 font-semibold">
                Monthly ({tenure} Mo):
              </span>
              <span className="px-2 py-0.5 bg-white border border-blue-200 text-blue-700 font-black text-xs sm:text-[13px] rounded-lg shadow-2xs">
                Rs. {monthlyRate.toLocaleString()}<span className="text-[9px] text-slate-400 font-medium">/mo</span>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-3.5 sm:p-4 pt-0 space-y-1.5 font-sans">
        <button
          onClick={() => onApplyInstallment(product)}
          className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Apply on Installment</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-1.5 text-center text-slate-600 hover:text-emerald-700 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
        >
          <WhatsAppIcon className="w-3 h-3 text-emerald-600" size={12} />
          <span>Ask via WhatsApp</span>
        </a>
      </div>

    </div>
  );
}
