import { Leaf, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { PageId } from '../types';
import { FRESH_PRODUCE, FRESH_PRODUCE_GROUPS } from '../data';
import Reveal from './Reveal';
import CatalogSection from './products/CatalogSection';

interface FreshProductsViewProps {
  onNavigate: (pageId: PageId) => void;
}

export default function FreshProductsView({ onNavigate }: FreshProductsViewProps) {
  const go = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-[#1F2321] py-12 px-6">
      <div className="max-w-[96rem] mx-auto">

        {/* Video banner hero */}
        <Reveal className="mb-10">
          <div className="relative overflow-hidden rounded-3xl bg-emerald-950 aspect-video md:aspect-[21/9]">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/Video/fresh-produce-without-text.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/45 to-emerald-950/40" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20">
                <Leaf className="h-3.5 w-3.5" />
                AiGROW Fresh
              </div>
              <h1 className="font-sans text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-3 leading-[1.05] drop-shadow">
                Fresh Products
              </h1>
              <p className="font-sans text-gray-100 font-light text-sm sm:text-base md:text-lg max-w-2xl">
                Pesticide-free, greenhouse-grown produce harvested at peak ripeness and traceable
                back to the seedling. Priced per kilo, updated live from the AiGROW database.
              </p>
            </div>
          </div>
        </Reveal>

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

        {/* Full produce list — every item, with type filters and search */}
        <CatalogSection
          title="All Fresh Produce"
          subtitle="Every variety we grow, priced per kilo. Filter by type or search by name."
          items={FRESH_PRODUCE}
          groups={FRESH_PRODUCE_GROUPS}
          initialCount={FRESH_PRODUCE.length}
          searchable
          attribution="Produce photography sourced from Wikimedia Commons under CC BY-SA / public domain licences. Replace with AiGROW's own product photography when the catalog syncs from the internal database."
        />

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => go('contact')}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-emerald-600/15 group"
          >
            Order fresh produce
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </div>
  );
}
