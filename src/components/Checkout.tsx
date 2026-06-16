import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { Address, Coupon } from '../types';
import { 
  CreditCard, ShieldCheck, Mail, MapPin, Tag, Percent, ClipboardList, Info, Sparkles 
} from 'lucide-react';

export default function Checkout() {
  const {
    cart,
    currentUser,
    cartTotals,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    coupons,
    createOrder,
    navigateToOrder,
    saveAddress
  } = useAppState();

  // Address variables
  const [useSavedAddressId, setUseSavedAddressId] = useState<string>(
    currentUser?.addresses.find(a => a.isDefault)?.id || 'new'
  );

  // Address Form State
  const [addrName, setAddrName] = useState(currentUser?.name || '');
  const [addrLine1, setAddrLine1] = useState('');
  const [addrLine2, setAddrLine2] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrState, setAddrState] = useState('');
  const [addrPostal, setAddrPostal] = useState('');
  const [addrPhone, setAddrPhone] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  
  // Card Details State
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  
  // UPI State
  const [upiID, setUpiID] = useState('');

  // Coupon text box
  const [couponText, setCouponText] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cart Empty checks
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-white">
        <ClipboardList className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-pulse" />
        <h2 className="text-xl font-bold">Your Checkout Bag is Empty</h2>
        <p className="text-zinc-500 text-sm mt-1">Please add items into your shopping bag first to perform checkout.</p>
      </div>
    );
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponText.trim()) return;
    const res = applyCoupon(couponText.trim());
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponError('');
      setCouponText('');
    } else {
      setCouponError(res.message);
      setCouponSuccess('');
    }
  };

  const clearCouponState = () => {
    removeCoupon();
    setCouponError('');
    setCouponSuccess('');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let finalAddress: Address;

    if (useSavedAddressId !== 'new' && currentUser) {
      const match = currentUser.addresses.find(a => a.id === useSavedAddressId);
      if (match) {
        finalAddress = match;
      } else {
        // Fallback
        finalAddress = {
          id: 'addr-quick',
          name: addrName || currentUser.name,
          addressLine1: addrLine1 || 'Main Lobby',
          city: addrCity || 'Mumbai',
          state: addrState || 'Maharashtra',
          postalCode: addrPostal || '400013',
          country: 'India',
          phone: addrPhone || '+91 99999 88888',
          isDefault: false
        };
      }
    } else {
      // Validate shipping fields
      if (!addrName || !addrLine1 || !addrCity || !addrState || !addrPostal || !addrPhone) {
        setCouponError('Please fill out all mandatory shipping form fields.');
        setIsSubmitting(false);
        return;
      }

      finalAddress = {
        id: 'new-' + Date.now(),
        name: addrName,
        addressLine1: addrLine1,
        addressLine2: addrLine2,
        city: addrCity,
        state: addrState,
        postalCode: addrPostal,
        country: 'India',
        phone: addrPhone,
        isDefault: !currentUser?.addresses || currentUser.addresses.length === 0
      };

      // If user wants to save this address to their profile
      if (currentUser) {
        saveAddress(finalAddress);
      }
    }

    // Capture payment instrument mapping strings
    let instrumentDesc = paymentMethod;
    if (paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') {
      instrumentDesc = `${paymentMethod} (ending in ${cardNumber.slice(-4) || '4242'})`;
    } else if (paymentMethod === 'UPI') {
      instrumentDesc = `UPI Address: ${upiID || 'athletic@ybl'}`;
    }

    setTimeout(() => {
      const created = createOrder(finalAddress, instrumentDesc);
      setIsSubmitting(false);
      navigateToOrder(created.id);
    }, 1500);
  };

  return (
    <div className="bg-black text-white min-h-screen py-12 font-sans selection:bg-red-650 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-8">
          Secure Athletic Checkout <span className="text-red-500 font-mono text-sm tracking-widest block font-medium mt-1">✓ Razorpay Payment Channel Prepped</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Checkout Fields Form (Column 1) */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
            
            {/* Address Area */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-900">
                <MapPin className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-bold uppercase tracking-wide">1. Shipping Logistics</h2>
              </div>

              {currentUser && currentUser.addresses.length > 0 && (
                <div className="space-y-3">
                  <label className="block text-zinc-400 text-xs font-mono uppercase">Select Delivered Address</label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {currentUser.addresses.map((addr) => (
                      <label 
                        key={addr.id}
                        className={`border rounded-xl p-4 flex items-start gap-3 cursor-pointer transition-all ${
                          useSavedAddressId === addr.id
                            ? 'border-red-600 bg-red-950/10'
                            : 'border-zinc-850 bg-black/40 hover:border-zinc-750'
                        }`}
                      >
                        <input
                          type="radio"
                          name="selected_address_id"
                          checked={useSavedAddressId === addr.id}
                          onChange={() => setUseSavedAddressId(addr.id)}
                          className="mt-1 accent-red-650"
                        />
                        <div className="text-xs">
                          <span className="font-bold text-white block mb-0.5">{addr.name} ({addr.phone})</span>
                          <span className="text-zinc-400 block">{addr.addressLine1}</span>
                          {addr.addressLine2 && <span className="text-zinc-400 block">{addr.addressLine2}</span>}
                          <span className="text-zinc-500 block mt-0.5">{addr.city}, {addr.state} - {addr.postalCode}</span>
                        </div>
                      </label>
                    ))}
                    <label 
                      className={`border rounded-xl p-4 flex items-start gap-3 cursor-pointer transition-all ${
                        useSavedAddressId === 'new'
                          ? 'border-red-650 bg-red-950/10'
                          : 'border-zinc-855 bg-black/40 hover:border-zinc-750'
                      }`}
                    >
                      <input
                        type="radio"
                        name="selected_address_id"
                        checked={useSavedAddressId === 'new'}
                        onChange={() => setUseSavedAddressId('new')}
                        className="mt-1 accent-red-650"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-white block leading-none">Deliver into Another Location</span>
                        <span className="text-zinc-500 mt-1 block">Fill in physical delivery fields manually below</span>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Manual Shipping Fields */}
              {useSavedAddressId === 'new' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="sm:col-span-2">
                    <label className="block text-zinc-400 text-[10px] font-mono uppercase mb-1">Receipt Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vansh Tomar"
                      value={addrName}
                      onChange={(e) => setAddrName(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-sm text-white rounded-lg p-2.5 w-full focus:outline-none focus:border-rose-600"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-zinc-400 text-[10px] font-mono uppercase mb-1">Address Flat, Plot, Street *</label>
                    <input
                      type="text"
                      required
                      placeholder="Line 1"
                      value={addrLine1}
                      onChange={(e) => setAddrLine1(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-sm text-white rounded-lg p-2.5 w-full focus:outline-none focus:border-rose-600 mb-2"
                    />
                    <input
                      type="text"
                      placeholder="Line 2 (Building details, area, sector, landmark)"
                      value={addrLine2}
                      onChange={(e) => setAddrLine2(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-sm text-white rounded-lg p-2.5 w-full focus:outline-none focus:border-rose-600"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-[10px] font-mono uppercase mb-1">City / Town *</label>
                    <input
                      type="text"
                      required
                      placeholder="Mumbai, Noida, etc."
                      value={addrCity}
                      onChange={(e) => setAddrCity(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-sm text-white rounded-lg p-2.5 w-full focus:outline-none focus:border-rose-600"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-[10px] font-mono uppercase mb-1">State / Province *</label>
                    <input
                      type="text"
                      required
                      placeholder="Maharashtra, UP, etc."
                      value={addrState}
                      onChange={(e) => setAddrState(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-sm text-white rounded-lg p-2.5 w-full focus:outline-none focus:border-rose-600"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-[10px] font-mono uppercase mb-1">Postal Pincode *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="e.g. 400013"
                      value={addrPostal}
                      onChange={(e) => setAddrPostal(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-sm text-white rounded-lg p-2.5 w-full focus:outline-none focus:border-rose-600"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 text-[10px] font-mono uppercase mb-1">Mobile Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      value={addrPhone}
                      onChange={(e) => setAddrPhone(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-sm text-white rounded-lg p-2.5 w-full focus:outline-none focus:border-rose-600"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method Selector */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-zinc-900">
                <CreditCard className="w-5 h-5 text-red-500" />
                <h2 className="text-lg font-bold uppercase tracking-wide">2. Secured Settlement Options</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'Credit Card', desc: 'Prepaid Visa / Mastercard / Amex' },
                  { name: 'Debit Card', desc: 'Secure RuPay, Maestro & Visa chips' },
                  { name: 'UPI', desc: 'Instant settlement via GPay/PhonePe' },
                  { name: 'Net Banking', desc: 'All nationalized Indian banks' },
                  { name: 'Cash On Delivery', desc: 'Additional ₹50 COD fees may apply' }
                ].map((pm) => (
                  <label 
                    key={pm.name}
                    className={`border rounded-xl p-4 flex items-start gap-3 cursor-pointer transition-all ${
                      paymentMethod === pm.name
                        ? 'border-red-600 bg-red-950/10'
                        : 'border-zinc-850 bg-black/40 hover:border-zinc-750'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_strategy"
                      checked={paymentMethod === pm.name}
                      onChange={() => setPaymentMethod(pm.name)}
                      className="mt-1 accent-red-650"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-white block mb-0.5">{pm.name}</span>
                      <span className="text-zinc-500">{pm.desc}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Form Input parameters for active method */}
              {(paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') && (
                <div className="bg-zinc-950/80 p-4 border border-zinc-900 rounded-xl space-y-4 pt-4">
                  <span className="text-xs font-mono font-bold tracking-wider text-rose-500 uppercase block">Provide Card Details (Secure 256-bit encryption):</span>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-0.5">Card Number</label>
                      <input
                        type="text"
                        required
                        placeholder="4242 •••• •••• 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="bg-zinc-900 border border-zinc-850 rounded-lg p-2.5 text-xs text-white focus:outline-none w-full"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-0.5">Expiry Date</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="bg-zinc-900 border border-zinc-850 rounded-lg p-2.5 text-xs text-white focus:outline-none w-full text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-rose-500 text-[10px] font-mono uppercase mb-0.5">Secure CVV</label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          placeholder="•••"
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value)}
                          className="bg-zinc-900 border border-zinc-850 rounded-lg p-2.5 text-xs text-white focus:outline-none w-full text-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'UPI' && (
                <div className="bg-zinc-950/80 p-4 border border-zinc-900 rounded-xl space-y-3">
                  <span className="text-xs font-mono font-bold tracking-wider text-rose-500 uppercase block">Provide UPI Virtual Payment Address (VPA):</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. vanshtomar@upi"
                    value={upiID}
                    onChange={(e) => setUpiID(e.target.value)}
                    className="bg-zinc-900 border border-zinc-850 rounded-lg p-2.5 text-xs text-white focus:outline-none w-full"
                  />
                  <p className="text-[10px] text-zinc-500 font-sans">
                    ✓ You will receive a request inside your BHIM UPI app (like GPay, PhonePe, Paytm) to complete payment.
                  </p>
                </div>
              )}

              {paymentMethod === 'Net Banking' && (
                <div className="bg-zinc-950/80 p-4 border border-zinc-900 rounded-xl">
                  <span className="text-xs font-mono text-zinc-400 uppercase block mb-1">Select Bank of Choice:</span>
                  <select className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 p-2.5 rounded-lg w-full focus:outline-none">
                    <option>State Bank of India (SBI)</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {paymentMethod === 'Cash On Delivery' && (
                <div className="bg-orange-950/10 border border-orange-900/40 p-4 rounded-xl flex items-start gap-2 max-w-xl">
                  <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-zinc-400 text-xs font-sans">
                    Cash on Delivery orders are subject to telephonic verification prior to dispatch. Please make sure your listed mobile contact is responsive.
                  </p>
                </div>
              )}

              <button
                maxLength={40}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-sans font-black py-4 px-6 rounded-lg text-sm uppercase tracking-widest border border-rose-500 shadow shadow-rose-950 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Locking in order parameters...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>Authorize & Place Order</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Right Column: Order Summary, Coupon codes & Checkout Item lists */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Coupon Application widget */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-1.5 pb-2 border-b border-zinc-900">
                <Tag className="w-4 h-4 text-red-500" />
                <h3 className="text-sm font-black uppercase tracking-wide">Elite Applied Coupon Code</h3>
              </div>

              {appliedCoupon ? (
                <div className="bg-red-950/20 border border-red-900/60 p-3 rounded-lg flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-red-400">
                    <Percent className="w-4 h-4 shrink-0" />
                    <div>
                      <strong className="block font-mono text-xs">{appliedCoupon.code} Locked</strong>
                      <span className="text-[10px] text-zinc-400">{appliedCoupon.description}</span>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={clearCouponState}
                    className="text-zinc-500 hover:text-white font-bold text-xs"
                    title="Remove Coupon"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-3">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="e.g. FIT2SCOOP, GETSCOOP10"
                      value={couponText}
                      onChange={(e) => setCouponText(e.target.value.toUpperCase())}
                      className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-l-lg py-2.5 px-3 focus:outline-none w-full"
                    />
                    <button
                      type="submit"
                      className="bg-zinc-900 hover:bg-rose-600 border border-zinc-800 text-white rounded-r-lg px-4 text-xs font-bold transition-colors uppercase tracking-wider shrink-0"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Coupon guidelines selector list */}
                  <div className="space-y-1 pt-1.5 border-t border-zinc-900">
                    <span className="text-[10px] text-zinc-550 font-mono tracking-widest block uppercase">Preloaded Active Codes:</span>
                    {coupons.filter(c => c.isActive).map(c => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          const res = applyCoupon(c.code);
                          if (res.success) {
                            setCouponSuccess(res.message);
                            setCouponError('');
                          } else {
                            setCouponError(res.message);
                            setCouponSuccess('');
                          }
                        }}
                        className="flex items-center justify-between text-[10px] text-zinc-400 hover:text-white bg-zinc-900/40 hover:bg-zinc-900 p-1.5 rounded w-full text-left font-mono"
                      >
                        <span className="font-bold underline">{c.code}</span>
                        <span className="text-zinc-500 text-[9px]">{c.description.replace('OFF on ', ' OFF on ')}</span>
                      </button>
                    ))}
                  </div>
                </form>
              )}

              {/* Coupon Status Message Alerts */}
              {couponError && (
                <p className="text-red-500 text-xs font-mono bg-red-950/20 p-2 rounded">{couponError}</p>
              )}
              {couponSuccess && (
                <p className="text-green-400 text-xs font-mono bg-green-950/20 p-2 rounded">{couponSuccess}</p>
              )}
            </div>

            {/* Dynamic Items list in checkout */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wide pb-2 border-b border-zinc-900">
                Locker bag items ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h3>

              <div className="divide-y divide-zinc-900 space-y-3 max-h-[220px] overflow-y-auto no-scrollbar pr-1">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-3 justify-between text-xs pt-2.5">
                    <div className="flex gap-2">
                      <div 
                        className="w-10 h-12 rounded bg-zinc-900 shrink-0 flex items-center justify-center border border-zinc-850"
                        style={{ background: item.product.images[0] }}
                      >
                        <div className="w-4 h-6 rounded-xs bg-black/60 shadow border border-zinc-800"></div>
                      </div>
                      <div>
                        <span className="text-white font-bold block line-clamp-1">{item.product.name}</span>
                        <span className="text-zinc-500 block font-mono text-[10px]">{item.selectedFlavour} | {item.selectedSize}</span>
                        <span className="text-zinc-400 block font-sans text-[11px] font-semibold mt-0.5">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-mono text-white font-bold ml-2">
                      ₹{(item.product.discountPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Invoice Breakdown calculation ledger */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-6 space-y-3.5 text-sm">
              <h3 className="text-sm font-black uppercase tracking-wide pb-2 border-b border-zinc-900">
                Secured Invoice Summary
              </h3>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Subtotal Basket:</span>
                  <span className="text-zinc-300">₹{cartTotals.subtotal.toLocaleString('en-IN')}</span>
                </div>
                
                {cartTotals.discount > 0 && (
                  <div className="flex justify-between text-red-400">
                    <span>Coupon Save Deductions:</span>
                    <span>- ₹{cartTotals.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-zinc-500">Government GST Tax (18%):</span>
                  <span className="text-zinc-300">₹{cartTotals.tax.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Verified Shipping Fee:</span>
                  <span className="text-zinc-300">
                    {cartTotals.shipping === 0 ? (
                      <strong className="text-emerald-500 font-bold uppercase text-[10px] bg-emerald-950 px-1 py-0.5 rounded">FREE SHIPPING</strong>
                    ) : (
                      `₹${cartTotals.shipping.toLocaleString('en-IN')}`
                    )}
                  </span>
                </div>
              </div>

              {/* Total Row */}
              <div className="border-t border-zinc-900 pt-3 flex justify-between items-baseline font-sans">
                <span className="text-white font-black text-xs uppercase tracking-wider">Secured Total Payment:</span>
                <span className="text-red-500 font-extrabold text-2xl font-mono">
                  ₹{cartTotals.total.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="text-[10px] text-zinc-550 italic font-sans text-center bg-black/40 p-2.5 rounded-lg border border-zinc-900">
                ✓ Prepped Razorpay checkout interfaces can automatically bind this calculated ₹{cartTotals.total.toLocaleString('en-IN')} payload instantly.
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
