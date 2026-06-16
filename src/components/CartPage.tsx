import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { 
  ShoppingBag, Trash, ArrowRight, Minus, Plus, ShoppingCart, Tag, Percent 
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotals,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    coupons,
    setView,
    setSelectedCategory
  } = useAppState();

  const [codeText, setCodeText] = useState('');
  const [errStatus, setErrStatus] = useState('');
  const [successStatus, setSuccessStatus] = useState('');

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeText.trim()) return;
    const res = applyCoupon(codeText.trim());
    if (res.success) {
      setSuccessStatus(res.message);
      setErrStatus('');
      setCodeText('');
    } else {
      setErrStatus(res.message);
      setSuccessStatus('');
    }
  };

  const handleClearCoupon = () => {
    removeCoupon();
    setSuccessStatus('');
    setErrStatus('');
  };

  if (cartCount === 0) {
    return (
      <div className="bg-black text-white min-h-[70vh] flex flex-col items-center justify-center space-y-6 font-sans py-16 px-4">
        <div className="bg-zinc-950 border border-zinc-900 w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg shadow-black">
          <ShoppingBag className="w-10 h-10 text-rose-500 animate-pulse" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black uppercase tracking-tight">Your Cart Bag is Empty</h2>
          <p className="text-zinc-500 text-sm max-w-sm mx-auto">
            Fuel your performance! Add high-quality isolates, creatine, or protein bars to kick off training.
          </p>
        </div>
        <button
          onClick={() => { setSelectedCategory(null); setView('shop'); }}
          className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold font-sans tracking-widest uppercase rounded-lg py-3.5 px-8 transition-colors cursor-pointer"
        >
          Explore Supplements Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen py-12 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl font-black uppercase tracking-tight">
          Athletes Locker Bag <span className="font-mono text-xs text-zinc-550 tracking-widest block font-medium mt-1">({cartCount} Item{cartCount !== 1 ? 's' : ''} prepped)</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Columns 1: Basket list rows */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 sm:p-6 divide-y divide-zinc-900">
              {cart.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-5 first:pt-0 last:pb-0 gap-4">
                  
                  {/* Info block */}
                  <div className="flex gap-4">
                    <div 
                      className="w-16 h-20 rounded-lg bg-zinc-905 flex items-center justify-center p-3 border border-zinc-800 shrink-0 select-none shadow"
                      style={{ background: item.product.images[0] }}
                    >
                      {/* Can canister shape */}
                      <div className="w-6 h-9 rounded-xs bg-black/60 shadow border border-zinc-700"></div>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">{item.product.category}</span>
                      <h3 
                        onClick={() => { setView('product-detail'); }}
                        className="font-bold text-white text-base hover:text-rose-500 cursor-pointer transition-colors leading-snug line-clamp-1"
                      >
                        {item.product.name}
                      </h3>
                      <div className="flex gap-3 text-xs text-zinc-450 font-mono">
                        <span>Flavour: <strong className="text-zinc-300">{item.selectedFlavour}</strong></span>
                        <span>Size: <strong className="text-zinc-300">{item.selectedSize}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and increments row block */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    
                    {/* Increments */}
                    <div className="flex items-center bg-black border border-zinc-850 p-1 rounded-lg">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(index, item.quantity - 1)}
                        className="p-1 hover:text-white hover:bg-zinc-900 rounded text-zinc-500"
                        title="Reduce"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-mono font-bold w-8 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(index, item.quantity + 1)}
                        className="p-1 hover:text-white hover:bg-zinc-900 rounded text-zinc-500"
                        title="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Cost ledger */}
                    <div className="text-right flex flex-col font-mono text-sm leading-tight shrink-0">
                      <span className="text-white font-extrabold">₹{(item.product.discountPrice * item.quantity).toLocaleString('en-IN')}</span>
                      <span className="text-zinc-650 text-[10px]">₹{item.product.discountPrice.toLocaleString('en-IN')} Each</span>
                    </div>

                    {/* Trash remove */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(index)}
                      className="bg-zinc-900 hover:bg-neutral-950 p-2 rounded-lg text-zinc-500 hover:text-rose-500 transition-colors"
                      title="Remove Item Row"
                    >
                      <Trash className="w-4.5 h-4.5" />
                    </button>

                  </div>

                </div>
              ))}
            </div>

            {/* Shopping helper return button */}
            <button
              onClick={() => { setSelectedCategory(null); setView('shop'); }}
              className="text-xs font-mono tracking-widest text-rose-500 hover:text-white transition-colors uppercase pt-2 cursor-pointer font-bold inline-block"
            >
              ← Back and add other supplement units
            </button>
          </div>

          {/* Column 2: Coupon Codes and pricing matrix box */}
          <div className="lg:col-span-4 space-y-6">
                   {/* Promo widget */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-1.5 pb-2 border-b border-zinc-900">
                <Tag className="w-4 h-4 text-rose-500" />
                <h3 className="text-xs font-black uppercase tracking-widest">Apply Active Promo Codes</h3>
              </div>

              {appliedCoupon ? (
                <div className="bg-rose-955/20 border border-rose-900/40 p-3 rounded-lg flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold">
                    <Percent className="w-4 h-4 shrink-0" />
                    <div>
                      <strong className="block font-mono text-xs">{appliedCoupon.code} Locked</strong>
                      <span className="text-[10px] text-zinc-400">{appliedCoupon.description}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearCoupon}
                    className="text-zinc-500 hover:text-white font-bold"
                  >
                    Clear
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-3">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="e.g. FIT2SCOOP, GETSCOOP10"
                      value={codeText}
                      onChange={(e) => setCodeText(e.target.value.toUpperCase())}
                      className="bg-zinc-900 border border-zinc-800 text-xs text-white rounded-l-lg py-2.5 px-3 focus:outline-none w-full"
                    />
                    <button
                      type="submit"
                      className="bg-zinc-900 hover:bg-rose-600 border border-zinc-800 text-white rounded-r-lg px-4 text-xs font-bold transition-all uppercase tracking-wider shrink-0"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Preloaded quick coupon chips */}
                  <div className="space-y-1.5 pt-1 border-t border-zinc-900 font-mono text-[9px]">
                    <span className="text-zinc-550 block uppercase tracking-widest font-bold">Recommended Vouchers:</span>
                    {coupons.filter(c => c.isActive).map(c => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          const res = applyCoupon(c.code);
                          if (res.success) {
                            setSuccessStatus(res.message);
                            setErrStatus('');
                          } else {
                            setErrStatus(res.message);
                            setSuccessStatus('');
                          }
                        }}
                        className="flex justify-between items-center text-zinc-400 hover:text-white bg-zinc-900/40 hover:bg-zinc-905 p-1.5 rounded w-full text-left"
                      >
                        <span className="font-bold underline">{c.code}</span>
                        <span className="text-[8px] text-zinc-550 truncate">{c.description}</span>
                      </button>
                    ))}
                  </div>
                </form>
              )}

              {/* Status Alert logs */}
              {errStatus && <p className="text-rose-500 text-xs font-mono bg-rose-950/20 p-2 rounded">{errStatus}</p>}
              {successStatus && <p className="text-green-400 text-xs font-mono bg-green-950/20 p-2 rounded">{successStatus}</p>}
            </div>

            {/* Price breakdown invoice */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest pb-2 border-b border-zinc-900">Summary totals</h3>
              
              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-550">Locker Basket Price:</span>
                  <span className="text-zinc-300">₹{cartTotals.subtotal.toLocaleString('en-IN')}</span>
                </div>
                
                {cartTotals.discount > 0 && (
                  <div className="flex justify-between text-rose-450">
                    <span>Discount Save:</span>
                    <span>- ₹{cartTotals.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-zinc-550">Government Tax GST (18%):</span>
                  <span className="text-zinc-300">₹{cartTotals.tax.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-550">Delhivery Transit Fees:</span>
                  <span className="text-zinc-300">
                    {cartTotals.shipping === 0 ? (
                      <em className="text-emerald-500 font-bold uppercase text-[9px] bg-emerald-950/40 px-1.5 py-0.5 rounded not-italic">FREE DELIVERY</em>
                    ) : (
                      `₹${cartTotals.shipping.toLocaleString('en-IN')}`
                    )}
                  </span>
                </div>
              </div>

              {/* Secure total line */}
              <div className="pt-3 border-t border-zinc-900 flex justify-between items-baseline font-sans">
                <span className="text-white font-black text-xs uppercase tracking-wide">Final Secured Sum:</span>
                <span className="text-rose-500 font-extrabold text-2xl font-mono">
                  ₹{cartTotals.total.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setView('checkout')}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-sans font-black py-4 px-6 rounded-lg text-sm uppercase tracking-widest border border-rose-500 shadow shadow-rose-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Proceed into secure checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <span className="text-[10px] text-zinc-550 block text-center italic">
                ✓ Free shipping auto applies above ₹999 basket purchase.
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
