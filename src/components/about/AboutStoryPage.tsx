import { useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { PageId } from '../../types';
import { ArrowLeft, Quote } from 'lucide-react';
import CTABanner from '../CTABanner';

interface AboutStoryPageProps {
  onNavigate: (pageId: PageId) => void;
}

const TIMELINE = [
  {
    year: '2018',
    title: 'Foundation & Setup',
    tag: 'The beginning',
    desc: 'AiGROW is established inside Trace Expert City, Colombo as a tech-focused subsidiary of CodeGen International. Dr. Harsha Subasinghe lays the vision to combine IoT and agricultural science.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=900',
  },
  {
    year: '2020',
    title: 'First Commercial Deployments',
    tag: 'Going commercial',
    desc: 'Launched turnkey automated greenhouses in the hill country of Kegalle and Kandy. Introduced capacitive LoRa sensor nodes to Sri Lankan growers.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=900',
  },
  {
    year: '2022',
    title: 'Sovereign Core Initiative',
    tag: 'Built local',
    desc: 'Shifted full manufacturing and assembly local to Colombo. Developed custom printed circuit boards (PCBs) and injection-molded enclosures to avoid import-currency dependencies.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=900',
  },
  {
    year: '2024',
    title: 'SLASSCOM Innovation Showcase',
    tag: 'Recognised',
    desc: 'Showcased automated precision fertigation solutions at major national summits, securing industry recognition and expansion into local dry-zone agrarian communities.',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=900',
  },
  {
    year: '2026',
    title: 'Advanced AI Dosing Release',
    tag: 'Intelligence at scale',
    desc: 'Introduced cloud-based deep agronomy profiles — remotely advising hundreds of crops daily on water, nutrients and humidity-index goals.',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=900',
  },
];

function Chapter({
  item,
  index,
  onEnter,
}: {
  item: (typeof TIMELINE)[number];
  index: number;
  onEnter: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6, margin: '-20% 0px -20% 0px' });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <div ref={ref} className="min-h-[70vh] flex flex-col justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`relative ${index % 2 === 1 ? 'md:ml-16' : ''}`}
      >
        {/* Mobile year marker */}
        <span className="lg:hidden font-mono text-5xl font-black text-emerald-600/20 leading-none block mb-3">
          {item.year}
        </span>

        <div className="rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-emerald-900/15 mb-6 group">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
          {item.tag}
        </span>
        <h3 className="font-sans text-2xl md:text-4xl font-extrabold text-gray-950 tracking-tight mb-3">{item.title}</h3>
        <p className="font-sans text-sm md:text-base text-gray-500 leading-relaxed font-light max-w-xl">{item.desc}</p>
      </motion.div>
    </div>
  );
}

export default function AboutStoryPage({ onNavigate }: AboutStoryPageProps) {
  const activeRef = useRef(0);
  const yearRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  // Imperatively update the sticky year (avoids re-rendering every chapter on scroll)
  const handleEnter = (i: number) => {
    activeRef.current = i;
    if (yearRef.current) yearRef.current.textContent = TIMELINE[i].year;
    if (labelRef.current) labelRef.current.textContent = TIMELINE[i].tag;
    if (barRef.current) barRef.current.style.height = `${((i + 1) / TIMELINE.length) * 100}%`;
  };

  return (
    <div className="min-h-screen text-[#1F2321] px-6 overflow-x-clip">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <div className="pt-12 mb-4">
          <button
            onClick={() => onNavigate('about')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors font-medium group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to About Overview
          </button>
        </div>

        {/* Opening statement — full width, no image split */}
        <section className="py-16 md:py-24 border-b border-emerald-100">
          <span className="font-mono text-xs text-emerald-700 font-bold uppercase tracking-[0.3em] block mb-6">
            Our Journey · 2018 → 2026
          </span>
          <h1 className="font-sans text-4xl md:text-7xl font-black text-gray-950 tracking-tighter leading-[0.9] max-w-4xl">
            Merging software, hardware &amp; agronomy into one{' '}
            <span className="text-emerald-600">living system</span>.
          </h1>
          <div className="mt-10 flex flex-col md:flex-row gap-8 md:items-end justify-between">
            <p className="font-sans text-base text-gray-500 leading-relaxed font-light max-w-xl">
              By applying CodeGen’s advanced software capabilities to commercial farming, we let growers automate the
              entire microclimate lifecycle and lift yield outputs.
            </p>
            <div className="glass-green rounded-2xl p-5 flex gap-4 items-start max-w-sm shrink-0">
              <Quote className="w-6 h-6 text-emerald-600 shrink-0" />
              <p className="font-sans text-sm text-gray-700 italic leading-relaxed">
                “We build intelligent closed-loop agricultural operating systems.”
                <span className="not-italic font-semibold text-gray-900 block mt-1">— Dr. Harsha Subasinghe, CEO</span>
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* SCROLL-DRIVEN JOURNEY — giant sticky year + serpentine spine  */}
        {/* ============================================================= */}
        <section className="lg:grid lg:grid-cols-[minmax(260px,40%)_1fr] lg:gap-16">
          {/* Sticky giant year */}
          <div className="hidden lg:flex sticky top-0 h-screen flex-col justify-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gray-400 mb-2">Now viewing</span>
            <span
              ref={yearRef}
              className="font-sans text-[8rem] xl:text-[11rem] font-black text-emerald-600 tracking-tighter leading-none tabular-nums"
            >
              2018
            </span>
            <span ref={labelRef} className="font-sans text-lg font-bold text-gray-900 mt-2">
              The beginning
            </span>

            {/* Vertical progress spine */}
            <div className="mt-10 flex items-center gap-4">
              <div className="relative w-1 h-40 rounded-full bg-emerald-100 overflow-hidden">
                <span
                  ref={barRef}
                  className="absolute top-0 left-0 w-full bg-emerald-500 rounded-full transition-[height] duration-500 ease-out"
                  style={{ height: '20%' }}
                />
              </div>
              <div className="flex flex-col gap-2">
                {TIMELINE.map((t) => (
                  <span key={t.year} className="font-mono text-xs text-gray-400 tabular-nums">
                    {t.year}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Scrolling chapters */}
          <div className="flex flex-col">
            {TIMELINE.map((item, i) => (
              <Chapter key={item.year} item={item} index={i} onEnter={handleEnter} />
            ))}
          </div>
        </section>

        <div className="py-8">
          <CTABanner onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
