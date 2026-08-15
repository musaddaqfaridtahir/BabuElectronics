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
import { Package, Search, MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { fallbackProducts } from '@/lib/mockProducts';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const storeFacebookUrl = 'https://facebook.com/BabuElectronicsCenter';
  const ownerFacebookUrl = 'https://facebook.com/musaddaqfaridtahir';
  const whatsappUrl =
    'https://wa.me/923001122782?text=Hi%20Babu%20Electronics%20Pakpattan%2C%20I%20want%20to%20inquire%20about%20cash%20and%20installment%20plans.';

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
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(fallbackProducts);
      }
    } catch (e) {
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyInstallment = (product: Product) => {
    setSelectedProductForModal(product);
    setIsModalOpen(true);
  };

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      
      {/* 1. Header Navbar (No top line) */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
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
        onSelectCategory={(slug) => {
          setSelectedCategory(slug);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 4. Product Catalog Grid */}
      <section id="catalog-section" className="py-10 px-4 max-w-7xl mx-auto space-y-6 scroll-mt-24">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200 mb-1">
              <Package className="w-3.5 h-3.5 text-red-600" />
              <span>Available Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Product Catalog
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium">
              Showing {filteredProducts.length} Products
            </span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-xs text-red-600 hover:underline font-bold"
              >
                Clear Filter
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

      {/* 5. Installment Calculator */}
      <InstallmentCalculator
        products={products.length > 0 ? products : fallbackProducts}
        onSelectProductForInstallment={handleApplyInstallment}
      />

      {/* 6. Google Maps Store Location Section */}
      <section className="py-10 px-4 max-w-7xl mx-auto space-y-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 mb-1">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                <span>Visit Store Location</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Store Location (Sahiwal Road, Pakpattan)
              </h2>
            </div>

            <a
              href="https://maps.google.com/?q=Babu+Electronics+Sahiwal+Road+Pakpattan"
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
                  <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Official Address</h4>
                    <p className="text-xs text-slate-600">Sahiwal Road, Pakpattan, Punjab, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-200 pt-4">
                  <Clock className="w-5 h-5 text-red-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Store Hours</h4>
                    <p className="text-xs text-slate-600">Saturday - Thursday: 9:00 AM - 9:00 PM</p>
                    <p className="text-xs text-red-600 font-bold">Friday: CLOSED</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-slate-200 pt-4">
                  <Phone className="w-5 h-5 text-red-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Direct Phone & Support</h4>
                    <a href="tel:+923004191281" className="text-xs font-bold text-slate-900 hover:text-red-600 block">
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

            {/* Google Map Embedded Iframe */}
            <div className="lg:col-span-7 h-[340px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs">
              <iframe
                title="Babu Electronics Pakpattan Google Maps Store Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13774.260295116237!2d73.38265809999999!3d30.33488665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393d599afc108301%3A0x51c4aeeec29d901f!2sBabu%20Electronics!5e0!3m2!1sen!2s!4v1786695379326!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

          </div>

        </div>
      </section>

      {/* 7. Trust Banner */}
      <TrustBanner />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4 text-xs text-slate-600 mt-16 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-auto flex items-center justify-center">
                <img src="/logo.png" alt="Babu Electronics Logo" className="h-10 w-auto object-contain" />
              </div>
              <span className="font-black text-slate-900 text-base">BABU ELECTRONICS</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Pakpattan's leading cash & easy installment store. Motorbikes, EVs, Refrigerators, LEDs, ACs, Washing Machines, Microwave Ovens & Mobiles on flexible 6-16 month plans.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Store Location</h4>
            <p className="text-slate-700 font-semibold">Sahiwal Road, Pakpattan, Punjab</p>
            <p className="text-slate-500 text-[11px]">Local Verification & Express Delivery in Pakpattan & Arifwala.</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Contact & Social</h4>
            <a href="tel:+923004191281" className="text-slate-700 font-bold block hover:text-red-600">
              Call: 0300-4191281
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] font-bold flex items-center gap-1.5 mt-1 hover:underline"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366]" size={16} />
              <span>WhatsApp: 0300-1122782</span>
            </a>
            <a
              href={storeFacebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1877F2] font-bold flex items-center gap-1.5 mt-1 hover:underline"
            >
              <FacebookIcon className="w-4 h-4 text-[#1877F2]" size={16} />
              <span>Facebook Page</span>
            </a>
          </div>

          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Store Hours</h4>
            <p className="text-slate-700 font-bold">Saturday - Thursday: 9:00 AM - 9:00 PM</p>
            <p className="text-red-600 font-bold">Friday: CLOSED</p>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT LINE */}
        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-200 text-center text-slate-500 font-medium">
          <span>© 2026 Babu Electronics Pakpattan. </span>
          <a
            href={ownerFacebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600 hover:underline font-semibold text-slate-600 transition-colors"
          >
            All Rights Reserved.
          </a>
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
    </div>
  );
}
