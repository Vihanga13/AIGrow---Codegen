import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Send,
  CheckCircle,
  Cpu,
  ShieldCheck,
  Droplet,
  Sprout,
  Leaf,
} from 'lucide-react';
import { PageId } from '../types';
import { NEWS_DATA } from '../data';
import StatsCounter from './StatsCounter';

interface AboutViewProps {
  onNavigate: (pageId: PageId) => void;
}

const MARQUEE = [
  'Precision Fertigation',
  'LoRa Sensor Nodes',
  'Upcycled Coco-Peat',
  'Closed-Loop Climate',
  'Dry-Zone Water Saving',
  'Export-Grade Yield',
  'Local Manufacturing',
];

const PILLARS = [
  {
    id: 'engineering',
    label: 'Precision Engineering',
    tagline: 'Software-defined agriculture',
    icon: Cpu,
    metric: '100%',
    metricLabel: 'in-house firmware',
    desc: 'We fuse CodeGen’s software heritage with custom PCBs, capacitive probes and motorised dosing valves — closed-loop operating systems for living crops rather than off-the-shelf hardware.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=900',
  },
  {
    id: 'sovereignty',
    label: 'Local Sovereignty',
    tagline: 'Built in Trace Expert City',
    icon: ShieldCheck,
    metric: '0',
    metricLabel: 'imported finished goods',
    desc: 'Designed, assembled and calibrated in Colombo. By bypassing foreign supply chains we shield every deployment from currency swings, customs delays and spare-part droughts.',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=900',
  },
  {
    id: 'resilience',
    label: 'Climate Resilience',
    tagline: 'Water where it matters',
    icon: Droplet,
    metric: '65%',
    metricLabel: 'tube-well water saved',
    desc: 'Solar LoRa moisture pods keep dry-zone growers in Vavuniya and Hambantota productive through erratic monsoons, dosing water and nutrients only when the soil truly asks for it.',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=900',
  },
  {
    id: 'food',
    label: 'Food Security',
    tagline: 'Clean, traceable yield',
    icon: Sprout,
    metric: '220+',
    metricLabel: 'farms cultivated',
    desc: 'From export strawberries to premium salad greens, we help growers raise pesticide-free, export-grade produce — securing food safety and higher margins for local agrarian communities.',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=900',
  },
] as const;

const LEDGER = [
  { target: 220, suffix: '+', label: 'Active customers', note: 'Commercial & individual growers' },
  { target: 10, suffix: '+', label: 'Large-scale projects', note: 'Fully commissioned greenhouses' },
  { target: 8, suffix: '+', label: 'Years of excellence', note: 'Pioneering agritech since 2018' },
  { target: 100, suffix: '%', label: 'Locally engineered', note: 'Software, design & assembly' },
];

