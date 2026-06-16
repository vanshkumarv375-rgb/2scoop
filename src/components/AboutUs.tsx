import React from 'react';
import { ShieldCheck, Award, Microscope, Heart, Factory, ChevronRight } from 'lucide-react';
import { useAppState } from '../context/AppContext';

export default function AboutUs() {
  const { setView } = useAppState();

  return (
    <div className="bg-black text-white min-h-screen py-16 font-sans selection:bg-red-600 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Banner Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="bg-rose-950/20 text-rose-500 border border-rose-950/45 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase">
            ESTABLISHED 2026 • THE FITNESS SHIELD
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
            REDEFINING HUMAN LIMITS
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            At 2ScoopNutritoon, we believe standard physical metrics are merely baseline starting points. We engineer clean, premium sports formulations to elevate your speed, strength, and tissue recovery.
          </p>
        </div>

        {/* Dynamic Mission and Vision Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-5 sm:p-8 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-650/5 rounded-bl-full pointer-events-none"></div>
            <div className="bg-zinc-90 w-12 h-12 rounded-xl flex items-center justify-center border border-zinc-800 text-red-500">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-wide">Our Athletic Mission</h3>
            <p className="text-zinc-400 text-xs leading-relaxed font-sans">
              To supply high-performance athletes with certified, unadulterated sports supplements that boost physical productivity. We refuse the use of low-grade chemical bulk fillers, sugar spikes, or hidden proprietary blends.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-5 sm:p-8 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-650/5 rounded-bl-full pointer-events-none"></div>
            <div className="bg-zinc-90 w-12 h-12 rounded-xl flex items-center justify-center border border-zinc-800 text-red-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-wide">Our Quality Commitment</h3>
            <p className="text-zinc-400 text-xs leading-relaxed font-sans">
              To remain fully transparent. We are the only brand providing full blind batch certifications searchable by batch number, verifying protein yields, amino structure, and heavy metals screening safety.
            </p>
          </div>
        </div>

        {/* Manufacturing Standards Specifications */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-5 sm:p-8 space-y-8 relative">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">PRODUCTION SECURED</span>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white leading-none">
              WHO-GMP & FSSAI CERTIFIED FACILITIES
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl font-sans">
              Every scoop of 2ScoopNutritoon is manufactured under high-grade air filtration and micro-temperature controlled facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-xs font-mono">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-white font-sans text-sm font-bold">
                <Factory className="w-5 h-5 text-red-500 shrink-0" />
                <span>Grass-Fed Dairy Sourcing</span>
              </div>
              <p className="text-zinc-400 font-sans text-xs">
                Our raw concentrates and isolates are premium imports sourced exclusively from grass-fed hormone-free farms in USA & Western Europe.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-white font-sans text-sm font-bold">
                <Microscope className="w-5 h-5 text-red-500 shrink-0" />
                <span>Cold Cross-Flow Filtration</span>
              </div>
              <p className="text-zinc-400 font-sans text-xs">
                Filtered via non-heat advanced microfiltration methods (Provon® processes) which keeps bio-active immunoglobulin fractions undamaged.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-white font-sans text-sm font-bold">
                <Heart className="w-5 h-5 text-red-500 shrink-0" />
                <span>100% Digestive Shield</span>
              </div>
              <p className="text-zinc-400 font-sans text-xs">
                Enriched with multi-strain DigeZyme® digestive complexes, ensuring 100% absorption and absolutely zero stomach heaviness or bloat.
              </p>
            </div>
          </div>
        </div>

        {/* Action redirections */}
        <div className="flex flex-col items-center justify-center p-5 sm:p-8 bg-zinc-950/40 border border-zinc-900 rounded-2xl text-center space-y-4">
          <div className="space-y-1">
            <h4 className="text-base font-bold uppercase">Ready to fuel your training?</h4>
            <p className="text-zinc-500 text-xs">Browse our catalog categorized collections according to athletic targets.</p>
          </div>
          <button
            onClick={() => setView('shop')}
            className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold font-sans tracking-widest cursor-pointer py-3.5 px-8 rounded-lg uppercase flex items-center gap-1.5 transition-all"
          >
            <span>Explore Active Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
