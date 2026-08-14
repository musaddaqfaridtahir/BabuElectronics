'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CreditCard,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
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
  // Calculate monthly installment estimate
  const remaining = Math.max(0, product.installmentPrice - product.downpaymentBase);
  const tenure = product.durationMonths > 0 ? product.durationMonths : 12;
  const monthlyRate = Math.round(remaining / tenure);

  // Safely parse specs
  let specsObj: Record<string, string> = {};
  if (product.specsJson) {
    try {
      specsObj = JSON.parse(product.specsJson);
    } catch (e) {
      specsObj = {};
    }
  }

  // Pre-filled WhatsApp message for 03001122782
  const whatsappMessage = encodeURIComponent(
    `Hi Babu Electronics Pakpattan, I want to order/inquire about "${product.title}" (Cash Price: Rs. ${product.cashPrice.toLocaleString()}, Monthly Installment: Rs. ${monthlyRate.toLocaleString()}/mo). Please share details.`
  );
  const whatsappUrl = `https://wa.me/923001122782?text=${whatsappMessage}`;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between group relative font-sans">
      {/* Top Image Container with Link */}
      <div>
        <Link href={`/product/${product.slug}`} className="block h-56 bg-slate-950 relative overflow-hidden p-4 border-b border-slate-800">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />

          {/* Category & Stock Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            <span className="px-3 py-1 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-blue-400 text-[10px] font-black rounded-full uppercase tracking-wider">
              {product.category?.name || 'Electronics'}
            </span>
            {product.isFeatured && (
              <span className="px-2.5 py-0.5 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3 fill-white" /> Featured
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 z-10">
            <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> In Stock
            </span>
          </div>
        </Link>

        {/* Card Content Body */}
        <div className="p-6 space-y-4">
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-base font-extrabold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Specs Snippets */}
          {Object.keys(specsObj).length > 0 && (
            <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-400 font-medium">
              {Object.entries(specsObj).slice(0, 3).map(([k, v]) => (
                <span key={k} className="px-2 py-0.5 bg-slate-950 rounded-md border border-slate-800/80 text-slate-300">
                  <strong className="text-slate-400">{k}:</strong> {v}
                </span>
              ))}
            </div>
          )}

          {/* Pricing Box */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400 text-xs font-semibold">Cash Price:</span>
              <span className="text-slate-200 font-extrabold text-sm">
                Rs. {product.cashPrice?.toLocaleString()}
              </span>
            </div>

            {/* HIGHLIGHTED INSTALLMENT BADGE */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-blue-400 font-extrabold flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5" />
                Installment:
              </span>
              <div className="text-right">
                <span className="px-2.5 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black text-xs md:text-sm rounded-lg shadow-md inline-block">
                  As low as Rs. {monthlyRate.toLocaleString()}/mo
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5 font-medium">
                  Downpayment: Rs. {product.downpaymentBase?.toLocaleString()} ({tenure} Mo)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-6 pt-0 space-y-2">
        <button
          onClick={() => onApplyInstallment(product)}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black text-xs rounded-xl shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all duration-200"
        >
          <CreditCard className="w-4 h-4 fill-white" />
          <span>Apply on Installment</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-emerald-400 font-extrabold text-xs rounded-xl border border-[#25D366]/30 flex items-center justify-center gap-2 transition-all duration-200"
        >
          <WhatsAppIcon className="w-4 h-4 text-[#25D366]" size={16} />
          <span>WhatsApp: 0300-1122782</span>
        </a>
      </div>
    </div>
  );
}
