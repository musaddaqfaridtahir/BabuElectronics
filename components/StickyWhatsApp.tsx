'use client';

import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';

export default function StickyWhatsApp() {
  const whatsappUrl =
    'https://wa.me/923001122782?text=Assalam-o-Alaikum%20Babu%20Electronics!%20I%20want%20to%20inquire%20about%20cash%20and%20easy%20installment%20plans.';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Official Minimal WhatsApp Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Babu Electronics on Official WhatsApp"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-[#25D366]/40 border border-white/20 transition-all duration-300 hover:scale-110 relative group"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400" />
        </span>
        <WhatsAppIcon className="w-7 h-7 text-white" size={28} />
      </a>
    </div>
  );
}
