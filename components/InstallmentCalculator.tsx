'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, CreditCard, ArrowRight, Info, Percent, Sparkles } from 'lucide-react';
import { Product } from './ProductCard';
import { calculateInstallmentPlan } from '@/lib/installments';

interface CalculatorProps {
  products: Product[];
  onSelectProductForInstallment: (product: Product) => void;
}

export default function InstallmentCalculator({
  products,
  onSelectProductForInstallment,
}: CalculatorProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [downpaymentPct, setDownpaymentPct] = useState<number>(30);
  const [tenureMonths, setTenureMonths] = useState<number>(12);

  useEffect(() => {
    if (products.length > 0 && !selectedProductId) {
      setSelectedProductId(products[0].id);
    }
  }, [products, selectedProductId]);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0] || null;
  const plan = calculateInstallmentPlan(
    selectedProduct || { cashPrice: 250000, durationMonths: 12 },
    {
      customDownpaymentPct: downpaymentPct,
      customTenureMonths: tenureMonths,
    }
  );

  const totalPrice = plan.cashPrice;
  const downpaymentAmount = plan.downpaymentAmount;
  const markupRatePercentage = plan.markupRatePercentage;
  const markupAmount = plan.markupAmount;
  const monthlyPayment = plan.monthlyPayment;

  const tenureOptions = [6, 8, 10, 12, 14, 16];

  return (
    <section className="py-10 sm:py-14 px-3 sm:px-6 max-w-7xl mx-auto font-sans">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/90 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80 mb-1.5">
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              <span>Smart Financial Planner</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Calculate Monthly Installments
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              Select product model, downpayment percentage, and tenure duration (6–16 months).
            </p>
          </div>

          {selectedProduct && (
            <button
              onClick={() => onSelectProductForInstallment(selectedProduct)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-[0.98] cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              <span>Apply for {selectedProduct.title.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Controls & Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Product Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                1. Select Product Model:
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 font-bold transition-all"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} — Cash: Rs. {p.cashPrice.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Downpayment Slider */}
            <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-800">2. Downpayment Percentage:</span>
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 font-black text-sm">
                  {downpaymentPct}% (Rs. {downpaymentAmount.toLocaleString()})
                </span>
              </div>
              <input
                type="range"
                min={30}
                max={60}
                step={5}
                value={downpaymentPct}
                onChange={(e) => setDownpaymentPct(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-bold">
                <span>30% Minimum Advance</span>
                <span>40% Standard</span>
                <span>60% Maximum Advance</span>
              </div>
            </div>

            {/* Step 3: Tenure Options (6 to 16 Months) */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                3. Choose Installment Duration (6 to 16 Months):
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {tenureOptions.map((m) => (
                  <button
                    key={m}
                    onClick={() => setTenureMonths(m)}
                    className={`py-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      tenureMonths === m
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 font-black shadow-md shadow-blue-500/20 scale-[1.02]'
                        : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    {m} Months
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Breakdown Summary Column */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-6 rounded-3xl border border-slate-800 space-y-5 shadow-xl relative overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs text-slate-300 font-extrabold uppercase tracking-wider block">
                  Plan Breakdown
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 font-bold text-[10px] flex items-center gap-1 uppercase">
                  <Percent className="w-3 h-3" /> {markupRatePercentage}% Markup Tier
                </span>
              </div>

              <div className="space-y-3 font-medium text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Product Cash Price:</span>
                  <span className="text-white font-bold">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Advance Downpayment ({downpaymentPct}%):</span>
                  <span className="text-blue-300 font-bold">Rs. {downpaymentAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tiered Financing Cost:</span>
                  <span className="text-emerald-400 font-bold">+ Rs. {markupAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-white/10">
                  <span className="font-bold text-white">Total Plan Price:</span>
                  <span className="text-white font-black text-sm">Rs. {plan.totalInstallmentPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Selected Tenure:</span>
                  <span className="text-blue-300 font-bold">{tenureMonths} Months</span>
                </div>
              </div>

              {/* Monthly Payment Highlight Box */}
              <div className="p-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl text-center space-y-0.5">
                <span className="text-[10px] text-blue-200 font-bold block uppercase tracking-wider">
                  Monthly Installment
                </span>
                <div className="text-2xl sm:text-3xl font-black text-amber-300">
                  Rs. {monthlyPayment.toLocaleString()} <span className="text-xs text-slate-300 font-medium">/ month</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-white/5 rounded-xl border border-white/10 text-[11px] text-slate-300">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Exact rates verified on Sahiwal Road showroom with valid CNIC and local Pakpattan guarantor.
                </span>
              </div>

              {selectedProduct && (
                <button
                  onClick={() => onSelectProductForInstallment(selectedProduct)}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
                >
                  Apply Online for this Plan
                </button>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
