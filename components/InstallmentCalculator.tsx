'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, CreditCard, ArrowRight, Info, Percent } from 'lucide-react';
import { Product } from './ProductCard';

interface CalculatorProps {
  products: Product[];
  onSelectProductForInstallment: (product: Product) => void;
}

export default function InstallmentCalculator({
  products,
  onSelectProductForInstallment,
}: CalculatorProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [downpaymentPct, setDownpaymentPct] = useState<number>(20);
  const [tenureMonths, setTenureMonths] = useState<number>(12);

  useEffect(() => {
    if (products.length > 0 && !selectedProductId) {
      setSelectedProductId(products[0].id);
    }
  }, [products, selectedProductId]);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0] || null;
  const totalPrice = selectedProduct ? selectedProduct.cashPrice : 250000;

  // Formula Calculations with Exact 30% Markup Rule on Items < 100k
  const downpaymentAmount = Math.round((totalPrice * downpaymentPct) / 100);
  const financedPrincipal = Math.max(0, totalPrice - downpaymentAmount);
  
  // Rule: 30% markup flat for items under 100k, 20% for items 100k and above
  const isUnder100k = totalPrice < 100000;
  const markupRatePercentage = isUnder100k ? 30 : 20;
  const markupAmount = Math.round(financedPrincipal * (markupRatePercentage / 100));
  const totalFinancedAmount = financedPrincipal + markupAmount;
  
  const monthlyPayment = tenureMonths > 0 ? Math.round(totalFinancedAmount / tenureMonths) : 0;

  const tenureOptions = [6, 12, 16];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto font-sans">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 mb-1">
              <Calculator className="w-3.5 h-3.5 text-red-600" />
              <span>Installment Calculator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Calculate Monthly Payment
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Customize downpayment percentage and tenure duration for any product.
            </p>
          </div>

          {selectedProduct && (
            <button
              onClick={() => onSelectProductForInstallment(selectedProduct)}
              className="flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-all"
            >
              <CreditCard className="w-4 h-4 fill-white" />
              <span>Apply for {selectedProduct.title.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Controls & Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Step 1: Product Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                1. Select Product Model:
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-red-600 font-bold"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} - Cash: Rs. {p.cashPrice.toLocaleString()} {p.cashPrice < 100000 ? '(30% Markup Rate)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Downpayment Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-slate-700">2. Downpayment Percentage:</span>
                <span className="text-red-600 font-black text-sm">{downpaymentPct}% (Rs. {downpaymentAmount.toLocaleString()})</span>
              </div>
              <input
                type="range"
                min={15}
                max={50}
                step={5}
                value={downpaymentPct}
                onChange={(e) => setDownpaymentPct(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] sm:text-xs text-slate-400 font-bold mt-1">
                <span>15% Min</span>
                <span>25% Standard</span>
                <span>50% Max</span>
              </div>
            </div>

            {/* Step 3: Tenure Options (6, 12, 16 Months) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                3. Tenure Duration:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {tenureOptions.map((m) => (
                  <button
                    key={m}
                    onClick={() => setTenureMonths(m)}
                    className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                      tenureMonths === m
                        ? 'bg-slate-900 text-white border-slate-900 font-black'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
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
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <span className="text-xs text-slate-700 font-bold uppercase tracking-wider block">
                  Estimated Breakdown
                </span>
                {isUnder100k && (
                  <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200 font-bold text-[10px] flex items-center gap-1 uppercase">
                    <Percent className="w-3 h-3" /> 30% Markup
                  </span>
                )}
              </div>

              <div className="space-y-2.5 font-medium text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Item Cash Price:</span>
                  <span className="text-slate-900 font-bold">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Initial Downpayment ({downpaymentPct}%):</span>
                  <span className="text-red-600 font-bold">Rs. {downpaymentAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Store Markup ({markupRatePercentage}%):</span>
                  <span className="text-slate-900 font-bold">+ Rs. {markupAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span>Total Financed Amount:</span>
                  <span className="text-slate-900 font-black">Rs. {totalFinancedAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Selected Tenure:</span>
                  <span className="text-slate-900 font-bold">{tenureMonths} Months</span>
                </div>
              </div>

              {/* Monthly Payment Highlight Box */}
              <div className="p-3.5 bg-white border border-slate-200 rounded-xl text-center space-y-0.5">
                <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">
                  Monthly Installment
                </span>
                <div className="text-2xl font-black text-slate-900">
                  Rs. {monthlyPayment.toLocaleString()} <span className="text-xs text-slate-500 font-normal">/ month</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-500">
                <Info className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>
                  Items under Rs. 100,000 feature a 30% markup rate. Final terms confirmed at Sahiwal Road store upon CNIC verification.
                </span>
              </div>

              {selectedProduct && (
                <button
                  onClick={() => onSelectProductForInstallment(selectedProduct)}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-all"
                >
                  Apply Online Now
                </button>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
