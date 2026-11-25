'use client';

import React from 'react';
import { CreditCard, ShieldCheck, MapPin, CheckCircle2, ArrowDown, Sparkles, Star, Award, ChevronRight } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const whatsappUrl =
    'https://wa.me/923001122782?text=Hi%20Babu%20Electronics%20Pakpattan%2C%20I%20want%20to%20inquire%20about%20installment%20plans.';

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#0a142f] to-[#071330] text-white py-10 sm:py-16 px-3 sm:px-6 font-sans">
      
      {/* Ambient background glow highlights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
        
        {/* Left Column: Headline, Trust Badges & CTAs */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          
          {/* Top Pill Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-bold backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Sahiwal Road, Pakpattan</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold backdrop-blur-md">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>10+ Years Trusted Showroom</span>
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]">
              Motorbikes, Appliances & Mobiles{' '}
              <span className="block bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                On Easy Monthly Installments
              </span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-medium pt-1">
              Pakpattan&apos;s leading showroom for Honda CG/CD bikes, EV scooters, Haier/Dawlance inverter refrigerators, automatic washing machines, and 4K LED TVs on easy 6 to 16 month local financing.
            </p>
          </div>

          {/* 3 Pillar Features */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3.5 pt-1">
            <div className="p-2.5 sm:p-4 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-blue-400/30 transition-all text-center sm:text-left">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center mb-1.5 sm:mb-2 mx-auto sm:mx-0">
                <CreditCard className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
              </div>
              <h4 className="text-[11px] sm:text-sm font-black text-white">6 to 16 Months</h4>
              <p className="text-[9px] sm:text-xs text-slate-400 font-medium mt-0.5">Easy Installments</p>
            </div>

            <div className="p-2.5 sm:p-4 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-emerald-400/30 transition-all text-center sm:text-left">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-1.5 sm:mb-2 mx-auto sm:mx-0">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
              </div>
              <h4 className="text-[11px] sm:text-sm font-black text-white">CNIC Approval</h4>
              <p className="text-[9px] sm:text-xs text-slate-400 font-medium mt-0.5">Fast 24-48h Check</p>
            </div>

            <div className="p-2.5 sm:p-4 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-indigo-400/30 transition-all text-center sm:text-left">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-1.5 sm:mb-2 mx-auto sm:mx-0">
                <Award className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
              </div>
              <h4 className="text-[11px] sm:text-sm font-black text-white">100% Genuine</h4>
              <p className="text-[9px] sm:text-xs text-slate-400 font-medium mt-0.5">Company Warranty</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={onExploreClick}
              className="px-6 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Explore Product Catalog</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs sm:text-sm rounded-xl backdrop-blur-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-400" size={16} />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Right Column: Featured Flagship Product Showcase Card */}
        <div className="lg:col-span-5">
          <div className="bg-white/[0.08] backdrop-blur-xl border border-white/15 rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xl relative group animate-float hover:border-blue-400/40 transition-all duration-300">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-black tracking-wider text-slate-200 uppercase">
                  Flagship Product
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-extrabold uppercase shimmer-badge">
                2025 Model
              </span>
            </div>

            {/* Product Image Stage */}
            <div className="h-44 sm:h-52 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 p-4 flex items-center justify-center border border-white/10 relative overflow-hidden">
              <img
                src="/uploads/honda/honda-cg125s-self-start.webp"
                alt="Honda CG 125 Self Start"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/logo.png';
                }}
                className="h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[9px] font-bold text-slate-200 border border-white/10">
                Self Start 2025 Model
              </span>
            </div>

            {/* Product Title & Cash Price */}
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-black text-white">
                Honda CG 125 Self Start (2025 Model)
              </h3>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Cash Price:</span>
                <span className="text-emerald-300 font-black text-sm">Rs. 285,000</span>
              </div>
            </div>

            {/* Installment Breakdown Box */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-400/20 flex justify-between items-center text-xs">
              <div>
                <span className="text-[10px] text-blue-300 font-semibold uppercase block">
                  Advance Downpayment
                </span>
                <span className="font-black text-white text-sm">Rs. 50,000</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-blue-300 font-semibold uppercase block">
                  Monthly (16 Mo)
                </span>
                <span className="font-black text-amber-300 text-sm sm:text-base">
                  Rs. 16,875 <span className="text-xs text-slate-300">/mo</span>
                </span>
              </div>
            </div>

            <button
              onClick={onExploreClick}
              className="w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>View Full Specs & Apply</span>
              <ChevronRight className="w-4 h-4 text-blue-300" />
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}
