import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';
import { 
  Star, Heart, ArrowLeft, ShieldCheck, Truck, RefreshCw, Plus, Minus, Send, AlertCircle, ShoppingCart 
} from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductDetail() {
  const {
    activeProductId,
    products,
    updateProduct,
    addToCart,
    setView,
    toggleWishlist,
    wishlist
  } = useAppState();

  const product = products.find(p => p.id === activeProductId);

  // Fallback if missing
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-white">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4 animate-bounce" />
        <h2 className="text-xl font-bold font-sans">Product Not Found</h2>
        <button 
          onClick={() => setView('shop')}
          className="mt-4 bg-rose-600 px-4 py-2 rounded text-white font-mono text-xs uppercase"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  // Gallery image selector
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Spec selections
  const [selectedFlavour, setSelectedFlavour] = useState(product.flavours[0] || 'Default');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Default');
  const [quantity, setQuantity] = useState(1);

  // Review Form state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [reviewAddedMsg, setReviewAddedMsg] = useState(false);

  // Tabs
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'nutrition' | 'usage'>('benefits');

  const discountPercent = Math.round(((product.mrp - product.discountPrice) / product.mrp) * 100);
  const isWishlisted = wishlist.includes(product.id);

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

  // Add review dynamically to the product
  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) return;

    const newRev = {
      id: 'rev-' + Date.now(),
      userName: reviewerName,
      rating: reviewerRating,
      comment: reviewerComment,
      date: new Date().toISOString().split('T')[0],
      verified: true
    };

    const updatedReviews = [newRev, ...product.reviews];
    
    // Re-calculate average rating mathematically
    const sum = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = parseFloat((sum / updatedReviews.length).toFixed(1));

    updateProduct({
      ...product,
      reviews: updatedReviews,
      rating: avg
    });

    setReviewerName('');
    setReviewerComment('');
    setReviewAddedMsg(true);
    setTimeout(() => setReviewAddedMsg(false), 4000);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedFlavour, selectedSize);
    setView('cart');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedFlavour, selectedSize);
    setView('checkout');
  };

  // Filter 4 related products in the same category (excluding active product)
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-black text-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Back Action */}
        <button
          onClick={() => setView('shop')}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-mono text-xs uppercase mb-8 cursor-pointer tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 text-red-500" />
          <span>Back to catalog</span>
        </button>

        {/* Product core specs layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 font-sans">
          
          {/* Left Column: Visual Representation (Gallery) */}
          <div className="lg:col-span-6 space-y-4">
            <div 
              className="w-full aspect-[4/3] rounded-2xl flex items-center justify-center p-8 bg-zinc-950 border border-zinc-900 overflow-hidden relative shadow-lg shadow-black/90"
            >
              {/* Product render container */}
              <div 
                className="w-28 sm:w-36 aspect-[4/5] rounded-xl flex flex-col justify-between p-4 relative shadow-2xl transition-all duration-300"
                style={{ background: product.images[activeImgIndex] || product.images[0] }}
              >
                {/* lid */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-zinc-800 rounded border-b border-black"></div>
                <span className="text-[9px] font-mono tracking-widest text-zinc-400 text-center uppercase">Grass-Fed</span>
                <span className="text-xl font-black italic tracking-tighter text-white text-center leading-tight block">SCOOP Gold Series</span>
                <span className="text-[10px] font-mono text-center font-bold text-red-500 tracking-wider">SECURE SEALED</span>
              </div>

              {/* Badges */}
              <span className="absolute bottom-4 left-4 bg-zinc-900/90 text-zinc-300 border border-zinc-800 px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider">
                Batch No: #SCOOP-BETA-2026
              </span>
            </div>

            {/* Gallery Mini chips representing different gradient sheets */}
            {product.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {product.images.map((g, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImgIndex(index)}
                    className={`w-14 h-14 rounded-lg bg-zinc-950 border transition-all ${
                      activeImgIndex === index ? 'border-red-650' : 'border-zinc-900 opacity-60'
                    } overflow-hidden flex items-center justify-center`}
                  >
                    <div className="w-6 h-8 rounded-xs" style={{ background: g }}></div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Spec Selector Panel */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="bg-rose-900/10 text-rose-500 border border-rose-900/30 font-mono text-[10px] font-bold px-2.5 py-1 rounded tracking-widest uppercase inline-block">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-none">
                {product.name}
              </h1>
              
              {/* Ratings line */}
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'text-zinc-700'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold hover:underline cursor-pointer">{product.rating} / 5</span>
                <span className="text-zinc-650">•</span>
                <span className="text-zinc-400 text-xs">{product.reviews.length} Verified Customer Reviews</span>
              </div>
            </div>

            {/* Price Line */}
            <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-zinc-500 text-sm block">Maximum Retail Price (MRP)</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-rose-500 font-black text-2xl font-mono">₹{product.discountPrice.toLocaleString('en-IN')}</span>
                  <span className="text-zinc-550 line-through text-base font-mono">₹{product.mrp.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <span className="bg-red-950 text-red-500 font-mono text-xs font-bold border border-red-900/60 px-3 py-1 rounded-full uppercase">
                Save ₹{(product.mrp - product.discountPrice).toLocaleString('en-IN')} ({discountPercent}% OFF)
              </span>
            </div>

            <p className="text-zinc-300 leading-relaxed text-sm">
              {product.description}
            </p>

            {/* Selector: Flavor Options */}
            <div>
              <span className="block text-xs font-bold font-mono tracking-widest text-zinc-400 uppercase mb-2">
                Select Flavour Preferred:
              </span>
              <div className="flex flex-wrap gap-2">
                {product.flavours.map((fl) => (
                  <button
                    key={fl}
                    onClick={() => setSelectedFlavour(fl)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider border transition-all ${
                      selectedFlavour === fl
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {fl}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector: Size Options */}
            <div>
              <span className="block text-xs font-bold font-mono tracking-widest text-zinc-400 uppercase mb-2">
                Select Muscle Pack Size:
              </span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider border transition-all ${
                      selectedSize === sz
                        ? 'bg-white text-black border-white'
                        : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector: Quantity Box & Action CTAs */}
            <div className="pt-4 border-t border-zinc-900 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold font-mono tracking-widest text-zinc-400 uppercase">Quantity</span>
                <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-1">
                  <button 
                    onClick={handleDecrement}
                    className="p-1.5 hover:text-black hover:bg-white rounded transition-colors text-zinc-400"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 font-mono font-bold text-sm w-10 text-center">{quantity}</span>
                  <button 
                    onClick={handleIncrement}
                    className="p-1.5 hover:text-black hover:bg-white rounded transition-colors text-zinc-400"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span className={`text-xs uppercase font-mono ${
                  product.stockCount > 10 ? 'text-green-500' : 'text-amber-500'
                }`}>
                  • {product.stockStatus} ({product.stockCount} left in inventory)
                </span>
              </div>

              {/* CART AND BUY ACTION BUTTONS */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-sans font-black flex items-center justify-center gap-2 py-4 px-6 rounded-lg text-sm uppercase tracking-widest transition-all cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4 text-red-500" />
                  <span>Add to bag</span>
                </button>
                
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-sans font-black flex items-center justify-center gap-2 py-4 px-6 rounded-lg text-sm uppercase tracking-widest border border-rose-500 shadow-md shadow-rose-950/20 transition-all cursor-pointer"
                >
                  <span>Checkout Now</span>
                </button>
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`w-full flex items-center justify-center gap-2 border border-zinc-850 px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                  isWishlisted 
                    ? 'text-red-500 bg-red-950/20 border-red-900/60' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-950'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-650' : ''}`} />
                <span>{isWishlisted ? 'Wishlisted to athletic dashboard' : 'Save to elite wishlist'}</span>
              </button>
            </div>

            {/* trust badges */}
            <div className="grid grid-cols-3 gap-2 text-center pt-2 font-mono">
              <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-900">
                <ShieldCheck className="w-5 h-5 text-red-500 mx-auto mb-1" />
                <span className="text-[9px] uppercase tracking-wider text-zinc-400">Lab Checked</span>
              </div>
              <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-900">
                <Truck className="w-5 h-5 text-red-500 mx-auto mb-1" />
                <span className="text-[9px] uppercase tracking-wider text-zinc-400">Free Delhivery</span>
              </div>
              <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-900">
                <RefreshCw className="w-5 h-5 text-red-500 mx-auto mb-1" />
                <span className="text-[9px] uppercase tracking-wider text-zinc-400">Sealed Returns</span>
              </div>
            </div>

          </div>
        </div>

        {/* Section: Comprehensive Information Tabs */}
        <div className="mt-16 border-t border-zinc-900 pt-10">
          <div className="flex border-b border-zinc-900 gap-1 overflow-x-auto">
            {(['benefits', 'ingredients', 'nutrition', 'usage'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3.5 px-6 font-mono text-xs uppercase tracking-widest font-black border-b-2 whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'border-rose-600 text-white'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab === 'nutrition' ? 'Nutrition Facts' : tab}
              </button>
            ))}
          </div>

          <div className="py-6 min-h-[160px] font-sans">
            {activeTab === 'benefits' && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white uppercase font-sans tracking-wide">Key Athletic Advantages:</h3>
                <ul className="list-disc pl-5 text-zinc-300 text-sm space-y-2">
                  {product.benefits.map((ben, i) => (
                    <li key={i}>{ben}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white uppercase font-sans tracking-wide">Composition & Ingredient Transparency:</h3>
                <p className="text-zinc-300 text-sm leading-relaxed max-w-4xl">{product.ingredients}</p>
                <span className="text-[10px] text-zinc-550 font-mono tracking-wider italic block pt-2">
                  ✓ Certified 100% free of prohibited anabolic chemicals or unlisted doping stimulants.
                </span>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="space-y-4">
                <div className="flex justify-between items-baseline max-w-md border-b-2 border-white pb-1.5">
                  <h3 className="text-2xl font-black text-white uppercase font-serif">Nutrition Facts</h3>
                  <span className="text-sm text-zinc-400 font-mono">Serving: {product.servingSize || '1 scoop'}</span>
                </div>
                
                <div className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden max-w-md">
                  <table className="w-full text-zinc-300 text-sm font-mono leading-none">
                    <thead>
                      <tr className="bg-zinc-900 border-b border-zinc-800">
                        <th className="py-3 px-4 text-left font-bold uppercase text-xs text-zinc-400">Nutrient Component</th>
                        <th className="py-3 px-4 text-right font-bold uppercase text-xs text-zinc-400">Amount</th>
                        <th className="py-3 px-4 text-right font-bold uppercase text-xs text-zinc-400">Daily Value%</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900">
                      {product.nutritionFacts.map((fact, index) => (
                        <tr key={index} className="hover:bg-zinc-900/40">
                          <td className="py-2.5 px-4 font-bold">{fact.name}</td>
                          <td className="py-2.5 px-4 text-right text-white">{fact.amount}</td>
                          <td className="py-2.5 px-4 text-right text-red-500 font-bold">{fact.dailyValue || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white uppercase font-sans tracking-wide">Elite Usage Instructions:</h3>
                <p className="text-zinc-300 text-sm leading-relaxed max-w-3xl">{product.usageInstructions}</p>
                <div className="mt-3 bg-rose-950/20 border border-rose-950/40 rounded-lg p-3 max-w-xl">
                  <span className="text-xs text-rose-550 font-bold block mb-1 uppercase font-mono">Fitness Advisor Warning:</span>
                  <p className="text-zinc-400 text-xs font-sans">
                    Stay superhydrated! Aim to consume at least 3-4 liters of water daily when training under supplement regimens.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section: Customer Reviews & Add Review System */}
        <div className="mt-16 border-t border-zinc-900 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Customer Reviews Listings */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl font-bold text-white uppercase tracking-wider font-sans">
              Athlete Experiences ({product.reviews.length})
            </h2>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-3 no-scrollbar">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="bg-zinc-950 border border-zinc-900 rounded-xl p-5 space-y-2 relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-white font-sans font-bold text-sm block">{rev.userName}</span>
                      <span className="text-zinc-550 text-xs font-mono">{rev.date}</span>
                    </div>
                    
                    {/* Stars render */}
                    <div className="flex text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-500 text-amber-500' : 'text-zinc-800'}`} 
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-zinc-300 text-sm leading-relaxed">{rev.comment}</p>

                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono uppercase pt-1">
                    <span className="bg-green-950/60 text-green-500 border border-green-900 px-1.5 py-0.5 rounded font-bold">✓ Verified Purchase</span>
                    <span>• Tested on 2ScoopNutritoon QR verify</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Review Panel Widget */}
          <div className="lg:col-span-5 bg-zinc-950 border border-zinc-900 rounded-2xl p-6 self-start space-y-4">
            <div>
              <h3 className="text-white font-sans font-bold text-base uppercase">Write Athlete Review</h3>
              <p className="text-zinc-500 text-xs">Your opinion helps other athletes choose appropriate formulas.</p>
            </div>

            {reviewAddedMsg && (
              <div className="bg-green-950/60 border border-green-900 p-3.5 rounded-lg text-green-400 text-xs font-semibold animate-pulse">
                ✓ Thank you! Restoring state indices. Your review is displayed on the athlete thread.
              </div>
            )}

            <form onSubmit={submitReview} className="space-y-3">
              <div>
                <label className="block text-zinc-400 text-xs font-mono mb-1.5 uppercase">Officer/Athlete Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vansh Tomar"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-rose-600"
                />
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-mono mb-1.5 uppercase">Formulation Rating</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setReviewerRating(s)}
                      className={`p-1.5 rounded transition-transform hover:scale-110 ${
                        reviewerRating >= s ? 'text-amber-500' : 'text-zinc-700'
                      }`}
                    >
                      <Star className={`w-6 h-6 ${reviewerRating >= s ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-mono mb-1.5 uppercase">Testimonial Comment</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Mixability, flavour density, recovery speeds..."
                  value={reviewerComment}
                  onChange={(e) => setReviewerComment(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-rose-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-sans text-xs font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 uppercase tracking-widest transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Athlete Review</span>
              </button>
            </form>
          </div>
        </div>

        {/* Section: Related Products */}
        {related.length > 0 && (
          <div className="mt-20 border-t border-zinc-900 pt-12 space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-sans">
              Complete Your Formulation Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
