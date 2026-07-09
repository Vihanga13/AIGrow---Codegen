import { useState } from 'react';
import { motion } from 'motion/react';
import { PageId } from '../../types';
import { ShieldCheck, MapPin, RefreshCw, Cpu, ArrowLeft, Plus } from 'lucide-react';
import CTABanner from '../CTABanner';

interface AboutCommitmentPageProps {
  onNavigate: (pageId: PageId) => void;
}

const COMMITMENTS = [
  {
    title: 'Local Assembly & Calibration',
    short: 'Assembled in Colombo',
    desc: 'All smart sensor hubs, capacitive probes and motorised dosing valves are designed, assembled and calibrated inside Trace Expert City, Colombo 10, by Sri Lankan software and electronics engineers.',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'Economic Self-Reliance',
    short: 'Import-proof supply',
    desc: 'By avoiding finished-goods imports we protect agricultural projects from dollar volatility, customs bottlenecks and supply-chain holdups. Structural components are locally fabricated to high tolerances.',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'Upcycled Organic Grow Mediums',
    short: 'Circular coco-peat',
    desc: 'We replace imported rockwool with Sri Lankan premium coco-peat blocks, pre-conditioned organically. This promotes circular waste management across the coconut-producing belt.',
    icon: RefreshCw,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'Dry-Zone Agrarian Impact',
    short: 'Water for the dry zone',
    desc: 'We donate solar-powered LoRa moisture pods to cooperative societies in dry districts like Vavuniya and Hambantota, saving over 65% of precious tube-well water resources.',
    icon: MapPin,
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=1000'
  }
];

export default function AboutCommitmentPage({ onNavigate }: AboutCommitmentPageProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen text-[#1F2321] py-12 px-6 overflow-x-clip">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('about')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors font-medium group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to About Overview
          </button>
        </div>

        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <span className="font-mono text-xs text-emerald-700 font-bold uppercase tracking-[0.25em] block">
              Sovereignty & Responsibility
            </span>
            <h1 className="font-sans text-4xl sm:text-6xl font-extrabold text-gray-950 tracking-tight leading-[0.95]">
              Built in Sri Lanka.{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Engineered for Independence.</span>
                <span className="absolute bottom-1.5 left-0 right-0 h-3 md:h-4 bg-emerald-200/70 -rotate-1 z-0" />
              </span>
            </h1>
            <p className="font-sans text-base text-gray-600 leading-relaxed font-light max-w-xl">
              Sri Lankan agriculture faces unique challenges — heavy monsoons, unpredictable currency fluctuations and
              localised resource stresses. Our sovereign commitment ensures that every sensor, controller and line of
              code is managed locally, for 100% operational resilience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-4xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800"
                alt="Local Sri Lankan agricultural scenery"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent" />
            </div>
          </motion.div>
        </section>

        {/* ============================================================= */}
        {/* EXPANDING ACCORDION — hover/click a panel to reveal it        */}
        {/* ============================================================= */}
        <section className="mb-24">
          <div className="text-center mb-12 max-w-xl mx-auto">
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mb-2">
              Four Pillars of Local Commitment
            </h2>
            <p className="font-sans text-sm text-gray-500 font-light">
              Hover or tap a pillar to expand it and see how we protect agricultural infrastructure from external
              dependencies.
            </p>
          </div>

          {/* Desktop: horizontal expanding panels */}
          <div className="hidden md:flex gap-4 h-[460px]">
            {COMMITMENTS.map((c, i) => {
              const Icon = c.icon;
              const isActive = i === active;
              return (
                <motion.div
                  key={c.title}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  animate={{ flex: isActive ? 4 : 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 26 }}
                  className="relative rounded-3xl overflow-hidden cursor-pointer border-4 border-white shadow-lg"
                >
                  <img
                    src={c.image}
                    alt={c.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-emerald-950/10'
                        : 'bg-emerald-950/55 hover:bg-emerald-950/45'
                    }`}
                  />

                  {/* Collapsed label (vertical) */}
                  {!isActive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-between py-6">
                      <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-sans text-sm font-bold text-white [writing-mode:vertical-rl] rotate-180 tracking-wide">
                        {c.short}
                      </span>
                      <span className="font-mono text-xs text-white/60">0{i + 1}</span>
                    </div>
                  )}

                  {/* Expanded content */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="absolute inset-0 flex flex-col justify-end p-8"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white mb-4 shadow-lg">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs text-emerald-300 uppercase tracking-widest mb-2">
                        Pillar 0{i + 1}
                      </span>
                      <h3 className="font-sans text-2xl font-extrabold text-white tracking-tight mb-3 max-w-md">
                        {c.title}
                      </h3>
                      <p className="font-sans text-sm text-white/80 leading-relaxed font-light max-w-md">
                        {c.desc}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: stacked expandable cards */}
          <div className="md:hidden flex flex-col gap-3">
            {COMMITMENTS.map((c, i) => {
              const Icon = c.icon;
              const isActive = i === active;
              return (
                <div
                  key={c.title}
                  className="rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm"
                >
                  <button
                    onClick={() => setActive(isActive ? -1 : i)}
                    className="w-full flex items-center gap-4 p-5 text-left"
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-[10px] text-emerald-600 uppercase tracking-widest">Pillar 0{i + 1}</div>
                      <div className="font-sans text-base font-bold text-gray-950">{c.title}</div>
                    </div>
                    <Plus className={`w-5 h-5 text-gray-400 transition-transform ${isActive ? 'rotate-45' : ''}`} />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 font-sans text-sm text-gray-500 leading-relaxed font-light">
                      {c.desc}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>

        <CTABanner onNavigate={onNavigate} />
      </div>
    </div>
  );
}