export default function AboutView({ onNavigate }: AboutViewProps) {
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subEmail, setSubEmail] = useState('');
  const [activePillar, setActivePillar] = useState<string>(PILLARS[0].id);

  const go = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (subEmail.trim() && subEmail.includes('@')) {
      setEmailSubscribed(true);
      setSubEmail('');
    }
  };

  const pillar = PILLARS.find((p) => p.id === activePillar) ?? PILLARS[0];

  const quickLinks: { id: PageId; n: string; label: string }[] = [
    { id: 'about-story', n: '01', label: 'Our Story & History' },
    { id: 'about-commitment', n: '02', label: 'Sovereign Commitment' },
    { id: 'about-news', n: '03', label: 'Newsroom & Press' },
  ];

  return (
    <div className="min-h-screen text-[#1F2321] px-6 overflow-x-clip">
      <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-[minmax(300px,360px)_1fr] lg:gap-14 items-start">

        {/* ============================================================= */}
        {/* STICKY DOSSIER SIDEBAR                                         */}
        {/* ============================================================= */}
        <aside className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center py-12 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-7"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-700 font-semibold">
                CodeGen · Agritech
              </span>
            </div>

            <div>
              <h1 className="font-sans text-6xl xl:text-7xl font-black text-gray-950 tracking-tighter leading-[0.85]">
                About
                <br />
                <span className="text-emerald-600">AiGROW</span>
                <span className="text-emerald-500">.</span>
              </h1>
              <p className="font-sans text-sm text-gray-500 leading-relaxed font-light mt-5 max-w-xs">
                A subsidiary of CodeGen International, merging software &amp; electronics with agricultural science since
                2018 — led by Dr. Harsha Subasinghe.
              </p>
            </div>

            {/* Facts ledger */}
            <dl className="flex flex-col divide-y divide-emerald-100/70 border-y border-emerald-100/70">
              {[
                ['Founded', '2018 · Colombo'],
                ['Parent', 'CodeGen International'],
                ['Discipline', 'Precision Agritech'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-2.5">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-gray-400">{k}</dt>
                  <dd className="font-sans text-sm font-semibold text-gray-900">{v}</dd>
                </div>
              ))}
            </dl>

            {/* Quick section links */}
            <nav className="flex flex-col gap-1">
              {quickLinks.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  className="group flex items-center gap-3 py-2 text-left border-b border-transparent hover:border-emerald-200 transition-colors"
                >
                  <span className="font-mono text-[11px] text-emerald-500 font-bold">{l.n}</span>
                  <span className="font-sans text-sm font-medium text-gray-700 group-hover:text-emerald-700 transition-colors">
                    {l.label}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-gray-300 ml-auto transition-all group-hover:text-emerald-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              ))}
            </nav>

            <button
              onClick={() => go('contact')}
              className="w-fit px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-sm font-bold transition-all flex items-center gap-2 group shadow-lg shadow-emerald-600/15"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </aside>

        {/* ============================================================= */}
        {/* SCROLLING CHAPTERS                                            */}
        {/* ============================================================= */}
        <main className="py-12 lg:py-24 flex flex-col gap-24 lg:gap-40 min-w-0">

          {/* CH.01 — VISION */}
          <section className="relative">
            <div className="flex items-start gap-5">
              <span className="font-mono text-sm text-emerald-600 font-bold pt-2 shrink-0">01</span>
              <div className="min-w-0">
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gray-400">The Vision</span>
                <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-gray-950 tracking-tight leading-[1.02] mt-3">
                  We don’t sell greenhouses. We grow intelligent{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">operating systems</span>
                    <span className="absolute bottom-1 left-0 right-0 h-3 md:h-4 bg-emerald-200/70 -rotate-1 z-0" />
                  </span>{' '}
                  for living crops.
                </h2>
              </div>
            </div>

            {/* Off-grid overlapping imagery */}
            <div className="relative mt-10 pl-0 md:pl-10">
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: -2 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-emerald-900/20 w-full md:w-[85%]"
              >
                <img
                  src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1000"
                  alt="Hands cradling a young sprout"
                  className="w-full h-72 md:h-[420px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="absolute -bottom-6 right-0 md:right-4 glass rounded-2xl px-5 py-4 shadow-xl max-w-[220px]"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-emerald-700 mb-1">Since 2018</div>
                <p className="font-sans text-xs text-gray-600 leading-relaxed font-light">
                  Engineering food safety, efficiency and climate resilience across the island.
                </p>
              </motion.div>
            </div>
          </section>

          {/* MARQUEE TICKER */}
          <section className="relative -mx-6 lg:mx-0 overflow-hidden py-6 border-y border-emerald-100/70">
            <div className="flex whitespace-nowrap">
              {[0, 1].map((dup) => (
                <motion.div
                  key={dup}
                  aria-hidden={dup === 1}
                  className="flex items-center shrink-0"
                  animate={{ x: ['0%', '-100%'] }}
                  transition={{ repeat: Infinity, ease: 'linear', duration: 22 }}
                >
                  {MARQUEE.map((word) => (
                    <span key={word} className="flex items-center">
                      <span className="font-sans text-2xl md:text-3xl font-bold text-gray-900/80 px-6">{word}</span>
                      <Leaf className="w-4 h-4 text-emerald-500 shrink-0" />
                    </span>
                  ))}
                </motion.div>
              ))}
            </div>
          </section>

          {/* CH.02 — BY THE NUMBERS (ledger, not cards) */}
          <section>
            <div className="flex items-start gap-5 mb-8">
              <span className="font-mono text-sm text-emerald-600 font-bold pt-1 shrink-0">02</span>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gray-400">By the Numbers</span>
                <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight mt-2">
                  Eight years, measured
                </h2>
              </div>
            </div>

            <div className="flex flex-col">
              {LEDGER.map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="group grid grid-cols-[auto_1fr] md:grid-cols-[160px_1fr_auto] items-baseline gap-x-5 gap-y-1 py-6 border-t border-gray-200 last:border-b hover:bg-emerald-50/40 transition-colors -mx-3 px-3 rounded-lg"
                >
                  <StatsCounter target={row.target} suffix={row.suffix} />
                  <span className="font-sans text-base md:text-lg font-bold text-gray-900">{row.label}</span>
                  <span className="col-span-2 md:col-span-1 font-sans text-xs text-gray-400 font-light md:text-right">
                    {row.note}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CH.03 — CONVICTIONS (interactive explorer) */}
          <section>
            <div className="flex items-start gap-5 mb-8">
              <span className="font-mono text-sm text-emerald-600 font-bold pt-1 shrink-0">03</span>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gray-400">What Defines Us</span>
                <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight mt-2">
                  Four convictions, one system
                </h2>
              </div>
            </div>

            {/* Big display first, selectors as a horizontal strip below */}
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-emerald-900/10 h-[300px] md:h-[380px] mb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <img src={pillar.image} alt={pillar.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={pillar.id + '-t'}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="text-white"
                  >
                    <div className="flex items-end gap-3 mb-2">
                      <span className="font-mono text-4xl md:text-6xl font-black leading-none text-emerald-300">{pillar.metric}</span>
                      <span className="font-sans text-xs uppercase tracking-wider text-emerald-100/80 mb-1.5">{pillar.metricLabel}</span>
                    </div>
                    <h3 className="font-sans text-xl md:text-2xl font-bold tracking-tight mb-2">{pillar.label}</h3>
                    <p className="font-sans text-sm text-white/80 leading-relaxed font-light max-w-lg">{pillar.desc}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {PILLARS.map((p) => {
                const Icon = p.icon;
                const isActive = p.id === activePillar;
                return (
                  <button
                    key={p.id}
                    onMouseEnter={() => setActivePillar(p.id)}
                    onClick={() => setActivePillar(p.id)}
                    className={`relative flex items-center gap-2.5 rounded-2xl p-3 text-left transition-all duration-300 border ${
                      isActive ? 'bg-white border-emerald-200 shadow-md' : 'glass border-transparent hover:border-emerald-100'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <span className={`font-sans text-xs font-bold leading-tight ${isActive ? 'text-gray-950' : 'text-gray-500'}`}>
                      {p.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* CH.04 — NEWSROOM (editorial index list) */}
          <section>
            <div className="flex items-start gap-5 mb-8">
              <span className="font-mono text-sm text-emerald-600 font-bold pt-1 shrink-0">04</span>
              <div className="flex-1 flex items-end justify-between gap-4">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gray-400">Newsroom</span>
                  <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight mt-2">
                    Latest from the press
                  </h2>
                </div>
                <button
                  onClick={() => go('about-news')}
                  className="hidden sm:flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors group shrink-0"
                >
                  All coverage
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              {NEWS_DATA.slice(0, 3).map((item, i) => (
                <motion.button
                  key={item.id}
                  id={`news-card-${item.id}`}
                  onClick={() => go('about-news')}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="group relative flex items-center gap-5 py-5 border-t border-gray-200 last:border-b text-left hover:bg-emerald-50/40 transition-colors -mx-3 px-3 rounded-lg"
                >
                  {/* hover-reveal thumbnail */}
                  <div className="hidden md:block w-0 group-hover:w-28 h-20 rounded-xl overflow-hidden shrink-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                    <img src={item.image} alt={item.title} className="w-28 h-20 object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-600 font-bold w-24 shrink-0">
                    {item.category}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans text-base md:text-lg font-bold text-gray-950 leading-snug group-hover:text-emerald-800 transition-colors truncate">
                      {item.title}
                    </h3>
                    <span className="font-mono text-[11px] text-gray-400">{item.date} · {item.readTime}</span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-300 shrink-0 transition-all group-hover:text-emerald-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </motion.button>
              ))}
            </div>
          </section>

          {/* NEWSLETTER BAND */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="relative glass-green rounded-3xl p-8 md:p-12 overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 w-56 h-56 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-5">
              <span className="font-mono text-xs text-emerald-700 font-bold uppercase tracking-[0.3em]">The AiGROW Digest</span>
              <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight leading-tight max-w-lg">
                Field research, nutrient recipes and farm case studies — in your inbox.
              </h2>
              <AnimatePresence mode="wait">
                {emailSubscribed ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-5 bg-white rounded-2xl border border-emerald-100 flex items-center gap-3.5 text-emerald-800 shadow-lg shadow-emerald-900/5 w-fit"
                  >
                    <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">Subscription successful!</h4>
                      <p className="text-xs text-emerald-700 mt-0.5">Thanks for joining the AiGROW Digest.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubscribe}
                    className="flex gap-2 max-w-md w-full"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Enter your professional email"
                      value={subEmail}
                      onChange={(e) => setSubEmail(e.target.value)}
                      className="grow px-4 py-3.5 bg-white/70 border border-emerald-100 rounded-xl text-sm font-sans focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-gray-800"
                    />
                    <button
                      type="submit"
                      className="px-5 py-3.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center shrink-0"
                    >
                      <Send className="w-4.5 h-4.5" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
              <p className="font-sans text-[10px] text-gray-400 font-medium tracking-wide">
                No spam. Unsubscribe anytime. Operated under strict CodeGen data guidelines.
              </p>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
}
