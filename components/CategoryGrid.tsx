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
  Droplet,
  Coffee,
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
      subtitle: 'Honda, Yamaha, Suzuki',
      icon: Bike,
      badge: 'Popular',
    },
    {
      title: 'Electric Vehicles',
      slug: 'electric-vehicles',
      subtitle: 'EV Scooters & Bikes',
      icon: Zap,
      badge: 'Eco-Friendly',
    },
    {
      title: 'Refrigerators & Freezers',
      slug: 'refrigerators',
      subtitle: 'Dawlance, Haier, Orient',
      icon: Refrigerator,
      badge: 'Inverter',
    },
    {
      title: 'LEDs & Smart TVs',
      slug: 'leds',
      subtitle: '32" to 75" 4K Smart TVs',
      icon: Tv,
      badge: 'Google TV',
    },
    {
      title: 'Air Conditioners',
      slug: 'acs',
      subtitle: '1.0Ton, 1.5Ton & 2.0Ton ACs',
      icon: Wind,
      badge: 'Heat & Cool',
    },
    {
      title: 'Washing Machines',
      slug: 'washing-machines',
      subtitle: 'Automatic & Semi-Auto',
      icon: WashingMachine,
      badge: 'Top/Front Load',
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
    {
      title: 'Water Dispensers',
      slug: 'water-dispensers',
      subtitle: '3 Tap Hot & Cold Dispensers',
      icon: Droplet,
      badge: 'Glass Door',
    },
    {
      title: 'Kitchen & Home Appliances',
      slug: 'home-appliances',
      subtitle: 'Juicers, Irons, Food Factories',
      icon: Coffee,
      badge: 'Multi-Function',
    },
  ];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/10 text-blue-400 text-[11px] font-extrabold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product Categories</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Browse Electronics & Vehicles
          </h2>
        </div>

        <p className="text-xs text-slate-400 max-w-xs">
          Select any category below to filter available products in Pakpattan on 6-16 month installment plans.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {categoryCards.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.slug;

          return (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`p-5 rounded-3xl border transition-all duration-300 text-left flex flex-col justify-between space-y-4 group relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 border-blue-400 text-white shadow-xl shadow-blue-600/25 scale-[1.02]'
                  : 'bg-slate-900/90 border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 text-slate-300'
              }`}
            >
              <div className="flex justify-between items-start">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-600/10 border border-blue-500/20 text-blue-400'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <span
                  className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                    isActive
                      ? 'bg-white/20 text-white border-white/30'
                      : 'bg-slate-950 text-slate-400 border-slate-800'
                  }`}
                >
                  {cat.badge}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5 font-medium">
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
