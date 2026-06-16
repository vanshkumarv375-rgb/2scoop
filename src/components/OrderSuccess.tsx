import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { CheckCircle, Printer, Download, MapPin, ClipboardList, ShoppingCart } from 'lucide-react';

export default function OrderSuccess() {
  const {
    activeOrderId,
    orders,
    setView,
    setSelectedCategory
  } = useAppState();

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const order = orders.find(o => o.id === activeOrderId);

  // Fallback
  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-white">
        <ClipboardList className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-bounce" />
        <h2 className="text-xl font-bold">Booking Details Not Found</h2>
        <p className="text-zinc-500 text-sm mt-1">We can't find this specific invoice record in our system.</p>
        <button
          onClick={() => setView('home')}
          className="mt-4 bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded text-white font-mono text-xs uppercase"
        >
          Return to Hub
        </button>
      </div>
    );
  }

  const triggerDownloadSimulation = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      alert(`Invoice ${order.orderNumber}.pdf successfully compiled and downloaded to your local device!`);
    }, 1500);
  };

  return (
    <div className="bg-black text-white min-h-screen py-16 font-sans select-none selection:bg-rose-650 uppercase-disabled">
      <div className="max-w-3xl mx-auto px-4 space-y-12">
        
        {/* Top Success Panel */}
        <div className="text-center space-y-3">
          <div className="inline-flex bg-green-950/20 text-green-500 border border-green-900/60 p-4 rounded-3xl animate-bounce">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white leading-none">ORDER CONFIRMED</h1>
          <p className="text-zinc-400 text-sm max-w-sm mx-auto">
            Welcome to the elite club! Your order <strong className="text-white font-mono">{order.orderNumber}</strong> has been successfully booked to our logistics facility.
          </p>
        </div>

        {/* Invoice Specification sheet */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
          <span className="absolute top-6 right-6 text-[10px] font-mono text-zinc-650 tracking-wider">OFFICIAL RECIPIENT</span>
          
          <div className="flex items-center gap-2 border-b border-zinc-900 pb-4">
            <div className="bg-rose-600 text-white px-2 py-0.5 rounded font-black italic text-xs">2S</div>
            <strong className="text-white font-sans text-lg tracking-wider uppercase font-black">2ScoopNutritoon CO. INVOICE</strong>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono leading-relaxed pt-2 border-b border-zinc-900 pb-4">
            <div>
              <span className="text-zinc-550 uppercase block font-bold">Booking Details:</span>
              <span className="text-zinc-300 block mt-0.5">Order No: <strong>{order.orderNumber}</strong></span>
              <span className="text-zinc-300 block">ID Reference: {order.id}</span>
              <span className="text-zinc-300 block">Registered on: {new Date(order.date).toLocaleDateString()}</span>
            </div>
            
            <div>
              <span className="text-zinc-550 uppercase block font-bold">Settlement Method:</span>
              <span className="text-zinc-300 block mt-0.5">{order.paymentMethod}</span>
              <span className="text-zinc-300 block">Status: <strong className="text-rose-500 uppercase">{order.paymentStatus}</strong></span>
            </div>
          </div>

          {/* Shipping and Billing addresses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed pt-2 border-b border-zinc-900 pb-4">
            <div>
              <span className="text-zinc-550 font-mono uppercase block font-bold mb-1">Delivered Shipping Address:</span>
              <div className="text-zinc-300 font-sans">
                <span className="font-bold text-white block">{order.shippingAddress.name}</span>
                <span className="block">{order.shippingAddress.addressLine1}</span>
                {order.shippingAddress.addressLine2 && <span className="block">{order.shippingAddress.addressLine2}</span>}
                <span className="text-zinc-400 block font-mono text-[11px]">{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}</span>
                <span className="text-zinc-400 block font-mono text-[11px] mt-0.5">📞 {order.shippingAddress.phone}</span>
              </div>
            </div>

            <div>
              <span className="text-zinc-550 font-mono uppercase block font-bold mb-1">Billing Office:</span>
              <div className="text-zinc-400 font-sans">
                <span className="font-bold text-white block">2ScoopNutritoon Labs India Pvt. Ltd.</span>
                <span className="block">High-Performance Tech Arcade</span>
                <span className="block">Phase II, Midc Industrial Hub</span>
                <span className="text-zinc-500 block font-mono text-[11px]">Mumbai, Maharashtra - 400013</span>
                <span className="text-zinc-500 block font-mono text-[11px]">FSSAI LIC: #11526999000142</span>
              </div>
            </div>
          </div>

          {/* Ordered spec list row */}
          <div className="space-y-3 pt-2">
            <span className="text-zinc-550 font-mono uppercase block font-bold text-xs">Purchased Formulations:</span>
            
            <div className="divide-y divide-zinc-900 border border-zinc-900 rounded-xl p-4 bg-black/40">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-xs py-2.5 first:pt-0 last:pb-0">
                  <div>
                    <span className="text-white font-sans font-bold block">{item.productName}</span>
                    <span className="text-zinc-500 font-mono text-[10px]">{item.selectedFlavour} | {item.selectedSize}</span>
                  </div>
                  <div className="text-right font-mono text-zinc-300">
                    <span>{item.quantity} × ₹{item.price.toLocaleString('en-IN')}</span>
                    <span className="text-white font-bold block">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price breakdowns invoice totals */}
          <div className="pt-2 border-t border-zinc-900 space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-zinc-500">Subtotal Price:</span>
              <span className="text-zinc-300">₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>

            {order.discountAmount > 0 && (
              <div className="flex justify-between text-rose-400">
                <span>Coupon Discount Deductions:</span>
                <span>- ₹{order.discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-zinc-500">Government GST Tax (18%):</span>
              <span className="text-zinc-300">₹{order.tax.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Logistics Transit Fee:</span>
              <span className="text-zinc-300">
                {order.shippingCharge === 0 ? (
                  <strong className="text-emerald-500 uppercase text-[9px] bg-emerald-950 px-1 py-0.5 rounded">FREE SHIPPING</strong>
                ) : (
                  `₹${order.shippingCharge.toLocaleString('en-IN')}`
                )}
              </span>
            </div>

            <div className="flex justify-between items-baseline pt-3 border-t border-zinc-900 font-sans">
              <span className="text-white font-black text-xs uppercase tracking-wider">Final Settle Sum:</span>
              <span className="text-rose-500 font-black text-xl font-mono">₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Download and print buttons action row */}
          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-900 font-mono text-xs">
            <button
              onClick={triggerDownloadSimulation}
              disabled={downloadSuccess}
              className="bg-zinc-900 hover:bg-zinc-850 p-2.5 rounded-lg border border-zinc-800 hover:text-white text-zinc-405 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-zinc-400" />
              <span>{downloadSuccess ? 'Compiling PDF...' : 'Download Invoice'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="bg-zinc-900 hover:bg-zinc-850 p-2.5 rounded-lg border border-zinc-800 hover:text-white text-zinc-405 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-rose-500" />
              <span>Print Invoice</span>
            </button>
          </div>

        </div>

        {/* Dynamic Parcel Travel logistics statuses checklist (Tracking ID) */}
        {order.trackingId && (
          <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-900 text-xs">
              <span className="text-white font-bold block">LOGISTICS LOG TRACKER</span>
              <span className="text-zinc-500 font-mono">Tracking ID: <strong className="text-zinc-300">{order.trackingId}</strong></span>
            </div>

            <div className="space-y-4 pl-3 border-l-2 border-rose-900 relative">
              {order.trackingLogs?.map((log, index) => (
                <div key={index} className="text-xs relative">
                  <span className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-rose-500 ring-4 ring-rose-500/20 animate-pulse"></span>
                  <div className="flex justify-between items-baseline text-zinc-400 font-mono">
                    <strong className="text-white font-extrabold text-[13px] block">{log.status}</strong>
                    <span className="text-[10px] text-zinc-650">{new Date(log.time).toLocaleTimeString()}</span>
                  </div>
                  <span className="text-zinc-400 text-xs mt-1 block font-sans lowercase-disabled leading-relaxed">{log.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exit flow redirects */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-2">
          <button
            onClick={() => { setSelectedCategory(null); setView('shop'); }}
            className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-3.5 rounded-xl uppercase tracking-widest text-xs transition-colors cursor-pointer"
          >
            Continue Sourcing
          </button>
          
          <button
            onClick={() => { setView('home'); }}
            className="w-full sm:w-auto bg-transparent hover:bg-zinc-900 text-white border border-zinc-850 px-8 py-3.5 rounded-xl uppercase tracking-widest text-xs transition-colors"
          >
            Go into Homepage
          </button>
        </div>

      </div>
    </div>
  );
}
