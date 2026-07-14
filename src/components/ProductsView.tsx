import { useState } from 'react';
import { Info, Cpu, Activity, Droplet, ArrowRight } from 'lucide-react';
import { PageId, Product } from '../types';
import { PRODUCTS_DATA } from '../data';
import Reveal from './Reveal';

interface ProductsViewProps {
  onNavigate: (pageId: PageId) => void;
  onSelectProductForEnquiry: (productName: string) => void;
}

const FILTERS = [
  { id: 'all', label: 'All Hardware' },
  { id: 'environmental', label: 'Environmental' },
  { id: 'resource', label: 'Resource' },
  { id: 'irrigation', label: 'Irrigation' }
];

const CAT_ICON: Record<Product['category'], typeof Cpu> = {
  environmental: Cpu,
  resource: Activity,
  irrigation: Droplet
};

export default function ProductsView({ onNavigate }: ProductsViewProps) {
  const [filter, setFilter] = useState('all');

  const go = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const products = filter === 'all' ? PRODUCTS_DATA : PRODUCTS_DATA.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen text-[#1F2321] py-12 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <Reveal className="max-w-3xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            AiGROW Hardware
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-extrabold tracking-tight text-gray-950 mb-4 leading-[1.05]">
            Engineered Agriculture Hardware
          </h1>
          <p className="font-sans text-gray-500 font-light text-base md:text-lg">
            Browse our full hardware line-up by category, then open any unit for its full specifications.
          </p>
        </Reveal>

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === f.id ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/15' : 'glass text-gray-600 hover:text-gray-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((p, idx) => {
            const Icon = CAT_ICON[p.category];
            return (
              <Reveal key={p.id} delay={(idx % 3) * 0.06}>
                <button
                  id={`product-card-${p.id}`}
                  onClick={() => go(`product-${p.id}` as PageId)}
                  className="group w-full h-full text-left glass rounded-3xl p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    {p.price && (
                      <span className="font-mono text-sm font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">{p.price}</span>
                    )}
                  </div>

                  <h3 className="font-sans text-base font-bold text-gray-950 leading-snug">{p.name}</h3>
                  <p className="font-sans text-xs italic text-emerald-700 font-medium mt-1">"{p.catchphrase}"</p>

                  <div className="mt-4 flex flex-col divide-y divide-gray-100 border-y border-gray-100">
                    {p.specs.slice(0, 2).map((s, i) => (
                      <div key={i} className="flex justify-between gap-2 py-2 text-[11px]">
                        <span className="font-mono text-gray-400 uppercase tracking-wide truncate">{s.label}</span>
                        <span className="font-mono text-gray-700 font-medium text-right truncate">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                    View Details
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Info box */}
        <div className="glass rounded-2xl p-6 border border-emerald-100/50 flex items-start gap-4 max-w-4xl mx-auto">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Info className="h-5 w-5" />
          </span>
          <div>
            <h4 className="font-sans text-sm font-bold text-gray-900 mb-1">Locally engineered in Sri Lanka</h4>
            <p className="font-sans text-xs text-gray-600 leading-relaxed font-light">
              All hardware is designed, assembled, and supported in Colombo by CodeGen International engineers, with volumetric trade discounts for commercial deployments.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
