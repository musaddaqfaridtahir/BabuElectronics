'use client';

import React, { useState } from 'react';
import {
  X,
  CreditCard,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Product } from './ProductCard';
import WhatsAppIcon from './WhatsAppIcon';

interface InstallmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function InstallmentModal({ isOpen, onClose, product }: InstallmentModalProps) {
  if (!isOpen || !product) return null;

  const [customerName, setCustomerName] = useState('');
  const [cnic, setCnic] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [downpaymentPct, setDownpaymentPct] = useState<number>(20);
  const [tenure, setTenure] = useState<number>(product.durationMonths || 12);
  const [guarantorName, setGuarantorName] = useState('');
  const [guarantorPhone, setGuarantorPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState('');

  // Calculate downpayment and monthly installment
  const downpaymentAmount = Math.round((product.installmentPrice * downpaymentPct) / 100);
  const remaining = Math.max(0, product.installmentPrice - downpaymentAmount);
  const monthlyInstallment = tenure > 0 ? Math.round(remaining / tenure) : 0;

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
          `New Installment Application:\n` +
          `Name: ${customerName}\n` +
          `Product: ${product.title}\n` +
          `Downpayment: Rs. ${downpaymentAmount.toLocaleString()}\n` +
          `Tenure: ${tenure} Months\n` +
          `Monthly: Rs. ${monthlyInstallment.toLocaleString()}/mo\n` +
          `CNIC: ${cnic}\n` +
          `Phone: ${phone}\n` +
          `Address: ${address}\n` +
          `Guarantor: ${guarantorName || 'N/A'} (${guarantorPhone || 'N/A'})`;

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
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-[#0F172A] border border-slate-800 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="p-6 border-b border-slate-800/80 flex justify-between items-center sticky top-0 bg-[#0F172A] z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Online Installment Application</h3>
              <p className="text-[11px] text-slate-400">Database Save + Instant WhatsApp Redirect to 0300-1122782.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-white">Application Saved & WhatsApp Opened!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Your application for <strong className="text-white">{product.title}</strong> has been saved in the database for Admin review and opened in WhatsApp!
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-left space-y-1.5 text-slate-300 font-medium">
              <div>• <strong>Customer:</strong> {customerName} ({phone})</div>
              <div>• <strong>CNIC:</strong> {cnic}</div>
              <div>• <strong>Downpayment:</strong> Rs. {downpaymentAmount.toLocaleString()} ({downpaymentPct}%)</div>
              <div>• <strong>Tenure:</strong> {tenure} Months @ Rs. {monthlyInstallment.toLocaleString()} / mo</div>
              <div>• <strong>WhatsApp:</strong> 0300-1122782</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={whatsappRedirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" size={16} />
                <span>Re-open WhatsApp Chat</span>
              </a>

              <button
                onClick={onClose}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-xl border border-slate-800"
              >
                Close Modal
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold rounded-xl">
                {error}
              </div>
            )}

            {/* Selected Product Summary Box */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-14 h-14 rounded-xl object-contain border border-slate-800 bg-slate-900"
                />
                <div>
                  <div className="text-xs font-extrabold text-white line-clamp-1">{product.title}</div>
                  <div className="text-[11px] text-blue-400 font-bold mt-0.5">
                    Installment Price: Rs. {product.installmentPrice?.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Downpayment & Tenure Selection (6 to 16 Months) */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Selected Downpayment Percentage:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[20, 30, 40, 50].map((pct) => (
                    <button
                      type="button"
                      key={pct}
                      onClick={() => setDownpaymentPct(pct)}
                      className={`py-2 rounded-xl text-xs font-extrabold transition-all ${
                        downpaymentPct === pct
                          ? 'bg-blue-600 text-white shadow-md font-black'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {pct}% Down
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-emerald-400 mt-1.5 font-bold">
                  Calculated Downpayment: Rs. {downpaymentAmount.toLocaleString()}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Tenure Duration (6 to 16 Months):</label>
                <div className="grid grid-cols-6 gap-2">
                  {[6, 8, 10, 12, 14, 16].map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setTenure(m)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        tenure === m
                          ? 'bg-blue-600 text-white shadow-md font-black'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {m} Mo
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Monthly Installment Breakdown:</span>
                <span className="text-lg font-black text-blue-400">
                  Rs. {monthlyInstallment.toLocaleString()} / mo
                </span>
              </div>
            </div>

            {/* Customer Information Inputs */}
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                1. Customer Details (Pakpattan & Nearby Areas)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Muhammad Ali"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">CNIC Number *</label>
                  <input
                    type="text"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    placeholder="35202-XXXXXXX-X"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Home Address *</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Sahiwal Road, Pakpattan"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Guarantor Details */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
                2. Local Guarantor Verification
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Guarantor Name</label>
                  <input
                    type="text"
                    value={guarantorName}
                    onChange={(e) => setGuarantorName(e.target.value)}
                    placeholder="Guarantor Full Name"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Guarantor Phone</label>
                  <input
                    type="tel"
                    value={guarantorPhone}
                    onChange={(e) => setGuarantorPhone(e.target.value)}
                    placeholder="Guarantor Mobile #"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800/80 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-7 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black text-xs rounded-xl shadow-lg shadow-blue-600/25 flex items-center gap-2"
              >
                {loading ? (
                  <span>Submitting & Redirecting...</span>
                ) : (
                  <>
                    <span>Submit & Open WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
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
