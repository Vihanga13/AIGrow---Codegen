import { motion } from 'motion/react';
import { Home, Layers, Leaf, Sparkles, ArrowUpRight, CheckCircle } from 'lucide-react';
import { PageId } from '../types';
import { SERVICES_DATA } from '../data';
import CTABanner from './CTABanner';

interface ServicesViewProps {
  onNavigate: (pageId: PageId) => void;
  selectedServiceId: string;
  onSelectServiceId: (id: string) => void;
}

const SERVICE_IMAGES: Record<string, string> = {
  'greenhouse': 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1400',
  'indoor-farming': 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=1400',
  'home-gardening': 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1400',
  'fresh-produce': 'https://images.unsplash.com/photo-1610348725531-843dff163e2c?auto=format&fit=crop&q=80&w=1400'
};

export default function ServicesView({ onNavigate }: ServicesViewProps) {
  const getIcon = (iconName: string, cls = 'w-6 h-6') => {
    switch (iconName) {
      case 'Home': return <Home className={cls} />;
      case 'Layers': return <Layers className={cls} />;
      case 'Leaf': return <Leaf className={cls} />;
      case 'Sparkles': return <Sparkles className={cls} />;
      default: return <Leaf className={cls} />;
    }
  };

  const go = (id: string) => {
    onNavigate(`services-${id}` as PageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const total = SERVICES_DATA.length;

  return (
    <div className="min-h-screen text-[#1F2321] py-12 px-6">
      <div className="w-full mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            Our Expertise
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-extrabold tracking-tight text-gray-950 mb-4 leading-[1.05]">
            Precision Agricultural Solutions
          </h1>
          <p className="font-sans text-gray-500 font-light text-base md:text-lg">
            Four core solutions, engineered end-to-end. Scroll to explore — each panel stacks as you go.
          </p>
        </motion.div>

        {/* STACKING DECK */}
        <div className="flex flex-col gap-6 lg:gap-8 pb-8">
          {SERVICES_DATA.map((service, idx) => (
            <div
              key={service.id}
              className="sticky"
              style={{ top: `${104 + idx * 16}px` }}
            >
              <button
                onClick={() => go(service.id)}
                className="group relative block w-full text-left overflow-hidden rounded-[2rem] border border-white/50 bg-emerald-900 shadow-2xl shadow-emerald-900/20 h-[64vh] min-h-[440px]"
              >
                {/* Image */}
                <img
                  src={SERVICE_IMAGES[service.id]}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/45 to-emerald-950/25" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/70 via-transparent to-transparent" />

                {/* Top row: index + icon */}
                <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-7 md:p-10">
                  <span className="font-mono text-sm font-bold tracking-widest text-white/80">
                    {String(idx + 1).padStart(2, '0')} <span className="text-white/40">/ {String(total).padStart(2, '0')}</span>
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm text-white border border-white/25">
                    {getIcon(service.iconName)}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-7 md:p-10">
                  <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3 max-w-2xl drop-shadow">
                    {service.title}
                  </h2>
                  <p className="font-sans text-sm md:text-base text-white/85 font-light leading-relaxed max-w-xl mb-5">
                    {service.shortDesc}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6">
                    {service.features.slice(0, 3).map((feat, fIdx) => (
                      <span key={fIdx} className="flex items-center gap-1.5 text-xs text-white/80 font-light">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-300 shrink-0" />
                        {feat.split(' ').slice(0, 4).join(' ')}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-emerald-800 shadow-lg transition-all group-hover:bg-emerald-50">
                    Open {service.title}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>

        <CTABanner
          onNavigate={onNavigate}
          title="Grow with AiGROW today"
          subtitle="Join us in cultivating change across Sri Lanka. Let's design, build, and automate your farming projects."
        />

      </div>
    </div>
  );
}
