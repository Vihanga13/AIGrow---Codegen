import { PageId } from '../types';
import { PRODUCTS_DATA } from '../data';
import {
  ArrowLeft,
  ArrowRight,
  Cpu,
  Info
} from 'lucide-react';

interface ProductCategoryPageProps {
  category: 'environmental' | 'resource' | 'irrigation';
  onNavigate: (pageId: PageId) => void;
  onSelectProductForEnquiry: (productName: string) => void;
}

export default function ProductCategoryPage({
  category,
  onNavigate
}: ProductCategoryPageProps) {
  const categoryLabels = {
    environmental: 'Environmental Monitoring & Control',
    resource: 'Resource Monitoring Systems',
    irrigation: 'Irrigation Optimisation'
  };

  const categoryDescriptions = {
    environmental: 'Industrial-grade controllers, light modules, and automatic mist systems designed to optimize microclimatic indexes dynamically.',
    resource: 'High-precision sensor probes measuring EC, soil moisture, three-phase energy, and water flow rate metrics over long ranges.',
    irrigation: 'Commercial-grade multi-channel automated dosing stations and high-durability pressure-compensating micro drippers.'
  };

  const products = PRODUCTS_DATA.filter(p => p.category === category);

  const go = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-[#1F2321] py-12 px-6">
      <div className="w-full mx-auto">

        {/* Back navigation */}
        <div className="mb-8">
          <button
            onClick={() => go('products')}
            className="group flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Products Overview
          </button>
        </div>

        {/* Category Header */}
        <div className="mb-12">
          <span className="font-mono text-xs text-emerald-600 font-bold uppercase tracking-widest block mb-2">
            Hardware Category
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mb-4">
            {categoryLabels[category]}
          </h1>
          <p className="font-sans text-gray-500 font-light text-base max-w-3xl leading-relaxed">
            {categoryDescriptions[category]}
          </p>
        </div>

        {/* Grid of hardware products in this category — each links to its own page */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => go(`product-${product.id}` as PageId)}
              className="glass group rounded-3xl p-6 md:p-8 shadow-sm flex flex-col justify-between text-left hover:shadow-lg hover:shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                  <Cpu className="w-6 h-6" />
                </div>

                <h3 className="font-sans text-lg font-bold text-gray-950 leading-tight mb-2">
                  {product.name}
                </h3>

                <p className="font-sans text-emerald-700 text-xs italic font-semibold mb-4">
                  "{product.catchphrase}"
                </p>

                <p className="font-sans text-xs text-gray-500 leading-relaxed font-light mb-6">
                  {product.description.slice(0, 140)}...
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100/70 flex items-center justify-between">
                {product.price && (
                  <span className="font-mono text-sm font-bold text-gray-900">
                    {product.price}
                  </span>
                )}

                <span className="text-xs text-emerald-600 font-bold group-hover:text-emerald-700 flex items-center gap-1 transition-colors ml-auto">
                  View Details
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Helper Info banner */}
        <div className="mt-16 bg-emerald-50 rounded-2xl p-6 border border-emerald-100/50 flex items-start gap-4">
          <Info className="w-5.5 h-5.5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans text-sm font-bold text-gray-900 mb-1">Sri Lankan Agritech Manufacturing</h4>
            <p className="font-sans text-xs text-gray-600 leading-relaxed font-light">
              All hardware components are locally designed, assembled, and optimized in Colombo by CodeGen International engineers. We provide direct on-site support and spare part guarantees.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
