'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCard, { Product } from '@/components/ProductCard';
import InstallmentModal from '@/components/InstallmentModal';
import InstallmentCalculator from '@/components/InstallmentCalculator';
import TrustBanner from '@/components/TrustBanner';
import StickyWhatsApp from '@/components/StickyWhatsApp';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import FacebookIcon from '@/components/FacebookIcon';
import { Package, Search } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const storeFacebookUrl = 'https://facebook.com/BabuElectronicsCenter';
  const ownerFacebookUrl = 'https://facebook.com/musaddaqfaridtahir';

  // Modal State
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (e) {
      console.error('Failed to fetch products', e);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyInstallment = (product: Product) => {
    setSelectedProductForModal(product);
    setIsModalOpen(true);
  };

  // Filter products by search and category
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      p.categoryId === selectedCategory ||
      p.category?.slug === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Top Navigation Bar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* 2. Hero Section */}
      <Hero
        onExploreClick={() => {
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Quick Category Grid */}
      <CategoryGrid
        activeCategory={selectedCategory}
        onSelectCategory={(slug) => {
          setSelectedCategory(slug);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 4. Product Catalog */}
      <section id="catalog-section" className="py-12 px-4 max-w-7xl mx-auto space-y-8 scroll-mt-24">
        {/* Catalog Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/10 text-blue-400 text-[11px] font-extrabold uppercase tracking-wider mb-2 border border-blue-500/20">
              <Package className="w-3.5 h-3.5" />
              <span>Available Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Pakpattan Product Catalog
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-bold">
              Showing {filteredProducts.length} Products
            </span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-xs text-blue-400 hover:underline font-bold"
              >
                Clear Category Filter
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div className="p-16 text-center text-slate-500 text-sm font-semibold">
            Loading products from Babu Electronics database...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-16 text-center bg-slate-900/80 border border-slate-800 rounded-3xl space-y-3">
            <Search className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No products match your search or filter.</h3>
            <p className="text-xs text-slate-400">Try searching for a different item or clear your category selection.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onApplyInstallment={handleApplyInstallment}
              />
            ))}
          </div>
        )}
      </section>

      {/* 5. Interactive Installment Calculator */}
      <InstallmentCalculator
        products={products}
        onSelectProductForInstallment={handleApplyInstallment}
      />

      {/* 6. Trust & Services Banner */}
      <TrustBanner />

      {/* Footer */}
      <footer className="bg-[#070A10] border-t border-slate-800/80 py-12 px-4 text-xs text-slate-400 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center border border-blue-500/30">
                <img src="/logo.png" alt="Babu Electronics Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-black text-white text-base">BABU ELECTRONICS</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Pakpattan's leading cash & easy installment store. Motorbikes, EVs, Refrigerators, LEDs, ACs, Washing Machines, Microwave Ovens & Mobiles on flexible 6-16 month plans.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">Store Location</h4>
            <p className="text-slate-300 font-semibold">Sahiwal Road, Pakpattan, Punjab</p>
            <p className="text-slate-400 text-[11px]">Local Verification & Express Delivery in Pakpattan & Arifwala.</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">Contact & Social</h4>
            <p className="text-slate-300 font-bold">Call: 0311-122125 | 0300-4191281</p>
            <p className="text-[#25D366] font-bold flex items-center gap-1.5 mt-1">
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" size={16} />
              <span>WhatsApp: 0300-1122782</span>
            </p>
            <a
              href={storeFacebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1877F2] font-bold flex items-center gap-1.5 mt-1 hover:underline"
            >
              <FacebookIcon className="w-4 h-4 text-[#1877F2]" size={16} />
              <span>Facebook: Babu Electronics Center</span>
            </a>
          </div>

          <div className="space-y-2">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider">Store Hours</h4>
            <p className="text-slate-300 font-bold">Saturday - Thursday: 9:00 AM - 9:00 PM</p>
            <p className="text-red-400 font-bold">Friday: CLOSED</p>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT LINE (Year 2026, ONLY 'All Rights Reserved.' IS A LINK TO musaddaqfaridtahir, NO FACEBOOK ICON AFTER IT) */}
        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/60 text-center text-slate-500 font-medium">
          <span>© 2026 Babu Electronics Pakpattan. </span>
          <a
            href={ownerFacebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 hover:underline font-semibold text-slate-400 transition-colors"
          >
            All Rights Reserved.
          </a>
        </div>
      </footer>

      {/* 7. Installment Application Modal */}
      <InstallmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProductForModal}
      />

      {/* 8. Sticky Floating WhatsApp Button */}
      <StickyWhatsApp />
    </div>
  );
}
