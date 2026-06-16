import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { 
  Instagram, Youtube, Facebook, Mail, Phone, MapPin, Send, HelpCircle, Shield, RotateCcw, Truck, FileText 
} from 'lucide-react';

export default function Footer() {
  const { setView, setSelectedCategory } = useAppState();
  const [newsEmail, setNewsEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [openedPolicy, setOpenedPolicy] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsEmail.trim().length > 3) {
      setSubscribed(true);
      setNewsEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const policies: Record<string, { title: string; icon: any; text: string }> = {
    privacy: {
      title: 'Privacy & Security Policy',
      icon: Shield,
      text: 'At 2ScoopNutritoon, we value the active trust of our athletes. Your data is stored inside secure partitioned sandbox databases behind state-of-the-art firewalls. We never sell, lease, or distribute your email addresses, physical location addresses, or medical summaries to any third-party marketing entities. Payment profiles are routed through certified gateway channels (Razorpay Ready PCI-DSS guidelines) so no card details are ever retrievable by our web server.'
    },
    refund: {
      title: 'Refund & Sealed Returns Policy',
      icon: RotateCcw,
      text: 'We provide a 7-day hassle-free sealed return mechanism. To be eligible, the original supplement container must remain strictly unopened, double-sealed, and with no scratches on our QR authentication labels. Physically damaged items received at arrival will be replaced immediately if a ticket with unpacking proof is submitted within 48 hours to client support.'
    },
    terms: {
      title: 'Terms & Conditions of Athletic Use',
      icon: FileText,
      text: 'By using 2ScoopNutritoon supplements, you adhere to the recommended dosages. Our products are formulated for healthy adults above the age of 18, and athletes engaged in intensive training regimes. Our statements have not been evaluated as prescription medication guidelines. Consult a medical health provider prior to mixing supplements with prescription formulas.'
    },
    shipping: {
      title: 'Shipping & Transit Policy',
      icon: Truck,
      text: 'We ship from multiple secure logistics facilities in hubs like Mumbai, Noida, and Bengaluru to guarantee maximum freshness. Orders processed prior to 4:00 PM are handed over to express partners same-day. Metros usually enjoy delivery inside 48-72 hours, while remote zones receive orders in 5-7 days. Transit schedules include custom real-time tracking checkpoints.'
    }
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 text-zinc-400 font-sans relative">
      {/* Policy Overlay Modal */}
      {openedPolicy && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm animate-none">
          <div className="glass-card rounded-xl max-w-lg w-full p-5 sm:p-6 text-white shadow-2xl relative border border-white/10">
            <button
              onClick={() => setOpenedPolicy(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-4">
              {React.createElement(policies[openedPolicy].icon, { className: 'w-6 h-6 text-rose-500' })}
              <h3 className="text-lg font-bold tracking-tight font-sans text-white">{policies[openedPolicy].title}</h3>
            </div>
            <p className="text-zinc-350 text-sm leading-relaxed mb-6 font-sans">
              {policies[openedPolicy].text}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setOpenedPolicy(null)}
                className="bg-rose-600 hover:bg-rose-700 hover:red-glow text-white font-sans text-xs font-bold py-2 px-4 rounded-lg tracking-wide uppercase transition-all duration-200"
              >
                Acknowledge Policies
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Links & Fields */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About 2ScoopNutritoon */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-rose-600 text-white px-2 py-0.5 rounded font-black text-sm italic shadow shadow-rose-950">2</div>
            <span className="text-white font-black font-sans tracking-wide text-lg uppercase">SCOOPNUTRITOON</span>
          </div>
          <p className="text-sm text-zinc-450 leading-relaxed font-sans">
            We exist to elevate your cellular output. At 2ScoopNutritoon, we engineer premium-grade, science-backed formulations containing active raw materials with clinical validation, guaranteeing results you can feel.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-zinc-550 hover:text-rose-500 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-zinc-550 hover:text-rose-500 transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-zinc-550 hover:text-rose-500 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Support Resources */}
        <div>
          <h4 className="text-white font-sans font-bold text-sm tracking-widest uppercase mb-4">Elite Support</h4>
          <ul className="space-y-2 text-sm font-sans">
            <li>
              <button 
                onClick={() => { setView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-white transition-colors"
              >
                Our Clean Sourcing
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setView('profile'); }}
                className="hover:text-white transition-colors"
              >
                Track Your Shipment
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setSelectedCategory(null); setView('shop'); }}
                className="hover:text-white transition-colors"
              >
                Browse Shop Catalog
              </button>
            </li>
            <li>
              <button 
                onClick={() => setOpenedPolicy('refund')}
                className="hover:text-white transition-colors flex items-center gap-1.5 opacity-90 hover:opacity-100"
              >
                <RotateCcw className="w-3.5 h-3.5 text-zinc-650" />
                <span>Return Logistics</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Legal Policies Quick Access */}
        <div>
          <h4 className="text-white font-sans font-bold text-sm tracking-widest uppercase mb-4">Legal & Safety</h4>
          <div className="flex flex-col gap-2 text-sm font-sans items-start font-medium text-zinc-400">
            <button onClick={() => setOpenedPolicy('privacy')} className="hover:text-rose-500 transition-colors flex items-center gap-2 text-left">
              <Shield className="w-3.5 h-3.5 text-rose-600" />
              <span>Privacy Frameworks</span>
            </button>
            <button onClick={() => setOpenedPolicy('refund')} className="hover:text-rose-500 transition-colors flex items-center gap-2 text-left">
              <RotateCcw className="w-3.5 h-3.5 text-zinc-500" />
              <span>Hassle-Free Refunds</span>
            </button>
            <button onClick={() => setOpenedPolicy('terms')} className="hover:text-rose-500 transition-colors flex items-center gap-2 text-left">
              <FileText className="w-3.5 h-3.5 text-zinc-500" />
              <span>Terms of Athletic Service</span>
            </button>
            <button onClick={() => setOpenedPolicy('shipping')} className="hover:text-rose-500 transition-colors flex items-center gap-2 text-left">
              <Truck className="w-3.5 h-3.5 text-zinc-500" />
              <span>Transit Guidelines</span>
            </button>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="text-white font-sans font-bold text-sm tracking-widest uppercase mb-4 font-mono">2ScoopNutritoon Club</h4>
          <p className="text-xs text-zinc-500 leading-relaxed mb-4 font-sans">
            Be the first to learn about blind batch testing, new flavor drops, and exclusive athletic codes. No spam. Only gains.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex">
              <input
                type="email"
                required
                placeholder="Enter email for 15% off"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                className="bg-zinc-900 border border-white/5 text-white placeholder-zinc-500 text-xs rounded-l-lg py-2.5 px-3 focus:outline-none focus:border-rose-600 w-full animate-none"
              />
              <button
                type="submit"
                className="bg-rose-600 hover:bg-rose-700 hover:red-glow text-white rounded-r-lg px-4 flex items-center justify-center transition-colors cursor-pointer"
                title="Subscribe Now"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            {subscribed && (
              <p className="text-rose-500 text-[11px] font-mono font-semibold animate-pulse">
                ✓ Check inbox! Code: <strong>FIT2SCOOP</strong> applied instantly.
              </p>
            )}
          </form>
          
          <div className="mt-6 flex flex-col gap-1.5 text-xs text-zinc-550 font-sans">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-rose-500" />
              <span className="hover:text-white transition-colors">support@2scoopnutritoon.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-rose-500" />
              <span>+91 (120) SCOOP-NUTRITOON</span>
            </div>
          </div>
        </div>
      </div>

      {/* Extreme Bottom Bar */}
      <div className="bg-[#050505] border-t border-white/5 py-6 text-center text-xs font-mono tracking-wide text-zinc-650">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 2ScoopNutritoon Professional Sports Supplement Ltd. Co. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="border border-white/5 px-2 py-0.5 rounded text-[10px] uppercase bg-black/40">FSSAI Certified</span>
            <span className="border border-white/5 px-2 py-0.5 rounded text-[10px] uppercase bg-black/40">WHO GMP Standards</span>
            <span className="border border-white/5 px-2 py-0.5 rounded text-[10px] text-rose-500 font-bold uppercase bg-black/40 shadow-sm">Razorpay Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
