import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { PageId, Product } from '../types';
import { PRODUCTS_DATA } from '../data';

interface ProductsViewProps {
  onNavigate: (pageId: PageId) => void;
  onSelectProductForEnquiry: (productName: string) => void;
}

export default function ProductsView({
  onNavigate,
  onSelectProductForEnquiry
}: ProductsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Hardware' },
    { id: 'environmental', label: 'Environmental Monitoring' },
    { id: 'resource', label: 'Resource Monitoring' },
    { id: 'irrigation', label: 'Irrigation Optimisation' }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === selectedCategory);

  const go = (pageId: PageId) => {
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnquire = (product: Product) => {
    onSelectProductForEnquiry(product.name);
    go('contact');
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="w-full mx-auto">

        {/* Main Catalog Grid View */}
        <div className="flex flex-col gap-10">
            {/* Title block */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
                Our Hardware Catalog
              </div>
              <h1 className="font-sans text-4xl font-extrabold tracking-tight text-gray-950 mb-4">
                Engineered Agriculture Hardware
              </h1>
              <p className="font-sans text-gray-500 font-light text-base md:text-lg">
                Explore our proprietary sensing pods, automated dosing networks, and smart light systems made for modern high-yield environments.
              </p>
            </motion.div>

            {/* Category selection */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col gap-4 max-w-2xl mx-auto w-full"
            >
              <div className="flex flex-wrap justify-center gap-2 bg-gray-50 p-1.5 rounded-2xl w-full border border-gray-100">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4.5 py-2.5 rounded-xl font-sans text-xs font-semibold transition-all ${
                      selectedCategory === cat.id 
                        ? 'bg-white text-emerald-700 shadow-sm border border-gray-100' 
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {selectedCategory !== 'all' && (
                <div className="text-center animate-slide-in">
                  <button
                    onClick={() => {
                      onNavigate(`products-${selectedCategory}` as PageId);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100/70 border border-emerald-100 rounded-xl text-xs font-bold transition-all group"
                  >
                    View Dedicated {categories.find(c => c.id === selectedCategory)?.label} Page
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              )}
            </motion.div>

            {/* Product Card Grid */}
            <motion.div 
              key={selectedCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              id="products-catalog-grid"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="glass rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2.5 py-1 rounded">
                        {product.categoryLabel.split(' ')[0]}
                      </span>

                      {product.price && (
                        <span className="font-mono text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
                          {product.price}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-sans text-base font-bold text-gray-950 hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => go(`product-${product.id}` as PageId)}>
                        {product.name}
                      </h3>
                      <p className="font-sans text-xs text-emerald-800 italic font-medium mt-1">
                        {product.catchphrase}
                      </p>
                    </div>

                    <p className="font-sans text-xs text-gray-500 leading-relaxed font-light mt-1">
                      {product.description.slice(0, 115)}...
                    </p>

                    {/* Miniature specs card highlights */}
                    <div className="bg-gray-50 rounded-xl p-3 flex flex-col gap-1.5 text-[10px]">
                      {product.specs.slice(0, 2).map((sp, sIdx) => (
                        <div key={sIdx} className="flex justify-between font-sans">
                          <span className="text-gray-400 font-semibold uppercase">{sp.label}</span>
                          <span className="font-mono text-gray-700 font-medium">{sp.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50 gap-2">
                    <button
                      id={`product-btn-view-spec-${product.id}`}
                      onClick={() => go(`product-${product.id}` as PageId)}
                      className="text-xs text-gray-600 font-semibold hover:text-emerald-600 flex items-center gap-1 group"
                    >
                      View Product
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>

                    <button
                      id={`product-btn-enquire-${product.id}`}
                      onClick={() => handleEnquire(product)}
                      className="px-4 py-2 bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-600 hover:text-white rounded-lg text-xs transition-colors"
                    >
                      Enquire
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
        </div>

      </div>
    </div>
  );
}
