import { useState } from 'react';
import { motion } from 'motion/react';
import { Info } from 'lucide-react';
import { PageId } from '../types';
import { PRODUCTS_DATA } from '../data';
import ProductCoverflow from './products/ProductCoverflow';

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

export default function ProductsView({ onNavigate }: ProductsViewProps) {
  const [filter, setFilter] = useState('all');

  const go = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const products = filter === 'all' ? PRODUCTS_DATA : PRODUCTS_DATA.filter(p => p.category === filter);

  return (
    <div className="min-h-screen text-[#1F2321] py-12 px-6">
      <div className="w-full mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            AiGROW Hardware
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-extrabold tracking-tight text-gray-950 mb-4 leading-[1.05]">
            Engineered Agriculture Hardware
          </h1>
          <p className="font-sans text-gray-500 font-light text-base md:text-lg">
            Flow through our full hardware line-up — drag the dots or arrows, then open any unit.
          </p>
        </motion.div>

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
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

        {/* 3D coverflow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <ProductCoverflow
            key={filter}
            products={products}
            onOpen={(p) => go(`product-${p.id}` as PageId)}
          />
        </motion.div>

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
