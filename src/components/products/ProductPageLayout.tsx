import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Cpu,
  Activity,
  Droplet,
  Settings,
  CheckCircle,
  ShoppingBag,
  Info
} from 'lucide-react';
import { PageId, Product } from '../../types';
import { PRODUCTS_DATA } from '../../data';

interface ProductPageLayoutProps {
  /** The product this page represents. Each product page passes its own. */
  product: Product;
  onNavigate: (pageId: PageId) => void;
  onSelectProductForEnquiry: (productName: string) => void;
}

const CATEGORY_META: Record<
  Product['category'],
  { label: string; route: PageId; icon: typeof Cpu }
> = {
  environmental: { label: 'Environmental Monitoring & Control', route: 'products-environmental', icon: Cpu },
  resource: { label: 'Resource Monitoring Systems', route: 'products-resource', icon: Activity },
  irrigation: { label: 'Irrigation Optimisation', route: 'products-irrigation', icon: Droplet }
};

export default function ProductPageLayout({
  product,
  onNavigate,
  onSelectProductForEnquiry
}: ProductPageLayoutProps) {
  // Live cycling spec readout inside the device panel
  const [specIdx, setSpecIdx] = useState(0);
  useEffect(() => {
    if (product.specs.length <= 1) return;
    const id = setInterval(() => {
      setSpecIdx((i) => (i + 1) % product.specs.length);
    }, 2600);
    return () => clearInterval(id);
  }, [product.specs.length]);

  const go = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const meta = CATEGORY_META[product.category];
  const CategoryIcon = meta.icon;
  const relatedProducts = PRODUCTS_DATA.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const liveSpec = product.specs[specIdx] ?? product.specs[0];

  const handleEnquire = () => {
    onSelectProductForEnquiry(product.name);
    go('contact');
  };

  return (
    <div className="min-h-screen px-6 py-12 text-[#1F2321]">
      <div className="mx-auto w-full">

        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-gray-400">
          <button onClick={() => go('products')} className="transition-colors hover:text-emerald-600">Products</button>
          <ChevronRight className="h-3 w-3" />
          <button onClick={() => go(meta.route)} className="transition-colors hover:text-emerald-600">{meta.label}</button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-emerald-700">{product.name}</span>
        </div>

        {/* SPLIT HERO — hardware showcase */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-14">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-emerald-700 mb-4">
              <CategoryIcon className="h-3.5 w-3.5" />
              {meta.label}
            </span>
            <h1 className="font-sans text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight leading-[1.05] mb-3">
              {product.name}
            </h1>
            <p className="font-sans text-lg italic text-emerald-800 font-medium mb-5">
              "{product.catchphrase}"
            </p>
            <p className="font-sans text-base text-gray-600 font-light leading-relaxed max-w-xl mb-7">
              {product.description}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              {product.price && (
                <div className="flex flex-col">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-gray-400">Est. Unit Price</span>
                  <span className="font-mono text-2xl font-black text-gray-900">{product.price}</span>
                </div>
              )}
              <button
                onClick={handleEnquire}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-emerald-600/15 group"
              >
                Enquire about Product
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => go('shop')}
                className="inline-flex items-center gap-2 px-6 py-3.5 glass text-gray-700 hover:text-gray-900 font-semibold rounded-xl text-sm transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                View in Shop
              </button>
            </div>
          </motion.div>

          {/* Animated device panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 order-1 lg:order-2"
          >
            <div className="relative mx-auto aspect-square max-w-sm rounded-3xl glass-green p-8 shadow-xl shadow-emerald-900/5 overflow-hidden">
              {/* IoT badge */}
              <span className="absolute top-5 right-5 z-20 inline-flex items-center gap-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-emerald-200/60 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Cloud Connected
              </span>

              {/* Pulsing rings + device icon */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ top: '-14%' }}>
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute h-28 w-28 rounded-full border-2 border-emerald-400/30"
                    animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 2.8, delay: i * 0.9, ease: 'easeOut' }}
                  />
                ))}
                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-500 text-white shadow-xl shadow-emerald-600/30">
                  <CategoryIcon className="h-12 w-12" />
                </div>
              </div>

              {/* Live cycling spec readout */}
              <div className="absolute bottom-5 inset-x-5 z-20">
                <div className="glass rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={specIdx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="min-w-0"
                    >
                      <span className="block font-mono text-[9px] font-bold uppercase tracking-wider text-gray-400 truncate">{liveSpec?.label}</span>
                      <span className="block font-mono text-xs font-bold text-emerald-700 truncate">{liveSpec?.value}</span>
                    </motion.div>
                  </AnimatePresence>
                  <Settings className="h-4 w-4 shrink-0 text-emerald-500" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* KEY SPEC STAT STRIP */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
          {product.specs.slice(0, 4).map((spec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/5"
            >
              <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">{spec.label}</span>
              <span className="block font-mono text-sm font-black text-emerald-700 leading-snug">{spec.value}</span>
            </motion.div>
          ))}
        </section>

        {/* CAPABILITIES — numbered grid */}
        <section className="mb-16">
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-8">
            Key Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/5"
              >
                <span className="font-mono text-lg font-black text-emerald-500/70 tabular-nums shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span className="font-sans text-sm text-gray-700 font-light leading-relaxed">{feat}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FULL SPECIFICATIONS */}
        <section className="glass rounded-3xl p-8 md:p-10 mb-16 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-200/70 pb-3">
            <Settings className="h-5 w-5 text-emerald-600" />
            <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-gray-900">Full Technical Specifications</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1">
            {product.specs.map((spec, sIdx) => (
              <div key={sIdx} className="flex items-baseline justify-between gap-4 border-b border-gray-200/50 py-3">
                <span className="font-sans text-xs font-bold uppercase tracking-wide text-gray-400">{spec.label}</span>
                <span className="font-mono text-xs font-medium text-gray-800 text-right">{spec.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-start gap-2 rounded-xl border border-emerald-100/50 bg-emerald-50/50 p-4 text-xs font-light leading-relaxed text-emerald-800">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <p>All hardware includes a 2-year warranty, CodeGen software integrations, and Colombo-based technical field support.</p>
          </div>
        </section>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 font-sans text-lg font-bold text-gray-950">
              More in {meta.label}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rp) => (
                <button
                  key={rp.id}
                  onClick={() => go(`product-${rp.id}` as PageId)}
                  className="glass group flex flex-col justify-between rounded-2xl p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/5"
                >
                  <div>
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <CategoryIcon className="h-5 w-5" />
                    </div>
                    <h3 className="font-sans text-base font-bold text-gray-950">{rp.name}</h3>
                    <p className="mt-1 font-sans text-xs font-medium italic text-emerald-700">"{rp.catchphrase}"</p>
                  </div>
                  <span className="mt-5 flex items-center gap-1 text-xs font-bold text-emerald-600">
                    View Product
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
