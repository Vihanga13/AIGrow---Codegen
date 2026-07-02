import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Activity, 
  Droplet, 
  Settings, 
  CheckCircle, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  Info,
  ShieldAlert
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
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', label: 'All Hardware' },
    { id: 'environmental', label: 'Environmental Monitoring' },
    { id: 'resource', label: 'Resource Monitoring' },
    { id: 'irrigation', label: 'Irrigation Optimisation' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? PRODUCTS_DATA 
    : PRODUCTS_DATA.filter(p => p.category === selectedCategory);

  const handleEnquire = (product: Product) => {
    onSelectProductForEnquiry(product.name);
    onNavigate('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAFDFB]/10 min-h-screen text-[#1F2321] py-12 px-6">
      <div className="w-full mx-auto">
        
        {/* Detail Screen (If activeProduct is set, show detailed product sub-page layout!) */}
        {activeProduct ? (
          <motion.div 
            key={activeProduct.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
          >
            {/* Back button */}
            <button
              onClick={() => {
                setActiveProduct(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-fit flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products Catalog
            </button>

            {/* Product detail block */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-xl shadow-gray-100/50 grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Product Info Column */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <span className="font-mono text-xs text-emerald-600 uppercase tracking-widest font-semibold block mb-2">
                    {activeProduct.categoryLabel}
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

                {/* Features */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-sans text-sm font-bold text-gray-900">Key Core Capabilities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeProduct.features.map((feat, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start text-xs text-gray-700 leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="font-sans font-light">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price (if exists) and Action buttons */}
                <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-gray-100">
                  {activeProduct.price && (
                    <div className="flex flex-col">
                      <span className="font-sans text-xs text-gray-400 font-semibold uppercase tracking-wider">Est. Unit Price</span>
                      <span className="font-mono text-2xl font-bold text-gray-900 mt-0.5">{activeProduct.price}</span>
                    </div>
                  )}

                  <div className="flex gap-4 grow sm:grow-0">
                    <button
                      id="product-detail-enquire"
                      onClick={() => handleEnquire(activeProduct)}
                      className="grow sm:grow-0 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-sm transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center gap-2"
                    >
                      Enquire about Product
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => {
                        onNavigate('shop');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="hidden sm:flex px-7 py-3.5 bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium rounded-xl text-sm transition-all border border-gray-100 items-center gap-2"
                    >
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

                {/* Specs List */}
                <div className="flex flex-col gap-4">
                  {activeProduct.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex flex-col border-b border-gray-200/50 pb-2">
                      <span className="font-sans text-[11px] text-gray-400 font-bold uppercase tracking-wide">{spec.label}</span>
                      <span className="font-mono text-xs font-medium text-gray-800 mt-1">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex gap-2 items-start bg-emerald-50/50 border border-emerald-100/50 p-4 rounded-xl text-xs text-emerald-800 leading-relaxed font-light">
                  <Info className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  <p>All hardware includes a 2-year warranty, CodeGen software integrations, and Colombo-based technical field support.</p>
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          /* Main Catalog Grid View */
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
                  className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-gray-100 hover:-translate-y-1"
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
                      <h3 className="font-sans text-base font-bold text-gray-950 hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => setActiveProduct(product)}>
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
                      onClick={() => {
                        setActiveProduct(product);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs text-gray-600 font-semibold hover:text-emerald-600 flex items-center gap-1 group"
                    >
                      Specifications
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
        )}

      </div>
    </div>
  );
}
