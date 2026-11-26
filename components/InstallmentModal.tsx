'use client';

import React, { useState } from 'react';
import {
  X,
  CreditCard,
  CheckCircle2,
  Phone,
  User,
  MapPin,
  FileText,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { Product } from './ProductCard';
import WhatsAppIcon from './WhatsAppIcon';
import InstallmentRequirements from './InstallmentRequirements';
import { calculateInstallmentPlan } from '@/lib/installments';

interface InstallmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  initialColor?: string;
}

export default function InstallmentModal(props: InstallmentModalProps) {
  if (!props.isOpen || !props.product) return null;
  return <InstallmentModalInner key={props.product.id} {...props} product={props.product} />;
}

function InstallmentModalInner({
  onClose,
  product,
  initialColor,
}: Omit<InstallmentModalProps, 'product'> & { product: Product }) {
  // Extract available colors from product specs if available
  let availableColors: string[] = ['Standard / Default'];
  if (product.specsJson) {
    try {
      const specs = JSON.parse(product.specsJson);
      const colorKey = Object.keys(specs).find((k) =>
        k.toLowerCase().includes('color')
      );
      if (colorKey && specs[colorKey]) {
        availableColors = specs[colorKey]
          .split(',')
          .map((c: string) => c.trim())
          .filter(Boolean);
      }
    } catch (e) {}
  }
  if (availableColors.length === 0 || (availableColors.length === 1 && availableColors[0] === 'Standard / Default')) {
    const titleLower = product.title.toLowerCase();
    if (titleLower.includes('honda') || titleLower.includes('metro') || titleLower.includes('bike') || titleLower.includes('ev')) {
      availableColors = ['Red (سرخ)', 'Black (سیاہ)', 'Blue (نیلا)'];
    } else if (titleLower.includes('dawlance') || titleLower.includes('haier') || titleLower.includes('refrigerator')) {
      availableColors = ['Burgundy Red', 'Metallic Silver', 'Inox Grey', 'Glass Black'];
    } else if (titleLower.includes('vivo') || titleLower.includes('infinix') || titleLower.includes('tecno') || titleLower.includes('mobile')) {
      availableColors = ['Stellar Silver', 'Moonlight White', 'Noble Black', 'Crystal Blue'];
    }
  }

  const isMobile =
    product.category?.slug === 'mobiles' ||
    (product as any)?.categorySlug === 'mobiles' ||
    product.title.toLowerCase().includes('vivo') ||
    product.title.toLowerCase().includes('infinix') ||
    product.title.toLowerCase().includes('tecno');

  const tenureOptions = isMobile ? [6, 8, 10] : [6, 8, 10, 12, 14, 16];

  const [customerName, setCustomerName] = useState('');
  const [cnic, setCnic] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [downpaymentPct, setDownpaymentPct] = useState<number>(30);
  const [tenure, setTenure] = useState<number>(
    isMobile ? Math.min(10, product.durationMonths || 10) : product.durationMonths || 12
  );
  const [guarantorName, setGuarantorName] = useState('');
  const [guarantorPhone, setGuarantorPhone] = useState('');
  const [selectedColor, setSelectedColor] = useState<string>(
    initialColor || availableColors[0] || 'Standard'
  );

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');

  // Calculate downpayment and monthly installment via shared financial engine
  const plan = calculateInstallmentPlan(product, {
    customDownpaymentPct: downpaymentPct,
    customTenureMonths: tenure,
    isMobile,
  });
  const downpaymentAmount = plan.downpaymentAmount;
  const monthlyInstallment = plan.monthlyPayment;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!customerName || !cnic || !phone || !address) {
      setError('Please fill in all required fields (Name, CNIC, Phone, Address).');
      setLoading(false);
      return;
    }

    try {
      // 1. Save application record in SQLite Database
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          cnic,
          phone,
          address,
          productId: product.id,
          selectedDownpayment: downpaymentAmount,
          selectedTenure: tenure,
          guarantorName,
          guarantorPhone,
        }),
      });

      if (res.ok) {
        // 2. Format exact WhatsApp message for 03001122782
        const waText =
          `*New Installment Application - Babu Electronics*\n` +
          `-----------------------------------\n` +
          `*Product:* ${product.title}\n` +
          `*Preferred Color:* ${selectedColor}\n` +
          `*Advance Downpayment:* Rs. ${downpaymentAmount.toLocaleString()} (${downpaymentPct}%)\n` +
          `*Tenure:* ${tenure} Months\n` +
          `*Monthly Installment:* Rs. ${monthlyInstallment.toLocaleString()}/mo\n` +
          `-----------------------------------\n` +
          `*Customer Name:* ${customerName}\n` +
          `*CNIC:* ${cnic}\n` +
          `*Phone:* ${phone}\n` +
          `*Address:* ${address}\n` +
          `*Guarantor:* ${guarantorName || 'N/A'} (${guarantorPhone || 'N/A'})\n` +
          `-----------------------------------\n` +
          `Please confirm my application details.`;

        const waUrl = `https://wa.me/923001122782?text=${encodeURIComponent(waText)}`;
        setWhatsappRedirectUrl(waUrl);
        setSuccess(true);

        // Instant WhatsApp open
        if (typeof window !== 'undefined') {
          window.open(waUrl, '_blank');
        }
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to submit application.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto font-sans animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl max-w-xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
        
        {/* Header (Sticky at top of modal) */}
        <div className="p-4 sm:p-5 border-b border-slate-200/90 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-black text-slate-900 truncate">
                Installment Application
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                Instant WhatsApp Quote & Fast Store Verification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl bg-slate-100 hover:bg-slate-200 shrink-0 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {success ? (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xl sm:text-2xl font-black text-slate-900">Application Submitted!</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Your application for <strong className="text-slate-900">{product.title}</strong> has been saved and forwarded to our sales team via WhatsApp.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-left space-y-1.5 text-slate-700 font-medium">
              <div>• <strong>Customer:</strong> {customerName} ({phone})</div>
              <div>• <strong>CNIC:</strong> {cnic}</div>
              <div>• <strong>Advance Downpayment:</strong> Rs. {downpaymentAmount.toLocaleString()} ({downpaymentPct}%)</div>
              <div>• <strong>Tenure:</strong> {tenure} Months @ Rs. {monthlyInstallment.toLocaleString()} / mo</div>
              <div>• <strong>Store WhatsApp:</strong> 0300-1122782</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <a
                href={whatsappRedirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-slate-900 hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" size={15} />
                <span>Open in WhatsApp (0300-1122782)</span>
              </a>

              <button
                onClick={onClose}
                className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl">
                {error}
              </div>
            )}

            {/* Selected Product Card Summary */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center gap-3">
              <img
                src={product.imageUrl}
                alt={product.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/logo.png';
                }}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-contain bg-white border border-slate-200 shrink-0 p-1"
              />
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-black text-slate-900 line-clamp-1">{product.title}</div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Cash: Rs. {product.cashPrice?.toLocaleString()} • Total Plan: <strong className="text-slate-900">Rs. {plan.totalInstallmentPrice.toLocaleString()}</strong> ({plan.markupRatePercentage}% Markup)
                </div>
              </div>
            </div>

            {/* Downpayment & Tenure Controls (Mobile Optimized Grid) */}
            <div className="bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-200 space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Select Advance Downpayment (Minimum 30%):
                </label>
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {[30, 35, 40, 50].map((pct) => (
                    <button
                      type="button"
                      key={pct}
                      onClick={() => setDownpaymentPct(pct)}
                      className={`py-2 rounded-xl text-xs font-black transition-all ${
                        downpaymentPct === pct
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
                <div className="flex justify-between items-center text-[11px] text-blue-600 mt-1.5 font-bold">
                  <span>Calculated Advance: Rs. {downpaymentAmount.toLocaleString()}</span>
                  <span className="text-slate-500 text-[10px] font-semibold">{plan.markupRatePercentage}% Tiered Financing</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Tenure Duration ({isMobile ? 'Max 10 Months for Mobiles' : '6 to 16 Months'}):
                </label>
                {/* 3 columns on mobile, 6 on desktop so buttons never overflow */}
                <div className={`grid gap-1.5 sm:gap-2 ${isMobile ? 'grid-cols-3' : 'grid-cols-3 sm:grid-cols-6'}`}>
                  {tenureOptions.map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setTenure(m)}
                      className={`py-2 rounded-xl text-xs font-black transition-all ${
                        tenure === m
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {m} Mo
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-600 font-medium block">Total Plan Value:</span>
                  <strong className="text-slate-900 font-extrabold text-xs">Rs. {plan.totalInstallmentPrice.toLocaleString()}</strong>
                </div>
                <div className="text-right">
                  <span className="text-slate-600 font-medium block">Monthly Installment:</span>
                  <span className="text-base sm:text-lg font-black text-blue-600">
                    Rs. {monthlyInstallment.toLocaleString()} / mo
                  </span>
                </div>
              </div>
            </div>

            {/* Color Preference Option */}
            {availableColors.length > 0 && (
              <div className="bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-[11px] font-bold">
                  <span className="text-slate-700 uppercase tracking-wider">Select Product Color / رنگ کا انتخاب:</span>
                  <span className="text-blue-600 font-extrabold">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {availableColors.map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setSelectedColor(col)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        selectedColor === col
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs ring-2 ring-blue-500/30'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Reusable Requirements Checklist */}
            <InstallmentRequirements compact />

            {/* Customer Inputs */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                Customer Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Muhammad Ali"
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CNIC Number *</label>
                  <input
                    type="text"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    placeholder="35202-XXXXXXX-X"
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Living Address in Pakpattan *</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Mohallah / Street / Village"
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Guarantor Name (Optional)</label>
                  <input
                    type="text"
                    value={guarantorName}
                    onChange={(e) => setGuarantorName(e.target.value)}
                    placeholder="Local guarantor name"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Guarantor Phone</label>
                  <input
                    type="tel"
                    value={guarantorPhone}
                    onChange={(e) => setGuarantorPhone(e.target.value)}
                    placeholder="0300-XXXXXXX"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Form Action Submit Button */}
            <div className="pt-2 pb-8 sm:pb-5">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-xs shadow-blue-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Submit & Proceed to WhatsApp (0300-1122782)</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
