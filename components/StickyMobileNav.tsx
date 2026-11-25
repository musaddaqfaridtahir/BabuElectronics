'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Grid, Phone } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export default function StickyMobileNav() {
  const whatsappUrl =
    'https://wa.me/923001122782?text=Hi%20Babu%20Electronics%20Pakpattan%2C%20I%20want%20to%20inquire%20about%20cash%20and%20installment%20plans.';

  return (
    <nav
      aria-label="Mobile quick navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe transition-all"
    >
      <div className="grid grid-cols-4 items-center h-14 max-w-md mx-auto px-2">
        {/* 1. Home / Catalog */}
        <Link
          href="/"
          className="flex flex-col items-center justify-center gap-0.5 text-slate-700 hover:text-blue-600 transition-colors py-1"
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] font-bold">Home</span>
        </Link>

        {/* 2. Categories Shortcut */}
        <button
          onClick={() => {
            const el = document.getElementById('categories-section') || document.getElementById('catalog-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.location.href = '/#catalog-section';
            }
          }}
          className="flex flex-col items-center justify-center gap-0.5 text-slate-700 hover:text-blue-600 transition-colors py-1"
        >
          <Grid className="w-4 h-4" />
          <span className="text-[10px] font-bold">Categories</span>
        </button>

        {/* 3. Call Store */}
        <a
          href="tel:+923004191281"
          className="flex flex-col items-center justify-center gap-0.5 text-slate-700 hover:text-blue-600 transition-colors py-1"
        >
          <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-blue-600">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-bold">Call</span>
        </a>

        {/* 4. WhatsApp Quick Order */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 text-emerald-600 hover:text-emerald-700 transition-colors py-1"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs">
            <WhatsAppIcon className="w-4 h-4" size={14} />
          </div>
          <span className="text-[10px] font-black text-emerald-700">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
