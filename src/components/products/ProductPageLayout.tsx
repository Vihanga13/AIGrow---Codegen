import { motion } from 'motion/react';
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
import ProductCoverflow from './ProductCoverflow';

interface ProductPageLayoutProps {
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
  const go = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const meta = CATEGORY_META[product.category];
  const categoryProducts = PRODUCTS_DATA.filter((p) => p.category === product.category);
  const currentIndex = Math.max(0, categoryProducts.findIndex((p) => p.id === product.id));

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

        {/* Coverflow gallery of this category (current unit centered) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <ProductCoverflow
            key={product.id}
            products={categoryProducts}
            initialActive={currentIndex}
            onOpen={(p) => go(`product-${p.id}` as PageId)}
          />
        </motion.div>

        {/* CTA bar */}
        <div className="glass rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-14 max-w-5xl mx-auto shadow-sm">
          <div className="text-center sm:text-left">
            <h2 className="font-sans text-lg font-bold text-gray-950">{product.name}</h2>
            <p className="font-sans text-sm italic text-emerald-700 font-medium">"{product.catchphrase}"</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {product.price && (
              <div className="text-center sm:text-right">
                <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400">Est. Price</span>
                <span className="font-mono text-xl font-black text-gray-900">{product.price}</span>
              </div>
            )}
            <button
              onClick={handleEnquire}
              className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-emerald-600/15 group"
            >
              Enquire
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => go('shop')}
              className="inline-flex items-center gap-2 px-5 py-3 glass text-gray-700 hover:text-gray-900 font-semibold rounded-xl text-sm transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              Shop
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto flex flex-col gap-14">
          {/* Overview */}
          <section>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-4">Overview</h2>
            <p className="font-sans text-lg text-gray-600 font-light leading-relaxed">{product.description}</p>
          </section>

          {/* Capabilities */}
          <section>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-6">Key Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="glass rounded-2xl p-5 flex items-start gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/5"
                >
                  <span className="font-mono text-lg font-black text-emerald-500/70 tabular-nums shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="font-sans text-sm text-gray-700 font-light leading-relaxed">{feat}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Full specifications */}
          <section className="glass rounded-3xl p-8 shadow-sm">
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
        </div>

      </div>
    </div>
  );
}
