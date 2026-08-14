'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProductCard, { Product } from '@/components/ProductCard';
import InstallmentModal from '@/components/InstallmentModal';
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

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Dynamic Calculator state on product page
  const [downpaymentPct, setDownpaymentPct] = useState<number>(20);
  const [tenureMonths, setTenureMonths] = useState<number>(12);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  useEffect(() => {
    if (slug) {
      fetchProductDetails();
    }
  }, [slug]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/products/slug/${slug}`);
      if (!res.ok) {
        setProduct(null);
        return;
      }
      const data = await res.json();
      setProduct(data);

      if (data) {
        setDownpaymentPct(20);
        setTenureMonths(data.durationMonths || 12);
        // Fetch related products in same category
        const allRes = await fetch('/api/products');
        const allData = await allRes.json();
        if (Array.isArray(allData)) {
          setRelatedProducts(allData.filter((p) => p.id !== data.id && p.categoryId === data.categoryId).slice(0, 3));
        }
      }
    } catch (e) {
      console.error('Error fetching product details', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-8 font-sans">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-bold">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8 text-center space-y-6 font-sans">
        <h2 className="text-2xl font-extrabold text-white">Product Not Found</h2>
        <p className="text-xs text-slate-400">The product you are looking for does not exist or has been removed.</p>
        <Link href="/" className="px-6 py-3 bg-blue-600 text-white font-black text-xs rounded-xl inline-block">
          Return to Home Store
        </Link>
      </div>
    );
  }

  // Dynamic Installment calculations
  const downpaymentAmount = Math.round((product.installmentPrice * downpaymentPct) / 100);
  const remaining = Math.max(0, product.installmentPrice - downpaymentAmount);
  const monthlyInstallment = tenureMonths > 0 ? Math.round(remaining / tenureMonths) : 0;

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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar
        searchQuery=""
        onSearchChange={() => {}}
        selectedCategory="all"
        onCategorySelect={() => router.push('/')}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>

        {/* Top Product Hero & Dynamic Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Product Image Gallery */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
            <div className="h-80 md:h-[420px] flex items-center justify-center bg-slate-950 rounded-2xl p-6 border border-slate-800/80">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-800">
              <span className="px-3 py-1 bg-slate-950 text-blue-400 text-xs font-extrabold rounded-full border border-slate-800 uppercase">
                {product.category?.name || 'Category'}
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-extrabold rounded-full border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({product.stock} units)
              </span>
            </div>
          </div>

          {/* Right: Pricing, Dynamic Calculator & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-blue-400 text-xs font-black uppercase tracking-wider block mb-1">
                Pakpattan Installment Special
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Pricing Summary Box */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Cash Purchase Price:</span>
                <span className="text-2xl font-black text-white">
                  Rs. {product.cashPrice?.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-800">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Installment Value:</span>
                <span className="text-xl font-extrabold text-blue-400">
                  Rs. {product.installmentPrice?.toLocaleString()}
                </span>
              </div>
            </div>

            {/* DYNAMIC PRODUCT INSTALLMENT CALCULATOR (6 to 16 Months) */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-500" />
                  <h3 className="text-sm font-extrabold text-white">Dynamic Installment Calculator</h3>
                </div>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Real-time Breakdown</span>
              </div>

              {/* Downpayment Selector Buttons (20%, 30%, 40%, 50%) */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Select Downpayment Amount:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[20, 30, 40, 50].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => setDownpaymentPct(pct)}
                      className={`py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                        downpaymentPct === pct
                          ? 'bg-blue-600 text-white shadow-md font-black scale-105'
                          : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {pct}% Down
                    </button>
                  ))}
                </div>
                <p className="text-xs text-emerald-400 font-bold mt-2">
                  Initial Downpayment: Rs. {downpaymentAmount.toLocaleString()}
                </p>
              </div>

              {/* Tenure Duration Selection Buttons (6 to 16 Months) */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Select Tenure Duration (6 to 16 Months):
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {[6, 8, 10, 12, 14, 16].map((m) => (
                    <button
                      key={m}
                      onClick={() => setTenureMonths(m)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        tenureMonths === m
                          ? 'bg-blue-600 text-white shadow-md font-black scale-105'
                          : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {m} Mo
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-time Calculation Result */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 text-center space-y-1">
                <span className="text-[11px] text-blue-400 font-bold block uppercase tracking-wider">
                  Calculated Monthly Payment ({tenureMonths} Months)
                </span>
                <div className="text-3xl font-black text-blue-400">
                  Rs. {monthlyInstallment.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
                <p className="text-[10px] text-slate-400 pt-1 font-medium">
                  Remaining Balance: Rs. {remaining.toLocaleString()}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedProductForModal(product);
                    setIsModalOpen(true);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <CreditCard className="w-5 h-5 fill-white" />
                  <span>Apply on Installment Online</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" size={18} />
                  <span>Official WhatsApp Chat (0300-1122782)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Specifications Table */}
        {Object.keys(specsObj).length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Tag className="w-5 h-5 text-blue-500" />
              <span>Technical Specifications</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(specsObj).map(([key, value]) => (
                <div key={key} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">{key}:</span>
                  <span className="text-white font-extrabold text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trust Banner */}
        <TrustBanner />

        {/* Related Products Strip */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6">
            <h3 className="text-xl font-black text-white">Related Products in {product.category?.name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
