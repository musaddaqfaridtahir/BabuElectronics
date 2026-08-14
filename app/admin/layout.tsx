'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Grid,
  FileSpreadsheet,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, skip admin layout shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (e) {
      router.push('/admin/login');
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products Management', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: Grid },
    { name: 'Installment Requests', href: '/admin/applications', icon: FileSpreadsheet },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center border border-blue-500/30">
            <img src="/logo.png" alt="Babu Electronics Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-extrabold text-blue-500 tracking-wider text-sm">BABU ELECTRONICS</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-5">
          {/* Logo & Brand Header */}
          <div className="flex items-center gap-3.5 pb-6 border-b border-slate-800">
            <div className="w-14 h-14 rounded-2xl bg-white p-2 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-500/30 shrink-0">
              <img src="/logo.png" alt="Babu Electronics Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="font-black text-base text-white tracking-wide leading-tight">BABU ELECTRONICS</h2>
              <span className="text-[10px] text-blue-400 font-bold tracking-wider uppercase block mt-0.5">
                Store Admin Panel
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="mt-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-white" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-5 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-medium">SQLite DB Active</span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 hidden md:flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-lg font-extrabold text-white">
              {navItems.find((n) => n.href === pathname)?.name || 'Admin Management'}
            </h1>
            <p className="text-xs text-slate-400">Manage products, categories, and customer installment plans.</p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>View Store</span>
            </Link>
            
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-extrabold text-xs shadow-inner">
                AD
              </div>
              <div>
                <p className="text-xs font-bold text-white">Admin Manager</p>
                <p className="text-[10px] text-blue-400 font-semibold">Babu Electronics</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="p-4 md:p-8 flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
