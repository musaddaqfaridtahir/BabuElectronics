'use client';

import React, { useState, useEffect } from 'react';
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
  Package,
  Layers,
} from 'lucide-react';

export interface CategoryItem {
  id?: string;
  name: string;
  slug: string;
  image?: string | null;
  _count?: {
    products: number;
  };
}

interface CategoryGridProps {
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
  categories?: CategoryItem[];
}

const categoryMetaMap: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    subtitle: string;
    badge: string;
    color: string;
    iconBg: string;
  }
> = {
  'motorbikes': {
    icon: Bike,
    subtitle: 'Honda, Yamaha, Super Star',
    badge: 'Popular',
    color: 'from-rose-500 to-red-600',
    iconBg: 'bg-red-50 text-red-600 border-red-200',
  },
  'electric-vehicles': {
    icon: Zap,
    subtitle: 'EV Scooters & Electric Bikes',
    badge: 'Eco Friendly',
    color: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
  'refrigerators': {
    icon: Refrigerator,
    subtitle: 'Haier, Dawlance, Orient',
    badge: 'Inverter',
    color: 'from-sky-500 to-blue-600',
    iconBg: 'bg-sky-50 text-sky-600 border-sky-200',
  },
  'leds-smart-tvs': {
    icon: Tv,
    subtitle: 'Orient, TCL 4K Smart TVs',
    badge: '4K Smart',
    color: 'from-indigo-500 to-purple-600',
    iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  },
  'air-conditioners': {
    icon: Wind,
    subtitle: 'Gree, Haier 1.5 Ton Inverter',
    badge: 'Heat & Cool',
    color: 'from-cyan-500 to-blue-600',
    iconBg: 'bg-cyan-50 text-cyan-600 border-cyan-200',
  },
  'washing-machines': {
    icon: WashingMachine,
    subtitle: 'Dawlance Fully Automatic',
    badge: 'Automatic',
    color: 'from-blue-500 to-indigo-600',
    iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  'mobiles': {
    icon: Smartphone,
    subtitle: 'Samsung, Redmi, Vivo, Oppo',
    badge: 'Official PTA',
    color: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
  },
  'microwave-ovens': {
    icon: Flame,
    subtitle: 'Solo, Grill & Convection',
    badge: 'Kitchen',
    color: 'from-orange-500 to-rose-600',
    iconBg: 'bg-orange-50 text-orange-600 border-orange-200',
  },
  'water-dispensers': {
    icon: Sparkles,
    subtitle: 'Orient 3-Tap Dispensers',
    badge: 'Cold & Hot',
    color: 'from-teal-500 to-emerald-600',
    iconBg: 'bg-teal-50 text-teal-600 border-teal-200',
  },
  'home-appliances': {
    icon: Sparkles,
    subtitle: 'Juicers, Blenders & Kitchen',
    badge: 'Appliances',
    color: 'from-purple-500 to-pink-600',
    iconBg: 'bg-purple-50 text-purple-600 border-purple-200',
  },
};

export default function CategoryGrid({
  activeCategory,
  onSelectCategory,
  categories,
}: CategoryGridProps) {
  const [categoriesList, setCategoriesList] = useState<CategoryItem[]>(categories || []);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategoriesList(categories);
    } else {
      fetch('/api/categories')
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setCategoriesList(data);
          }
        })
        .catch((e) => console.warn('Could not load categories in CategoryGrid:', e));
    }
  }, [categories]);

  return (
    <section id="categories-section" className="py-8 sm:py-12 px-3 sm:px-6 max-w-7xl mx-auto space-y-5 sm:space-y-6 font-sans scroll-mt-24">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-4 border-b border-slate-200/90 pb-3 sm:pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80 mb-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Store Departments</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Browse by Department
          </h2>
        </div>

        <p className="text-xs text-slate-500 max-w-xs font-medium hidden sm:block">
          Select any department to filter products available on easy 6 to 16 month installments.
        </p>
      </div>

      {/* Modern Responsive Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {categoriesList.map((cat) => {
          const meta = categoryMetaMap[cat.slug] || {
            icon: Package,
            subtitle: `${cat.name} on Installment`,
            badge: 'In Stock',
            color: 'from-blue-600 to-indigo-600',
            iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
          };
          const Icon = meta.icon;
          const isActive = activeCategory === cat.slug;

          return (
            <button
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className={`p-3.5 sm:p-5 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between space-y-3 group cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 border-slate-900 text-white shadow-lg shadow-blue-950/20 scale-[1.02]'
                  : 'bg-white border-slate-200/80 hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5 text-slate-800'
              }`}
            >
              <div className="flex justify-between items-start gap-1">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shrink-0 border ${
                    isActive
                      ? 'bg-white/10 text-white border-white/20'
                      : meta.iconBg
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <span
                  className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase truncate max-w-[80px] sm:max-w-none ${
                    isActive
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                      : 'bg-slate-100 text-slate-600 border border-slate-200/80'
                  }`}
                >
                  {meta.badge}
                </span>
              </div>

              <div>
                <h3 className={`text-xs sm:text-sm font-extrabold truncate ${isActive ? 'text-white' : 'text-slate-900 group-hover:text-blue-600 transition-colors'}`}>
                  {cat.name}
                </h3>
                <p className={`text-[10px] sm:text-xs truncate font-medium mt-0.5 ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>
                  {meta.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

    </section>
  );
}
