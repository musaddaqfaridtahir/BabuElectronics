'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Phone,
  Clock,
  Layers,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

interface StoreMapProps {
  className?: string;
  showDetails?: boolean;
}

export default function StoreMap({ className = '', showDetails = true }: StoreMapProps) {
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Official Google Business Location of Babu Electronics Pakpattan (30.3433665, 73.3850045)
  const storeAddress = 'Sahiwal Road, Pakpattan, Punjab, Pakistan';
  const phone = '0300-4191281';
  const whatsappNumber = '923001122782';

  // Official Business Place Embed (with Place ID 0x393d599afc108301:0x51c4aeeec29d901f)
  const embedUrl =
    mapType === 'satellite'
      ? `https://maps.google.com/maps?q=30.3433665,73.3850045+(Babu+Electronics)&t=k&z=18&ie=UTF8&iwloc=B&output=embed`
      : `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.432!2d73.3850045!3d30.3433665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393d599afc108301%3A0x51c4aeeec29d901f!2sBabu%20Electronics!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk`;

  // Official Business Share & Directions Links
  const googleMapsShareUrl = 'https://maps.app.goo.gl/aMUi3oNdAJeTcGZo8';
  const googleMapsDirectionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=30.3433665,73.3850045';
  const whatsappDirectionsUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Assalam-o-Alaikum! Showroom live Google Maps location: https://maps.app.goo.gl/aMUi3oNdAJeTcGZo8 (Babu Electronics, Pakpattan)'
  )}`;

  return (
    <div className={`space-y-4 font-sans ${className}`}>
      {/* Interactive Map Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
              Showroom Location (Sahiwal Road)
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">
              Near City Bypass, Pakpattan Sharif, Punjab
            </p>
          </div>
        </div>

        {/* View Toggle (Map / Satellite) & Directions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="bg-slate-100 p-0.5 rounded-xl border border-slate-200 flex items-center text-[10px] font-bold">
            <button
              type="button"
              onClick={() => setMapType('roadmap')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                mapType === 'roadmap'
                  ? 'bg-white text-blue-600 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Map
            </button>
            <button
              type="button"
              onClick={() => setMapType('satellite')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                mapType === 'satellite'
                  ? 'bg-white text-blue-600 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Satellite
            </button>
          </div>

          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] rounded-xl shadow-xs flex items-center gap-1.5 transition-all active:scale-[0.98]"
          >
            <Navigation className="w-3 h-3 fill-white" />
            <span>Directions</span>
          </a>
        </div>
      </div>

      {/* Main Map Frame Container */}
      <div className="relative w-full h-72 sm:h-96 md:h-[380px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
        {/* Loading placeholder skeleton */}
        {!iframeLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-100 space-y-2 animate-pulse">
            <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
            <span className="text-[11px] font-bold text-slate-500">Loading Google Maps...</span>
          </div>
        )}

        {/* Reliable Google Maps Embed */}
        <iframe
          key={mapType}
          title="Babu Electronics Sahiwal Road Pakpattan Map"
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIframeLoaded(true)}
          className="w-full h-full"
        />

        {/* Floating Quick Action Overlay on Map (Desktop & Tablet) */}
        <div className="hidden sm:flex absolute bottom-3 left-3 z-20 items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200/90 shadow-md text-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-bold text-slate-900">Babu Electronics</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-600 font-medium text-[11px]">Sahiwal Road Showroom</span>
        </div>

        {/* Floating Open Full Map Button */}
        <a
          href={googleMapsShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-md hover:bg-white text-slate-800 hover:text-blue-600 px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-sm text-[10px] font-extrabold flex items-center gap-1 transition-all"
        >
          <span>Open Full Map</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Showroom Details & Action Buttons Bar */}
      {showDetails && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          {/* Card 1: Driving Directions */}
          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-200 rounded-xl transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <Navigation className="w-4 h-4 fill-white" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-black text-slate-900 group-hover:text-blue-600 truncate">
                Get Driving Route
              </h4>
              <p className="text-[10px] text-slate-500 font-medium truncate">
                Live Google Maps GPS Route
              </p>
            </div>
          </a>

          {/* Card 2: Showroom Phone */}
          <a
            href="tel:+923004191281"
            className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <Phone className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-black text-slate-900 truncate">
                0300-4191281
              </h4>
              <p className="text-[10px] text-slate-500 font-medium truncate">
                Direct Showroom Hotline
              </p>
            </div>
          </a>

          {/* Card 3: WhatsApp Location Pin */}
          <a
            href={whatsappDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-emerald-50/70 hover:bg-emerald-50 border border-emerald-200 rounded-xl transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
              <WhatsAppIcon className="w-4 h-4 text-white" size={16} />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-black text-emerald-900 truncate">
                Send Pin on WhatsApp
              </h4>
              <p className="text-[10px] text-emerald-700 font-medium truncate">
                Chat with 0300-1122782
              </p>
            </div>
          </a>
        </div>
      )}
    </div>
  );
}
