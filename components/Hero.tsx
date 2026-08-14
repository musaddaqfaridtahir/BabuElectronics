'use client';

import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Truck,
  ArrowRight,
  BadgeCheck,
  Clock,
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-[#0F172A] via-[#090D16] to-[#0F172A] text-white py-12 md:py-20 px-4 overflow-hidden border-b border-slate-800 font-sans">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Copy & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-black shadow-inner">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Pakpattan's #1 Trusted Installment Store</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Easy Monthly Installments in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Pakpattan
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Get Motorbikes, EVs, Refrigerators, LEDs, ACs, Washing Machines, Microwave Ovens & Smartphones on flexible 6 to 16-month installment plans with local verification and quick doorstep delivery.
          </p>

          {/* Trust & Store Timing Highlights */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 text-xs font-bold text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              <span>Local Guarantor System</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
              <Truck className="w-4 h-4 text-blue-400" />
              <span>Express Pakpattan Delivery</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>Sat - Thu: 9AM - 9PM (Fri Closed)</span>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <button
              onClick={onExploreClick}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-blue-600/30 transition-all duration-200 hover:scale-105"
            >
              <span>Explore Products & Plans</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="https://wa.me/923001122782?text=Hi%20Babu%20Electronics%2C%20I%20want%20to%20apply%20for%20an%20installment%20plan."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-[#25D366]/20 transition-all"
            >
              <WhatsAppIcon className="w-5 h-5 text-white" size={20} />
              <span>WhatsApp: 0300-1122782</span>
            </a>
          </div>
        </div>

        {/* Right Column: Hero Visual Feature Box */}
        <div className="lg:col-span-5 relative">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl relative space-y-6">
            {/* Top Store Badge */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white p-1.5 flex items-center justify-center border border-blue-500/30">
                  <img src="/logo.png" alt="Babu Electronics Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm">Babu Electronics Pakpattan</h3>
                  <span className="text-[10px] text-blue-400 font-bold">Sahiwal Road Store</span>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-extrabold border border-emerald-500/30 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Verified
              </span>
            </div>

            {/* Quick Pricing Highlight Card */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Featured Motorbike</span>
                <span className="text-blue-400 font-extrabold">16 Months Plan</span>
              </div>
              <div className="text-lg font-black text-white">Honda CG 125 Self Start 2025</div>
              <div className="flex items-baseline justify-between pt-2 border-t border-slate-800">
                <span className="text-xs text-slate-400 font-medium">As low as</span>
                <span className="text-2xl font-black text-blue-400">Rs. 16,875 <span className="text-xs text-slate-400 font-normal">/ month</span></span>
              </div>
            </div>

            {/* Quick Guarantees Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs font-bold text-slate-300">
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>100% Authentic</span>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-400" />
                <span>24-48h Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
