'use client';

import React from 'react';
import {
  Bike,
  Zap,
  Refrigerator,
  Tv,
  Wind,
  WashingMachine,
  Smartphone,
  Flame,
  Sparkles,
} from 'lucide-react';

interface CategoryGridProps {
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
}

export default function CategoryGrid({ activeCategory, onSelectCategory }: CategoryGridProps) {
  const categoryCards = [
    {
      title: 'Motorbikes',
      slug: 'motorbikes',
      subtitle: 'Honda 125, Super Star, Yamaha',
      icon: Bike,
      badge: 'Popular',
    },
    {
      title: 'Electric Vehicles',
      slug: 'electric-vehicles',
      subtitle: 'EV Scooters & Electric Bikes',
      icon: Zap,
      badge: 'Eco-Friendly',
    },
    {
      title: 'Refrigerators & Freezers',
      slug: 'refrigerators',
      subtitle: 'Haier, Dawlance, Orient',
      icon: Refrigerator,
      badge: 'Inverter Pro',
    },
    {
      title: 'LEDs & Smart TVs',
      slug: 'leds',
      subtitle: 'Orient, TCL 4K Smart TVs',
      icon: Tv,
      badge: 'Android 4K',
    },
    {
      title: 'Air Conditioners',
      slug: 'acs',
      subtitle: 'Gree, Haier 1.5 Ton Inverter ACs',
      icon: Wind,
      badge: 'Heat & Cool',
    },
    {
      title: 'Washing Machines',
      slug: 'washing-machines',
      subtitle: 'Dawlance Fully Automatic',
      icon: WashingMachine,
      badge: 'Top Load',
    },
    {
      title: 'Mobiles & Tablets',
      slug: 'mobiles',
      subtitle: 'Samsung, Redmi, Vivo, Oppo',
      icon: Smartphone,
      badge: 'Official PTA',
    },
    {
      title: 'Microwave Ovens',
      slug: 'microwave-ovens',
      subtitle: 'Solo, Grill & Convection',
      icon: Flame,
      badge: 'Kitchen Essential',
    },
  ];

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto space-y-6 font-sans">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>Product Categories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Browse Inventory
          </h2>
        </div>

        <p className="text-xs text-slate-500 max-w-xs font-medium">
          Select any category to view available stock on 6 to 16 month installment plans.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {categoryCards.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.slug;

          return (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`p-4 rounded-2xl border transition-all duration-200 text-left flex flex-col justify-between space-y-3 group ${
                isActive
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm scale-[1.01]'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 shadow-2xs'
              }`}
            >
              <div className="flex justify-between items-start">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-md border uppercase ${
                    isActive
                      ? 'bg-white/20 text-white border-white/30'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}
                >
                  {cat.badge}
                </span>
              </div>

              <div>
                <h3 className={`font-bold text-sm line-clamp-1 ${isActive ? 'text-white' : 'text-slate-900 group-hover:text-red-600'}`}>
                  {cat.title}
                </h3>
                <p className={`text-[10px] line-clamp-1 mt-0.5 font-medium ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                  {cat.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
