'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProductCard, { Product } from '@/components/ProductCard';
import InstallmentModal from '@/components/InstallmentModal';
import InstallmentRequirements from '@/components/InstallmentRequirements';
import StickyWhatsApp from '@/components/StickyWhatsApp';
import TrustBanner from '@/components/TrustBanner';
import {
  CreditCard,
  ArrowLeft,
  CheckCircle2,
  Calculator,
  ArrowRight,
  Tag,
} from 'lucide-react';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { calculateInstallmentPlan } from '@/lib/installments';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts?: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts = [],
}: ProductDetailClientProps) {
  const router = useRouter();

  // Dynamic Calculator state on product page
  const [downpaymentPct, setDownpaymentPct] = useState<number>(20);
  const [tenureMonths, setTenureMonths] = useState<number>(product.durationMonths || 12);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Dynamic Installment calculations via shared engine
  const plan = calculateInstallmentPlan(product, {
    customDownpaymentPct: downpaymentPct,
    customTenureMonths: tenureMonths,
  });
  const downpaymentAmount = plan.downpaymentAmount;
  const remaining = plan.financedAmount;
  const monthlyInstallment = plan.monthlyPayment;

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
  const whatsappText =
    `Hi Babu Electronics Pakpattan, I want to order/inquire about "${product.title}"\n` +
    `Cash Price: Rs. ${product.cashPrice.toLocaleString()}\n` +
    `Installment Plan: Rs. ${monthlyInstallment.toLocaleString()}/mo (${tenureMonths} Months @ ${downpaymentPct}% Downpayment).\n` +
    `Please share order details.`;

  const whatsappUrl = `https://wa.me/923001122782?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white pb-20 md:pb-10">
      <Navbar
        searchQuery=""
        onSearchChange={() => {}}
        selectedCategory="all"
        onCategorySelect={() => router.push('/')}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-8 sm:space-y-12">
        {/* Breadcrumb Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Products</span>
        </Link>

        {/* Top Product Hero & Dynamic Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* Left: Product Image Gallery */}
          <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-6 shadow-xs">
            <div className="h-64 sm:h-96 md:h-[400px] flex items-center justify-center bg-slate-50/80 rounded-2xl p-4 border border-slate-100 overflow-hidden relative">
              <img
                src={product.imageUrl}
                alt={product.title}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/logo.png';
                }}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100 text-xs">
              <span className="px-2.5 py-1 bg-slate-100 text-slate-800 text-[10px] sm:text-xs font-extrabold rounded-md uppercase border border-slate-200">
                {product.category?.name || 'Electronics'}
              </span>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] sm:text-xs font-extrabold rounded-md border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> In Stock ({product.stock} units)
              </span>
            </div>
          </div>

          {/* Right: Pricing, Dynamic Calculator & CTAs */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <div>
              <span className="text-blue-600 text-[11px] font-black uppercase tracking-wider block mb-1">
                Pakpattan Installment Store
              </span>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                {product.title}
              </h1>
            </div>

            {/* Pricing Summary Box */}
            <div className="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-2xl shadow-2xs space-y-2.5">
              <div className="flex justify-between items-baseline">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Cash Price:</span>
                <span className="text-xl sm:text-2xl font-black text-slate-900">
                  Rs. {product.cashPrice?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Financed Value:</span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                    {plan.markupRatePercentage}% Markup
                  </span>
                </div>
                <span className="text-base sm:text-lg font-black text-blue-600">
                  Rs. {plan.totalInstallmentPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* DYNAMIC PRODUCT INSTALLMENT CALCULATOR */}
            <div className="bg-white border border-slate-200/90 p-4 sm:p-6 rounded-3xl space-y-5 shadow-xs">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs sm:text-sm font-black text-slate-900">Dynamic Plan Calculator</h3>
                </div>
                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Instant Quote</span>
              </div>

              {/* Downpayment Selector Buttons (20%, 30%, 40%, 50%) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Select Advance Downpayment:
                </label>
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {[20, 30, 40, 50].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setDownpaymentPct(pct)}
                      className={`py-2 rounded-xl text-xs font-black transition-all ${
                        downpaymentPct === pct
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-blue-600 font-bold mt-1.5">
                  Initial Advance: Rs. {downpaymentAmount.toLocaleString()}
                </p>
              </div>

              {/* Tenure Duration Selection Buttons (NO OVERFLOW on Mobile) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Select Tenure Duration (6 to 16 Months):
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
                  {[6, 8, 10, 12, 14, 16].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setTenureMonths(m)}
                      className={`py-2 rounded-xl text-xs font-black transition-all ${
                        tenureMonths === m
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m} Mo
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-time Calculation Result */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-0.5">
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-bold block uppercase tracking-wider">
                  Estimated Monthly Installment ({tenureMonths} Months)
                </span>
                <div className="text-2xl sm:text-3xl font-black text-blue-600">
                  Rs. {monthlyInstallment.toLocaleString()} <span className="text-xs text-slate-500 font-medium">/ month</span>
                </div>
                <p className="text-[10px] text-slate-500 pt-0.5 font-medium">
                  Remaining Balance: Rs. {remaining.toLocaleString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setSelectedProductForModal(product);
                    setIsModalOpen(true);
                  }}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-xs shadow-blue-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <CreditCard className="w-4 h-4 fill-white" />
                  <span>Apply on Installment Online</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" size={15} />
                  <span>Order via WhatsApp (0300-1122782)</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Required Documents & Trust Checklist Box */}
        <InstallmentRequirements />

        {/* Detailed Specifications Table */}
        {Object.keys(specsObj).length > 0 && (
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 space-y-4 sm:space-y-6 shadow-2xs">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-600" />
              <span>Technical Specifications</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {Object.entries(specsObj).map(([key, value]) => (
                <div key={key} className="bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">{key}:</span>
                  <span className="text-slate-900 font-extrabold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trust Banner */}
        <TrustBanner />

        {/* Related Products Strip */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4 sm:space-y-6 pt-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              Related Products in {product.category?.name}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onApplyInstallment={(prod) => {
                    setSelectedProductForModal(prod);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Mobile CTA Bar (High Conversion on Phones) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3 pb-safe">
        <div className="min-w-0">
          <span className="text-[10px] text-slate-500 font-bold uppercase block truncate">Monthly Installment</span>
          <span className="text-sm font-black text-blue-600 truncate block">
            Rs. {monthlyInstallment.toLocaleString()}/mo
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl"
          >
            <WhatsAppIcon className="w-4 h-4" size={16} />
          </a>

          <button
            onClick={() => {
              setSelectedProductForModal(product);
              setIsModalOpen(true);
            }}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Apply Now</span>
          </button>
        </div>
      </div>

      {/* Application Modal */}
      <InstallmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProductForModal}
      />

      <StickyWhatsApp />
    </div>
  );
}
