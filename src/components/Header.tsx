import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { 
  ShoppingBag, Heart, User, Search, Menu, X, Dumbbell, ShieldAlert, BadgeInfo 
} from 'lucide-react';
import { CATEGORIES } from '../data/supplementData';

export default function Header() {
  const {
    setView,
    view,
    cart,
    wishlist,
    currentUser,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    logout
  } = useAppState();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const triggerSearch = (q: string) => {
    setSearchQuery(q);
    setView('shop');
  };

  const handleCategorySelect = (cat: string | null) => {
    setSelectedCategory(cat);
    setView('shop');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 text-white select-none shadow-lg">
      {/* Dynamic Announcement Ticker */}
      <div className="w-full bg-gradient-to-r from-rose-650 to-rose-750 py-2 px-4 text-center font-mono font-semibold tracking-wider text-white uppercase flex flex-col sm:flex-row items-center justify-center gap-1.5 shadow shadow-rose-950/20 text-clamp-announcement leading-tight">
        <Dumbbell className="w-3.5 h-3.5 animate-pulse text-zinc-100 shrink-0" />
        <span className="text-center">Use Coupon Code <strong className="bg-black/30 px-1.5 py-0.5 rounded text-rose-350">FIT2SCOOP</strong> for 15% Off Your Elite Stack! Free Delivery Over ₹999</span>
      </div>

      {/* Primary Header Segment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo Identity */}
        <div 
          onClick={() => { setView('home'); setSelectedCategory(null); setSearchQuery(''); }}
          className="flex items-center gap-1 cursor-pointer group shrink-0"
          id="brand-logo"
        >
          <div className="text-lg min-[360px]:text-xl sm:text-2xl md:text-3xl font-black tracking-tighter flex items-center group-hover:scale-102 transition-transform duration-300 select-none">
            <span className="text-rose-600 font-sans">2</span>
            <span className="italic text-white">Scoop</span>
            <span className="ml-1 text-[8px] min-[360px]:text-[10px] sm:text-xs md:text-sm font-black tracking-widest text-[#f8fafc] bg-rose-650/40 border border-rose-600/30 px-1 min-[360px]:px-1.5 py-0.5 rounded shadow-sm shadow-rose-950">NUTRITOON</span>
          </div>
        </div>

        {/* Center Search Bar For desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <input
            type="text"
            placeholder="Search supplements, proteins, creatine..."
            value={searchQuery}
            onChange={(e) => triggerSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2.5 pl-4 pr-10 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 transition-colors"
          />
          <Search className="absolute right-3.5 top-3 w-4 h-4 text-zinc-500 pointer-events-none" />
        </div>

        {/* Action Widgets */}
        <div className="flex items-center gap-1.5 min-[375px]:gap-2 sm:gap-4 md:gap-5">
          {/* Mobile search helper toggle */}
          <button 
            type="button"
            onClick={() => { setShowSearchBox(!showSearchBox); setView('shop'); }}
            className="md:hidden p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors"
            title="Search Products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* About us */}
          <button
            type="button"
            onClick={() => setView('about')}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all border duration-200 ${
              view === 'about' 
                ? 'bg-zinc-900 text-white border-zinc-700' 
                : 'text-zinc-400 border-transparent hover:text-white hover:bg-zinc-950'
            }`}
          >
            <BadgeInfo className="w-4 h-4 text-rose-500" />
            <span>Our Brand Story</span>
          </button>

          {/* Wishlist Icon - Hidden on Mobile (< 768px) */}
          <button 
            type="button"
            onClick={() => setView('wishlist')}
            className="hidden md:flex relative p-2 text-zinc-400 hover:text-rose-500 hover:bg-zinc-900 rounded-lg transition-all duration-200"
            title="My Wishlist"
          >
            <Heart className={`w-[22px] h-[22px] ${wishlist.length > 0 ? 'fill-rose-600 text-rose-600' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-600 text-white font-sans font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-black scale-90">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag Icon - Visible on Mobile and Desktop */}
          <button 
            type="button"
            onClick={() => setView('cart')}
            className="relative p-1.5 min-[375px]:p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-all duration-200 shrink-0"
            title="Shopping Cart"
          >
            <ShoppingBag className={`w-5 h-5 min-[375px]:w-[22px] min-[375px]:h-[22px] ${cartCount > 0 ? 'text-rose-600' : ''}`} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-600 text-white font-sans font-bold text-[9px] min-[375px]:text-[10px] w-4 min-[375px]:w-4.5 h-4 min-[375px]:h-4.5 rounded-full flex items-center justify-center border border-black animate-pulse overflow-hidden">
                {cartCount}
              </span>
            )}
          </button>

          {/* Account/Admin Portal Section - Hidden on Mobile (< 768px) */}
          <div className="hidden md:flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setView(currentUser.role === 'Admin' ? 'admin-panel' : 'profile')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border ${
                    currentUser.role === 'Admin'
                      ? 'bg-rose-950/50 text-rose-400 border-rose-900/60 hover:bg-rose-950 hover:text-rose-300'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800'
                  } transition-all`}
                >
                  {currentUser.role === 'Admin' ? (
                    <ShieldAlert className="w-4 h-4 text-rose-500 animate-pulse" />
                  ) : (
                    <User className="w-4 h-4 text-rose-500" />
                  )}
                  <span className="max-w-[70px] sm:max-w-[120px] truncate">
                    {currentUser.role === 'Admin' ? 'Admin Hub' : currentUser.name.split(' ')[0]}
                  </span>
                </button>
                <button 
                  type="button"
                  onClick={logout}
                  className="text-xs text-zinc-550 hover:text-zinc-300 px-1 py-1 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setView('profile')}
                className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 hover:red-glow text-white px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all border border-transparent shadow shadow-red-950"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Burger Menu Button - Visible on Mobile (< 768px) */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 min-[375px]:p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg md:hidden shrink-0"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search */}
      {showSearchBox && (
        <div className="md:hidden bg-[#0c0c0c] border-t border-zinc-900 p-3 flex">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search supplement inventory..."
              value={searchQuery}
              onChange={(e) => triggerSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-4 pr-10 text-sm text-zinc-200 focus:outline-none focus:border-rose-600"
              autoFocus
            />
            <Search className="absolute right-3 top-2.5 w-4.5 h-4.5 text-zinc-500" />
          </div>
        </div>
      )}

      {/* Desktop Inline Category Bar */}
      <div className="hidden lg:block bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-1.5 py-2.5 overflow-x-auto select-none no-scrollbar">
          <button
            type="button"
            onClick={() => handleCategorySelect(null)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 border ${
              selectedCategory === null 
                ? 'bg-rose-600 border-rose-600 text-white font-semibold shadow-sm shadow-rose-950/40' 
                : 'text-zinc-400 border-white/5 hover:text-white hover:bg-rose-600/30 hover:border-rose-600/40'
            }`}
          >
            All Products
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 truncate whitespace-nowrap border ${
                selectedCategory === cat 
                  ? 'bg-rose-600 border-rose-600 text-white font-semibold shadow-sm shadow-rose-950/40' 
                  : 'text-zinc-400 border-white/5 hover:text-white hover:bg-rose-600/30 hover:border-rose-600/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Drawer (Categories and user actions) */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-800 shadow-2xl p-5 z-40 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase block mb-3">Browse Categories</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleCategorySelect(null)}
                  className={`px-3 py-2 text-xs rounded-lg font-mono tracking-wider uppercase text-left transition-all ${
                    selectedCategory === null ? 'bg-white text-black font-bold' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  All Products
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategorySelect(cat)}
                    className={`px-3 py-2 text-xs rounded-lg font-mono tracking-wider uppercase text-left transition-all truncate ${
                      selectedCategory === cat ? 'bg-rose-600 text-white font-bold' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Wishlist Link inside Mobile Menu */}
            <div className="border-t border-zinc-900 pt-4 flex flex-col gap-3">
              <span className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase block">My Favorites & Info</span>
              
              <button
                type="button"
                onClick={() => { setView('wishlist'); setMobileMenuOpen(false); }}
                className="flex items-center justify-between w-full text-zinc-300 hover:text-white text-sm font-medium py-1.5"
              >
                <div className="flex items-center gap-2">
                  <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-rose-600 text-rose-600' : 'text-rose-500'}`} />
                  <span>My Wishlist</span>
                </div>
                {wishlist.length > 0 && (
                  <span className="bg-rose-600 text-white font-sans font-bold text-[10px] px-2 py-0.5 rounded-full">
                    {wishlist.length} Items
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => { setView('about'); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 text-zinc-300 hover:text-white text-sm font-medium py-1.5"
              >
                <BadgeInfo className="w-4 h-4 text-rose-500" />
                <span>Our Brand Story & Standards</span>
              </button>
            </div>

            {/* Account/Admin Actions inside Mobile Menu */}
            {currentUser ? (
              <div className="border-t border-zinc-900 pt-4 flex flex-col gap-3">
                <span className="text-zinc-500 font-mono text-[10px] tracking-widest uppercase block">Athlete Profile</span>
                
                <div className="flex items-center justify-between bg-zinc-900/50 p-3 rounded-xl border border-zinc-900">
                  <div className="flex items-center gap-2">
                    {currentUser.role === 'Admin' ? (
                      <ShieldAlert className="w-4 h-4 text-rose-500 animate-pulse" />
                    ) : (
                      <User className="w-4 h-4 text-rose-500" />
                    )}
                    <div className="text-xs">
                      <span className="block font-bold text-white truncate max-w-[150px]">{currentUser.name}</span>
                      <span className="block text-[9px] text-zinc-550 uppercase font-mono">{currentUser.role} Account</span>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setView(currentUser.role === 'Admin' ? 'admin-panel' : 'profile');
                      setMobileMenuOpen(false);
                    }}
                    className="text-[10px] bg-rose-600/20 text-rose-450 px-2.5 py-1 rounded-md font-mono font-bold uppercase hover:bg-rose-600 hover:text-white transition-colors"
                  >
                    Enter Hub
                  </button>
                </div>
                
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-zinc-900 hover:bg-zinc-850 text-zinc-350 text-xs font-mono font-bold py-2.5 rounded-lg uppercase tracking-wider transition-colors text-center"
                >
                  Sign Out Account
                </button>
              </div>
            ) : (
              <div className="border-t border-zinc-900 pt-4">
                <button
                  type="button"
                  onClick={() => { setView('profile'); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-all shadow shadow-red-950"
                >
                  <User className="w-4 h-4" />
                  <span>Authenticate Athlete Profile</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
