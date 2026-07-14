import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  X,
  Trash2,
  Plus,
  Minus,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Info,
  Zap,
  Cpu,
  Thermometer,
  Droplet,
  Activity,
  Check
} from 'lucide-react';
import { PageId, Product } from '../types';
import { PRODUCTS_DATA } from '../data';

interface ShopViewProps {
  onNavigate: (pageId: PageId) => void;
  onSelectProductForEnquiry: (productName: string) => void;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const CATEGORIES = [
  { id: 'all', label: 'All Equipment' },
  { id: 'environmental', label: 'Environmental' },
  { id: 'resource', label: 'Sensors & Meters' },
  { id: 'irrigation', label: 'Irrigation Units' }
];

const CATEGORY_ICON: Record<string, typeof Cpu> = {
  environmental: Thermometer,
  resource: Activity,
  irrigation: Droplet
};

/* ---------------------------------------------------------------- */
/* Blueprint schematic — CSS-drawn stand-in for a product photo     */
/* ---------------------------------------------------------------- */
function Blueprint({ product, figNo }: { product: Product; figNo: number }) {
  const Icon = CATEGORY_ICON[product.category] ?? Cpu;
  return (
    <div
      className="relative overflow-hidden bg-emerald-950 min-h-[280px] lg:min-h-full flex items-center justify-center"
      style={{
        backgroundImage:
          'linear-gradient(rgba(129,168,136,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(129,168,136,0.10) 1px, transparent 1px)',
        backgroundSize: '26px 26px'
      }}
    >
      {/* Corner ticks */}
      <span className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-emerald-400/60" />
      <span className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-emerald-400/60" />
      <span className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-emerald-400/60" />
      <span className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-emerald-400/60" />

      {/* Scan line */}
      <motion.span
        className="absolute left-0 right-0 h-px bg-emerald-400/40"
        animate={{ top: ['12%', '88%', '12%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Annotations */}
      <span className="absolute top-5 left-11 font-mono text-[10px] text-emerald-300/70 tracking-widest">FIG.0{figNo}</span>
      <span className="absolute top-5 right-11 font-mono text-[10px] text-emerald-300/70 tracking-widest uppercase">
        {product.category}
      </span>
      <span className="absolute bottom-5 left-11 font-mono text-[10px] text-emerald-300/70 tracking-widest">
        AIGROW // {product.id.toUpperCase()}
      </span>
      <span className="absolute bottom-5 right-11 font-mono text-[10px] text-emerald-300/70 tracking-widest">{product.price}</span>

      {/* Central unit */}
      <div className="relative flex flex-col items-center gap-4">
        <span className="absolute -inset-8 rounded-full border border-dashed border-emerald-400/25 animate-[spin_18s_linear_infinite]" />
        <div className="w-24 h-24 rounded-3xl bg-emerald-500/15 border border-emerald-400/40 backdrop-blur-sm flex items-center justify-center text-emerald-200">
          <Icon className="w-11 h-11" strokeWidth={1.4} />
        </div>
        <span className="font-mono text-[10px] text-emerald-300/60 tracking-[0.3em] uppercase">Schematic View</span>
      </div>
    </div>
  );
}

export default function ShopView({ onNavigate, onSelectProductForEnquiry }: ShopViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeId, setActiveId] = useState<string>(PRODUCTS_DATA[0].id);
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAddedToast, setShowAddedToast] = useState<string | null>(null);

  const stripRef = useRef<HTMLDivElement>(null);

  const filteredProducts =
    selectedCategory === 'all' ? PRODUCTS_DATA : PRODUCTS_DATA.filter((p) => p.category === selectedCategory);

  const activeProduct = filteredProducts.find((p) => p.id === activeId) ?? filteredProducts[0];
  const activeFigNo = PRODUCTS_DATA.findIndex((p) => p.id === activeProduct.id) + 1;

  const getRawPrice = (priceStr: string | undefined): number => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace('LKR', '').replace(/,/g, '').trim(), 10) || 0;
  };

