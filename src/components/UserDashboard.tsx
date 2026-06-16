import React, { useState } from 'react';
import { useAppState, ADMIN_EMAIL } from '../context/AppContext';
import { Address } from '../types';
import { 
  User, Mail, Phone, Calendar, MapPin, Eye, Package, Check, Star, ShieldCheck, MailWarning 
} from 'lucide-react';

export default function UserDashboard() {
  const {
    currentUser,
    view,
    setView,
    login,
    register,
    verifyUserEmail,
    saveAddress,
    deleteAddress,
    orders,
    navigateToOrder
  } = useAppState();

  // Mode state for registration/login
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Input states
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [authMsg, setAuthMsg] = useState({ success: true, text: '' });

  // Address edit modal/form state
  const [addressEditing, setAddressEditing] = useState<Partial<Address> | null>(null);

  // Filter orders for logged-in user
  const userOrders = currentUser 
    ? orders.filter(o => o.customerEmail.toLowerCase() === currentUser.email.toLowerCase())
    : [];

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      const res = login(emailInput, passwordInput);
      if (res.success) {
        setAuthMsg({ success: true, text: res.message });
        setEmailInput('');
        setPasswordInput('');
      } else {
        setAuthMsg({ success: false, text: res.message });
      }
    } else {
      if (!nameInput.trim() || !phoneInput.trim()) {
        setAuthMsg({ success: false, text: 'Please fill in all registration parameters.' });
        return;
      }
      const res = register(nameInput, emailInput, phoneInput);
      if (res.success) {
        setAuthMsg({ success: true, text: res.message });
        setEmailInput('');
        setNameInput('');
        setPhoneInput('');
      } else {
        setAuthMsg({ success: false, text: res.message });
      }
    }
  };

  const handleVerifyEmailClick = () => {
    verifyUserEmail();
  };

  const triggerAddressEdit = (addr: Address | null) => {
    if (addr === null) {
      setAddressEditing({
        id: 'new-' + Date.now(),
        name: currentUser?.name || '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India',
        phone: currentUser?.phone || '+91 ',
        isDefault: currentUser?.addresses.length === 0
      });
    } else {
      setAddressEditing(addr);
    }
  };

  const saveAddressForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressEditing) return;
    
    // Quick validate
    if (!addressEditing.name || !addressEditing.addressLine1 || !addressEditing.city || !addressEditing.state || !addressEditing.postalCode || !addressEditing.phone) {
      alert('Please fill out all required address parameters.');
      return;
    }

    saveAddress(addressEditing as Address);
    setAddressEditing(null);
  };

  // Auth/Login view if no user signed in
  if (!currentUser) {
    return (
      <div className="bg-black text-white min-h-[80vh] flex items-center justify-center py-16 px-4 font-sans select-none">
        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl max-w-md w-full p-5 sm:p-8 shadow-2xl relative">
          <div className="text-center space-y-2 mb-8">
            <div className="bg-gradient-to-tr from-rose-650 to-rose-500 text-white w-12 h-12 rounded-2xl mx-auto flex items-center justify-center font-black italic tracking-tighter text-2xl border border-rose-500 shadow shadow-rose-950">
              2S
            </div>
            <h2 className="text-xl font-black uppercase tracking-tight">Athlete Locker</h2>
            <p className="text-zinc-500 text-xs">Singular login portal for customers & administrative managers.</p>
          </div>

          {authMsg.text && (
            <div className={`p-3.5 mb-6 rounded-xl text-xs font-semibold ${
              authMsg.success ? 'bg-green-950/50 text-green-400 border border-green-900/60' : 'bg-red-950/50 text-red-400 border border-red-900/60'
            }`}>
              {authMsg.text}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {authMode === 'register' && (
              <div>
                <label className="block text-zinc-400 text-[10px] font-mono mb-1 uppercase">Athlete Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vansh Tomar"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-rose-600"
                />
              </div>
            )}

            <div>
              <label className="block text-zinc-400 text-[10px] font-mono mb-1 uppercase font-semibold">Registered Email Address *</label>
              <input
                type="email"
                required
                placeholder="athlete@2scoopnutritoon.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-rose-600"
              />
            </div>

            <div>
              <label className="block text-zinc-400 text-[10px] font-mono mb-1 uppercase font-semibold">Secured Access Password *</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-rose-600"
              />
            </div>

            {authMode === 'register' && (
              <div>
                <label className="block text-zinc-400 text-[10px] font-mono mb-1 uppercase">Contact Mobile Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-rose-600"
                />
              </div>
            )}

            <button
              maxLength={40}
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-sans text-xs font-bold py-3 px-4 rounded-lg flex items-center justify-center tracking-widest uppercase transition-all shadow gap-2 mt-4 cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>{authMode === 'login' ? 'Authenticate' : 'Incorporate Profile'}</span>
            </button>
          </form>

          {/* Quick instructions for predefined account selectors */}
          <div className="mt-6 pt-5 border-t border-zinc-900 text-center space-y-3 font-sans">
            <button
              type="button"
              onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
              className="text-xs text-zinc-400 hover:text-white transition-colors underline"
            >
              {authMode === 'login' ? 'No account? Incorporation here' : 'Already have athletic logs? Sign In'}
            </button>

            <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-850 space-y-2 text-left">
              <span className="text-[9px] font-mono uppercase text-rose-500 tracking-wider block font-bold">Fast Trial credentials:</span>
              <div className="grid grid-cols-1 gap-1 text-[10px] text-zinc-400 font-mono">
                <button
                  type="button"
                  onClick={() => {
                    setEmailInput(ADMIN_EMAIL);
                    setPasswordInput('admin123');
                    setAuthMode('login');
                  }}
                  className="text-left hover:text-rose-500 underline truncate"
                >
                  🛠️ Admin: {ADMIN_EMAIL}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmailInput('tomarvansh475@gmail.com');
                    setPasswordInput('user123');
                    setAuthMode('login');
                  }}
                  className="text-left hover:text-red-500 underline truncate"
                >
                  🚀 Customer: tomarvansh475@gmail.com
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Logged In Dashboard Views
  return (
    <div className="bg-black text-white min-h-screen py-12 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Profile Card Header Banner */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-650/5 rounded-bl-full pointer-events-none blur-2xl"></div>

          <div className="flex items-center gap-4">
            <div className="bg-zinc-900 text-rose-555 w-16 h-16 rounded-2xl flex items-center justify-center border border-zinc-800 shadow shadow-black">
              <User className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white leading-none">
                {currentUser.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 font-mono">
                <span className="bg-rose-950/40 text-rose-500 border border-rose-900/40 font-extrabold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">
                  {currentUser.role} ATHLETE
                </span>
                <span>• Joined: {currentUser.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Email Verification / Status indicators */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {currentUser.verified ? (
              <div className="bg-emerald-950/20 border border-emerald-900/60 p-3 rounded-xl flex items-center gap-2 text-emerald-500 text-xs font-mono font-bold">
                <ShieldCheck className="w-4.5 h-4.5" />
                <span>✓ Verified Email Sync</span>
              </div>
            ) : (
              <div className="bg-amber-950/20 border border-amber-900/50 p-3 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-500 text-sm">
                <div className="flex items-center gap-2">
                  <MailWarning className="w-4.5 h-4.5 animate-bounce" />
                  <span className="font-mono text-xs">Awaiting Email Authorization</span>
                </div>
                <button
                  type="button"
                  onClick={handleVerifyEmailClick}
                  className="bg-amber-700 hover:bg-amber-600 text-white font-mono text-[10px] font-bold py-1 px-3.5 rounded-lg uppercase tracking-wider"
                >
                  Verify Now
                </button>
              </div>
            )}
            
            {currentUser.role === 'Admin' && (
              <button
                type="button"
                onClick={() => setView('admin-panel')}
                className="bg-red-650 hover:bg-red-750 text-white font-sans text-xs font-bold py-3.5 px-6 rounded-xl uppercase tracking-wider transition-all shadow shadow-red-950/40 border border-red-500"
              >
                Launch Admin Hub
              </button>
            )}
          </div>
        </div>

        {/* Saved Addresses & Address Edit Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Addresses management */}
          <div className="lg:col-span-5 bg-zinc-950 border border-zinc-900 rounded-3xl p-4 sm:p-6 space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <h3 className="text-base font-bold uppercase tracking-wide">Saved Address Books</h3>
              </div>
              {!addressEditing && (
                <button
                  type="button"
                  onClick={() => triggerAddressEdit(null)}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 py-1.5 px-3 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  + Add New
                </button>
              )}
            </div>

            {/* Editing Box */}
            {addressEditing ? (
              <form onSubmit={saveAddressForm} className="space-y-4 bg-black/40 border border-zinc-900 rounded-2xl p-4">
                <span className="text-xs font-mono font-bold tracking-wider text-rose-500 uppercase block pb-2 border-b border-zinc-900">
                  {addressEditing.id?.toString().startsWith('new-') ? 'Add New Address' : 'Edit Selected'}:
                </span>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-0.5">Receipt Name</label>
                    <input
                      type="text"
                      required
                      value={addressEditing.name || ''}
                      onChange={(e) => setAddressEditing({ ...addressEditing, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 p-2 text-xs text-white rounded focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-0.5">Address Flat, Street</label>
                    <input
                      type="text"
                      required
                      value={addressEditing.addressLine1 || ''}
                      onChange={(e) => setAddressEditing({ ...addressEditing, addressLine1: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 p-2 text-xs text-white rounded focus:outline-none mb-1.5"
                      placeholder="Line 1"
                    />
                    <input
                      type="text"
                      value={addressEditing.addressLine2 || ''}
                      onChange={(e) => setAddressEditing({ ...addressEditing, addressLine2: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 p-2 text-xs text-white rounded focus:outline-none"
                      placeholder="Line 2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-0.5">City</label>
                      <input
                        type="text"
                        required
                        value={addressEditing.city || ''}
                        onChange={(e) => setAddressEditing({ ...addressEditing, city: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 p-2 text-xs text-white rounded focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-0.5">State</label>
                      <input
                        type="text"
                        required
                        value={addressEditing.state || ''}
                        onChange={(e) => setAddressEditing({ ...addressEditing, state: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 p-2 text-xs text-white rounded focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-0.5">Pincode</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={addressEditing.postalCode || ''}
                        onChange={(e) => setAddressEditing({ ...addressEditing, postalCode: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 p-2 text-xs text-white rounded focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-500 text-[10px] font-mono uppercase mb-0.5">Phone Call Contact</label>
                      <input
                        type="tel"
                        required
                        value={addressEditing.phone || ''}
                        onChange={(e) => setAddressEditing({ ...addressEditing, phone: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 p-2 text-xs text-white rounded focus:outline-none"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 pt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!addressEditing.isDefault}
                      onChange={(e) => setAddressEditing({ ...addressEditing, isDefault: e.target.checked })}
                      className="accent-rose-600"
                    />
                    <span className="text-xs text-zinc-400 font-mono uppercase">Establish as Defaults</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-zinc-900">
                  <button
                    type="button"
                    onClick={() => setAddressEditing(null)}
                    className="bg-zinc-900 text-zinc-400 text-xs py-2 px-3 rounded hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-rose-600 text-white text-xs font-bold py-2 px-3 rounded hover:bg-rose-700"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            ) : currentUser.addresses.length === 0 ? (
              <div className="text-center py-8 bg-zinc-900/10 border border-dashed border-zinc-850 p-4 rounded-xl text-zinc-500 text-xs font-mono">
                No saved shipping addresses linked to profile. Click "+ Add New" to create one.
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
                {currentUser.addresses.map((addr) => (
                  <div key={addr.id} className="bg-zinc-900/50 border border-zinc-850 rounded-xl p-4 space-y-3">
                    <div className="text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-white text-sm">{addr.name}</span>
                        {addr.isDefault && (
                          <span className="bg-red-950 text-red-500 font-mono text-[9px] font-bold border border-red-900/40 px-1.5 py-0.5 rounded uppercase">
                            Default Address
                          </span>
                        )}
                      </div>
                      <span className="text-zinc-400 block">{addr.addressLine1}</span>
                      {addr.addressLine2 && <span className="text-zinc-400 block">{addr.addressLine2}</span>}
                      <span className="text-zinc-500 block mt-0.5">{addr.city}, {addr.state} - {addr.postalCode}</span>
                      <span className="text-zinc-400 block mt-1 font-mono">📞 {addr.phone}</span>
                    </div>

                    <div className="flex gap-4 pt-2.5 border-t border-zinc-800 text-[10px] font-mono uppercase">
                      <button
                        type="button"
                        onClick={() => triggerAddressEdit(addr)}
                        className="text-zinc-400 hover:text-white transition-colors"
                      >
                        Edit Spec
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteAddress(addr.id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        Delete Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Order History catalog */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 rounded-3xl p-4 sm:p-6 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-900">
              <Package className="w-5 h-5 text-red-500" />
              <h3 className="text-base font-bold uppercase tracking-wide">Historical Athlete Orders</h3>
            </div>

            {userOrders.length === 0 ? (
              <div className="text-center py-16 bg-zinc-900/10 border border-dashed border-zinc-850 p-6 rounded-2xl text-zinc-500 text-xs font-mono">
                No muscle formulations booked under this profile yet. Start shopping to fuel up!
              </div>
            ) : (
              <div className="space-y-4 max-h-[480px] overflow-y-auto no-scrollbar pr-1">
                {userOrders.map((ord) => (
                  <div 
                    key={ord.id} 
                    className="bg-black/40 border border-zinc-900 hover:border-zinc-800 rounded-2xl p-5 space-y-4 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-zinc-900 pb-3">
                      <div>
                        <span className="text-white font-mono font-bold text-sm block">{ord.orderNumber}</span>
                        <span className="text-zinc-550 text-xs font-mono">Booked on: {new Date(ord.date).toLocaleString('en-IN')}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-wider font-bold uppercase border ${
                          ord.status === 'Delivered' 
                            ? 'bg-emerald-950/40 text-emerald-500 border-emerald-900/60' 
                            : ord.status === 'Cancelled'
                            ? 'bg-red-950/40 text-red-500 border-red-900/60'
                            : 'bg-amber-950/40 text-amber-500 border-amber-900/60'
                        }`}>
                          {ord.status}
                        </span>

                        <button
                          type="button"
                          onClick={() => navigateToOrder(ord.id)}
                          className="text-[10px] font-mono font-bold bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 py-1 px-2.5 rounded text-zinc-300 uppercase transition-all"
                        >
                          View Invoice
                        </button>
                      </div>
                    </div>

                    {/* Items row list */}
                    <div className="space-y-2.5">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-650 shrink-0"></span>
                            <span className="text-zinc-300 font-bold block line-clamp-1">{item.productName}</span>
                            <span className="text-zinc-500 text-[10px] font-mono">({item.selectedFlavour} | {item.selectedSize})</span>
                          </div>
                          <span className="text-zinc-400 font-mono">
                            Qty:<strong>{item.quantity}</strong> × ₹{item.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* totals summary */}
                    <div className="pt-3 border-t border-zinc-900 flex justify-between items-baseline text-xs font-mono">
                      <span className="text-zinc-500">Method: <strong className="text-zinc-350">{ord.paymentMethod}</strong></span>
                      <span className="text-white text-sm">
                        Invoice Total: <strong className="text-rose-500 font-bold text-base">₹{ord.total.toLocaleString('en-IN')}</strong>
                      </span>
                    </div>

                    {/* Order tracking steps rendering if not cancelled */}
                    {ord.status !== 'Cancelled' && ord.trackingLogs && ord.trackingLogs.length > 0 && (
                      <div className="p-3 bg-zinc-900/40 border border-zinc-900 rounded-xl space-y-2.5">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 block font-bold">Latest transit timeline logs:</span>
                        <div className="space-y-1.5 pl-2 border-l border-red-900">
                          {ord.trackingLogs.map((log, lidx) => (
                            <div key={lidx} className="text-[10px] font-sans relative pl-2">
                              <span className="absolute -left-[11px] top-1 w-1.5 h-1.5 rounded-full bg-red-600"></span>
                              <div className="flex justify-between items-baseline text-zinc-400 font-mono">
                                <strong className="text-white text-[11px] font-bold leading-none block">{log.status}</strong>
                                <span className="text-[8px] text-zinc-650">{new Date(log.time).toLocaleTimeString()}</span>
                              </div>
                              <span className="text-zinc-500 text-[9px] block leading-relaxed mt-0.5">{log.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
