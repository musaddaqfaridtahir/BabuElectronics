'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Share, PlusSquare, CheckCircle2, Sparkles } from 'lucide-react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already running in standalone mode (already installed)
    const isInStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (isInStandaloneMode) {
      setIsStandalone(true);
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for Chrome / Android beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if previously dismissed in this session
    const hasDismissed = sessionStorage.getItem('babu_pwa_dismissed');

    // Timer: Trigger prompt after 12 seconds for visitors & users
    const timer = setTimeout(() => {
      if (!isInStandaloneMode && !hasDismissed) {
        setShowPrompt(true);
      }
    }, 12000);

    // Register Service Worker for PWA compliance
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => console.log('Babu Electronics PWA Service Worker Registered'))
        .catch((err) => console.log('Service Worker registration skipped:', err));
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('babu_pwa_dismissed', 'true');
  };

  if (!showPrompt || isStandalone) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4 animate-in slide-in-from-bottom duration-300 font-sans">
      <div className="max-w-md mx-auto bg-white/95 backdrop-blur-md border border-blue-200/90 rounded-3xl p-4 sm:p-5 shadow-2xl shadow-blue-900/20 space-y-3.5 relative">
        
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Dismiss installation prompt"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with App Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white border border-blue-200 p-1 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
            <img src="/icon-192.png" alt="Babu Electronics App Icon" className="w-full h-full object-cover rounded-xl" />
          </div>

          <div className="min-w-0 pr-6">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm sm:text-base text-slate-900 truncate">
                Babu Electronics
              </span>
              <span className="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-extrabold uppercase border border-blue-200">
                Official App
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
              Pakpattan Installment Store
            </p>
          </div>
        </div>

        {/* Benefits list */}
        <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 space-y-1.5 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="text-[11px] font-bold">Fast Mobile Access & Installment Calculator</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="text-[11px] font-bold">Admin Panel Se Naye Products Add Karein</span>
          </div>
        </div>

        {/* Action Controls */}
        {isIOS ? (
          // iOS Safari Instructions
          <div className="space-y-2 pt-1 text-center">
            <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-2xl text-[11px] text-blue-900 font-medium space-y-1">
              <p className="font-bold">iPhone / iPad par install karne ke liye:</p>
              <div className="flex items-center justify-center gap-2 text-slate-700 pt-0.5">
                <span>1. Safari mein</span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-white rounded border border-slate-200 text-blue-600 font-bold text-[10px]">
                  <Share className="w-3 h-3" /> Share
                </span>
                <span>dabayein</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-700">
                <span>2. Phir</span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-white rounded border border-slate-200 text-slate-900 font-bold text-[10px]">
                  <PlusSquare className="w-3 h-3 text-blue-600" /> Add to Home Screen
                </span>
                <span>select karein</span>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className="text-xs text-slate-500 font-bold hover:underline py-1"
            >
              Samajh aa gaya (Got it)
            </button>
          </div>
        ) : (
          // Android / Chrome / Desktop Native Button
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleInstallClick}
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              <span>Install App (ابھی انسٹال کریں)</span>
            </button>

            <button
              onClick={handleDismiss}
              className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition-colors"
            >
              Later
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
