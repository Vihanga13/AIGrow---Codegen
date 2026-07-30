import { useState } from 'react';
import { Info, Cpu, Activity, Droplet, ArrowRight } from 'lucide-react';
import { PageId, Product } from '../types';
import {
  PRODUCTS_DATA,
  GREENHOUSE_PARTS,
  GREENHOUSE_PART_GROUPS,
  FRESH_PRODUCE,
  FRESH_PRODUCE_GROUPS
} from '../data';
import Reveal from './Reveal';
import CatalogSection from './products/CatalogSection';

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
      <div className="max-w-[96rem] mx-auto">

        {/* Video banner hero */}
        <Reveal className="mb-10">
          <div className="relative overflow-hidden rounded-3xl bg-gray-950 aspect-video md:aspect-[21/9]">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/Video/Equipments-Banner.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/45 to-gray-950/40" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20">
                AiGROW Hardware
              </div>
              <h1 className="font-sans text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-3 leading-[1.05] drop-shadow">
                Engineered Agriculture Hardware
              </h1>
              <p className="font-sans text-gray-200 font-light text-sm sm:text-base md:text-lg max-w-2xl">
                Browse our full hardware line-up by category, then open any unit for its full specifications.
              </p>
            </div>
          </div>
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
                  className="group w-full h-full text-left glass rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5"
                >
                  {/* Product photo, or an icon panel when there's no photo yet */}
                  <div className="relative h-44 flex items-center justify-center border-b border-gray-100 bg-gradient-to-br from-emerald-50 to-gray-100">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <Icon className="h-12 w-12 text-emerald-500/70" />
                    )}
                    {p.price && (
                      <span className="absolute top-3 right-3 font-mono text-sm font-bold text-emerald-700 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm">{p.price}</span>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
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
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Greenhouse & Irrigation Parts */}
        <CatalogSection
          title="Greenhouse & Irrigation Parts"
          subtitle="Individual components for custom builds — films, nets, fans, rollups and fixings. Expand any card for its size and quantity options."
          items={GREENHOUSE_PARTS}
          groups={GREENHOUSE_PART_GROUPS}
          initialCount={12}
          searchable
        />

        {/* Fresh Produce */}
        <CatalogSection
          title="Fresh Produce"
          subtitle="Locally grown, pesticide-free produce priced per kilo. Live pricing updates automatically from the AiGROW database."
          items={FRESH_PRODUCE}
          groups={FRESH_PRODUCE_GROUPS}
          initialCount={16}
          searchable
          attribution="Crop photography sourced from Wikimedia Commons under CC BY-SA / public domain licences. Replace with AiGROW's own product photography when the catalog syncs from the internal database."
        />

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
