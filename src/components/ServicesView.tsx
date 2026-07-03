import { motion } from 'motion/react';
import { Home, Layers, Leaf, Sparkles, ArrowUpRight } from 'lucide-react';
import { PageId } from '../types';
import { SERVICES_DATA } from '../data';
import CTABanner from './CTABanner';

interface ServicesViewProps {
  onNavigate: (pageId: PageId) => void;
  selectedServiceId: string;
  onSelectServiceId: (id: string) => void;
}

// Imagery + bento span per service (keyed by id)
const SERVICE_META: Record<string, { image: string; span: string }> = {
  'greenhouse': {
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1200',
    span: 'md:col-span-2 md:row-span-2'
  },
  'indoor-farming': {
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=1200',
    span: 'md:col-span-1 md:row-span-1'
  },
  'home-gardening': {
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200',
    span: 'md:col-span-1 md:row-span-1'
  },
  'fresh-produce': {
    image: 'https://images.unsplash.com/photo-1610348725531-843dff163e2c?auto=format&fit=crop&q=80&w=1200',
    span: 'md:col-span-3 md:row-span-1'
  }
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

  return (
    <div className="min-h-screen text-[#1F2321] py-12 px-6">
      <div className="w-full mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            Our Expertise
          </div>
          <h1 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950 mb-4 leading-[1.1]">
            Precision Agricultural Solutions
          </h1>
          <p className="font-sans text-gray-500 font-light text-base md:text-lg">
            From design and engineering to cloud-based monitoring and export-grade produce, we are reforming Sri Lankan farming. Explore each solution below.
          </p>
        </motion.div>

        {/* Interactive bento gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[240px]">
          {SERVICES_DATA.map((service, idx) => {
            const meta = SERVICE_META[service.id];
            return (
              <motion.button
                key={service.id}
                id={`service-card-${service.id}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => go(service.id)}
                className={`group relative overflow-hidden rounded-3xl text-left bg-emerald-900 border border-white/40 min-h-[260px] ${meta?.span ?? ''}`}
              >
                {/* Image */}
                <img
                  src={meta?.image}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/45 to-emerald-950/20 transition-colors duration-300 group-hover:from-emerald-950/90" />

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-7 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm text-white border border-white/25">
                      {getIcon(service.iconName)}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/25 transition-all duration-300 group-hover:bg-emerald-500 group-hover:border-emerald-500">
                      <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sans text-xl md:text-2xl font-bold text-white tracking-tight mb-2 drop-shadow">
                      {service.title}
                    </h3>
                    <p className="font-sans text-sm text-white/80 font-light leading-relaxed max-w-md mb-4 line-clamp-2">
                      {service.shortDesc}
                    </p>
                    {service.subCategories && (
                      <div className="flex flex-wrap gap-2">
                        {service.subCategories.map((sub) => (
                          <span
                            key={sub.name}
                            className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 text-[11px] font-semibold text-white/90"
                          >
                            {sub.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Reusable CTA Banner */}
        <CTABanner
          onNavigate={onNavigate}
          title="Grow with AiGROW today"
          subtitle="Join us in cultivating change across Sri Lanka. Let's design, build, and automate your farming projects."
        />

      </div>
    </div>
  );
}
