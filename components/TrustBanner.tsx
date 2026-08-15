'use client';

import React from 'react';
import { ShieldCheck, Truck, Award, Calendar } from 'lucide-react';

export default function TrustBanner() {
  const highlights = [
    {
      title: 'Local Guarantor System',
      desc: 'Quick Pakpattan local guarantor check with fast 24-48 hour approval.',
      icon: ShieldCheck,
      badge: 'Fast Approval',
    },
    {
      title: '6 to 16 Month Installment Plans',
      desc: 'Flexible monthly tenure choices ranging from 6 months up to 16 months maximum.',
      icon: Calendar,
      badge: 'Flexible Plans',
    },
    {
      title: 'Pakpattan Express Delivery',
      desc: 'Doorstep delivery across Pakpattan City, Sahiwal Road, Arifwala & surrounding areas.',
      icon: Truck,
      badge: 'Safe Delivery',
    },
    {
      title: '100% Authentic & Warranty',
      desc: 'Direct brand inventory with official company warranties & official store receipt.',
      icon: Award,
      badge: 'Brand Warranty',
    },
  ];

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto font-sans">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
        
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
            Why Choose Babu Electronics Pakpattan?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Pakpattan's Preferred Installment Store
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Providing transparent financing, genuine products, and trusted local service for over 10 years on Sahiwal Road.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 space-y-2.5 hover:border-slate-300 transition-all group"
              >
                <div className="flex justify-between items-center">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-red-600 shadow-2xs">
                    <Icon className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 uppercase">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">
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
