import React from 'react';
import { Product } from '../types';
import { useAppState } from '../context/AppContext';
import { Star, Heart, Flame, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, wishlist, addToCart, navigateToProduct } = useAppState();

  const isSharedInWishlist = wishlist.includes(product.id);
  const discountPercent = Math.round(((product.mrp - product.discountPrice) / product.mrp) * 100);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, product.flavours[0], product.sizes[0]);
    // Small callback alert visual is handled elegantly
  };

  return (
    <div 
      onClick={() => navigateToProduct(product.id)}
      className="glass-card rounded-xl overflow-hidden hover:border-rose-600/50 hover:red-glow transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 relative"
      id={`prod-card-${product.id}`}
    >
      {/* Percentage Saver Indicator Banner */}
      <span className="absolute top-3 left-3 z-10 bg-rose-600 text-white font-mono text-[9px] font-bold px-2.5 py-0.5 rounded tracking-widest uppercase shadow shadow-rose-950/40">
        SAVE {discountPercent}%
      </span>

      {/* Wishlist Button Overlay */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black text-zinc-400 hover:text-rose-500 p-1.5 rounded-full backdrop-blur-md border border-white/10 transition-all"
        title={isSharedInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <Heart className={`w-4 h-4 ${isSharedInWishlist ? 'fill-rose-600 text-rose-600' : ''}`} />
      </button>

      {/* Image Block Representation */}
      <div 
        className="w-full aspect-[4/3] relative flex items-center justify-center p-6 bg-[#0f0f0f] overflow-hidden border-b border-white/5 product-gradient"
      >
        {/* Dynamic Abstract CSS Gradient Bottle instead of boring image placeholders representing pure luxury */}
        <div 
          className="w-20 h-28 rounded-lg flex flex-col justify-between p-2 relative shadow-lg transform transition-transform duration-500 group-hover:scale-110"
          style={{ background: product.images[0] || 'linear-gradient(135deg, #111 0%, #222 100%)' }}
        >
          {/* Lid */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-2 bg-zinc-850 rounded border-b border-zinc-950"></div>
          
          <div className="text-[7px] font-mono tracking-widest text-zinc-400 text-center uppercase">SCOOP SELECT</div>
          <span className="text-[11px] font-black italic tracking-tighter text-white text-center leading-none block">ELITE LEVEL</span>
          
          {/* Content category */}
          <span className="text-[6px] font-mono bg-black/40 text-center py-0.5 rounded text-zinc-300 block uppercase truncate">
            {product.category}
          </span>
        </div>

        {/* Ambient reflection glow */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80 z-0"></div>

        {/* Stock Alert Warning overlays */}
        {product.stockStatus === 'Out of Stock' && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3">
            <span className="text-white bg-rose-800 px-3 py-1 rounded text-xs font-mono uppercase tracking-wider font-bold">
              Out of Stock
            </span>
          </div>
        )}
        {product.stockStatus === 'Low Stock' && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-rose-955/80 border border-rose-900 text-rose-500 font-mono text-[9px] px-2 py-0.5 rounded">
            <AlertCircle className="w-3 h-3" />
            <span>Low Stock</span>
          </div>
        )}
      </div>

      {/* Info Block */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono text-zinc-550 uppercase tracking-widest block">
            {product.category}
          </span>
          <h3 className="font-sans font-bold text-sm text-white line-clamp-1 group-hover:text-rose-500 transition-colors">
            {product.name}
          </h3>

          {/* Rating Stars */}
          <div className="flex items-center gap-1">
            <div className="flex text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'text-zinc-700'}`} 
                />
              ))}
            </div>
            <span className="text-[10px] font-mono text-zinc-400 font-semibold mt-0.5">({product.rating})</span>
          </div>
        </div>

        {/* Price & Action button */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-zinc-550 line-through text-xs">₹{product.mrp.toLocaleString('en-IN')}</span>
            <span className="text-white font-bold text-base font-mono">₹{product.discountPrice.toLocaleString('en-IN')}</span>
          </div>

          {product.stockStatus !== 'Out of Stock' ? (
            <button
              maxLength={40}
              type="button"
              onClick={handleQuickAdd}
              className="bg-zinc-900 border border-white/5 hover:bg-rose-600 hover:border-rose-600 hover:red-glow hover:text-white text-zinc-300 p-2 text-xs font-bold rounded-lg transition-all duration-200 uppercase tracking-wider"
            >
              Add To Cart
            </button>
          ) : (
            <button
              disabled
              type="button"
              className="bg-zinc-950 text-zinc-600 border border-zinc-900 p-2 text-xs rounded-lg uppercase cursor-not-allowed opacity-50"
            >
              Sold Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
