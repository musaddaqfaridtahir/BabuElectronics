'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCard, { Product } from '@/components/ProductCard';
import InstallmentModal from '@/components/InstallmentModal';
import InstallmentCalculator from '@/components/InstallmentCalculator';
import InstallmentRequirements from '@/components/InstallmentRequirements';
import TrustBanner from '@/components/TrustBanner';
import StickyWhatsApp from '@/components/StickyWhatsApp';
import StickyMobileNav from '@/components/StickyMobileNav';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import FacebookIcon from '@/components/FacebookIcon';
import { Package, Search, MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import StoreMap from '@/components/StoreMap';

interface HomePageClientProps {
  initialProducts: Product[];
  initialCategories: any[];
}

export default function HomePageClient({
  initialProducts = [],
  initialCategories = [],
}: HomePageClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<any[]>(initialCategories);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const storeFacebookUrl = 'https://facebook.com/BabuElectronicsCenter';
  const ownerFacebookUrl = 'https://facebook.com/musaddaqfaridtahir';
  const whatsappUrl =
    'https://wa.me/923001122782?text=Hi%20Babu%20Electronics%20Pakpattan%2C%20I%20want%20to%20inquire%20about%20cash%20and%20installment%20plans.';

  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(16);

  // Background refresh to catch any newly added products from admin panel
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((e) => console.warn('Background products refresh skipped:', e));

    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      })
      .catch((e) => console.warn('Background categories refresh skipped:', e));
  }, []);

  const handleApplyInstallment = (product: Product) => {
    setSelectedProductForModal(product);
    setIsModalOpen(true);
  };

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    setVisibleCount(16);
    if (slug === 'all') {
      const el = document.getElementById('categories-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById('catalog-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category?.name ? p.category.name.toLowerCase().includes(searchQuery.toLowerCase()) : false) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      p.categoryId === selectedCategory ||
      p.category?.slug === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. Header Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        categories={categories}
      />

      {/* 2. Hero Section Banner */}
      <Hero
        onExploreClick={() => {
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Category Showcase Grid */}
      <CategoryGrid
        activeCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        categories={categories}
      />

      {/* 4. Product Catalog Grid */}
      <section id="catalog-section" className="py-10 px-4 max-w-7xl mx-auto space-y-6 scroll-mt-24">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200 mb-1">
              <Package className="w-3.5 h-3.5 text-blue-600" />
              <span>Available Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {selectedCategory === 'all'
                ? 'Product Catalog'
                : `${categories.find((c) => c.slug === selectedCategory)?.name || 'Filtered'} Inventory`}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium">
              Showing {filteredProducts.length} Products
            </span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => handleCategorySelect('all')}
                className="text-xs text-blue-600 hover:underline font-bold cursor-pointer"
              >
                View All Categories
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
          <div className="p-16 text-center bg-white border border-slate-200 rounded-2xl space-y-3 shadow-2xs">
            <Search className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No products match your search or filter.</h3>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
              {filteredProducts.slice(0, visibleCount).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onApplyInstallment={handleApplyInstallment}
                />
              ))}
            </div>

            {/* Progressive Loading: Fast 60 FPS Smooth Scrolling on Phones */}
            {filteredProducts.length > visibleCount && (
              <div className="pt-6 sm:pt-8 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 16)}
                  className="px-6 sm:px-8 py-3 bg-white hover:bg-slate-100 border border-slate-300 hover:border-blue-500 text-slate-800 font-extrabold text-xs sm:text-sm rounded-2xl shadow-xs transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Load More Products (مزید پروڈکٹس دیکھیں)</span>
                  <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-bold border border-blue-200">
                    Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length}
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* 5. Installment Calculator */}
      <InstallmentCalculator
        products={products}
        onSelectProductForInstallment={handleApplyInstallment}
      />

      {/* 6. Required Documents & Trust Checklist */}
      <InstallmentRequirements />

      {/* 7. Google Maps Store Location Section */}
      <section className="py-10 px-4 max-w-7xl mx-auto space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 mb-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>Visit Store Location</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Store Location (Sahiwal Road, Pakpattan)
              </h2>
            </div>

            <a
              href="https://maps.app.goo.gl/aMUi3oNdAJeTcGZo8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-2xs transition-all"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Store Information Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Official Address</h4>
                    <p className="text-xs text-slate-600">Sahiwal Road, Pakpattan, Punjab, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-200 pt-4">
                  <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Store Hours</h4>
                    <p className="text-xs text-slate-600">Saturday - Thursday: 9:00 AM - 9:00 PM</p>
                    <p className="text-xs text-red-600 font-bold">Friday: CLOSED</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-200 pt-4">
                  <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Direct Phone & Support</h4>
                    <a href="tel:+923004191281" className="text-xs font-bold text-slate-900 hover:text-blue-600 block">
                      Call Store: 0300-4191281
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 block mt-1"
                    >
                      WhatsApp: 0300-1122782
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embedded Component */}
            <div className="lg:col-span-7">
              <StoreMap showDetails={false} />
            </div>

          </div>

        </div>
      </section>

      {/* 8. Trust Banner */}
      <TrustBanner />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-10 sm:pt-14 pb-28 sm:pb-12 px-4 text-xs text-slate-600 mt-12 font-sans">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-12 sm:h-14 w-auto flex items-center justify-center shrink-0">
                  <img src="/logo.png" alt="Babu Electronics Logo" className="h-12 sm:h-14 w-auto object-contain drop-shadow-xs" />
                </div>
                <span className="font-black text-slate-900 text-lg sm:text-2xl tracking-tight">
                  BABU <span className="text-blue-600">ELECTRONICS</span>
                </span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
                Pakpattan&apos;s trusted retail and easy installment center. Motorbikes, EV scooters, Refrigerators, LEDs, ACs, and Smart Mobiles with transparent local plans.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 font-semibold">
                <span className="px-2 py-0.5 bg-slate-100 rounded-md border border-slate-200">10+ Years Trust</span>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-200">Local Financing</span>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-2">
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Showroom Location
              </h4>
              <div className="text-slate-700 font-medium space-y-1 leading-relaxed">
                <p className="font-bold text-slate-900">Sahiwal Road, Pakpattan</p>
                <p className="text-slate-500 text-[11px]">Near City Bypass, Punjab, Pakistan</p>
                <p className="text-slate-500 text-[11px]">Free delivery across Pakpattan & Arifwala.</p>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-2">
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Store Hours
              </h4>
              <div className="space-y-1">
                <p className="text-slate-700 font-bold">Sat - Thu: 9AM - 9PM</p>
                <span className="inline-block px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded font-bold text-[10px]">
                  Friday: Closed
                </span>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-2">
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Quick Support
              </h4>
              <div className="flex flex-col gap-1.5">
                <a
                  href="tel:+923004191281"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-800 font-bold text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>0300-4191281</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-xs transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" size={14} />
                  <span>0300-1122782</span>
                </a>
                <a
                  href={storeFacebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-blue-800 font-bold text-xs transition-colors"
                >
                  <FacebookIcon className="w-3.5 h-3.5 text-[#1877F2]" size={14} />
                  <span>Facebook Page</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-slate-500 font-medium text-[11px]">
            <span>© 2026 Babu Electronics Pakpattan. All Rights Reserved.</span>
            <a
              href={ownerFacebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-blue-600 font-bold transition-colors"
            >
              Owner Profile: Musaddaq Farid Tahir
            </a>
          </div>

        </div>
      </footer>

      {/* Installment Application Modal */}
      <InstallmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProductForModal}
      />

      {/* Sticky Floating WhatsApp Button */}
      <StickyWhatsApp />

      {/* Mobile Sticky Navigation Bar */}
      <StickyMobileNav />
    </div>
  );
}
