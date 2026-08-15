'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Search, Menu, X, MapPin } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategorySelect: (slug: string) => void;
}

export default function Navbar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappUrl =
    'https://wa.me/923001122782?text=Hi%20Babu%20Electronics%20Pakpattan%2C%20I%20want%20to%20inquire%20about%20installment%20plans.';

  const categories = [
    { name: 'All Products', slug: 'all' },
    { name: 'Motorbikes', slug: 'motorbikes' },
    { name: 'Electric Vehicles', slug: 'electric-vehicles' },
    { name: 'Refrigerators & Freezers', slug: 'refrigerators' },
    { name: 'Washing Machines', slug: 'washing-machines' },
    { name: 'LEDs & Smart TVs', slug: 'leds' },
    { name: 'Air Conditioners', slug: 'acs' },
    { name: 'Mobiles & Tablets', slug: 'mobiles' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full font-sans bg-white shadow-xs border-b border-slate-200">
      
      {/* Main Navbar */}
      <nav className="py-3 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="h-12 w-auto flex items-center justify-center">
              <img src="/logo.png" alt="Babu Electronics Logo" className="h-12 w-auto object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
                BABU <span className="text-red-600">ELECTRONICS</span>
              </span>
              <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-red-600 shrink-0" />
                Sahiwal Road, Pakpattan
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:bg-white transition-all font-sans"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Contact Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href="tel:+923004191281"
              className="flex items-center gap-1.5 text-slate-700 hover:text-red-600 font-extrabold text-xs bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl border border-slate-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span>0300-4191281</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-900 hover:bg-red-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-white" size={14} />
              <span>WhatsApp Order</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-xl bg-slate-100 border border-slate-200"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* Mobile Search Input */}
        <div className="mt-2.5 md:hidden px-1">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-600 focus:bg-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </nav>

      {/* Category Navigation Bar */}
      <div className="bg-slate-50 border-t border-b border-slate-200 px-4 py-2 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => onCategorySelect(cat.slug)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-3">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold px-2 mb-2">
              CATEGORIES
            </p>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => {
                  onCategorySelect(cat.slug);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                  selectedCategory === cat.slug ? 'bg-slate-900 text-white font-black' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <a
              href="tel:+923004191281"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-100 text-slate-800 font-bold rounded-xl text-xs border border-slate-200"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>Call Store: 0300-4191281</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 text-white font-extrabold rounded-xl text-xs shadow-xs"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" size={16} />
              <span>WhatsApp: 0300-1122782</span>
            </a>
          </div>
        </div>
      )}

    </header>
  );
}
