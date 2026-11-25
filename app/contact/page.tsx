'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import StickyWhatsApp from '@/components/StickyWhatsApp';
import StickyMobileNav from '@/components/StickyMobileNav';
import TrustBanner from '@/components/TrustBanner';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import StoreMap from '@/components/StoreMap';

export default function ContactPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  const ownerFacebookUrl = 'https://facebook.com/musaddaqfaridtahir';

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    const waText =
      `Store Inquiry - Babu Electronics Pakpattan:\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Subject: ${subject}\n` +
      `Message: ${message}`;

    const waUrl = `https://wa.me/923001122782?text=${encodeURIComponent(waText)}`;
    const newWindow = window.open(waUrl, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = waUrl;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white pb-20 md:pb-0">
      {/* Navbar */}
      <Navbar
        searchQuery=""
        onSearchChange={() => {}}
        selectedCategory="all"
        onCategorySelect={() => router.push('/')}
      />

      {/* Main Contact Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 space-y-8 sm:space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider border border-blue-200">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Store Location & Contact</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Contact Babu Electronics Pakpattan
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mx-auto">
            Visit our physical showroom on Sahiwal Road or connect directly for instant installment quotes, guarantor requirements, and live stock inquiries.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Store Location & Timings */}
          <div className="bg-white border border-slate-200/90 p-5 sm:p-6 rounded-3xl space-y-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">Showroom Address</h3>
              <p className="text-xs text-slate-600 font-bold mt-1">Sahiwal Road, Pakpattan, Punjab</p>
              <div className="flex items-center gap-1.5 text-xs text-slate-700 font-bold mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Sat - Thu: 9:00 AM - 9:00 PM (Friday Closed)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Click to Call */}
          <div className="bg-white border border-slate-200/90 p-5 sm:p-6 rounded-3xl space-y-3.5 shadow-2xs flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">Direct Phone Support</h3>
                <p className="text-sm text-slate-900 font-black mt-1">0300-4191281</p>
                <p className="text-[11px] text-slate-500 mt-1">Saturday to Thursday 9:00 AM - 9:00 PM for inquiries.</p>
              </div>
            </div>
            <a
              href="tel:+923004191281"
              className="w-full py-2.5 sm:py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl text-center shadow-xs transition-all active:scale-[0.98]"
            >
              Call 0300-4191281
            </a>
          </div>

          {/* Card 3: Click to WhatsApp */}
          <div className="bg-white border border-slate-200/90 p-5 sm:p-6 rounded-3xl space-y-3.5 shadow-2xs flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <WhatsAppIcon className="w-5 h-5" size={20} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">WhatsApp Sales Desk</h3>
                <p className="text-sm text-emerald-700 font-black mt-1">0300-1122782</p>
                <p className="text-[11px] text-slate-500 mt-1">Chat directly for installment calculations and document verification.</p>
              </div>
            </div>
            <a
              href="https://wa.me/923001122782?text=Assalam-o-Alaikum%20Babu%20Electronics!%20I%20want%20to%20inquire%20about%20cash%20and%20easy%20installment%20plans."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 sm:py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl text-center shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" size={15} />
              <span>Official WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Map & Inquiry Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Official Embedded Google Map Component */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 p-4 sm:p-6 rounded-3xl shadow-xs">
            <StoreMap showDetails={true} />
          </div>

          {/* Quick Inquiry Form */}
          <div className="lg:col-span-5 bg-white border border-slate-200/90 p-5 sm:p-6 rounded-3xl space-y-4 shadow-xs">
            <div className="space-y-1">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-600" />
                <span>Send WhatsApp Message</span>
              </h3>
              <p className="text-xs text-slate-500">Instantly pre-fills and opens WhatsApp with your questions.</p>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Usman Ali"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0300-1234567"
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Department / Product
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-bold"
                >
                  <option value="Motorbikes Installment">Motorbikes Installment</option>
                  <option value="Electric Scooter / EV">Electric Scooter / EV</option>
                  <option value="Refrigerator & Deep Freezer">Refrigerator & Deep Freezer</option>
                  <option value="Smart LED TV">Smart LED TV</option>
                  <option value="Inverter Air Conditioner">Inverter Air Conditioner</option>
                  <option value="Washing Machine">Washing Machine</option>
                  <option value="Smartphone / Mobile">Smartphone / Mobile</option>
                  <option value="Microwave Oven">Microwave Oven</option>
                  <option value="Water Dispenser">Water Dispenser</option>
                  <option value="Kitchen & Home Appliances">Kitchen & Home Appliances</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Inquiry Message *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Ask about downpayment rates, tenure duration, or guarantor process..."
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-xs shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" size={15} />
                <span>Send Message to WhatsApp</span>
              </button>
            </form>
          </div>
        </div>

        {/* Trust Banner */}
        <TrustBanner />
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-6 pb-28 sm:pb-8 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto text-center font-medium">
          <span>© 2026 Babu Electronics Pakpattan. </span>
          <a
            href={ownerFacebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 font-bold text-slate-700 transition-colors"
          >
            All Rights Reserved.
          </a>
        </div>
      </footer>

      <StickyWhatsApp />
      <StickyMobileNav />
    </div>
  );
}
