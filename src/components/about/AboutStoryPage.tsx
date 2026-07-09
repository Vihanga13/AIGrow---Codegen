import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../../types';
import { ArrowLeft, ArrowRight, Quote, Sparkles } from 'lucide-react';
import StatsCounter from '../StatsCounter';
import CTABanner from '../CTABanner';

interface AboutStoryPageProps {
  onNavigate: (pageId: PageId) => void;
}

const TIMELINE = [
  {
    year: '2018',
    title: 'Foundation & Setup',
    desc: 'AiGROW is established inside Trace Expert City, Colombo as a tech-focused subsidiary of CodeGen International. Dr. Harsha Subasinghe lays the vision to combine IoT and agricultural science.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=900',
    tag: 'The beginning'
  },
  {
    year: '2020',
    title: 'First Commercial Deployments',
    desc: 'Launched turnkey automated greenhouses in the hill country of Kegalle and Kandy. Introduced capacitive LoRa sensor nodes to Sri Lankan growers.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=900',
    tag: 'Going commercial'
  },
  {
    year: '2022',
    title: 'Sovereign Core Initiative',
    desc: 'Shifted full manufacturing and assembly local to Colombo. Developed custom printed circuit boards (PCBs) and injection-molded enclosures to avoid import-currency dependencies.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=900',
    tag: 'Built local'
  },
  {
    year: '2024',
    title: 'SLASSCOM Innovation Showcase',
    desc: 'Showcased automated precision fertigation solutions at major national summits, securing industry recognition and expansion into local dry-zone agrarian communities.',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=900',
    tag: 'Recognised'
  },
  {
    year: '2026',
    title: 'Advanced AI Dosing Release',
    desc: 'Introduced cloud-based deep agronomy profiles — remotely advising hundreds of crops daily on water, nutrients and humidity-index goals.',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=900',
    tag: 'Intelligence at scale'
  }
];

export default function AboutStoryPage({ onNavigate }: AboutStoryPageProps) {
  const [active, setActive] = useState(0);
  const item = TIMELINE[active];
  const progress = (active / (TIMELINE.length - 1)) * 100;

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
              Our Journey
            </span>
            <h1 className="font-sans text-4xl sm:text-6xl font-extrabold text-gray-950 tracking-tight leading-[0.95]">
              Merging Software, Hardware &amp; Agronomy
            </h1>
            <p className="font-sans text-base text-gray-600 leading-relaxed font-light max-w-xl">
              We believe the future of agriculture lies in high-precision, software-driven solutions. By applying
              CodeGen’s advanced software capabilities to commercial farming, we let growers automate the entire
              microclimate lifecycle and lift yield outputs.
            </p>
            <div className="glass-green rounded-2xl p-5 flex gap-4 items-start max-w-lg">
              <Quote className="w-6 h-6 text-emerald-600 shrink-0" />
              <p className="font-sans text-sm text-gray-700 italic leading-relaxed">
                “We don’t just sell greenhouses; we build intelligent closed-loop agricultural operating systems.”
                <span className="not-italic font-semibold text-gray-900 block mt-1">— Dr. Harsha Subasinghe, CEO</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-4xl overflow-hidden shadow-2xl border-4 border-white aspect-square max-w-sm mx-auto">
              <img
                src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800"
                alt="Seeds growing in cupped hands"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent" />
            </div>
          </motion.div>
        </section>

        {/* Stats */}
        <section className="glass rounded-3xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-24">
          <div className="flex flex-col items-center">
            <StatsCounter target={2018} suffix="" />
            <span className="font-sans text-xs text-gray-500 mt-2 font-medium">Established Year</span>
          </div>
          <div className="flex flex-col items-center">
            <StatsCounter target={100} suffix="%" />
            <span className="font-sans text-xs text-gray-500 mt-2 font-medium">Local Software & Design</span>
          </div>
          <div className="flex flex-col items-center">
            <StatsCounter target={14} suffix="" />
            <span className="font-sans text-xs text-gray-500 mt-2 font-medium">Core R&D Engineers</span>
          </div>
        </section>

        {/* ============================================================= */}
        {/* INTERACTIVE HORIZONTAL TIMELINE                               */}
        {/* ============================================================= */}
        <section className="mb-24">
          <div className="text-center mb-12 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-emerald-700 font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Timeline
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mb-2">Our History</h2>
            <p className="font-sans text-sm text-gray-500 font-light">
              Select a milestone to trace our path from laboratory concept to island-wide systems.
            </p>
          </div>

          {/* Year rail */}
          <div className="relative mb-10">
            {/* base line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-emerald-100 rounded-full" />
            {/* progress fill */}
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-emerald-500 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
            <div className="relative flex justify-between">
              {TIMELINE.map((t, i) => {
                const isActive = i === active;
                const isPast = i <= active;
                return (
                  <button
                    key={t.year}
                    onClick={() => setActive(i)}
                    className="group flex flex-col items-center gap-3"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                        isPast ? 'border-emerald-500' : 'border-emerald-200'
                      } ${isActive ? 'scale-150 bg-emerald-500 shadow-lg shadow-emerald-500/30' : 'bg-white group-hover:scale-125'}`}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span
                      className={`font-mono text-sm font-bold transition-colors ${
                        isActive ? 'text-emerald-700' : 'text-gray-400 group-hover:text-gray-700'
                      }`}
                    >
                      {t.year}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail card */}
          <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-emerald-900/10 min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.year}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2"
              >
                <div className="relative h-56 md:h-auto overflow-hidden">
                  <motion.img
                    key={item.image}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-emerald-950/60 to-transparent" />
                  <span className="absolute top-4 left-4 font-mono text-6xl md:text-7xl font-black text-white/90 leading-none">
                    {item.year}
                  </span>
                </div>

                <div className="bg-white p-8 md:p-10 flex flex-col justify-center gap-4">
                  <span className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <motion.h3
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="font-sans text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight"
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p
                    key={item.desc}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.18 }}
                    className="font-sans text-sm text-gray-500 leading-relaxed font-light"
                  >
                    {item.desc}
                  </motion.p>

                  {/* Prev / next */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => setActive((a) => Math.max(0, a - 1))}
                      disabled={active === 0}
                      className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-emerald-300 hover:text-emerald-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActive((a) => Math.min(TIMELINE.length - 1, a + 1))}
                      disabled={active === TIMELINE.length - 1}
                      className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-emerald-300 hover:text-emerald-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-xs text-gray-400 ml-1">
                      {active + 1} / {TIMELINE.length}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <CTABanner onNavigate={onNavigate} />
      </div>
    </div>
  );
}
