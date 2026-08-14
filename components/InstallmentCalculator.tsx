'use client';

import React, { useState } from 'react';
import { Calculator, CreditCard, ArrowRight } from 'lucide-react';
import { Product } from './ProductCard';

interface CalculatorProps {
  products: Product[];
  onSelectProductForInstallment: (product: Product) => void;
}

export default function InstallmentCalculator({
  products,
  onSelectProductForInstallment,
}: CalculatorProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [customPrice, setCustomPrice] = useState<number>(250000);
  const [downpaymentPct, setDownpaymentPct] = useState<number>(20);
  const [tenureMonths, setTenureMonths] = useState<number>(12);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || null;
  const totalPrice = selectedProduct ? selectedProduct.installmentPrice : customPrice;

  const downpaymentAmount = Math.round((totalPrice * downpaymentPct) / 100);
  const remainingBalance = Math.max(0, totalPrice - downpaymentAmount);
  const monthlyPayment = tenureMonths > 0 ? Math.round(remainingBalance / tenureMonths) : 0;

  const tenureOptions = [6, 8, 10, 12, 14, 16];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto font-sans">
      <div className="bg-gradient-to-br from-slate-900 via-[#0F172A] to-slate-950 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl space-y-8 relative overflow-hidden">
        {/* Glowing Background */}
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/10 text-blue-400 text-[11px] font-extrabold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Pakpattan Installment Calculator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Calculate Monthly Payment (6 to 16 Months)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select any item to adjust downpayment and tenure from 6 up to 16 months maximum.
            </p>
          </div>

          {selectedProduct && (
            <button
              onClick={() => onSelectProductForInstallment(selectedProduct)}
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black text-xs rounded-xl shadow-lg shadow-blue-600/25 transition-all"
            >
              <CreditCard className="w-4 h-4 fill-white" />
              <span>Apply for {selectedProduct.title.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Calculator Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Product Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Select Product Model:
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} - Rs. {p.installmentPrice.toLocaleString()} Total
                  </option>
                ))}
              </select>
            </div>

            {/* Downpayment Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <span className="text-slate-300">Downpayment Percentage:</span>
                <span className="text-blue-400 font-black text-sm">{downpaymentPct}% (Rs. {downpaymentAmount.toLocaleString()})</span>
              </div>
              <input
                type="range"
                min={15}
                max={50}
                step={5}
                value={downpaymentPct}
                onChange={(e) => setDownpaymentPct(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-1">
                <span>15% Min</span>
                <span>25% Standard</span>
                <span>50% Max</span>
              </div>
            </div>

            {/* Duration / Tenure Tabs (6 to 16 Months) */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Tenure Duration (6 to 16 Months Max):
              </label>
              <div className="grid grid-cols-6 gap-2">
                {tenureOptions.map((m) => (
                  <button
                    key={m}
                    onClick={() => setTenureMonths(m)}
                    className={`py-3 rounded-xl text-xs font-bold transition-all ${
                      tenureMonths === m
                        ? 'bg-blue-600 text-white shadow-md font-black scale-105'
                        : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-900'
                    }`}
                  >
                    {m} Mo
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-inner">
              <span className="text-[10px] text-blue-400 uppercase tracking-wider font-extrabold block">
                Estimated Payment Breakdown
              </span>

              <div className="space-y-3 font-semibold text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Total Item Price:</span>
                  <span className="text-white font-bold">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Initial Downpayment ({downpaymentPct}%):</span>
                  <span className="text-emerald-400 font-bold">Rs. {downpaymentAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Financed Amount:</span>
                  <span className="text-slate-200">Rs. {remainingBalance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Selected Tenure:</span>
                  <span className="text-white font-bold">{tenureMonths} Months</span>
                </div>
              </div>

              {/* Monthly Installment Highlight Box */}
              <div className="p-4 bg-blue-600/10 border border-blue-500/30 rounded-2xl text-center space-y-1">
                <span className="text-[11px] text-blue-400 font-bold block uppercase tracking-wider">
                  Monthly Installment Amount
                </span>
                <div className="text-3xl font-black text-blue-400">
                  Rs. {monthlyPayment.toLocaleString()} <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
              </div>

              {selectedProduct && (
                <button
                  onClick={() => onSelectProductForInstallment(selectedProduct)}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4 fill-white" />
                  <span>Apply Online for {selectedProduct.title.split(' ')[0]}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
