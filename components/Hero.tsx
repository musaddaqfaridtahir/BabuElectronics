'use client';

import React from 'react';
import { CreditCard, ShieldCheck, MapPin, CheckCircle, ArrowDown, Percent } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const whatsappUrl =
    'https://wa.me/923001122782?text=Hi%20Babu%20Electronics%20Pakpattan%2C%20I%20want%20to%20inquire%20about%20installment%20plans.';

  return (
    <section className="bg-slate-50 text-slate-900 py-10 sm:py-14 px-4 border-b border-slate-200 font-sans relative">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>Sahiwal Road, Pakpattan</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
              <Percent className="w-3.5 h-3.5" />
              <span>30% Markup on Items &lt; 100k</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-slate-900">
            Motorbikes, Appliances & Mobiles on Easy Monthly Installments
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-medium">
            Babu Electronics Pakpattan provides genuine Honda motorbikes, EV scooters, refrigerators, washing machines, and smart TVs on flexible 6 to 16 month installment plans.
          </p>

          {/* 3 Pillar Local Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <CheckCircle className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Easy Installments</h4>
                <p className="text-[10px] text-slate-500 font-medium">6 to 16 Month Tenure</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">CNIC Approval</h4>
                <p className="text-[10px] text-slate-500 font-medium">Fast 24-Hour Process</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <CreditCard className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Min Downpayment</h4>
                <p className="text-[10px] text-slate-500 font-medium">Local Guarantor System</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              onClick={onExploreClick}
              className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>Explore Products</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" size={16} />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Right Column: Hero Visual Card */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Featured Item
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold uppercase">
                Official Warranty
              </span>
            </div>

            <div className="h-52 bg-slate-50 rounded-xl p-4 flex items-center justify-center border border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80"
                alt="Honda CG 125 Self Start"
                className="h-full object-contain"
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Honda CG 125 Self Start (2025 Model)</h3>
              <p className="text-xs text-slate-500">Cash Price: <strong className="text-slate-900 font-bold">Rs. 285,000</strong></p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
              <div>
                <span className="text-[10px] text-slate-500 font-semibold uppercase block">Min Downpayment</span>
                <span className="font-bold text-red-600">Rs. 50,000</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 font-semibold uppercase block">Monthly Installment</span>
                <span className="font-black text-slate-900 text-sm">Rs. 22,916 / mo</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
