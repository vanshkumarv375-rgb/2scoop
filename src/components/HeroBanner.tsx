import React from 'react';
import { useAppState } from '../context/AppContext';
import { CATEGORIES } from '../data/supplementData';
import { Dumbbell, ShieldCheck, Flame, ChevronRight, Zap } from 'lucide-react';

export default function HeroBanner() {
  const { setView, setSelectedCategory, navigateToProduct } = useAppState();

  const handleShopRedirect = () => {
    setSelectedCategory(null);
    setView('shop');
  };

  return (
    <div className="relative bg-[#0a0a0a] product-gradient select-none overflow-hidden border-b border-white/5 py-16 sm:py-24 lg:py-32 flex items-center min-h-[70vh] sm:min-h-[80vh]">
      {/* Background Graphic Grid Overlay */}
      <div className="absolute inset-0 bg-[#0a0a0a] opacity-90 z-0"></div>
      <div className="absolute inset-0 z-0 opacity-15" style={{
        backgroundImage: `radial-gradient(rgba(225, 29, 72, 0.15) 1px, transparent 0), radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0, 12px 12px'
      }}></div>

      {/* Decorative Neon Red Spotlights */}
      <div className="absolute top-1/4 right-[10%] w-[150px] sm:w-[350px] h-[150px] sm:h-[350px] rounded-full bg-rose-600 opacity-15 blur-[80px] sm:blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/5 left-[5%] w-[100px] sm:w-[250px] h-[100px] sm:h-[250px] rounded-full bg-zinc-700 opacity-10 blur-[60px] sm:blur-[90px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Side: Brand Action Typography */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <div className="inline-flex items-center gap-2 bg-zinc-900/90 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider text-rose-500 uppercase">
            <Zap className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Premium Athletic Formulation</span>
          </div>

          <h1 className="text-clamp-hero font-black font-sans text-white tracking-tight leading-[1.15] uppercase break-words w-full">
            Double Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-rose-500 to-white italic">
              Performance
            </span> <br />
            <span className="text-white">With 2ScoopNutritoon</span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-lg font-sans leading-relaxed">
            Engineered with raw grass-fed dairies, verified clean sourcing, and premium bio-absorption technologies. Your body deserves elite power.
          </p>

          {/* Quick Stats Highlights */}
          <div className="grid grid-cols-3 gap-6 py-4 w-full max-w-md font-sans border-t border-b border-white/5">
            <div>
              <span className="block text-2xl font-black text-white">25g+</span>
              <span className="text-xs text-zinc-550 font-mono tracking-wider uppercase">Protein / Scoop</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-white">100%</span>
              <span className="text-xs text-zinc-550 font-mono tracking-wider uppercase">Lab Authenticated</span>
            </div>
            <div>
              <span className="block text-2xl font-black text-white">0g</span>
              <span className="text-xs text-zinc-550 font-mono tracking-wider uppercase">Banned Fillers</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto pt-2">
            <button
              onClick={handleShopRedirect}
              className="bg-rose-600 hover:bg-rose-700 hover:red-glow text-white font-sans font-bold text-xs tracking-widest uppercase rounded-lg py-4 px-8 flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-rose-950/40 relative overflow-hidden group border border-rose-500"
            >
              <span>Shop Active Catalog</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button
              onClick={() => { setSelectedCategory(CATEGORIES[1]); setView('shop'); }}
              className="bg-transparent hover:bg-zinc-900 text-white border border-white/10 hover:border-rose-600/40 font-sans font-bold text-xs tracking-widest uppercase rounded-lg py-4 px-8 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Dumbbell className="w-4 h-4 text-rose-500" />
              <span>Explore Pure Isolates</span>
            </button>
          </div>
        </div>

        {/* Right Side: Sleek Shaker Cup Visual Representation */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-[280px] sm:w-[320px] aspect-[4/5] glass-card rounded-3xl p-6 flex flex-col justify-between shadow-2xl overflow-hidden group">
            {/* Glossy Metallic Silver Sheen */}
            <div className="absolute top-0 -left-full w-2/3 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-15deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out"></div>
            
            {/* Shaker Grid Detail */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-600/10 rounded-bl-full pointer-events-none filter blur-xl"></div>
            
            <div className="flex justify-between items-start z-10">
              <span className="bg-black/50 backdrop-blur-md text-rose-500 font-mono text-[10px] tracking-widest font-black uppercase border border-rose-950 px-2 py-1 rounded">
                NEW ARRIVAL
              </span>
              <div className="text-zinc-600 bg-black/40 p-2 rounded-full border border-white/5">
                <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
              </div>
            </div>

            {/* Custom Premium Card Illustration of a Supplement Canister */}
            <div className="my-6 flex flex-col items-center justify-center relative py-4">
              <div className="w-32 h-44 bg-gradient-to-b from-zinc-900 to-black rounded-lg border-2 border-white/10 flex flex-col justify-between p-3 relative shadow-inner">
                {/* Simulated Lid */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-3 bg-zinc-800 rounded border-b border-zinc-950"></div>
                
                {/* Canister Brand Tag */}
                <span className="text-[10px] font-mono tracking-widest text-zinc-550 text-center uppercase">PREMIUM INGREDIENTS</span>
                
                <div className="text-center my-1 z-10">
                  <span className="text-2xl font-black italic tracking-tighter text-white block">ISO WHEY</span>
                  <span className="text-[10px] font-mono text-rose-500 font-bold tracking-wider">GOLD PROTEIN</span>
                </div>
                
                {/* High Contrast Red Badge */}
                <div className="bg-rose-600 py-1 rounded-sm text-[8px] font-mono text-center font-bold tracking-wider text-white uppercase shadow-sm shadow-rose-950/40">
                  25g PROTEIN • 5.5g BCAA
                </div>
              </div>

              {/* Decorative Silver Holographic Floating Particles */}
              <div className="absolute -right-4 top-10 border border-white/10 rounded-lg bg-black/85 px-2.5 py-1 text-[9px] font-mono text-zinc-400">
                ⚡ Rapid Absorption
              </div>
              <div className="absolute -left-6 bottom-12 border border-rose-950 rounded-lg bg-black/85 px-2.5 py-1 text-[9px] font-mono text-rose-500">
                ✓ Ultra Digestibility
              </div>
            </div>

            {/* Shaker Footer Information */}
            <div className="z-10 flex justify-between items-center bg-black/60 p-2.5 rounded-lg border border-white/10">
              <div className="flex flex-col">
                <span className="text-xs text-zinc-300 font-bold font-sans">Premium ISO Whey Gold</span>
                <span className="text-[10px] font-mono text-zinc-500">₹4,899 Only</span>
              </div>
              <button 
                onClick={() => navigateToProduct('p1')}
                className="bg-white hover:bg-rose-600 hover:red-glow hover:text-white text-black py-1 px-3.5 rounded text-[10px] font-mono font-bold tracking-wider transition-colors uppercase cursor-pointer"
              >
                View Build
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
