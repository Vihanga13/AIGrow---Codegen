import { Leaf, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { PageId } from '../types';
import { FRESH_PRODUCE, CatalogItem } from '../data';
import Reveal from './Reveal';

interface FreshProductsViewProps {
  onNavigate: (pageId: PageId) => void;
}

/* The curated line-up for this tab. First match wins for duplicated names. */
const FEATURED = ['Lettuce', 'Cherry Tomato', 'Bell Pepper', 'Salad Cucumber', 'Cardamom'];

const items: CatalogItem[] = FEATURED.map(
  (name) => FRESH_PRODUCE.find((p) => p.name === name)!
).filter(Boolean);

export default function FreshProductsView({ onNavigate }: FreshProductsViewProps) {
  const go = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-[#1F2321] py-12 px-6">
      <div className="max-w-[96rem] mx-auto">

        {/* Header */}
        <Reveal className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Leaf className="h-3.5 w-3.5" />
            AiGROW Fresh
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-extrabold tracking-tight text-gray-950 mb-4 leading-[1.05]">
            Fresh Products
          </h1>
          <p className="font-sans text-gray-500 font-light text-base md:text-lg">
            Pesticide-free, greenhouse-grown produce harvested at peak ripeness and traceable
            back to the seedling. Priced per kilo, updated live from the AiGROW database.
          </p>
        </Reveal>

        {/* Featured produce grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-12">
          {items.map((item, idx) => (
            <Reveal key={item.id} delay={(idx % 5) * 0.05}>
              <div className="group glass rounded-3xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5">
                <div className="relative aspect-square overflow-hidden bg-emerald-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-md bg-white/85 backdrop-blur-sm px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
                    per kg
                  </span>
                </div>
                <div className="p-4 flex flex-col gap-1 flex-1">
                  <h3 className="font-sans text-sm font-bold text-gray-950 leading-snug">{item.name}</h3>
                  <span className="mt-auto pt-1 font-mono text-sm font-bold text-emerald-600">{item.price}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: ShieldCheck, title: '100% Pesticide-Free', desc: 'Lab-certified clean growing across every harvest cycle.' },
            { icon: Sparkles, title: 'Peak-Ripeness Harvest', desc: 'Cut and cold-chain packed the same day for maximum nutrition.' },
            { icon: Leaf, title: 'Fully Traceable', desc: 'QR codes on every pack link back to grower logs and harvest date.' }
          ].map((f, i) => (
            <div key={i} className="glass rounded-2xl p-5 flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <f.icon className="h-5 w-5" />
              </span>
              <div>
                <h4 className="font-sans text-sm font-bold text-gray-900">{f.title}</h4>
                <p className="font-sans text-xs text-gray-500 font-light leading-relaxed mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to full produce list */}
        <div className="text-center">
          <button
            onClick={() => go('products')}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-emerald-600/15 group"
          >
            See the full fresh produce range
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </div>
  );
}
