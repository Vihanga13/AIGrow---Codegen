import { Home, Layers, Leaf, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { PageId } from '../types';
import { SERVICES_DATA } from '../data';
import CTABanner from './CTABanner';
import Reveal from './Reveal';

interface ServicesViewProps {
  onNavigate: (pageId: PageId) => void;
  selectedServiceId: string;
  onSelectServiceId: (id: string) => void;
}

const SERVICE_IMAGES: Record<string, string> = {
  greenhouse: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1400',
  'indoor-farming': 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=1400',
  'home-gardening': 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1400',
  'fresh-produce': 'https://images.unsplash.com/photo-1610348725531-843dff163e2c?auto=format&fit=crop&q=80&w=1400'
};

export default function ServicesView({ onNavigate }: ServicesViewProps) {
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
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <Reveal className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            Our Expertise
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-extrabold tracking-tight text-gray-950 mb-4 leading-[1.05]">
            Precision Agricultural Solutions
          </h1>
          <p className="font-sans text-gray-500 font-light text-base md:text-lg">
            Four core solutions, engineered end-to-end. Select one to explore it in full.
          </p>
        </Reveal>

        {/* Service card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES_DATA.map((service, idx) => (
            <Reveal key={service.id} delay={(idx % 2) * 0.08}>
              <button
                onClick={() => go(service.id)}
                className="group w-full text-left glass rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5 flex flex-col h-full"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={SERVICE_IMAGES[service.id]}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent" />
                  <div className="absolute top-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm text-white border border-white/25">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="absolute top-5 right-5 font-mono text-sm font-bold text-white/70">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h2 className="absolute bottom-4 left-6 right-6 font-sans text-2xl font-extrabold text-white tracking-tight drop-shadow">
                    {service.title}
                  </h2>
                </div>

                <div className="p-6 flex flex-col gap-4 flex-1">
                  <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">{service.shortDesc}</p>

                  <div className="flex flex-col gap-2">
                    {service.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="font-light leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <span className="mt-auto pt-1 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700">
                    Open {service.title}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            </Reveal>
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
