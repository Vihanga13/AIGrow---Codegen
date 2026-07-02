import { ArrowRight, Leaf } from 'lucide-react';
import { PageId } from '../types';

interface CTABannerProps {
  onNavigate: (pageId: PageId) => void;
  title?: string;
  subtitle?: string;
}

export default function CTABanner({
  onNavigate,
  title = 'Grow with AiGROW',
  subtitle = 'Join us in cultivating change across Sri Lanka. Let’s engineer your sustainable agricultural future.'
}: CTABannerProps) {
  return (
    <section className="bg-emerald-50 rounded-3xl p-10 md:p-16 w-full mx-auto my-16 relative overflow-hidden">
      {/* Background organic leaf decoration */}
      <div className="absolute -right-12 -bottom-12 w-64 h-64 text-emerald-100/40 pointer-events-none select-none">
        <Leaf className="w-full h-full rotate-12" />
      </div>

      <div className="relative z-10 max-w-3xl flex flex-col gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/60 text-emerald-800 text-xs font-semibold uppercase tracking-wider w-fit">
          <Leaf className="w-3.5 h-3.5" />
          Sustainable Agriculture
        </div>
        
        <h2 className="font-sans text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          {title}
        </h2>
        
        <p className="font-sans text-base md:text-lg text-gray-600 leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <button
            id="cta-banner-primary"
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 text-white font-medium rounded-xl text-sm transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/10 flex items-center justify-center gap-2 group"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            id="cta-banner-secondary"
            onClick={() => {
              onNavigate('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-7 py-3.5 bg-white text-emerald-700 border border-emerald-200 hover:border-emerald-300 font-medium rounded-xl text-sm transition-all hover:bg-emerald-50/50 flex items-center justify-center gap-2"
          >
            Explore Our Products
          </button>
        </div>
      </div>
    </section>
  );
}
