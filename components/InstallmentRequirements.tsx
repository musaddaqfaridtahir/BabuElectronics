'use client';

import React from 'react';
import { FileCheck, ShieldCheck, MapPin, Zap, CheckCircle2 } from 'lucide-react';

interface InstallmentRequirementsProps {
  compact?: boolean;
}

export default function InstallmentRequirements({ compact = false }: InstallmentRequirementsProps) {
  const requirements = [
    {
      title: 'Original CNIC Cards',
      urdu: 'اصل شناختی کارڈ',
      desc: 'Applicant CNIC along with 1 local Pakpattan guarantor CNIC copy.',
      icon: FileCheck,
    },
    {
      title: 'Electricity Bill Copy',
      urdu: 'بجلی کا بل',
      desc: 'Latest electricity utility bill copy of current Pakpattan residential address.',
      icon: Zap,
    },
    {
      title: 'Local Showroom Verification',
      urdu: 'شوروم تصدیق',
      desc: 'Quick 24-48 hour verification at our Sahiwal Road showroom.',
      icon: ShieldCheck,
    },
    {
      title: 'Advance on Delivery',
      urdu: 'ڈلیوری پر ایڈوانس',
      desc: 'Downpayment is paid physically upon delivery & item handover.',
      icon: CheckCircle2,
    },
  ];

  if (compact) {
    return (
      <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-3.5 space-y-2.5 font-sans">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <h4 className="text-xs font-black text-slate-900">
            Installment Requirements (ضروری دستاویزات)
          </h4>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
            <span>Customer + Guarantor CNIC</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
            <span>Electricity Bill Copy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
            <span>Pakpattan Residence</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
            <span>20% Downpayment on Delivery</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-8 sm:py-10 px-3 sm:px-6 max-w-7xl mx-auto font-sans">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 space-y-6 shadow-sm font-sans">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 shadow-xs">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Required Documents for Installment (اقساط کے لیے ضروری دستاویزات)
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Transparent, fair, and fast local financing with zero hidden costs.
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-[11px] uppercase tracking-wider shrink-0">
            Fast 24-48h Approval
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {requirements.map((req, idx) => {
            const Icon = req.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-2 hover:border-blue-300 hover:bg-white hover:shadow-xs transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-2xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-600">Step {idx + 1}</span>
                </div>

                <h4 className="text-xs font-black text-slate-900 pt-1">
                  {req.title} <span className="text-[11px] text-blue-600 block font-normal mt-0.5">{req.urdu}</span>
                </h4>

                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  {req.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-200/80 text-xs text-blue-950 font-medium">
          <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span>
            <strong>Showroom Physical Handover:</strong> All products are thoroughly inspected, assembled, and handed over at our official Babu Electronics showroom on Sahiwal Road, Pakpattan.
          </span>
        </div>
      </div>
    </section>
  );
}
