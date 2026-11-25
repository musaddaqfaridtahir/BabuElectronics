'use client';

import React from 'react';
import { ShieldCheck, Truck, Award, Calendar, CheckCircle2, Star } from 'lucide-react';

export default function TrustBanner() {
  const highlights = [
    {
      title: 'Local Guarantor System',
      desc: 'Quick Pakpattan local guarantor check with fast 24-48 hour approval without complicated paperwork.',
      icon: ShieldCheck,
      badge: 'Fast Approval',
      color: 'from-emerald-500 to-teal-600',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      title: '6 to 16 Month Installment Plans',
      desc: 'Flexible monthly tenure choices custom-tailored to your monthly household budget.',
      icon: Calendar,
      badge: 'Flexible Plans',
      color: 'from-blue-500 to-indigo-600',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      title: 'Pakpattan City Express Delivery',
      desc: 'Safe delivery across Pakpattan City, Sahiwal Road, Arifwala, and surrounding areas.',
      icon: Truck,
      badge: 'Safe Handover',
      color: 'from-sky-500 to-cyan-600',
      iconBg: 'bg-sky-50 text-sky-600 border-sky-200',
    },
    {
      title: '100% Authentic & Brand Warranty',
      desc: 'Direct brand inventory with official company warranty cards and official store receipt.',
      icon: Award,
      badge: 'Official Products',
      color: 'from-amber-500 to-orange-600',
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
    },
  ];

  return (
    <section className="py-10 sm:py-14 px-3 sm:px-6 max-w-7xl mx-auto font-sans">
      <div className="bg-gradient-to-br from-white via-slate-50 to-blue-50/30 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200/80">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Pakpattan's #1 Trusted Showroom</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Why Pakpattan Chooses Babu Electronics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Providing transparent installment terms, authentic brand appliances, and reliable local service on Sahiwal Road for over a decade.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-blue-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-3 group"
              >
                <div className="flex justify-between items-center">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-2xs group-hover:scale-110 transition-transform ${item.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
