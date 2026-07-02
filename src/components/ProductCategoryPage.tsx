import { useState } from 'react';
import { PageId, Product } from '../types';
import { PRODUCTS_DATA } from '../data';
import { 
  ArrowLeft, 
  ArrowRight, 
  Cpu, 
  Settings, 
  CheckCircle, 
  ShoppingBag,
  Info
} from 'lucide-react';

interface ProductCategoryPageProps {
  category: 'environmental' | 'resource' | 'irrigation';
  onNavigate: (pageId: PageId) => void;
  onSelectProductForEnquiry: (productName: string) => void;
}

export default function ProductCategoryPage({
  category,
  onNavigate,
  onSelectProductForEnquiry
}: ProductCategoryPageProps) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

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

  const handleEnquire = (product: Product) => {
    onSelectProductForEnquiry(product.name);
    onNavigate('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-[#1F2321] py-12 px-6">
      <div className="w-full mx-auto">
        
        {/* Back navigation */}
        <div className="mb-8">
          <button 
            onClick={() => {
              if (activeProduct) {
                setActiveProduct(null);
              } else {
                onNavigate('products');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            {activeProduct ? 'Back to Category Catalog' : 'Back to Products Overview'}
          </button>
        </div>

        {/* Dynamic Detail View / Grid View */}
        {activeProduct ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-xl shadow-gray-100/30 grid grid-cols-1 lg:grid-cols-12 gap-12 animate-slide-in">
            {/* Info Column */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <span className="font-mono text-xs text-emerald-600 uppercase tracking-widest font-semibold block mb-2">
                  {categoryLabels[category]}
                </span>
                <h1 className="font-sans text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight leading-none mb-3">
                  {activeProduct.name}
                </h1>
                <p className="font-sans text-emerald-800 text-lg italic font-medium">
                  "{activeProduct.catchphrase}"
                </p>
              </div>

              <p className="font-sans text-gray-600 leading-relaxed font-light text-sm md:text-base border-t border-gray-50 pt-4">
                {activeProduct.description}
              </p>

              {/* Core capabilities */}
              <div className="flex flex-col gap-4">
                <h3 className="font-sans text-sm font-bold text-gray-900">Key Capabilities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeProduct.features.map((feat, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start text-xs text-gray-700 leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="font-sans font-light">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price / Actions */}
              <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-gray-100">
                {activeProduct.price && (
                  <div className="flex flex-col">
                    <span className="font-sans text-xs text-gray-400 font-semibold uppercase tracking-wider">Est. Unit Price</span>
                    <span className="font-mono text-2xl font-bold text-gray-900 mt-0.5">{activeProduct.price}</span>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => handleEnquire(activeProduct)}
                    className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-sm transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center gap-2"
                  >
                    Enquire about Product
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => {
                      onNavigate('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-7 py-3.5 bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium rounded-xl text-sm transition-all border border-gray-100 items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    View in Shop
                  </button>
                </div>
              </div>
            </div>

            {/* Specs Column */}
            <div className="lg:col-span-5 bg-gray-50/70 rounded-2xl p-6 md:p-8 border border-gray-100">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-3">
                <Settings className="w-5 h-5 text-emerald-600" />
                <h3 className="font-sans text-sm font-bold text-gray-900 uppercase tracking-wider">Technical Specifications</h3>
              </div>

              <div className="flex flex-col gap-4">
                {activeProduct.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 text-xs">
                    <span className="font-sans font-semibold text-gray-500">{spec.label}</span>
                    <span className="font-mono font-medium text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
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

            {/* Grid of hardware products in this category */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-xs flex flex-col justify-between hover:shadow-lg hover:border-emerald-100 transition-all duration-300"
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

                  <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                    {product.price && (
                      <span className="font-mono text-sm font-bold text-gray-900">
                        {product.price}
                      </span>
                    )}

                    <button 
                      onClick={() => {
                        setActiveProduct(product);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1 group transition-colors"
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
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
        )}

      </div>
    </div>
  );
}
