'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Grid,
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  ArrowUpRight,
} from 'lucide-react';

interface Application {
  id: string;
  customerName: string;
  cnic: string;
  phone: string;
  product: {
    title: string;
    cashPrice: number;
    installmentPrice: number;
  };
  selectedDownpayment: number;
  selectedTenure: number;
  status: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    pendingApplications: 0,
    approvedApplications: 0,
  });

  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes, appRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
        fetch('/api/applications'),
      ]);

      const products = await prodRes.json();
      const categories = await catRes.json();
      const applications = await appRes.json();

      const pending = Array.isArray(applications) ? applications.filter((a: Application) => a.status === 'PENDING').length : 0;
      const approved = Array.isArray(applications) ? applications.filter((a: Application) => a.status === 'APPROVED').length : 0;

      setStats({
        totalProducts: Array.isArray(products) ? products.length : 0,
        totalCategories: Array.isArray(categories) ? categories.length : 0,
        pendingApplications: pending,
        approvedApplications: approved,
      });

      if (Array.isArray(applications)) {
        setRecentApplications(applications.slice(0, 5));
      }
    } catch (e) {
      console.error('Failed to load dashboard data', e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        fetchDashboardData();
      }
    } catch (e) {
      console.error('Status update error:', e);
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-6 md:p-8 rounded-3xl text-white shadow-2xl shadow-blue-900/30 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-xl z-10">
          <span className="bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block border border-white/20">
            Store Overview
          </span>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            Welcome to Babu Electronics Admin
          </h2>
          <p className="text-blue-100 text-xs md:text-sm font-medium">
            Manage your store inventory, categories, and customer installment plans from one central control panel.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <Link
            href="/admin/products"
            className="flex items-center gap-2 px-4.5 py-3 bg-white hover:bg-slate-100 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all"
          >
            <Plus className="w-4 h-4 text-blue-600" />
            <span>Add New Product</span>
          </Link>
          <Link
            href="/admin/applications"
            className="flex items-center gap-2 px-4.5 py-3 bg-blue-950/50 hover:bg-blue-950/80 backdrop-blur-md text-white font-bold text-xs rounded-xl transition-all border border-white/20"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Review Applications</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3 relative overflow-hidden group hover:border-blue-500/50 transition-all">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Products</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{loading ? '...' : stats.totalProducts}</div>
          <p className="text-[11px] text-slate-500">In store catalog</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3 relative overflow-hidden group hover:border-blue-500/50 transition-all">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Categories</span>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Grid className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white">{loading ? '...' : stats.totalCategories}</div>
          <p className="text-[11px] text-slate-500">Active product niches</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3 relative overflow-hidden group hover:border-blue-500/50 transition-all">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Pending Requests</span>
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-yellow-400">{loading ? '...' : stats.pendingApplications}</div>
          <p className="text-[11px] text-slate-500">Awaiting store approval</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3 relative overflow-hidden group hover:border-blue-500/50 transition-all">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Approved Requests</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-400">{loading ? '...' : stats.approvedApplications}</div>
          <p className="text-[11px] text-slate-500">Active installment plans</p>
        </div>
      </div>

      {/* Recent Installment Applications Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-blue-500" />
              <span>Recent Installment Applications</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Latest customer applications submitted for product financing.</p>
          </div>
          <Link
            href="/admin/applications"
            className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>View All Applications</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500 text-sm">Loading applications...</div>
        ) : recentApplications.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm bg-slate-950/40 rounded-xl border border-slate-800">
            No installment applications submitted yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Customer & CNIC</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Downpayment</th>
                  <th className="px-4 py-3">Tenure</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-lg text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {recentApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-bold text-white text-sm">{app.customerName}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">CNIC: {app.cnic} | {app.phone}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-slate-200 font-bold">{app.product?.title || 'Unknown Product'}</div>
                      <div className="text-[11px] text-blue-400 font-bold">Rs. {app.product?.installmentPrice?.toLocaleString()} Total</div>
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-200">
                      Rs. {app.selectedDownpayment?.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-300">
                      {app.selectedTenure} Months
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          app.status === 'APPROVED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : app.status === 'REJECTED'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}
                      >
                        {app.status === 'APPROVED' && <CheckCircle2 className="w-3 h-3" />}
                        {app.status === 'REJECTED' && <XCircle className="w-3 h-3" />}
                        {app.status === 'PENDING' && <Clock className="w-3 h-3" />}
                        <span>{app.status}</span>
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {app.status !== 'APPROVED' && (
                          <button
                            onClick={() => handleStatusUpdate(app.id, 'APPROVED')}
                            className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-lg font-bold text-[11px] transition-colors"
                          >
                            Approve
                          </button>
                        )}
                        {app.status !== 'REJECTED' && (
                          <button
                            onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                            className="px-2.5 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg font-bold text-[11px] transition-colors"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
