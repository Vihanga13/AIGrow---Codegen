import { ArrowRight, ChevronRight, Leaf, ShoppingBag, Info } from 'lucide-react';
import { PageId } from '../../types';
import { findCatalogItem } from '../../data';

interface CatalogItemViewProps {
  itemId: string;
  onNavigate: (pageId: PageId) => void;
  onSelectProductForEnquiry: (productName: string) => void;
}

export default function CatalogItemView({ itemId, onNavigate, onSelectProductForEnquiry }: CatalogItemViewProps) {
  const go = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const item = findCatalogItem(itemId);

  // Unknown id — shouldn't normally happen, but fail gracefully.
  if (!item) {
    return (
      <div className="min-h-screen px-6 py-20 text-center">
        <p className="font-sans text-gray-500 mb-6">Sorry, we couldn’t find that item.</p>
        <button onClick={() => go('products')} className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white font-bold rounded-xl text-sm">
          Back to Products
        </button>
      </div>
    );
  }

  const handleEnquire = () => {
    onSelectProductForEnquiry(item.name);
    go('contact');
  };

  return (
    <div className="min-h-screen px-6 py-12 text-[#1F2321]">
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-gray-400">
          <button onClick={() => go('products')} className="transition-colors hover:text-emerald-600">Products</button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-400">{item.group}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-emerald-700">{item.name}</span>
        </div>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-10">
          {/* Visual */}
          <div className="relative rounded-3xl overflow-hidden min-h-[260px] flex items-center justify-center border border-gray-200/70 bg-gradient-to-br from-emerald-50 to-gray-100">
            {item.image ? (
              <img src={item.image} alt={item.name} referrerPolicy="no-referrer" className="h-full max-h-[380px] w-full object-contain p-6" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-emerald-500/60">
                <span className="font-sans text-5xl font-black">{item.name.charAt(0)}</span>
                <Leaf className="h-6 w-6" />
              </div>
            )}
            {item.unitRate && (
              <span className="absolute top-4 left-4 rounded-lg bg-white/85 backdrop-blur-sm px-3 py-1.5 font-mono text-xs font-bold text-emerald-700">{item.unitRate}</span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center gap-4">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-600">{item.group}</span>
            <h1 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight text-gray-950 leading-tight">{item.name}</h1>
            {item.spec && <p className="font-sans text-[15px] text-gray-600 font-light leading-relaxed">{item.spec}</p>}
            <span className="font-mono text-xl font-bold text-emerald-600">{item.price}</span>

            <div className="flex flex-wrap gap-3 mt-1">
              <button
                onClick={handleEnquire}
                className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-emerald-600/15 group"
              >
                Enquire
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => go('products')}
                className="inline-flex items-center gap-2 px-5 py-3 glass text-gray-700 hover:text-gray-900 font-semibold rounded-xl text-sm transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                Full Catalog
              </button>
            </div>
          </div>
        </div>

        {/* Variants / sizes */}
        {item.variants && item.variants.length > 0 && (
          <section className="mb-10">
            <h2 className="font-sans text-xl md:text-2xl font-bold text-gray-950 tracking-tight mb-4">Available options</h2>
            <div className="glass rounded-2xl overflow-hidden divide-y divide-gray-100">
              {item.variants.map((v, i) => (
                <div key={i} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <div className="min-w-0">
                    <span className="font-sans text-sm font-semibold text-gray-900">{v.label}</span>
                    {v.note && <span className="block font-mono text-[11px] text-gray-400 mt-0.5">{v.note}</span>}
                  </div>
                  <span className="font-mono text-sm font-bold text-emerald-700 shrink-0">{v.price}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Note */}
        <p className="flex items-start gap-2 text-sm font-light leading-relaxed text-gray-500">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          Pricing and stock sync from the AiGROW system. Contact us to confirm current availability, bulk rates and delivery to your site.
        </p>
      </div>
    </div>
  );
}
