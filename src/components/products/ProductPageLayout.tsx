import { useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Cpu,
  Activity,
  Droplet,
  CheckCircle,
  ShoppingBag,
  Info
} from 'lucide-react';
import { PageId, Product } from '../../types';
import { PRODUCTS_DATA } from '../../data';
import Reveal from '../Reveal';
import ProductVideo from './ProductVideo';

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
  const Icon = meta.icon;
  const siblings = PRODUCTS_DATA.filter((p) => p.category === product.category && p.id !== product.id);

  const shots = product.gallery?.length ? product.gallery : product.image ? [product.image] : [];
  const [activeShot, setActiveShot] = useState(0);
  const heroSrc = shots[activeShot] ?? shots[0];

  const handleEnquire = () => {
    onSelectProductForEnquiry(product.name);
    go('contact');
  };

  return (
    <div className="min-h-screen px-6 py-12 text-[#1F2321]">
      <div className="max-w-[96rem] mx-auto">

        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-gray-400">
          <button onClick={() => go('products')} className="transition-colors hover:text-emerald-600">Products</button>
          <ChevronRight className="h-3 w-3" />
          <button onClick={() => go(meta.route)} className="transition-colors hover:text-emerald-600">{meta.label}</button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-emerald-700">{product.name}</span>
        </div>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
          {/* Visual tile — product photo when we have one, gradient+icon otherwise */}
          <div className="flex flex-col gap-3">
            <div className="relative rounded-3xl overflow-hidden min-h-[240px] flex items-center justify-center border border-gray-200/70 bg-gradient-to-br from-emerald-50 to-gray-100">
              {heroSrc ? (
                <img
                  src={heroSrc}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="h-full max-h-[420px] w-full object-contain p-6"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-700" />
                  <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_100%_0%,rgba(255,255,255,0.25),transparent_60%)]" />
                  <Icon className="relative h-20 w-20 text-white/95 drop-shadow" />
                </>
              )}
              {product.price && (
                <span className="absolute top-4 right-4 rounded-lg bg-white/80 backdrop-blur-sm px-3 py-1.5 font-mono text-sm font-bold text-emerald-700 shadow-sm">{product.price}</span>
              )}
            </div>

            {/* Thumbnails */}
            {shots.length > 1 && (
              <div className="flex gap-3">
                {shots.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActiveShot(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-gradient-to-br from-emerald-50 to-gray-100 transition-all ${
                      i === activeShot ? 'border-emerald-500 ring-2 ring-emerald-500/30' : 'border-gray-200/70 hover:border-emerald-300'
                    }`}
                  >
                    <img src={src} alt="" referrerPolicy="no-referrer" className="h-full w-full object-contain p-1.5" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-4">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-600">{product.categoryLabel}</span>
            <h1 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight text-gray-950 leading-tight">{product.name}</h1>
            <p className="font-sans text-base font-medium text-emerald-800 leading-relaxed">{product.catchphrase}</p>
            <p className="font-sans text-[15px] text-gray-600 font-light leading-relaxed">{product.description}</p>
            <div className="flex flex-wrap gap-3 mt-1">
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
        </div>

        {/* Content */}
        <div className="flex flex-col gap-12">
          {/* Product video (only when one is set) */}
          {product.video && <ProductVideo src={product.video} title={product.name} />}

          {/* Key features — plain scannable checklist */}
          <section>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-5">Key Features</h2>
            <Reveal>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    <span className="font-sans text-[15px] text-gray-700 leading-relaxed">{feat}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {/* Specifications — simple two-column table */}
          <section>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-5">Specifications</h2>
            <div className="glass rounded-2xl overflow-hidden">
              <dl className="grid grid-cols-1 sm:grid-cols-2">
                {product.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-baseline justify-between gap-4 px-5 py-3.5 border-b border-gray-100">
                    <dt className="font-sans text-sm text-gray-500">{spec.label}</dt>
                    <dd className="font-sans text-sm font-semibold text-gray-900 text-right">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-4 flex items-start gap-2 text-sm font-light leading-relaxed text-gray-500">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              Every unit includes a 2-year warranty, AiGROW software integration, and Colombo-based field support.
            </p>
          </section>

          {/* More in this category */}
          {siblings.length > 0 && (
            <section>
              <h2 className="font-sans text-xl md:text-2xl font-bold text-gray-950 tracking-tight mb-5">More in {meta.label}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {siblings.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => go(`product-${p.id}` as PageId)}
                    className="group text-left glass rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5"
                  >
                    <div className="relative h-32 flex items-center justify-center border-b border-gray-100 bg-gradient-to-br from-emerald-50 to-gray-100">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <Icon className="h-9 w-9 text-emerald-500/70" />
                      )}
                      {p.price && <span className="absolute top-2.5 right-2.5 font-mono text-xs font-bold text-emerald-700 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-sm">{p.price}</span>}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-sans text-sm font-bold text-gray-950 leading-snug">{p.name}</h3>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                        View <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

      </div>
    </div>
  );
}
