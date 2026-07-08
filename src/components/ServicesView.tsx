import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { Home, Layers, Leaf, Sparkles, ArrowUpRight } from 'lucide-react';
import { PageId } from '../types';
import { SERVICES_DATA } from '../data';
import CTABanner from './CTABanner';

interface ServicesViewProps {
  onNavigate: (pageId: PageId) => void;
  selectedServiceId: string;
  onSelectServiceId: (id: string) => void;
}

const SERVICE_IMAGES: Record<string, string> = {
  'greenhouse': 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1000',
  'indoor-farming': 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=1000',
  'home-gardening': 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1000',
  'fresh-produce': 'https://images.unsplash.com/photo-1610348725531-843dff163e2c?auto=format&fit=crop&q=80&w=1000'
};

export default function ServicesView({ onNavigate }: ServicesViewProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  // Cursor-following preview image (desktop)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 220, damping: 26, mass: 0.4 });
  const handleMove = (e: React.MouseEvent) => {
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  const getIcon = (iconName: string, cls = 'w-5 h-5') => {
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
          className="max-w-3xl mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            Our Expertise
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-extrabold tracking-tight text-gray-950 mb-4 leading-[1.05]">
            Precision Agricultural Solutions
          </h1>
          <p className="font-sans text-gray-500 font-light text-base md:text-lg">
            Four core solutions, engineered end-to-end. Hover a line to preview, click to open its dedicated page.
          </p>
        </motion.div>

        {/* Cursor-following preview */}
        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25 }}
              style={{ left: sx, top: sy, x: '-50%', y: '-50%' }}
              className="pointer-events-none fixed z-40 hidden lg:block"
            >
              <div className="relative h-44 w-64 overflow-hidden rounded-2xl shadow-2xl border-4 border-white rotate-[-3deg]">
                <img
                  src={SERVICE_IMAGES[SERVICES_DATA[hovered].id]}
                  alt={SERVICES_DATA[hovered].title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-emerald-950/15" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editorial index list */}
        <div className="border-t border-gray-200/70" onMouseMove={handleMove}>
          {SERVICES_DATA.map((service, idx) => {
            const on = hovered === idx;
            return (
              <motion.button
                key={service.id}
                id={`service-row-${service.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => go(service.id)}
                className={`group relative flex w-full items-center justify-between gap-6 border-b border-gray-200/70 py-7 md:py-9 text-left transition-colors duration-300 ${on ? 'lg:pl-4' : ''}`}
              >
                <div className="flex items-center gap-4 md:gap-8 min-w-0">
                  <span className={`font-mono text-sm font-bold tabular-nums transition-colors ${on ? 'text-emerald-500' : 'text-gray-300'}`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className={`hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${on ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                    {getIcon(service.iconName)}
                  </span>
                  <span className="min-w-0">
                    <h2 className={`font-sans text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight transition-all duration-300 ${on ? 'text-emerald-600 md:translate-x-1' : 'text-gray-950'}`}>
                      {service.title}
                    </h2>
                    <p className="hidden md:block font-sans text-sm text-gray-500 font-light mt-1 max-w-xl truncate">
                      {service.shortDesc}
                    </p>
                  </span>
                </div>
                <span className={`flex h-11 w-11 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${on ? 'bg-emerald-500 border-emerald-500 text-white scale-105' : 'border-gray-200 text-gray-400'}`}>
                  <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </motion.button>
            );
          })}
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
