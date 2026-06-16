/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useAppState, AppView } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroBanner from './components/HeroBanner';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import Checkout from './components/Checkout';
import UserDashboard from './components/UserDashboard';
import AdminPanel from './components/AdminPanel';
import AboutUs from './components/AboutUs';
import OrderSuccess from './components/OrderSuccess';
import { CATEGORIES } from './data/supplementData';
import { 
  ShieldAlert, Star, Trophy, Sparkles, CheckCircle, Flame, HelpCircle, ChevronDown, Heart, Eye, ArrowRight, Activity, Award, ShieldCheck 
} from 'lucide-react';

// Wrapper for the app rendering logic
function ECommerceLayout() {
  const {
    view,
    setView,
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    wishlist,
    recentlyViewed
  } = useAppState();

  // Shop filter and sorting states
  const [productSortBy, setProductSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');

  // FAQ accordion active state index
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Best selling products listings (Highest rating / preloaded items)
  const bestSellers = products
    .filter(p => p.rating >= 4.8)
    .slice(0, 4);

  // New arrivals listings (lowest IDs or specified labels)
  const newArrivals = products
    .filter(p => p.id === 'p1' || p.id === 'p2' || p.id === 'p5' || p.id === 'p13' || p.id === 'p14')
    .slice(0, 4);

  // Testimonial list
  const testimonials = [
    { name: 'Ritesh Deshmukh', role: 'Calisthenics Coach', text: 'I have tested nearly 15 brands over a decade. The mixability and transparency of 2ScoopNutritoon Whey Gold is unrivaled. No heavy bloating, only pure muscular gains.', rating: 5 },
    { name: 'Dr. Shruti Sen', role: 'Clinical Dietitian', text: 'The zero-lactose Pure Isolate formulation by 2ScoopNutritoon is exceptional. Patients with severe gut hypersensitivity find it digesting effortlessly. Lab testing proof is top tier.', rating: 5 },
    { name: 'Amit Bhadana', role: 'Classic Bodybuilder', text: 'ZMA Night and German Creapure are my daily staples. 2ScoopNutritoon has elevated my recovery speeds, allowing intensive heavy squats twice a week safely.', rating: 5 }
  ];

  // FAQ list matching supplement brand standards
  const faqs = [
    { q: 'How do I authenticate my 2ScoopNutritoon tubs?', a: 'Every container comes double-sealed with a scratches-authenticator QR code near the neck. Scratch to reveal the pin, scan with your smartphone to instantly verify its FSSAI batch origin.' },
    { q: 'Is shipping free across India?', a: 'Yes! Standard express prepaid delivery is entirely free on all orders valued above ₹999. A minimal ₹150 charge applies on smaller items.' },
    { q: 'Can I return an item if I dislike the taste?', a: 'We accept returns of unsealed products with active damaged arrival tickets within 7 days. For change of mind, the double inner seal must remain completely unbroken.' },
    { q: 'What makes your protein different from cheap brands?', a: 'We do not engage in "amino spiking" with cheap glycine or taurine. We source grass-fed Provon® whey imports, cross-filtered under micro-cold facilities, ensuring bio-active immunity fractions stay undenatured.' }
  ];

  // Filters shop catalog list dynamically
  const getFilteredProducts = () => {
    let result = [...products];

    // Category filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search query query
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        p => 
          p.name.toLowerCase().includes(query) || 
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Sort order
    if (productSortBy === 'price-asc') {
      result.sort((a, b) => a.discountPrice - b.discountPrice);
    } else if (productSortBy === 'price-desc') {
      result.sort((a, b) => b.discountPrice - a.discountPrice);
    } else if (productSortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden bg-black text-white font-sans selection:bg-red-650 selection:text-white">
      {/* Platform Navigation */}
      <Header />

      {/* Dynamic Screen Routing */}
      <main className="flex-grow w-full max-w-full overflow-x-hidden">
        
        {/* VIEW: HOMEPAGE */}
        {view === 'home' && (
          <div className="space-y-20 pb-20 bg-[#0a0a0a]">
            {/* Parallax Hero Segment */}
            <HeroBanner />

            {/* Featured Product Categories */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="text-center space-y-2">
                <span className="text-rose-500 font-mono text-[10px] font-bold tracking-widest uppercase">Target Training Goals</span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-none">Featured Classifications</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
                <button
                  type="button"
                  onClick={() => { setSelectedCategory(null); setView('shop'); }}
                  className={`glass-card p-4 rounded-xl text-center space-y-2 transition-all cursor-pointer ${
                    selectedCategory === null ? 'border-rose-600 red-glow' : 'border-zinc-900 hover:border-zinc-800'
                  }`}
                >
                  <Activity className="w-5 h-5 mx-auto text-rose-500" />
                  <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-zinc-300">All Items</span>
                </button>

                {CATEGORIES.map((cat, idx) => {
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => { setSelectedCategory(cat); setView('shop'); }}
                      className={`glass-card p-4 rounded-xl text-center space-y-2 transition-all cursor-pointer truncate ${
                        selectedCategory === cat ? 'border-rose-600 red-glow' : 'border-zinc-900 hover:border-zinc-800'
                      }`}
                    >
                      <Sparkles className="w-5 h-5 mx-auto text-zinc-400" />
                      <span className="block font-sans text-[10px] font-bold uppercase tracking-wider text-zinc-300 truncate" title={cat}>
                        {cat}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Best Seller products segment */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <span className="text-rose-500 font-mono text-[9px] uppercase tracking-widest font-extrabold block">Highly Acclaimed</span>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-none text-white">Best Selling Formulations</h2>
                </div>
                <button
                  onClick={() => { setSelectedCategory(null); setView('shop'); }}
                  className="text-xs font-mono tracking-widest text-zinc-400 hover:text-white uppercase flex items-center gap-1.5 cursor-pointer"
                >
                  <span>See catalog</span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-500" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {bestSellers.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>

            {/* New arrivals segment */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <span className="text-rose-500 font-mono text-[9px] uppercase tracking-widest font-extrabold block">Hot Releases</span>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-none text-white">New Formula Arrivals</h2>
                </div>
                <button
                  onClick={() => { setSelectedCategory(CATEGORIES[0]); setView('shop'); }}
                  className="text-xs font-mono tracking-widest text-zinc-400 hover:text-white uppercase flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Whey</span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-500" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {newArrivals.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>

            {/* Why Choose 2ScoopNutritoon Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="text-center space-y-2">
                <span className="text-rose-500 font-mono text-[10px] font-bold tracking-widest uppercase">Engineered Safe</span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-none">
                  WHY ATHLETES TRUST 2SCOOPNUTRITOON
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center font-sans">
                
                <div className="glass-card rounded-2xl p-6 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-rose-950/40 border border-rose-900/60 text-rose-550 flex items-center justify-center mx-auto">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm uppercase text-white">Lab Tested</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    Every batch checked by blind independent heavy metal lab scans.
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-6 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-rose-950/40 border border-rose-900/60 text-rose-550 flex items-center justify-center mx-auto">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm uppercase text-white">High Quality</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    Sourced using pure cross-flow microfiltered grass-fed imports.
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-6 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-rose-950/40 border border-rose-900/60 text-rose-550 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm uppercase text-white">Trusted Formula</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    Adhering to strict FSSAI guidelines with zero proprietary clumping.
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-6 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-rose-950/40 border border-rose-900/60 text-rose-550 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm uppercase text-white">Fast Delhivery</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    Packages processed immediately same-day from multiple national hubs.
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-6 space-y-3">
                  <div className="w-10 h-10 rounded-full bg-rose-950/40 border border-rose-900/60 text-rose-550 flex items-center justify-center mx-auto">
                    <Star className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm uppercase text-white">Secure gateway</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    Razorpay routing, COD, and instant encrypted UPI confirmations.
                  </p>
                </div>

              </div>
            </div>

            {/* Testimonials Segment */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center space-y-1">
                <span className="text-rose-500 font-mono text-[9px] uppercase tracking-widest font-extrabold block">Athlete Praise</span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-none text-white">Customer Reviews & Feedbacks</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                {testimonials.map((t, idx) => (
                  <div key={idx} className="glass-card rounded-2xl p-6 space-y-4">
                    <div className="flex gap-1 text-amber-500">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <p className="text-zinc-350 text-xs sm:text-sm leading-relaxed italic">
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-xs">
                      <div className="w-2.5 h-2.5 bg-rose-600 rounded-full shadow-sm shadow-rose-950"></div>
                      <strong className="text-zinc-200 font-bold">{t.name}</strong>
                      <span className="text-zinc-550">•</span>
                      <span className="text-zinc-550 text-[11px]">{t.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs Segment */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="text-center space-y-2">
                <span className="text-rose-500 font-mono text-[9px] uppercase tracking-widest font-extrabold block">Information Center</span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight leading-none text-white">Frequently Answered Queries</h2>
              </div>

              <div className="divide-y divide-white/5 border border-white/5 rounded-2xl overflow-hidden glass-card">
                {faqs.map((faq, idx) => {
                  const isOpen = activeFaqIndex === idx;
                  return (
                    <div key={idx} className="border-b border-white/5 last:border-0 font-sans">
                      <button
                        type="button"
                        onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                        className="w-full py-4.5 px-5 flex justify-between items-center text-left hover:bg-white/5 transition-colors cursor-pointer text-sm font-semibold text-white"
                      >
                        <span className="text-zinc-100">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-red-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isOpen && (
                        <div className="py-4 px-5 bg-black/60 text-xs text-zinc-400 border-t border-zinc-900 leading-relaxed font-sans">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* VIEW: SHOP CATALOG PAGE */}
        {view === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
              
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase">
                  <span onClick={() => { setSelectedCategory(null); setSearchQuery(''); }} className="hover:underline cursor-pointer">Shop Catalog</span>
                  {selectedCategory && (
                    <>
                      <span>/</span>
                      <span className="text-red-500">{selectedCategory}</span>
                    </>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                  {selectedCategory || 'All supplement formulations'}
                </h1>
              </div>

              {/* Sorting and filtration */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                <span className="text-zinc-500">Order By:</span>
                <select
                  value={productSortBy}
                  onChange={(e) => setProductSortBy(e.target.value as any)}
                  className="bg-zinc-950 border border-zinc-850 text-zinc-300 p-2 rounded-lg focus:outline-none uppercase font-bold"
                >
                  <option value="default">Release Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Athletes Rating</option>
                </select>

                <span className="text-zinc-700">|</span>
                <span className="text-zinc-400">{filteredProducts.length} items prepped</span>
              </div>
            </div>

            {/* Quick search indicator alert if active searches are done */}
            {searchQuery && (
              <p className="bg-zinc-950 border border-zinc-900 p-3.5 rounded-lg text-xs font-mono text-zinc-400">
                🔍 Filtering listing results matching: "<strong>{searchQuery}</strong>". 
                <button onClick={() => setSearchQuery('')} className="text-rose-500 hover:underline ml-2 uppercase font-bold">Clear Filters</button>
              </p>
            )}

            {/* Grid listings of filtered formulations */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-zinc-950 border border-dashed border-zinc-900 p-6 rounded-3xl font-mono text-zinc-500 text-sm">
                No matching supplement products found. Try adjusting terms.
                <button onClick={() => { setSelectedCategory(null); setSearchQuery(''); }} className="block bg-rose-600 hover:bg-rose-700 px-4 py-2 mt-4 mx-auto rounded text-white text-xs uppercase cursor-pointer">
                  Reset Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {/* Dynamic Recently Viewed Panel (Displaying last items accessed by user) representing High Craftsmanship */}
            {recentlyViewed && recentlyViewed.length > 0 && (
              <div className="pt-16 border-t border-zinc-900 space-y-6">
                <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest block font-bold">Your recent session trials:</span>
                <h3 className="text-lg font-black uppercase text-white font-sans">Recently Checked Supplements</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {recentlyViewed.map((rid) => {
                    const found = products.find(p => p.id === rid);
                    if (!found) return null;
                    return (
                      <div 
                        key={rid}
                        onClick={() => { setView('shop'); }} // Route selection
                        className="bg-zinc-950/40 p-3 rounded-xl border border-zinc-900 cursor-pointer flex items-center gap-2 text-xs"
                      >
                        <div className="w-8 h-10 rounded" style={{ background: found.images[0] }}></div>
                        <span className="font-bold text-zinc-300 truncate font-sans">{found.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        )}

        {/* VIEW: PRODUCT DETAIL LANDING */}
        {view === 'product-detail' && <ProductDetail />}

        {/* VIEW: SHOPPING CART BAG */}
        {view === 'cart' && <CartPage />}

        {/* VIEW: WISHLIST PORTFOLIO */}
        {view === 'wishlist' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
            <h1 className="text-3xl font-black uppercase tracking-tight">
              Elite Athlete Wishlist <span className="text-[10px] text-zinc-500 font-mono block normal-case font-medium mt-1">({wishlist.length} Items pinned)</span>
            </h1>

            {wishlist.length === 0 ? (
              <div className="text-center py-20 bg-zinc-950 border border-zinc-900 p-8 rounded-3xl text-zinc-500 text-sm font-mono leading-relaxed">
                No active training supplements pinned to your profile list yet. 
                <button
                  onClick={() => setView('shop')}
                  className="block mx-auto mt-4 bg-rose-600 hover:bg-rose-700 text-white font-mono text-xs font-bold py-2.5 px-6 rounded uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Shop Best-Sellers
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products
                  .filter(p => wishlist.includes(p.id))
                  .map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW: PROFILE / SIGNIN / CUSTOMER DASHBOARD */}
        {view === 'profile' && <UserDashboard />}

        {/* VIEW: BACK-OFFICE OPERATIONS HUB */}
        {view === 'admin-panel' && <AdminPanel />}

        {/* VIEW: ABOUT BRAND STORY */}
        {view === 'about' && <AboutUs />}

        {/* VIEW: SECURE CHECKOUTS */}
        {view === 'checkout' && <Checkout />}

        {/* VIEW: ORDER CONGRATULATIONS */}
        {view === 'order-success' && <OrderSuccess />}

      </main>

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <ECommerceLayout />
    </AppProvider>
  );
}
