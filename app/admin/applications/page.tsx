'use client';

import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Phone,
  CreditCard,
  MapPin,
  Trash2,
  Calendar,
} from 'lucide-react';

interface Application {
  id: string;
  customerName: string;
  cnic: string;
  phone: string;
  address: string;
  productId: string;
  product?: {
    id: string;
    title: string;
    cashPrice: number;
    installmentPrice: number;
    imageUrl: string;
    category?: {
      name: string;
    };
  };
  selectedDownpayment: number;
  selectedTenure: number;
  guarantorName: string;
  guarantorPhone: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | string;
  createdAt: string;
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');

  useEffect(() => {
    fetchApplications();
  }, [activeTab]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const url = activeTab === 'ALL' ? '/api/applications' : `/api/applications?status=${activeTab}`;
      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data)) {
        setApplications(data);
      }
    } catch (e) {
      console.error('Failed to load applications', e);
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
        fetchApplications();
      }
    } catch (e) {
      console.error('Status update error:', e);
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application record?')) return;

    try {
      const res = await fetch(`/api/applications/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchApplications();
      }
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const q = search.toLowerCase();
    return (
      app.customerName.toLowerCase().includes(q) ||
      app.cnic.toLowerCase().includes(q) ||
      app.phone.toLowerCase().includes(q) ||
      app.guarantorName.toLowerCase().includes(q) ||
      app.product?.title.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-blue-500" />
            <span>Installment Applications Manager</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Review customer financing requests, verify CNIC & guarantors, and approve or reject applications.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab === 'ALL' && 'All Requests'}
              {tab === 'PENDING' && 'Pending'}
              {tab === 'APPROVED' && 'Approved'}
              {tab === 'REJECTED' && 'Rejected'}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-7 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer name, CNIC (e.g. 35202-...), phone, product title..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 text-sm">Loading applications...</div>
      ) : filteredApplications.length === 0 ? (
        <div className="p-12 text-center text-slate-500 text-sm bg-slate-900 border border-slate-800 rounded-2xl">
          No installment applications found.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app) => {
            const installmentTotal = app.product?.installmentPrice || 0;
            const remainingBalance = Math.max(0, installmentTotal - app.selectedDownpayment);
            const monthlyInstallment = app.selectedTenure > 0 ? remainingBalance / app.selectedTenure : 0;

            return (
              <div
                key={app.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/40 transition-all space-y-6"
              >
                {/* Top Row: Customer & Product Info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-extrabold text-lg">
                      {app.customerName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-white">{app.customerName}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                        <span className="flex items-center gap-1 font-mono text-blue-400 font-bold">
                          <CreditCard className="w-3.5 h-3.5" />
                          CNIC: {app.cnic}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {app.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase ${
                        app.status === 'APPROVED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : app.status === 'REJECTED'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                          : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                      }`}
                    >
                      {app.status === 'APPROVED' && <CheckCircle2 className="w-4 h-4" />}
                      {app.status === 'REJECTED' && <XCircle className="w-4 h-4" />}
                      {app.status === 'PENDING' && <Clock className="w-4 h-4" />}
                      <span>{app.status}</span>
                    </span>

                    <button
                      onClick={() => handleDeleteApplication(app.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Grid Info Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  {/* Column 1: Requested Product */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
                      Requested Product
                    </span>
                    <div className="flex items-center gap-3 pt-1">
                      {app.product?.imageUrl && (
                        <img
                          src={app.product.imageUrl}
                          alt={app.product.title}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-800 bg-slate-900"
                        />
                      )}
                      <div>
                        <div className="font-bold text-white text-xs">{app.product?.title || 'Custom Product'}</div>
                        <div className="text-[11px] text-slate-400 font-semibold mt-0.5">
                          Cash Price: Rs. {app.product?.cashPrice?.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Plan & Financing Breakdown */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
                      Selected Financing Plan
                    </span>
                    <div className="space-y-1 pt-1 font-semibold">
                      <div className="flex justify-between text-slate-300">
                        <span>Downpayment:</span>
                        <span className="text-emerald-400 font-bold">Rs. {app.selectedDownpayment?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Tenure Duration:</span>
                        <span className="text-white font-bold">{app.selectedTenure} Months</span>
                      </div>
                      <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-800">
                        <span>Est. Monthly:</span>
                        <span className="text-blue-400 font-black text-xs">
                          Rs. {Math.round(monthlyInstallment).toLocaleString()} / mo
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Address & Guarantor Verification */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block">
                      Guarantor & Address
                    </span>
                    <div className="space-y-1 pt-1 text-slate-300">
                      <div className="flex items-start gap-1.5 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{app.address || 'Address not provided'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] pt-1">
                        <User className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>Guarantor: <strong className="text-white">{app.guarantorName || 'N/A'}</strong> ({app.guarantorPhone || 'N/A'})</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Applied on: {new Date(app.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {app.status !== 'APPROVED' && (
                      <button
                        onClick={() => handleStatusUpdate(app.id, 'APPROVED')}
                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve Application</span>
                      </button>
                    )}
                    {app.status !== 'REJECTED' && (
                      <button
                        onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                        className="flex items-center gap-1.5 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold text-xs rounded-xl border border-red-500/30 transition-all"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject Application</span>
                      </button>
                    )}
                    {app.status !== 'PENDING' && (
                      <button
                        onClick={() => handleStatusUpdate(app.id, 'PENDING')}
                        className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700 transition-all"
                      >
                        <Clock className="w-4 h-4" />
                        <span>Mark Pending</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
