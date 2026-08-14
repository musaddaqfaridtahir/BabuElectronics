'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import StickyWhatsApp from '@/components/StickyWhatsApp';
import TrustBanner from '@/components/TrustBanner';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  Building2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import FacebookIcon from '@/components/FacebookIcon';

export default function ContactPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');

  const storeFacebookUrl = 'https://facebook.com/BabuElectronicsCenter';
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
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Navbar */}
      <Navbar
        searchQuery=""
        onSearchChange={() => {}}
        selectedCategory="all"
        onCategorySelect={() => router.push('/')}
      />

      {/* Main Contact Container */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/10 text-blue-400 text-xs font-black uppercase tracking-wider border border-blue-500/20">
            <Building2 className="w-4 h-4" />
            <span>Store Location & Contact</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contact Babu Electronics Pakpattan
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm font-medium leading-relaxed">
            Visit our store on Sahiwal Road or reach out directly for instant installment quotes, local guarantor verifications, and product availability.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Store Location & Timings */}
          <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl space-y-4 shadow-xl hover:border-blue-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Store Address & Timings</h3>
              <p className="text-xs text-slate-300 font-bold mt-1">Sahiwal Road, Pakpattan, Punjab</p>
              <div className="flex items-center gap-1.5 text-xs text-blue-400 font-bold mt-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <Clock className="w-4 h-4" />
                <span>Sat - Thu: 9:00 AM - 9:00 PM (Friday Closed)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Click to Call */}
          <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl space-y-4 shadow-xl hover:border-blue-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Phone className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Phone Support</h3>
                <p className="text-xs text-slate-300 font-bold mt-1">0311-122125 | 0300-4191281</p>
                <p className="text-[11px] text-slate-400 mt-1">Saturday to Thursday 9:00 AM - 9:00 PM for inquiries.</p>
              </div>
            </div>
            <a
              href="tel:0311122125"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl text-center shadow-lg transition-all"
            >
              Click to Call 0311-122125 / 0300-4191281
            </a>
          </div>

          {/* Card 3: Click to WhatsApp */}
          <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl space-y-4 shadow-xl hover:border-[#25D366]/40 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                <WhatsAppIcon className="w-6 h-6 text-[#25D366]" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">WhatsApp Assistance</h3>
                <p className="text-xs text-emerald-400 font-extrabold mt-1">0300-1122782</p>
                <p className="text-[11px] text-slate-400 mt-1">Direct WhatsApp support for installment calculations.</p>
              </div>
            </div>
            <a
              href="https://wa.me/923001122782?text=Hi%20Babu%20Electronics%20Pakpattan%2C%20I%20want%20to%20inquire%20about%20installment%20plans."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs rounded-xl text-center shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" size={16} />
              <span>Official WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Map & Inquiry Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Official Embedded Google Map */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>Babu Electronics Location Map</span>
              </h3>
              <span className="text-xs text-blue-400 font-bold">Sahiwal Road Store</span>
            </div>

            <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <iframe
                title="Babu Electronics Google Maps Embed"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13774.260295116237!2d73.38265809999999!3d30.33488665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393d599afc108301%3A0x51c4aeeec29d901f!2sBabu%20Electronics!5e0!3m2!1sen!2s!4v1786695379326!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-blue-400" />
                <span>Send Quick Message</span>
              </h3>
              <p className="text-xs text-slate-400">Directly dispatches your inquiry to our WhatsApp team (0300-1122782).</p>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Usman Ali"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Phone / WhatsApp Number *
                </label>
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
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Product Category / Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-bold"
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
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Inquiry Message *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Ask about downpayment rates, monthly plan duration (6 to 16 months), or local Pakpattan guarantor process..."
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" size={16} />
                <span>Send Message to Official WhatsApp</span>
              </button>
            </form>
          </div>
        </div>

        {/* Trust Banner */}
        <TrustBanner />
      </div>

      {/* Footer */}
      <footer className="bg-[#070A10] border-t border-slate-800/80 py-8 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto text-center text-slate-500 font-medium">
          <span>© 2026 Babu Electronics Pakpattan. </span>
          <a
            href={ownerFacebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 hover:underline font-semibold text-slate-400 transition-colors"
          >
            All Rights Reserved.
          </a>
        </div>
      </footer>

      <StickyWhatsApp />
    </div>
  );
}
