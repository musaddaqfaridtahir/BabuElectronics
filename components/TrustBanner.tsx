'use client';

import React from 'react';
import { ShieldCheck, Truck, Award, Calendar } from 'lucide-react';

export default function TrustBanner() {
  const highlights = [
    {
      title: 'Local Guarantor System',
      desc: 'Quick Pakpattan local guarantor check with fast 24-48 hour approval.',
      icon: ShieldCheck,
      badge: 'Pakpattan Verification',
    },
    {
      title: '6 to 16 Month Installment Plans',
      desc: 'Flexible monthly tenure choices ranging from 6 months up to 16 months maximum.',
      icon: Calendar,
      badge: 'Flexible Plans',
    },
    {
      title: 'Pakpattan Doorstep Delivery',
      desc: 'Express doorstep delivery across Pakpattan City, Sahiwal Road, Arifwala & surrounding villages.',
      icon: Truck,
      badge: 'Fast Delivery',
    },
    {
      title: '100% Authentic & Warranty',
      desc: 'Direct brand inventory with official company warranties & official receipt.',
      icon: Award,
      badge: 'Brand Guaranteed',
    },
  ];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto font-sans">
      <div className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-blue-950/60 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-blue-400 text-xs font-black uppercase tracking-wider">
            Why Choose Babu Electronics?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Pakpattan's Preferred Installment Store
          </h2>
          <p className="text-xs text-slate-400">
            Providing transparent financing, genuine products, and trusted local service for over 10 years on Sahiwal Road.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-4 hover:border-blue-500/40 transition-all group"
              >
                <div className="flex justify-between items-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-white group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
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