  const selectCategory = (id: string) => {
    setSelectedCategory(id);
    const list = id === 'all' ? PRODUCTS_DATA : PRODUCTS_DATA.filter((p) => p.category === id);
    setActiveId(list[0].id);
    setQty(1);
  };

  const selectProduct = (id: string) => {
    setActiveId(id);
    setQty(1);
  };

  const scrollStrip = (dir: number) => stripRef.current?.scrollBy({ left: dir * 260, behavior: 'smooth' });

  const handleAddToCart = (product: Product, amount = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + amount } : item));
      }
      return [...prev, { product, quantity: amount }];
    });
    setShowAddedToast(product.name);
    setTimeout(() => setShowAddedToast(null), 2500);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.product.id === productId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => setCart((prev) => prev.filter((item) => item.product.id !== productId));

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalPrice = cart.reduce((acc, item) => acc + getRawPrice(item.product.price) * item.quantity, 0);

  const handleEnquireProduct = (product: Product) => {
    onSelectProductForEnquiry(product.name);
    onNavigate('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckoutInquiry = () => {
    const summary = cart.map((item) => `- ${item.product.name} (x${item.quantity})`).join('\n');
    onSelectProductForEnquiry(`Cart Contents:\n${summary}\n\nTotal Estimated Price: LKR ${cartTotalPrice.toLocaleString()}`);
    setCart([]);
    setIsCartOpen(false);
    onNavigate('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const unitPrice = getRawPrice(activeProduct.price);

  return (
    <div className="min-h-screen text-[#1F2321] px-6 relative">
      <div className="max-w-7xl mx-auto py-12 lg:py-16">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-700 font-semibold mb-4">
              <Zap className="w-3.5 h-3.5" /> AiGROW Supply Terminal
            </div>
            <h1 className="font-sans text-4xl md:text-6xl font-black tracking-tighter text-gray-950 leading-[0.9]">
              Smart hardware,
              <br />
              <span className="text-emerald-600">shipped to spec.</span>
            </h1>
          </div>

          <button
            id="shop-floating-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="self-start relative flex items-center gap-3 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-emerald-600/15 shrink-0"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Equipment Cart</span>
            {cartTotalCount > 0 && (
              <motion.span
                key={cartTotalCount}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 rounded-full bg-white text-emerald-700 text-xs font-black flex items-center justify-center"
              >
                {cartTotalCount}
              </motion.span>
            )}
          </button>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap items-center gap-2 mb-5" id="shop-category-tabs">
          {CATEGORIES.map((cat) => {
            const count = cat.id === 'all' ? PRODUCTS_DATA.length : PRODUCTS_DATA.filter((p) => p.category === cat.id).length;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => selectCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-full font-sans text-xs font-bold transition-colors ${
                  isActive ? 'text-white' : 'text-gray-600 hover:text-gray-950'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="shop-cat-pill"
                    className="absolute inset-0 bg-emerald-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {cat.label}
                  <span className={`text-[10px] font-mono ${isActive ? 'text-white/70' : 'text-gray-400'}`}>{count}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* SKU SELECTOR STRIP */}
        <div className="flex items-center gap-2 mb-5">
          <button
            onClick={() => scrollStrip(-1)}
            className="hidden sm:flex w-9 h-9 shrink-0 rounded-full glass items-center justify-center text-gray-600 hover:text-emerald-700 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div ref={stripRef} className="flex gap-2 overflow-x-auto scrollbar-none py-1 grow" style={{ scrollbarWidth: 'none' }}>
            {filteredProducts.map((p, i) => {
              const isActive = p.id === activeProduct.id;
              return (
                <button
                  key={p.id}
                  id={`shop-item-card-${p.id}`}
                  onClick={() => selectProduct(p.id)}
                  className={`group shrink-0 w-56 text-left rounded-2xl border p-3.5 transition-all duration-200 ${
                    isActive ? 'bg-gray-950 border-gray-950 text-white shadow-lg' : 'glass border-transparent hover:border-emerald-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`font-mono text-[10px] font-bold tracking-widest ${isActive ? 'text-emerald-400' : 'text-gray-400'}`}>
                      SKU-{String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={`font-mono text-[11px] font-bold ${isActive ? 'text-emerald-300' : 'text-emerald-600'}`}>{p.price}</span>
                  </div>
                  <div className={`font-sans text-sm font-bold leading-snug truncate ${isActive ? 'text-white' : 'text-gray-900'}`}>
                    {p.name}
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => scrollStrip(1)}
            className="hidden sm:flex w-9 h-9 shrink-0 rounded-full glass items-center justify-center text-gray-600 hover:text-emerald-700 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* DATASHEET PANEL */}
        <div className="glass rounded-3xl overflow-hidden border border-emerald-100 shadow-xl shadow-emerald-900/5">
          {/* Header band */}
          <div className="flex items-center justify-between px-6 md:px-8 py-3.5 bg-gray-950 text-white">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Datasheet
            </div>
            <span className="font-mono text-[11px] text-gray-500 tracking-widest">REF · {activeProduct.id.toUpperCase()}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2"
            >
              {/* Blueprint */}
              <Blueprint product={activeProduct} figNo={activeFigNo} />

              {/* Spec column */}
              <div className="p-6 md:p-8 flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-600 font-bold">
                  {activeProduct.categoryLabel}
                </span>
                <h2 className="font-sans text-2xl md:text-3xl font-black text-gray-950 tracking-tight leading-tight mt-2">
                  {activeProduct.name}
                </h2>
                <p className="font-sans text-sm text-emerald-800 italic font-medium mt-1.5">{activeProduct.catchphrase}</p>
                <p className="font-sans text-xs text-gray-500 leading-relaxed font-light mt-3">{activeProduct.description}</p>

                {/* Spec table */}
                <div className="mt-5 flex flex-col divide-y divide-gray-200/70 border-y border-gray-200/70">
                  {activeProduct.specs.map((spec) => (
                    <div key={spec.label} className="flex items-start justify-between gap-4 py-2">
                      <span className="font-mono text-[10px] text-gray-400 uppercase tracking-wider shrink-0 pt-0.5">{spec.label}</span>
                      <span className="font-sans text-xs font-semibold text-gray-900 text-right leading-snug">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  {activeProduct.features.slice(0, 4).map((feat, i) => (
                    <div key={i} className="flex gap-1.5 items-start text-[11px] text-gray-600">
                      <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="font-sans font-light leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Buy bar */}
          <div className="border-t border-emerald-100 px-6 md:px-8 py-4 bg-white/60 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-black text-emerald-600">{activeProduct.price}</span>
              <span className="font-sans text-[11px] text-gray-400">/ unit</span>
            </div>

            {/* Quantity stepper */}
            <div className="flex items-center gap-1.5 sm:ml-auto">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-lg bg-white border border-gray-200 hover:border-emerald-300 flex items-center justify-center text-gray-600 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-sm font-bold w-10 text-center text-gray-900">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-9 h-9 rounded-lg bg-white border border-gray-200 hover:border-emerald-300 flex items-center justify-center text-gray-600 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                id={`shop-btn-add-to-cart-${activeProduct.id}`}
                onClick={() => handleAddToCart(activeProduct, qty)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Add {qty > 1 ? `${qty} ` : ''}· LKR {(unitPrice * qty).toLocaleString()}
              </button>
              <button
                id={`shop-btn-enquire-${activeProduct.id}`}
                onClick={() => handleEnquireProduct(activeProduct)}
                className="px-4 py-2.5 bg-white text-gray-700 border border-gray-200 hover:border-gray-300 font-semibold rounded-xl text-xs transition-colors"
              >
                Quote
              </button>
            </div>
          </div>
        </div>

        {/* INFO BOX */}
        <div className="mt-10 glass-green rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-12 h-12 rounded-2xl bg-white/60 flex items-center justify-center text-emerald-600 shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-sans text-sm font-bold text-gray-900 mb-1">Corporate & large-quantity orders</h4>
            <p className="font-sans text-xs text-gray-600 leading-relaxed font-light">
              Planning a commercial setup exceeding 10 units? Bypass individual checkout and submit a custom blueprint
              inquiry via our{' '}
              <span className="text-emerald-600 font-semibold cursor-pointer hover:underline" onClick={() => onNavigate('contact')}>
                Contact page
              </span>
              . Our engineering panel provides volumetric trade discounts and integrated deployment planning.
            </p>
          </div>
        </div>
      </div>

      {/* TOAST */}
      <AnimatePresence>
        {showAddedToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-gray-950 text-white rounded-2xl px-5 py-4 shadow-2xl border border-gray-800 flex items-center gap-3.5 max-w-sm"
          >
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs min-w-0">
              <span className="font-bold">Added to cart</span>
              <p className="text-gray-300 mt-0.5 truncate">{showAddedToast}</p>
            </div>
            <button onClick={() => setIsCartOpen(true)} className="ml-auto text-xs text-emerald-400 font-bold hover:underline shrink-0">
              View Cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-hidden bg-black/45 backdrop-blur-sm flex justify-end"
            id="shop-cart-drawer-overlay"
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
            >
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-gray-900">
                  <ShoppingBag className="w-5 h-5 text-emerald-600" />
                  <h2 className="font-sans text-base font-bold">Equipment Cart</h2>
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold">{cartTotalCount}</span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-950 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grow overflow-y-auto px-6 py-4 flex flex-col gap-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-sans text-sm font-semibold text-gray-800">Your cart is empty</h3>
                      <p className="font-sans text-xs text-gray-400 mt-1 font-light">
                        Add some smart controllers, testing meters or dripper packs from the supply terminal.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-5 py-2.5 bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-100 rounded-xl text-xs transition-colors"
                    >
                      Continue Browsing
                    </button>
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {cart.map((item) => {
                      const subtotal = getRawPrice(item.product.price) * item.quantity;
                      return (
                        <motion.div
                          key={item.product.id}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, x: 40 }}
                          transition={{ duration: 0.25 }}
                          className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 items-start justify-between"
                        >
                          <div className="flex flex-col gap-1.5 grow min-w-0">
                            <h4 className="font-sans text-xs font-bold text-gray-900 leading-snug">{item.product.name}</h4>
                            <span className="font-sans text-[10px] text-gray-400 font-medium">Unit: {item.product.price}</span>
                            <div className="flex items-center gap-1.5 mt-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, -1)}
                                className="w-6 h-6 rounded bg-white hover:bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-mono text-xs font-semibold px-2 w-6 text-center text-gray-800">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, 1)}
                                className="w-6 h-6 rounded bg-white hover:bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col items-end justify-between h-full gap-4 shrink-0">
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <span className="font-mono text-xs font-bold text-gray-800">LKR {subtotal.toLocaleString()}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </div>

              {cart.length > 0 && (
                <div className="px-6 py-6 border-t border-gray-100 flex flex-col gap-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-sans text-gray-500 font-semibold">Estimated Subtotal</span>
                    <span className="font-mono text-base font-bold text-emerald-600">LKR {cartTotalPrice.toLocaleString()}</span>
                  </div>
                  <p className="font-sans text-[10px] text-gray-400 leading-relaxed font-light">
                    Tax and logistics fees calculated at checkout. Submitting this checkout initiates an official technical
                    pricing quotation request.
                  </p>
                  <button
                    id="shop-checkout-btn"
                    onClick={handleCheckoutInquiry}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout Inquiry
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
