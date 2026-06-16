import React, { useState } from 'react';
import { useAppState, ADMIN_EMAIL } from '../context/AppContext';
import { Product, Coupon, OrderStatus, Order } from '../types';
import { CATEGORIES } from '../data/supplementData';
import { 
  ShieldCheck, ArrowUpRight, TrendingUp, Users, ShoppingBag, Percent, Plus, Trash, Edit, CheckCircle, Package, RefreshCw, AlertTriangle, RefreshCcw 
} from 'lucide-react';

export default function AdminPanel() {
  const {
    products, addProduct, updateProduct, deleteProduct,
    orders, updateOrderStatus, addTrackingLog,
    coupons, addCoupon, toggleCouponStatus, deleteCoupon,
    setView
  } = useAppState();

  // Navigation sub-tabs inside Admin Console
  const [activeSubTab, setActiveSubTab] = useState<'analytics' | 'products' | 'orders' | 'coupons'>('analytics');

  // --- Products Admin State ---
  const [editingProd, setEditingProd] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // New product input states
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState(CATEGORIES[0]);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdIngredients, setNewProdIngredients] = useState('');
  const [newProdBenefits, setNewProdBenefits] = useState('');
  const [newProdUsage, setNewProdUsage] = useState('');
  const [newProdFlavours, setNewProdFlavours] = useState('double Rich Chocolate, Vanilla');
  const [newProdSizes, setNewProdSizes] = useState('1 kg, 2 kg');
  const [newProdMrp, setNewProdMrp] = useState(4999);
  const [newProdPrice, setNewProdPrice] = useState(3499);
  const [newProdStock, setNewProdStock] = useState(50);

  // --- Tracking Update State per Order ---
  const [logStatusInput, setLogStatusInput] = useState('');
  const [logDescInput, setLogDescInput] = useState('');
  const [activeLogOrderId, setActiveLogOrderId] = useState<string | null>(null);

  // --- New Coupon State ---
  const [newCpnCode, setNewCpnCode] = useState('');
  const [newCpnType, setNewCpnType] = useState<'percentage' | 'fixed'>('percentage');
  const [newCpnValue, setNewCpnValue] = useState(10);
  const [newCpnMin, setNewCpnMin] = useState(1500);
  const [newCpnDesc, setNewCpnDesc] = useState('');

  // --- Analytical Computations ---
  const totalSales = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((acc, o) => acc + o.total, 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
  
  const totalCustomersCount = Array.from(new Set(orders.map(o => o.customerEmail))).length || 2;
  
  const lowStockProducts = products.filter(p => p.stockCount <= 10);

  // Category wise sales split for SVG bar charts
  const categorySplit = products.reduce((acc, p) => {
    // Collect simulated category counts from existing orders
    const count = orders.reduce((sum, ord) => {
      const itemsMatch = ord.items.filter(item => item.productCategory === p.category);
      return sum + itemsMatch.reduce((q, item) => q + item.quantity, 0);
    }, 0);
    
    acc[p.category] = (acc[p.category] || 0) + count;
    return acc;
  }, {} as Record<string, number>);

  // Admin Products Submits
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const brandNew: Product = {
      id: 'p-' + Date.now(),
      name: newProdName,
      category: newProdCategory,
      description: newProdDesc,
      ingredients: newProdIngredients,
      benefits: newProdBenefits.split(',').map(b => b.trim()).filter(Boolean),
      usageInstructions: newProdUsage,
      flavours: newProdFlavours.split(',').map(f => f.trim()).filter(Boolean),
      sizes: newProdSizes.split(',').map(s => s.trim()).filter(Boolean),
      mrp: Number(newProdMrp),
      discountPrice: Number(newProdPrice),
      stockCount: Number(newProdStock),
      stockStatus: Number(newProdStock) === 0 ? 'Out of Stock' : Number(newProdStock) < 10 ? 'Low Stock' : 'In Stock',
      rating: 5.0,
      images: ['linear-gradient(135deg, #111 0%, rgb(225, 29, 72) 100%)'],
      nutritionFacts: [
        { name: 'Calories', amount: '120 kcal' },
        { name: 'Protein', amount: '25 g' }
      ],
      reviews: []
    };

    addProduct(brandNew);
    setShowAddForm(false);
    
    // Reset states
    setNewProdName('');
    setNewProdDesc('');
    setNewProdIngredients('');
    setNewProdBenefits('');
    setNewProdUsage('');
    setNewProdStock(50);
  };

  const handleUpdateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProd) return;
    
    const count = Number(editingProd.stockCount);
    const updated: Product = {
      ...editingProd,
      stockCount: count,
      stockStatus: count === 0 ? 'Out of Stock' : count < 10 ? 'Low Stock' : 'In Stock'
    };

    updateProduct(updated);
    setEditingProd(null);
  };

  const triggerTrackingLogAdd = (orderId: string) => {
    if (!logStatusInput || !logDescInput) return;
    addTrackingLog(orderId, logStatusInput, logDescInput);
    setLogStatusInput('');
    setLogDescInput('');
    setActiveLogOrderId(null);
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCpnCode.trim()) return;

    const code = newCpnCode.toUpperCase().trim();
    const cpn: Coupon = {
      code,
      type: newCpnType,
      value: Number(newCpnValue),
      minSpend: Number(newCpnMin),
      isActive: true,
      description: newCpnDesc || `${newCpnType === 'percentage' ? newCpnValue + '%' : '₹' + newCpnValue} OFF on standard stack purchases`
    };

    addCoupon(cpn);
    setNewCpnCode('');
    setNewCpnDesc('');
  };

  return (
    <div className="bg-black text-white min-h-screen py-12 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Admin Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-950 border border-zinc-900 rounded-3xl p-6 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="bg-rose-950/40 p-2.5 rounded-2xl border border-rose-900/40 animate-pulse">
              <ShieldCheck className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-none">2ScoopNutritoon Operations Hub</h1>
              <span className="text-xs text-zinc-550 font-mono tracking-wider block mt-1 uppercase">Predefined Admin Auth Mode Online</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {(['analytics', 'products', 'orders', 'coupons'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`px-4 py-2.5 rounded-lg border transition-all ${
                  activeSubTab === tab
                    ? 'bg-rose-600 text-white border-rose-500 font-bold'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-850 hover:text-white'
                } uppercase tracking-wider`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* SUB TAB 1: ANALYTICS HUB */}
        {activeSubTab === 'analytics' && (
          <div className="space-y-10">
            
            {/* Cards Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">Consolidated Sales</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-extrabold text-rose-500 font-mono">₹{totalSales.toLocaleString('en-IN')}</span>
                  <span className="text-xs font-mono text-green-500 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" />
                    +18.4%
                  </span>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">Pending Shipments</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-extrabold text-white font-mono">{pendingOrdersCount} Tub{pendingOrdersCount !== 1 ? 's' : ''}</span>
                  <span className="text-xs font-mono text-zinc-500">Live booking</span>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">Athlete Clients</span>
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-extrabold text-white font-mono">{totalCustomersCount} Registered</span>
                  <span className="text-xs font-mono text-green-500 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" />
                    +12.1%
                  </span>
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">Low Stock Alerts</span>
                <div className="flex justify-between items-baseline">
                  <span className={`text-2xl font-extrabold font-mono ${lowStockProducts.length > 0 ? 'text-amber-500' : 'text-zinc-500'}`}>
                    {lowStockProducts.length} Item{lowStockProducts.length !== 1 ? 's' : ''}
                  </span>
                  <span className="text-[10px] text-zinc-550 underline font-mono">Action Required</span>
                </div>
              </div>

            </div>

            {/* SVG Visual Categories split chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-8 bg-zinc-950 border border-zinc-900 rounded-3xl p-6 space-y-4">
                <h3 className="text-base font-bold uppercase tracking-wide">Category Sales Popularity Index</h3>
                <p className="text-zinc-500 text-xs">Simulated statistical metrics monitoring category-wise volume orders.</p>
                
                <div className="space-y-4 pt-2">
                  {CATEGORIES.map((cat) => {
                    const salesVolume = categorySplit[cat] || 0;
                    const pctWidth = Math.min(100, Math.max(5, salesVolume * 15)) + '%';
                    
                    return (
                      <div key={cat} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-mono text-zinc-400">
                          <span>{cat}</span>
                          <strong className="text-white">{salesVolume} unit{salesVolume !== 1 ? 's' : ''}</strong>
                        </div>
                        <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-rose-650 to-rose-500 h-full rounded-full transition-all duration-1000"
                            style={{ width: pctWidth }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Warnings and alerts panel */}
              <div className="lg:col-span-4 bg-zinc-950 border border-zinc-900 rounded-3xl p-6 space-y-5">
                <h3 className="text-base font-bold uppercase tracking-wide">Critical System Notices</h3>
                
                <div className="space-y-3 font-mono text-xs max-h-[300px] overflow-y-auto no-scrollbar">
                  {lowStockProducts.map(p => (
                    <div key={p.id} className="bg-amber-950/20 border border-amber-900/40 p-3 rounded-lg flex items-start gap-2 text-amber-500">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      <div>
                        <strong className="block text-white leading-none mb-1 text-[11px] font-bold">{p.name}</strong>
                        <span>Only {p.stockCount} tubs remain. Restock catalog instantly under "Products" tab.</span>
                      </div>
                    </div>
                  ))}

                  {lowStockProducts.length === 0 && (
                    <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-lg flex items-center gap-2 text-emerald-500 text-center uppercase text-[10px] font-bold tracking-wider">
                      <ShieldCheck className="w-5 h-5" />
                      <span>✓ All active inventory counts are stable.</span>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* SUB TAB 2: INVENTORY & PRODUCT MANAGEMENT */}
        {activeSubTab === 'products' && (
          <div className="space-y-6">
            
            <div className="flex justify-between items-center bg-zinc-950 border border-zinc-900 p-4 rounded-xl">
              <span className="text-sm font-bold uppercase tracking-wide">Total Catalog: {products.length} Items</span>
              <button
                type="button"
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-rose-600 hover:bg-rose-700 text-white font-mono text-xs font-bold py-2 px-4 rounded-lg uppercase tracking-wider transition-all flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>{showAddForm ? 'Close Drawer' : 'Add New Formulation'}</span>
              </button>
            </div>

            {/* formulation adding form */}
            {showAddForm && (
              <form onSubmit={handleCreateProduct} className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pb-8">
                <span className="sm:col-span-2 text-sm font-mono font-bold text-rose-500 uppercase pb-2 border-b border-zinc-900 block">
                  Add New Supplement Specification:
                </span>

                <div>
                  <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2ScoopNutritoon Isolate Fuel Booster"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-805 rounded p-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-1">Target Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-805 rounded p-2 text-xs text-zinc-300 focus:outline-none"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-1">Copywriting Descriptors</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Provide professional supplement descriptions..."
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-805 rounded p-2 text-xs text-white focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-1">Ingredients (Comma listed)</label>
                  <input
                    type="text"
                    required
                    value={newProdIngredients}
                    onChange={(e) => setNewProdIngredients(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-805 rounded p-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-1">Benefits (Comma listed)</label>
                  <input
                    type="text"
                    required
                    placeholder="Gain muscle, Faster recovery"
                    value={newProdBenefits}
                    onChange={(e) => setNewProdBenefits(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-805 rounded p-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-1">Usage Instructions Map</label>
                  <input
                    type="text"
                    required
                    placeholder="Mix 1 scoop with cold water before weights"
                    value={newProdUsage}
                    onChange={(e) => setNewProdUsage(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-805 rounded p-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 text-[10px] font-mono uppercase mb-1">MRP Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={newProdMrp}
                    onChange={(e) => setNewProdMrp(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-805 rounded p-3 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-rose-500 text-[10px] font-mono uppercase mb-1">Discount Athlete Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-805 rounded p-3 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 text-[10px] font-mono uppercase mb-1">Initial Stock Count</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-805 rounded p-3 text-xs text-rose-500 focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-1">Preset Flavours</label>
                  <input
                    type="text"
                    value={newProdFlavours}
                    onChange={(e) => setNewProdFlavours(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-805 rounded p-3 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 pt-3 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-zinc-900 text-zinc-400 py-2.5 px-5 rounded text-xs hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-rose-600 hover:bg-rose-700 text-white font-mono text-xs font-bold py-2.5 px-6 rounded"
                  >
                    Publish Specifications
                  </button>
                </div>
              </form>
            )}

            {/* Editable Product block */}
            {editingProd && (
              <form onSubmit={handleUpdateProductSubmit} className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 space-y-4">
                <span className="text-sm font-mono font-bold text-amber-500 uppercase pb-2 border-b border-zinc-900 block">
                  Quick Edit: {editingProd.name}
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-zinc-550 text-[9px] font-mono uppercase mb-0.5">MRP Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={editingProd.mrp}
                      onChange={(e) => setEditingProd({ ...editingProd, mrp: Number(e.target.value) })}
                      className="bg-zinc-900 border border-zinc-800 text-xs p-2 text-white rounded w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-rose-500 text-[9px] font-mono uppercase mb-0.5">Discount Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={editingProd.discountPrice}
                      onChange={(e) => setEditingProd({ ...editingProd, discountPrice: Number(e.target.value) })}
                      className="bg-zinc-900 border border-zinc-800 text-xs p-2 text-white rounded w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-550 text-[9px] font-mono uppercase mb-0.5">Stock Tubes Count</label>
                    <input
                      type="number"
                      required
                      value={editingProd.stockCount}
                      onChange={(e) => setEditingProd({ ...editingProd, stockCount: Number(e.target.value) })}
                      className="bg-zinc-900 border border-rose-550 text-xs p-2 text-white font-bold rounded w-full"
                    />
                  </div>
                  <div className="flex items-end gap-1.5 font-mono">
                    <button
                      type="button"
                      onClick={() => setEditingProd(null)}
                      className="bg-zinc-900 text-zinc-400 py-2 px-3 text-xs rounded hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-rose-600 text-white text-xs font-bold py-2 px-3.5 rounded hover:bg-rose-700"
                    >
                      Save Spec
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Catalog list matrix */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden overflow-x-auto no-scrollbar">
              <table className="w-full text-xs font-sans text-left text-zinc-300">
                <thead>
                  <tr className="bg-zinc-900 border-b border-zinc-850 uppercase text-[10px] font-mono text-zinc-400">
                    <th className="p-4">Supplement Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">MRP / Discount</th>
                    <th className="p-4">Inventory Tubes</th>
                    <th className="p-4 text-center">Operation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 font-mono">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-900/30">
                      <td className="p-4 font-sans text-white font-bold">{p.name}</td>
                      <td className="p-4">{p.category}</td>
                      <td className="p-4">
                        <span className="line-through text-zinc-550 text-[10px]">₹{p.mrp}</span>
                        <strong className="text-rose-500 block">₹{p.discountPrice}</strong>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.stockCount <= 10 ? 'bg-amber-950 text-amber-500' : 'bg-zinc-900 text-zinc-300'
                        }`}>
                          {p.stockCount} Tubs ({p.stockStatus})
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingProd(p)}
                            className="bg-zinc-900 p-1.5 rounded text-zinc-400 hover:text-amber-500 hover:bg-zinc-800"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete ${p.name} from active inventory?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="bg-zinc-900 p-1.5 rounded text-zinc-400 hover:text-rose-500 hover:bg-zinc-800"
                            title="Delete Product"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* SUB TAB 3: ORDER OPERATION & LOGS TRACKER */}
        {activeSubTab === 'orders' && (
          <div className="space-y-6">
            
            <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-wide">All Customer Orders ({orders.length})</span>
              <span className="text-xs font-mono text-zinc-500">Live Operation Syncing</span>
            </div>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 space-y-4 text-xs font-mono">
                  
                  {/* Order header row */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-zinc-900 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-bold block">{ord.orderNumber}</span>
                        <span className="bg-zinc-900 text-zinc-400 px-2 py-0.5 rounded text-[9px]">ID: {ord.id}</span>
                      </div>
                      <span className="text-zinc-550 block text-[10px] mt-0.5">Placed by: <strong>{ord.customerName}</strong> ({ord.customerEmail})</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-zinc-500">Logistics Flag:</span>
                      
                      {/* Status select editor */}
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="bg-zinc-900 text-zinc-300 border border-zinc-800 p-1.5 rounded text-xs focus:outline-none uppercase font-bold"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => setActiveLogOrderId(activeLogOrderId === ord.id ? null : ord.id)}
                        className="bg-rose-950/45 text-rose-500 font-mono text-[10px] font-bold border border-rose-900/40 py-1.5 px-3 rounded uppercase"
                      >
                        Add Transit Log
                      </button>
                    </div>
                  </div>

                  {/* Dynamic manual log form */}
                  {activeLogOrderId === ord.id && (
                    <div className="bg-black/60 border border-zinc-900 p-4 rounded-xl space-y-3 pt-3">
                      <span className="text-[10px] text-rose-500 font-bold block pb-1 border-b border-zinc-900 uppercase">Publish Customized Travel Note:</span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
                        <input
                          type="text"
                          required
                          placeholder="Log Milestone status (e.g. Out for Delivery)"
                          value={logStatusInput}
                          onChange={(e) => setLogStatusInput(e.target.value)}
                          className="bg-zinc-900 border border-zinc-800 p-2 text-xs rounded text-white focus:outline-none"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Travel descriptions (e.g. Dispatched from Mumbai Central)"
                          value={logDescInput}
                          onChange={(e) => setLogDescInput(e.target.value)}
                          className="bg-zinc-900 border border-zinc-800 p-2 text-xs rounded text-white focus:outline-none"
                        />
                      </div>
                      
                      <div className="flex justify-end gap-2 text-[10px] uppercase font-bold">
                        <button onClick={() => setActiveLogOrderId(null)} className="text-zinc-500 hover:text-white px-2">Cancel</button>
                        <button onClick={() => triggerTrackingLogAdd(ord.id)} className="text-rose-500 hover:text-rose-400 px-2 underline">Push Log</button>
                      </div>
                    </div>
                  )}

                  {/* items detail list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 font-sans">
                    <div className="space-y-1.5">
                      <span className="text-zinc-550 font-mono text-[9px] uppercase tracking-widest block font-bold">Packed Formulations:</span>
                      <div className="space-y-1">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-xs text-zinc-300">
                            <span>{item.productName} ({item.selectedFlavour} | {item.selectedSize})</span>
                            <strong className="text-white font-mono">Qty: {item.quantity}</strong>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-zinc-550 font-mono text-[9px] uppercase tracking-widest block font-bold">Delivered Address:</span>
                      <div className="text-xs text-zinc-400">
                        <span className="font-bold text-white block">{ord.shippingAddress.name}</span>
                        <span>{ord.shippingAddress.addressLine1}, {ord.shippingAddress.city} - {ord.shippingAddress.postalCode}</span>
                        <span className="block font-mono text-[11px] mt-0.5">📞 {ord.shippingAddress.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ledger past status & invoices logs */}
                  <div className="pt-3 border-t border-zinc-900 flex justify-between items-baseline text-xs text-zinc-500 font-mono">
                    <span>Payment: <strong className="text-zinc-450">{ord.paymentMethod}</strong> • Status: <strong className="text-white">{ord.paymentStatus}</strong></span>
                    <span className="text-white">
                      Settled Price: <strong className="text-rose-500 font-bold text-base">₹{ord.total.toLocaleString('en-IN')}</strong>
                    </span>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* SUB TAB 4: COUPON CODE CREATORS */}
        {activeSubTab === 'coupons' && (
          <div className="space-y-6">
            
            {/* Coupon add widget card */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold uppercase tracking-wide">Dynamic Coupon Registry</h3>
              <p className="text-zinc-500 text-xs">Create new athletic vouchers and promotion keys live in checkout dashboards.</p>
              
              <form onSubmit={handleAddCoupon} className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
                <div>
                  <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-0.5">Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MASS20"
                    value={newCpnCode}
                    onChange={(e) => setNewCpnCode(e.target.value.toUpperCase())}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-white uppercase rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-0.5">Type</label>
                  <select
                    value={newCpnType}
                    onChange={(e) => setNewCpnType(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-zinc-300 rounded focus:outline-none"
                  >
                    <option value="percentage">Percentage OFF (%)</option>
                    <option value="fixed">Fixed Currency OFF (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-0.5">Deduction Value *</label>
                  <input
                    type="number"
                    required
                    value={newCpnValue}
                    onChange={(e) => setNewCpnValue(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-white rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-0.5">Minimum spend constraint (₹)</label>
                  <input
                    type="number"
                    required
                    value={newCpnMin}
                    onChange={(e) => setNewCpnMin(Number(e.target.value))}
                    className="w-full bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-white rounded focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-zinc-550 text-[10px] font-mono uppercase mb-0.5">Brief Specifications description</label>
                  <input
                    type="text"
                    placeholder="e.g. Save ₹500 on all bundles above ₹4000"
                    value={newCpnDesc}
                    onChange={(e) => setNewCpnDesc(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-850 p-2.5 text-xs text-white rounded focus:outline-none"
                  />
                </div>

                <div className="flex items-end mb-0.5">
                  <button
                    maxLength={40}
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-mono text-xs font-bold py-3 rounded uppercase tracking-wider transition-all"
                  >
                    Add Code
                  </button>
                </div>
              </form>
            </div>

            {/* coupons active data grids list */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden overflow-x-auto no-scrollbar">
              <table className="w-full text-xs font-sans text-zinc-300 text-left">
                <thead>
                  <tr className="bg-zinc-900 border-b border-zinc-850 uppercase text-[10px] font-mono text-zinc-400">
                    <th className="p-4">Coupon Code</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Reduction Value</th>
                    <th className="p-4">Min. spend lock</th>
                    <th className="p-4 text-center">Active Status</th>
                    <th className="p-4 text-center">Revoke</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 font-mono">
                  {coupons.map((cp) => (
                    <tr key={cp.code} className="hover:bg-zinc-900/30">
                      <td className="p-4 font-bold text-white text-sm">{cp.code}</td>
                      <td className="p-4 uppercase text-zinc-450">{cp.type}</td>
                      <td className="p-4 font-bold">{cp.type === 'percentage' ? `${cp.value}%` : `₹${cp.value.toLocaleString('en-IN')}`}</td>
                      <td className="p-4">₹{cp.minSpend.toLocaleString('en-IN')}</td>
                      <td className="p-4 text-center">
                        <button
                          type="button"
                          onClick={() => toggleCouponStatus(cp.code)}
                          className={`px-3 py-1 text-[10px] uppercase font-bold rounded-lg border transition-all ${
                            cp.isActive
                              ? 'bg-emerald-950/40 text-emerald-500 border-emerald-900/40'
                              : 'bg-zinc-900 text-zinc-550 border-zinc-850'
                          }`}
                        >
                          {cp.isActive ? 'Active' : 'Muted'}
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          type="button"
                          onClick={() => deleteCoupon(cp.code)}
                          className="bg-zinc-900 p-1.5 rounded text-zinc-500 hover:text-rose-500 hover:bg-zinc-800"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
