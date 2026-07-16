import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  X,
  Trash2,
  Plus,
  Minus,
  CheckCircle,
  ChevronRight,
  Info
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

export default function ShopView({ onNavigate, onSelectProductForEnquiry }: ShopViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAddedToast, setShowAddedToast] = useState<string | null>(null);

  const filteredProducts =
    selectedCategory === 'all' ? PRODUCTS_DATA : PRODUCTS_DATA.filter((p) => p.category === selectedCategory);

  const getRawPrice = (priceStr: string | undefined): number => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace('LKR', '').replace(/,/g, '').trim(), 10) || 0;
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { product, quantity: 1 }];
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

  return (
    <div className="min-h-screen text-[#1F2321] px-6 py-12 relative">
      <div className="max-w-[96rem] mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
              AiGROW Supply Hub
            </div>
            <h1 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950 mb-3">
              Purchase Smart Hardware
            </h1>
            <p className="font-sans text-gray-500 font-light text-sm md:text-base max-w-2xl">
              Buy individual telemetry pods, EC controllers and grow-light bars to upgrade your home gardens or
              enterprise greenhouse complexes.
            </p>
          </div>

          <button
            id="shop-floating-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="self-start relative flex items-center gap-3 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-emerald-600/15 shrink-0"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>My Equipment Cart</span>
            {cartTotalCount > 0 && (
              <span className="w-6 h-6 rounded-full bg-white text-emerald-700 text-xs font-black flex items-center justify-center">
                {cartTotalCount}
              </span>
            )}
          </button>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-6 mb-10" id="shop-category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs font-bold transition-all ${
                selectedCategory === cat.id ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10' : 'glass text-gray-600 hover:text-gray-950'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16" id="shop-products-grid">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              id={`shop-item-card-${prod.id}`}
              className="glass rounded-3xl flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5"
            >
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-widest">{prod.categoryLabel}</span>
                  <span className="font-mono text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">{prod.price}</span>
                </div>

                <div>
                  <h3 className="font-sans text-base font-bold text-gray-950 leading-snug">{prod.name}</h3>
                  <p className="font-sans text-xs text-emerald-800 italic font-medium mt-1">"{prod.catchphrase}"</p>
                </div>

                <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">{prod.description}</p>

                <div className="flex flex-col gap-1.5 mt-auto">
                  {prod.features.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} className="flex gap-2 items-start text-[11px] text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span className="font-sans font-light leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-gray-100 bg-gray-50/40 flex gap-3">
                <button
                  id={`shop-btn-add-to-cart-${prod.id}`}
                  onClick={() => handleAddToCart(prod)}
                  className="grow py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add to Cart
                </button>
                <button
                  id={`shop-btn-enquire-${prod.id}`}
                  onClick={() => handleEnquireProduct(prod)}
                  className="px-4 py-3 bg-white text-gray-700 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700 font-semibold rounded-xl text-xs transition-colors"
                >
                  Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* INFO BOX */}
        <div className="glass-green rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
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
                        Add some smart controllers, testing meters or dripper packs from the supply hub.
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
                  cart.map((item) => {
                    const subtotal = getRawPrice(item.product.price) * item.quantity;
                    return (
                      <div
                        key={item.product.id}
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
                      </div>
                    );
                  })
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
