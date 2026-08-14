'use client';

import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  Upload,
  Star,
  X,
  Filter,
  Image as ImageIcon,
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  category?: Category;
  cashPrice: number;
  installmentPrice: number;
  downpaymentBase: number;
  durationMonths: number;
  imageUrl: string;
  specsJson?: string;
  isFeatured: boolean;
  stock: number;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategoryId, setFormCategoryId] = useState('');
  const [formCashPrice, setFormCashPrice] = useState('');
  const [formInstallmentPrice, setFormInstallmentPrice] = useState('');
  const [formDownpaymentBase, setFormDownpaymentBase] = useState('');
  const [formDurationMonths, setFormDurationMonths] = useState('12');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formSpecs, setFormSpecs] = useState<{ key: string; value: string }[]>([
    { key: '', value: '' },
  ]);
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formStock, setFormStock] = useState('10');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
      ]);
      const prodData = await prodRes.json();
      const catData = await catRes.json();

      if (Array.isArray(prodData)) setProducts(prodData);
      if (Array.isArray(catData)) setCategories(catData);
    } catch (e) {
      console.error('Failed to load products/categories:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (prod: Product | null = null) => {
    setFormError('');
    if (prod) {
      setEditingProduct(prod);
      setFormTitle(prod.title);
      setFormCategoryId(prod.categoryId);
      setFormCashPrice(prod.cashPrice.toString());
      setFormInstallmentPrice(prod.installmentPrice.toString());
      setFormDownpaymentBase(prod.downpaymentBase.toString());
      setFormDurationMonths(prod.durationMonths.toString());
      setFormImageUrl(prod.imageUrl);
      setFormIsFeatured(prod.isFeatured);
      setFormStock(prod.stock.toString());

      try {
        const parsedSpecs = prod.specsJson ? JSON.parse(prod.specsJson) : {};
        const specPairs = Object.entries(parsedSpecs).map(([key, value]) => ({
          key,
          value: String(value),
        }));
        setFormSpecs(specPairs.length > 0 ? specPairs : [{ key: '', value: '' }]);
      } catch (e) {
        setFormSpecs([{ key: '', value: '' }]);
      }
    } else {
      setEditingProduct(null);
      setFormTitle('');
      setFormCategoryId(categories[0]?.id || '');
      setFormCashPrice('');
      setFormInstallmentPrice('');
      setFormDownpaymentBase('');
      setFormDurationMonths('12');
      setFormImageUrl('');
      setFormSpecs([{ key: 'Warranty', value: '1 Year' }]);
      setFormIsFeatured(false);
      setFormStock('10');
    }
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFormImageUrl(data.url);
      } else {
        setFormError(data.error || 'Failed to upload image');
      }
    } catch (err) {
      setFormError('Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formTitle || !formCategoryId || !formCashPrice || !formInstallmentPrice) {
      setFormError('Please fill in all required fields (Title, Category, Prices).');
      return;
    }

    const specsObj: Record<string, string> = {};
    formSpecs.forEach((pair) => {
      if (pair.key.trim()) {
        specsObj[pair.key.trim()] = pair.value.trim();
      }
    });

    const payload = {
      title: formTitle,
      categoryId: formCategoryId,
      cashPrice: formCashPrice,
      installmentPrice: formInstallmentPrice,
      downpaymentBase: formDownpaymentBase || '0',
      durationMonths: formDurationMonths || '12',
      imageUrl: formImageUrl || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500',
      specsJson: specsObj,
      isFeatured: formIsFeatured,
      stock: formStock || '10',
    };

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
      } else {
        const errData = await res.json();
        setFormError(errData.error || 'Failed to save product');
      }
    } catch (err) {
      setFormError('Network error while saving product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchData();
      }
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-500" />
            <span>Products Inventory</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Add, update, or remove products and configure cash & installment pricing.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-xl">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 w-full md:w-auto"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">Loading store inventory...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No products found in catalog.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="px-4 py-3.5">Product</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Cash Price</th>
                  <th className="px-4 py-3.5">Installment Price</th>
                  <th className="px-4 py-3.5">Min Downpayment</th>
                  <th className="px-4 py-3.5">Stock</th>
                  <th className="px-4 py-3.5">Featured</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-800 bg-slate-950"
                        />
                        <div>
                          <div className="font-bold text-white text-sm max-w-xs truncate">
                            {product.title}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            ID: {product.id.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2.5 py-1 bg-blue-950/80 text-blue-400 rounded-lg text-[10px] font-bold border border-blue-800/60">
                        {product.category?.name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-slate-200">
                      Rs. {product.cashPrice?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-blue-400">
                      Rs. {product.installmentPrice?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-emerald-400">
                      Rs. {product.downpaymentBase?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`font-bold ${
                          product.stock > 0 ? 'text-slate-300' : 'text-red-400 font-extrabold'
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {product.isFeatured ? (
                        <span className="flex items-center gap-1 text-blue-400 text-[10px] font-bold">
                          <Star className="w-3.5 h-3.5 fill-blue-400" /> Featured
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[10px]">Standard</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
                          title="Edit product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-slate-900 z-10">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-500" />
                <span>{editingProduct ? 'Edit Product' : 'Add New Product'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-6 space-y-6">
              {formError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl">
                  {formError}
                </div>
              )}

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Honda CG 125 2025"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Category *
                  </label>
                  <select
                    value={formCategoryId}
                    onChange={(e) => setFormCategoryId(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pricing Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Cash Price (PKR) *
                  </label>
                  <input
                    type="number"
                    value={formCashPrice}
                    onChange={(e) => setFormCashPrice(e.target.value)}
                    placeholder="285000"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Installment Total (PKR) *
                  </label>
                  <input
                    type="number"
                    value={formInstallmentPrice}
                    onChange={(e) => setFormInstallmentPrice(e.target.value)}
                    placeholder="320000"
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-blue-400 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Base Downpayment (PKR)
                  </label>
                  <input
                    type="number"
                    value={formDownpaymentBase}
                    onChange={(e) => setFormDownpaymentBase(e.target.value)}
                    placeholder="50000"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-400 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Stock & Tenure & Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Duration (Months)
                  </label>
                  <input
                    type="number"
                    value={formDurationMonths}
                    onChange={(e) => setFormDurationMonths(e.target.value)}
                    placeholder="12"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    placeholder="10"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                    <input
                      type="checkbox"
                      checked={formIsFeatured}
                      onChange={(e) => setFormIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-950 border-slate-800"
                    />
                    <span>Featured Product</span>
                  </label>
                </div>
              </div>

              {/* Local Media Image Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Product Image (Local Upload / URL)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {formImageUrl ? (
                    <img
                      src={formImageUrl}
                      alt="Preview"
                      className="w-20 h-20 rounded-xl object-cover border border-slate-700 bg-slate-950"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl border border-dashed border-slate-700 bg-slate-950 flex flex-col items-center justify-center text-slate-500">
                      <ImageIcon className="w-6 h-6" />
                      <span className="text-[9px] mt-1">No Image</span>
                    </div>
                  )}

                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="text"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      placeholder="Upload image or paste image URL"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 cursor-pointer transition-colors">
                      <Upload className="w-4 h-4 text-blue-400" />
                      <span>{uploadingImage ? 'Uploading to /public/uploads...' : 'Upload Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Specifications Key-Value Editor */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Specifications (Key - Value)
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormSpecs([...formSpecs, { key: '', value: '' }])}
                    className="text-xs text-blue-400 hover:text-blue-300 font-bold"
                  >
                    + Add Spec Row
                  </button>
                </div>
                <div className="space-y-2">
                  {formSpecs.map((spec, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Spec Name (e.g. Engine)"
                        value={spec.key}
                        onChange={(e) => {
                          const updated = [...formSpecs];
                          updated[index].key = e.target.value;
                          setFormSpecs(updated);
                        }}
                        className="w-1/2 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. 125cc Euro 2)"
                        value={spec.value}
                        onChange={(e) => {
                          const updated = [...formSpecs];
                          updated[index].value = e.target.value;
                          setFormSpecs(updated);
                        }}
                        className="w-1/2 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500"
                      />
                      {formSpecs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setFormSpecs(formSpecs.filter((_, i) => i !== index))}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl border border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-extrabold rounded-xl shadow-lg shadow-blue-600/30"
                >
                  {editingProduct ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
