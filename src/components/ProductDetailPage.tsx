import { motion } from 'motion/react';
import {
  ArrowLeft,
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
import { PageId, Product } from '../types';
import { PRODUCTS_DATA } from '../data';

interface ProductDetailPageProps {
  /** The product's data.ts id, e.g. "smart-climate". */
  productId: string;
  onNavigate: (pageId: PageId) => void;
  onSelectProductForEnquiry: (productName: string) => void;
}

// Category → route + presentation metadata (kept in one place for clarity)
const CATEGORY_META: Record<
  Product['category'],
  { label: string; route: PageId; icon: typeof Cpu }
> = {
  environmental: { label: 'Environmental Monitoring & Control', route: 'products-environmental', icon: Cpu },
  resource: { label: 'Resource Monitoring Systems', route: 'products-resource', icon: Activity },
  irrigation: { label: 'Irrigation Optimisation', route: 'products-irrigation', icon: Droplet }
};

export default function ProductDetailPage({
  productId,
  onNavigate,
  onSelectProductForEnquiry
}: ProductDetailPageProps) {
  const product = PRODUCTS_DATA.find((p) => p.id === productId);

  const go = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Graceful fallback if an unknown product id is routed to
  if (!product) {
    return (
      <div className="min-h-screen px-6 py-24 text-center text-[#1F2321]">
        <h1 className="font-sans text-2xl font-bold text-gray-900">Product not found</h1>
        <button
          onClick={() => go('products')}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </button>
      </div>
    );
  }

  const meta = CATEGORY_META[product.category];
  const CategoryIcon = meta.icon;
  const relatedProducts = PRODUCTS_DATA.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const handleEnquire = () => {
    onSelectProductForEnquiry(product.name);
    go('contact');
  };

  return (
    <div className="min-h-screen px-6 py-12 text-[#1F2321]">
      <div className="mx-auto w-full">

        {/* Breadcrumb + back */}
        <div className="mb-8 flex flex-col gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-gray-400">
            <button onClick={() => go('products')} className="transition-colors hover:text-emerald-600">Products</button>
            <ChevronRight className="h-3 w-3" />
            <button onClick={() => go(meta.route)} className="transition-colors hover:text-emerald-600">{meta.label}</button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-emerald-700">{product.name}</span>
          </div>

          <button
            onClick={() => go(meta.route)}
            className="group flex w-fit items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-emerald-600"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to {meta.label}
          </button>
        </div>

        {/* Detail card */}
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass grid grid-cols-1 gap-12 rounded-3xl p-8 shadow-xl shadow-emerald-900/5 md:p-12 lg:grid-cols-12"
        >
          {/* Info column */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-emerald-700">
                <CategoryIcon className="h-3.5 w-3.5" />
                {meta.label}
              </span>
              <h1 className="mb-3 font-sans text-3xl font-extrabold leading-none tracking-tight text-gray-950 md:text-4xl">
                {product.name}
              </h1>
              <p className="font-sans text-lg font-medium italic text-emerald-800">
                "{product.catchphrase}"
              </p>
            </div>

            <p className="border-t border-gray-100 pt-4 font-sans text-sm font-light leading-relaxed text-gray-600 md:text-base">
              {product.description}
            </p>

            {/* Features */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans text-sm font-bold text-gray-900">Key Core Capabilities</h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed text-gray-700">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="font-sans font-light">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price + actions */}
            <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-gray-100 pt-6">
              {product.price && (
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-gray-400">Est. Unit Price</span>
                  <span className="mt-0.5 font-mono text-2xl font-bold text-gray-900">{product.price}</span>
                </div>
              )}

              <div className="flex grow gap-4 sm:grow-0">
                <button
                  id="product-detail-enquire"
                  onClick={handleEnquire}
                  className="flex grow items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-sm font-medium text-white shadow-md shadow-emerald-600/10 transition-all hover:bg-emerald-700 sm:grow-0"
                >
                  Enquire about Product
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => go('shop')}
                  className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-white/70 px-7 py-3.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 sm:flex"
                >
                  <ShoppingBag className="h-4 w-4" />
                  View in Shop
                </button>
              </div>
            </div>
          </div>

          {/* Specs column */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-6 md:p-8 lg:col-span-5">
            <div className="mb-6 flex items-center gap-2 border-b border-gray-200 pb-3">
              <Settings className="h-5 w-5 text-emerald-600" />
              <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-gray-900">Technical Specifications</h3>
            </div>

            <div className="flex flex-col gap-4">
              {product.specs.map((spec, sIdx) => (
                <div key={sIdx} className="flex flex-col border-b border-gray-200/50 pb-2 last:border-0">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-wide text-gray-400">{spec.label}</span>
                  <span className="mt-1 font-mono text-xs font-medium text-gray-800">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-start gap-2 rounded-xl border border-emerald-100/50 bg-emerald-50/50 p-4 text-xs font-light leading-relaxed text-emerald-800">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <p>All hardware includes a 2-year warranty, CodeGen software integrations, and Colombo-based technical field support.</p>
            </div>
          </div>
        </motion.div>

        {/* Related products in the same category — each links to its own page */}
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
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
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
