'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Search,
  Menu,
  X,
  Clock,
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import FacebookIcon from './FacebookIcon';

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

  const facebookUrl = 'https://facebook.com/BabuElectronicsCenter';

  const categories = [
    { name: 'All Products', slug: 'all' },
    { name: 'Motorbikes', slug: 'motorbikes' },
    { name: 'Electric Vehicles', slug: 'electric-vehicles' },
    { name: 'Refrigerators & Freezers', slug: 'refrigerators' },
    { name: 'LEDs & Smart TVs', slug: 'leds' },
    { name: 'Air Conditioners', slug: 'acs' },
    { name: 'Washing Machines', slug: 'washing-machines' },
    { name: 'Mobiles & Tablets', slug: 'mobiles' },
    { name: 'Microwave Ovens', slug: 'microwave-ovens' },
    { name: 'Water Dispensers', slug: 'water-dispensers' },
    { name: 'Kitchen & Home Appliances', slug: 'home-appliances' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full font-sans shadow-2xl">
      {/* Top Announcement & Location Bar */}
      <div className="bg-[#0B0F17] text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Location & Store Hours */}
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-blue-400 font-bold bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Sahiwal Road, Pakpattan</span>
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Sat - Thu: 9AM - 9PM (Friday Closed)</span>
            </span>
          </div>

          {/* Call, WhatsApp & Facebook Links */}
          <div className="flex items-center gap-3">
            <a
              href="tel:03004191281"
              className="flex items-center gap-1.5 text-white font-bold hover:text-blue-400 transition-colors bg-slate-900 px-3 py-1 rounded-lg border border-slate-800"
            >
              <Phone className="w-3 h-3 text-blue-400" />
              <span>Call: 0300-4191281</span>
            </a>

            <a
              href="https://wa.me/923001122782?text=Hi%20Babu%20Electronics%2C%20I%20want%20to%20inquire%20about%20installment%20plans."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 font-extrabold hover:text-emerald-300 transition-colors bg-[#25D366]/10 px-3 py-1 rounded-lg border border-[#25D366]/30"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" size={14} />
              <span>WhatsApp: 0300-1122782</span>
            </a>

            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-blue-400 font-extrabold hover:text-blue-300 transition-colors bg-[#1877F2]/10 px-3 py-1 rounded-lg border border-[#1877F2]/30"
            >
              <FacebookIcon className="w-3.5 h-3.5 text-[#1877F2]" size={14} />
              <span>Facebook Page</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-[#0F172A] border-b border-slate-800 text-white py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-xl shadow-blue-600/20 border border-blue-500/30 group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="Babu Electronics Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-1">
                BABU <span className="text-blue-500">ELECTRONICS</span>
              </span>
              <span className="text-[10px] text-blue-400 tracking-wider uppercase font-extrabold">
                Easy Installment Hub • Pakpattan
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Honda 125, Microwave Ovens, Water Dispensers, LEDs..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          {/* Right Action Shortcut (WhatsApp Order) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/923001122782?text=Hi%20Babu%20Electronics%2C%20I%20want%20to%20apply%20for%20an%20installment."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs rounded-xl shadow-lg shadow-[#25D366]/20 transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" size={16} />
              <span>WhatsApp Order</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 text-slate-300 hover:text-white rounded-xl bg-slate-900 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden px-1">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products, brands..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </nav>

      {/* Category Subnav Strip */}
      <div className="bg-[#0B0F17] border-b border-slate-800/80 px-4 py-2 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => onCategorySelect(cat.slug)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-black'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
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
        <div className="md:hidden bg-[#0F172A] border-b border-slate-800 p-4 space-y-3">
          <div className="space-y-1">
            <p className="text-[10px] text-blue-400 uppercase tracking-wider font-extrabold px-2 mb-2">
              Browse Categories
            </p>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => {
                  onCategorySelect(cat.slug);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                  selectedCategory === cat.slug
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href="tel:03004191281"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs border border-slate-800"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Call Store: 0300-4191281</span>
            </a>

            <a
              href="https://wa.me/923001122782"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] text-white font-extrabold rounded-xl text-xs shadow-lg"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" size={18} />
              <span>Official WhatsApp: 0300-1122782</span>
            </a>

            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#1877F2] text-white font-extrabold rounded-xl text-xs shadow-lg"
            >
              <FacebookIcon className="w-4 h-4 text-white" size={18} />
              <span>Facebook Center Page</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
