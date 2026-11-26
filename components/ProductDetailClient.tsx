'use client';

import React, { useState, useEffect } from 'react';
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
  Palette,
  ShieldCheck,
  Sparkles,
  PhoneCall,
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

  // Safely parse specs
  let specsObj: Record<string, any> = {};
  if (product.specsJson) {
    try {
      specsObj = JSON.parse(product.specsJson);
    } catch (e) {
      specsObj = {};
    }
  }

  // Extract colorImages map if present
  const colorImagesMap: Record<string, string> = specsObj.colorImages || {};

  // Extract available colors
  let availableColors: string[] = [];
  const colorKey = Object.keys(specsObj).find((k) =>
    k.toLowerCase().includes('color')
  );
  if (colorKey && typeof specsObj[colorKey] === 'string') {
    availableColors = specsObj[colorKey]
      .split(',')
      .map((c: string) => c.trim())
      .filter(Boolean);
  }
  if (availableColors.length === 0) {
    const titleLower = product.title.toLowerCase();
    if (
      titleLower.includes('honda') ||
      titleLower.includes('metro') ||
      titleLower.includes('bike') ||
      titleLower.includes('ev') ||
      product.category?.slug === 'motorbikes' ||
      product.category?.slug === 'electric-vehicles'
    ) {
      availableColors = ['Red (سرخ)', 'Black (سیاہ)', 'Blue (نیلا)'];
    } else if (
      titleLower.includes('dawlance') ||
      titleLower.includes('haier') ||
      titleLower.includes('refrigerator') ||
      product.category?.slug === 'refrigerators'
    ) {
      availableColors = ['Burgundy Red', 'Metallic Silver', 'Inox Grey', 'Glass Black'];
    } else if (
      titleLower.includes('vivo') ||
      titleLower.includes('infinix') ||
      product.category?.slug === 'mobiles'
    ) {
      availableColors = ['Titanium Gold', 'Obsidian Black', 'Emerald Green', 'Stellar Silver'];
    } else {
      availableColors = ['Standard Color', 'Metallic Silver', 'Midnight Black'];
    }
  }

  const [selectedColor, setSelectedColor] = useState<string>(
    availableColors[0] || 'Standard'
  );

  // Dynamic Image Switcher based on Selected Color
  const getActiveProductImage = (): string => {
    // 1. Direct match in colorImagesMap
    if (colorImagesMap[selectedColor]) {
      return colorImagesMap[selectedColor];
    }
    // 2. Substring match in colorImagesMap
    const selLower = selectedColor.toLowerCase();
    for (const [colKey, imgUrl] of Object.entries(colorImagesMap)) {
      if (selLower.includes(colKey.toLowerCase()) || colKey.toLowerCase().includes(selLower)) {
        return imgUrl;
      }
    }

    // 3. Smart fallbacks for motorcycles
    const titleLower = product.title.toLowerCase();
    if (titleLower.includes('cg125s') || titleLower.includes('self start')) {
      if (selLower.includes('red') || selLower.includes('سرخ')) return '/uploads/honda/cg125s-red.webp';
      if (selLower.includes('black') || selLower.includes('سیاہ')) return '/uploads/honda/cg125s-black.webp';
    } else if (titleLower.includes('gold')) {
      if (selLower.includes('red') || selLower.includes('سرخ')) return '/uploads/honda/cg125-gold-red.webp';
      if (selLower.includes('black') || selLower.includes('سیاہ')) return '/uploads/honda/cg125-gold-black.webp';
    } else if (titleLower.includes('cg125')) {
      if (selLower.includes('red') || selLower.includes('سرخ')) return '/uploads/honda/cg125-red.webp';
      if (selLower.includes('black') || selLower.includes('سیاہ')) return '/uploads/honda/cg125-black.webp';
    } else if (titleLower.includes('cd70') && titleLower.includes('dream')) {
      if (selLower.includes('red') || selLower.includes('سرخ')) return '/uploads/honda/cd70dream-red.webp';
      if (selLower.includes('black') || selLower.includes('سیاہ')) return '/uploads/honda/cd70dream-black.webp';
    } else if (titleLower.includes('cd70')) {
      if (selLower.includes('blue') || selLower.includes('نیلا')) return '/uploads/honda/cd70-blue.webp';
      if (selLower.includes('red') || selLower.includes('سرخ')) return '/uploads/honda/cd70-red.webp';
      if (selLower.includes('black') || selLower.includes('سیاہ')) return '/uploads/honda/cd70-black.webp';
    } else if (titleLower.includes('cb125f')) {
      if (selLower.includes('blue') || selLower.includes('نیلا')) return '/uploads/honda/cb125f-blue.webp';
      if (selLower.includes('red') || selLower.includes('سرخ')) return '/uploads/honda/cb125f-red.webp';
      if (selLower.includes('black') || selLower.includes('سیاہ')) return '/uploads/honda/cb125f-black.webp';
    } else if (titleLower.includes('cb150f')) {
      if (selLower.includes('blue') || selLower.includes('نیلا')) return '/uploads/honda/cb150f-blue.webp';
      if (selLower.includes('red') || selLower.includes('سرخ')) return '/uploads/honda/cb150f-red.webp';
    }

    // 4. Fallback to product's default image
    return product.imageUrl;
  };

  const activeImage = getActiveProductImage();

  // Store Rule: Mobiles have 30% markup and max 10 months plan
  const isMobile =
    product.category?.slug === 'mobiles' ||
    (product as any).categorySlug === 'mobiles' ||
    product.title.toLowerCase().includes('vivo') ||
    product.title.toLowerCase().includes('infinix') ||
    product.title.toLowerCase().includes('tecno');

  const availableTenures = isMobile ? [6, 8, 10] : [6, 8, 10, 12, 14, 16];

  // Dynamic Calculator state on product page (Minimum 30% advance)
  const [downpaymentPct, setDownpaymentPct] = useState<number>(30);
  const [tenureMonths, setTenureMonths] = useState<number>(
    isMobile ? 10 : product.durationMonths || 12
  );

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Dynamic Installment calculations via shared engine
  const plan = calculateInstallmentPlan(product, {
    customDownpaymentPct: downpaymentPct,
    customTenureMonths: tenureMonths,
    isMobile,
  });
  const downpaymentAmount = plan.downpaymentAmount;
  const remaining = plan.financedAmount;
  const monthlyInstallment = plan.monthlyPayment;

  const getColorSwatchClass = (colorName: string) => {
    const cl = colorName.toLowerCase();
    if (cl.includes('red') || cl.includes('burgundy') || cl.includes('سرخ') || cl.includes('maroon') || cl.includes('ruby')) return 'bg-rose-600';
    if (cl.includes('black') || cl.includes('سیاہ') || cl.includes('dark') || cl.includes('obsidian') || cl.includes('timber')) return 'bg-slate-950';
    if (cl.includes('silver') || cl.includes('grey') || cl.includes('gray') || cl.includes('inox') || cl.includes('chrome') || cl.includes('titanium')) return 'bg-slate-400';
    if (cl.includes('blue') || cl.includes('aqua') || cl.includes('نیلا') || cl.includes('breeze') || cl.includes('shadow')) return 'bg-blue-600';
    if (cl.includes('white') || cl.includes('سفید') || cl.includes('galaxy')) return 'bg-white border-2 border-slate-300';
    if (cl.includes('green') || cl.includes('سبز') || cl.includes('emerald') || cl.includes('sage') || cl.includes('palm')) return 'bg-emerald-600';
    if (cl.includes('gold') || cl.includes('golden') || cl.includes('سنہرا') || cl.includes('amber')) return 'bg-amber-500';
    if (cl.includes('purple') || cl.includes('dreamy')) return 'bg-purple-600';
    if (cl.includes('orange') || cl.includes('mecha')) return 'bg-orange-500';
    return 'bg-blue-500';
  };

  // Pre-filled WhatsApp message for 03001122782
  const whatsappText =
    `Hi Babu Electronics Pakpattan, I want to order/inquire about "${product.title}"\n` +
    `Selected Color: ${selectedColor}\n` +
    `Cash Price: Rs. ${product.cashPrice.toLocaleString()}\n` +
    `Installment Plan: Rs. ${monthlyInstallment.toLocaleString()}/mo (${tenureMonths} Months @ ${downpaymentPct}% Downpayment).\n` +
    `Please share order details.`;

  const whatsappUrl = `https://wa.me/923001122782?text=${encodeURIComponent(whatsappText)}`;

  // Filter out internal fields from specs display
  const displaySpecs = Object.entries(specsObj).filter(([k]) => k !== 'colorImages');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white pb-36 md:pb-16">
      <Navbar
        searchQuery=""
        onSearchChange={() => {}}
        selectedCategory="all"
        onCategorySelect={() => router.push('/')}
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-10">
        
        {/* Breadcrumb Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Products</span>
        </Link>

        {/* Top Product Hero & Dynamic Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* Left: Product Image Stage with Color Switcher */}
          <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-6 shadow-sm">
            <div className="h-64 sm:h-96 md:h-[420px] flex items-center justify-center bg-gradient-to-b from-slate-50 to-white rounded-2xl p-4 border border-slate-100 overflow-hidden relative">
              <img
                key={activeImage}
                src={activeImage}
                alt={`${product.title} - ${selectedColor}`}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/logo.png';
                }}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 drop-shadow-md"
              />

              {/* Selected Color Badge on Image */}
              <span className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-[11px] font-bold text-white border border-white/10 flex items-center gap-1.5 shadow-md">
                <span className={`w-2.5 h-2.5 rounded-full ${getColorSwatchClass(selectedColor)}`} />
                <span>{selectedColor}</span>
              </span>

              {/* Warranty / Genuine Tag */}
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] sm:text-xs font-extrabold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Genuine</span>
              </span>
            </div>

            {/* Bottom Image Stage Metadata */}
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100 text-xs">
              <span className="px-2.5 py-1 bg-slate-100 text-slate-800 text-[10px] sm:text-xs font-extrabold rounded-md uppercase border border-slate-200">
                {product.category?.name || 'Pakpattan Store'}
              </span>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] sm:text-xs font-extrabold rounded-md border border-blue-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> In Stock & Ready for Delivery
              </span>
            </div>
          </div>

          {/* Right: Pricing, Dynamic Calculator & CTAs */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <div>
              <span className="text-blue-600 text-[11px] font-black uppercase tracking-wider block mb-1">
                Babu Electronics Pakpattan • Easy Installments
              </span>
              <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                {product.title}
              </h1>
            </div>

            {/* Pricing Summary Box */}
            <div className="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-2xl shadow-xs space-y-2.5">
              <div className="flex justify-between items-baseline">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Cash Price:</span>
                <span className="text-xl sm:text-2xl font-black text-slate-900">
                  Rs. {product.cashPrice?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Financed Value:</span>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {plan.markupRatePercentage}% Markup ({isMobile ? 'Mobile Plan' : 'Tiered'})
                  </span>
                </div>
                <span className="text-base sm:text-lg font-black text-blue-600">
                  Rs. {plan.totalInstallmentPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Color Selection Option (Picture Updates Automatically!) */}
            {availableColors.length > 0 && (
              <div className="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-2xl shadow-xs space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Palette className="w-4 h-4 text-blue-600" />
                    <span>Choose Color / رنگ منتخب کریں:</span>
                  </span>
                  <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {selectedColor}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {availableColors.map((col) => {
                    const isSelected = selectedColor === col;
                    return (
                      <button
                        key={col}
                        type="button"
                        onClick={() => setSelectedColor(col)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm ring-2 ring-blue-500/30 scale-[1.02]'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full border border-black/10 shrink-0 ${getColorSwatchClass(col)}`} />
                        <span>{col}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* DYNAMIC PRODUCT INSTALLMENT CALCULATOR */}
            <div className="bg-white border border-slate-200/90 p-4 sm:p-6 rounded-3xl space-y-4 sm:space-y-5 shadow-xs">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs sm:text-sm font-black text-slate-900">Custom Installment Calculator</h3>
                </div>
                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Instant Quote</span>
              </div>

              {/* Downpayment Selector Buttons (30%, 35%, 40%, 50%) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Select Advance Downpayment (Minimum 30%):
                </label>
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {[30, 35, 40, 50].map((pct) => (
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
                  Advance Downpayment: <strong>Rs. {downpaymentAmount.toLocaleString()}</strong>
                </p>
              </div>

              {/* Tenure Duration Selection Buttons */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Select Tenure Duration ({isMobile ? 'Max 10 Months for Mobiles' : '6 to 16 Months'}):
                </label>
                <div className={`grid gap-1.5 sm:gap-2 ${isMobile ? 'grid-cols-3' : 'grid-cols-3 sm:grid-cols-6'}`}>
                  {availableTenures.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setTenureMonths(m)}
                      className={`py-2.5 rounded-xl text-xs font-black transition-all ${
                        tenureMonths === m
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m} Months
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-time Calculation Result */}
              <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200/80 text-center space-y-1">
                <span className="text-[10px] sm:text-[11px] text-blue-700 font-bold block uppercase tracking-wider">
                  Monthly Installment ({tenureMonths} Months Plan)
                </span>
                <div className="text-2xl sm:text-3xl font-black text-blue-600">
                  Rs. {monthlyInstallment.toLocaleString()} <span className="text-xs text-slate-500 font-medium">/ month</span>
                </div>
                <p className="text-[10px] text-slate-500 pt-0.5 font-medium">
                  Advance: Rs. {downpaymentAmount.toLocaleString()} • Financed Balance: Rs. {remaining.toLocaleString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setSelectedProductForModal(product);
                    setIsModalOpen(true);
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
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

        {/* 1. Detailed Specifications Table (Appears First on Mobile per user request) */}
        {displaySpecs.length > 0 && (
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 space-y-4 sm:space-y-6 shadow-xs">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-600" />
              <span>Technical Specifications & Features</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {displaySpecs.map(([key, value]) => (
                <div key={key} className="bg-slate-50 p-3 sm:p-3.5 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">{key}:</span>
                  <span className="text-slate-900 font-extrabold text-right max-w-[65%]">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Required Documents & Trust Checklist Box (Second on Mobile) */}
        <InstallmentRequirements />

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

      {/* Floating Bottom Mobile CTA Bar (Elevated, Never Cut Off) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-3 px-4 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] flex items-center justify-between gap-3 pb-6">
        <div className="min-w-0">
          <span className="text-[10px] text-slate-500 font-bold uppercase block truncate">Monthly Installment</span>
          <span className="text-base font-black text-blue-600 truncate block">
            Rs. {monthlyInstallment.toLocaleString()} <span className="text-xs font-semibold text-slate-500">/mo</span>
          </span>
          <span className="text-[9px] text-slate-500 font-bold block truncate">
            Color: {selectedColor}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-600 rounded-xl active:scale-95 transition-transform"
          >
            <WhatsAppIcon className="w-4 h-4" size={18} />
          </a>

          <button
            onClick={() => {
              setSelectedProductForModal(product);
              setIsModalOpen(true);
            }}
            className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5 active:scale-95 transition-transform"
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
        initialColor={selectedColor}
      />

      <StickyWhatsApp />
    </div>
  );
}
