'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Search, Menu, X, MapPin, Clock, ArrowRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export interface NavCategory {
  id?: string;
  name: string;
  slug: string;
}

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategorySelect: (slug: string) => void;
  categories?: NavCategory[];
}

export default function Navbar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  categories,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesList, setCategoriesList] = useState<NavCategory[]>(categories || []);

  const whatsappUrl =
    'https://wa.me/923001122782?text=Hi%20Babu%20Electronics%20Pakpattan%2C%20I%20want%20to%20inquire%20about%20installment%20plans.';

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategoriesList(categories);
    } else {
      fetch('/api/categories')
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setCategoriesList(data);
          }
        })
        .catch((e) => console.warn('Could not load categories in Navbar:', e));
    }
  }, [categories]);

  const navCategories = [
    { name: 'All Products', slug: 'all' },
    ...categoriesList.map((cat) => ({ name: cat.name, slug: cat.slug })),
  ];

  return (
    <header className="sticky top-0 z-40 w-full font-sans bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-all">
      
      {/* Top Brand Notification Strip */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white text-[11px] py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold text-[9px] border border-blue-400/30 uppercase tracking-wider shrink-0">
              <Sparkles className="w-2.5 h-2.5 text-blue-300" />
              Pakpattan Showroom
            </span>
            <span className="text-slate-300 font-medium truncate hidden sm:inline">
              Easy 6 to 16 Month Installment Plans with Fast Local CNIC Verification
            </span>
            <span className="text-slate-300 font-medium truncate sm:hidden">
              Easy 6-16 Month Monthly Installments
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-slate-300 text-[10px] sm:text-[11px] font-semibold">
            <span className="hidden md:flex items-center gap-1">
              <Clock className="w-3 h-3 text-blue-400" />
              9:00 AM - 9:00 PM
            </span>
            <a
              href="tel:+923004191281"
              className="hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>0300-4191281</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="py-2.5 sm:py-3 px-3 sm:px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group min-w-0">
            <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-center p-1.5 shrink-0 shadow-2xs group-hover:border-blue-500/40 transition-colors">
              <img src="/logo.png" alt="Babu Electronics" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-xl font-black tracking-tight text-slate-900 leading-none">
                  BABU <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">ELECTRONICS</span>
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 shrink-0 fill-blue-50" />
              </div>
              <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold tracking-wider uppercase mt-1 flex items-center gap-1 truncate">
                <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600 shrink-0" />
                <span className="truncate">Sahiwal Rd, Pakpattan</span>
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar with Modern Styling */}
          <div className="hidden md:flex flex-1 max-w-md relative mx-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Honda 125, Haier Inverter, LED, Redmi..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-slate-200/90 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-2xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <Link
              href="/contact"
              className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 font-bold text-xs px-3 py-2 rounded-xl hover:bg-slate-100/80 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Showroom</span>
            </Link>

            <a
              href="tel:+923004191281"
              className="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 font-bold text-xs bg-slate-100/90 hover:bg-slate-200/80 px-3 py-2 rounded-xl border border-slate-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Call Us</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs rounded-xl shadow-xs shadow-emerald-600/20 flex items-center gap-1.5 transition-all active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-white" size={14} />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex sm:hidden items-center gap-1.5 shrink-0">
            <a
              href="tel:+923004191281"
              aria-label="Call Store"
              className="p-2 text-slate-700 rounded-xl bg-slate-100 border border-slate-200/80 active:bg-slate-200"
            >
              <Phone className="w-4 h-4 text-blue-600" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Store"
              className="p-2 text-emerald-600 rounded-xl bg-emerald-50 border border-emerald-200 active:bg-emerald-100"
            >
              <WhatsAppIcon className="w-4 h-4" size={16} />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 rounded-xl bg-slate-100 border border-slate-200/80 active:bg-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-slate-900" /> : <Menu className="w-4 h-4 text-slate-900" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 md:hidden">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Honda, Haier, Orient, LEDs, Mobiles..."
              className="w-full pl-9 pr-3 py-2 bg-slate-100/90 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Category Navigation Pills Bar */}
      <div className="bg-slate-50/90 border-t border-slate-200/80 px-3 sm:px-4 py-2 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
          {navCategories.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => onCategorySelect(cat.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs shadow-blue-500/25 font-black scale-[1.02]'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100/80 hover:border-slate-300'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto shadow-xl">
          {/* Store Info Banner */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 p-3.5 rounded-2xl border border-slate-200/90 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Sahiwal Road, Pakpattan</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Sat - Thu: 9:00 AM - 9:00 PM (Friday Closed)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800"
            >
              <span>Home Store</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800"
            >
              <span>Showroom Map</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>

          {/* Category Quick Filter */}
          <div className="space-y-1.5">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold px-1">
              Store Departments
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {navCategories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => {
                    onCategorySelect(cat.slug);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-bold truncate transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/70'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Action Call & WhatsApp */}
          <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
            <a
              href="tel:+923004191281"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold rounded-xl text-xs border border-slate-200 transition-colors"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Call Showroom: 0300-4191281</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold rounded-xl text-xs shadow-xs transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" size={15} />
              <span>Inquire via WhatsApp (0300-1122782)</span>
            </a>
          </div>
        </div>
      )}

    </header>
  );
}
