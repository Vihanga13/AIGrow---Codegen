import { useState, FormEvent } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Send,
  CheckCircle,
  Cpu,
  ShieldCheck,
  Droplet,
  Sprout,
  Leaf
} from 'lucide-react';
import { PageId } from '../types';
import { NEWS_DATA } from '../data';
import StatsCounter from './StatsCounter';
import Reveal from './Reveal';

interface AboutViewProps {
  onNavigate: (pageId: PageId) => void;
}

const KEYWORDS = [
  'Precision Fertigation',
  'LoRa Sensor Nodes',
  'Upcycled Coco-Peat',
  'Closed-Loop Climate',
  'Dry-Zone Water Saving',
  'Export-Grade Yield',
  'Local Manufacturing'
];

const PILLARS = [
  {
    id: 'engineering',
    label: 'Precision Engineering',
    tagline: 'Software-defined agriculture',
    icon: Cpu,
    metric: '100%',
    metricLabel: 'in-house firmware',
    desc: 'We fuse CodeGen’s software heritage with custom PCBs, capacitive probes and motorised dosing valves — closed-loop operating systems for living crops rather than off-the-shelf hardware.'
  },
  {
    id: 'sovereignty',
    label: 'Local Sovereignty',
    tagline: 'Built in Trace Expert City',
    icon: ShieldCheck,
    metric: '0',
    metricLabel: 'imported finished goods',
    desc: 'Designed, assembled and calibrated in Colombo. By bypassing foreign supply chains we shield every deployment from currency swings, customs delays and spare-part droughts.'
  },
  {
    id: 'resilience',
    label: 'Climate Resilience',
    tagline: 'Water where it matters',
    icon: Droplet,
    metric: '65%',
    metricLabel: 'tube-well water saved',
    desc: 'Solar LoRa moisture pods keep dry-zone growers in Vavuniya and Hambantota productive through erratic monsoons, dosing water and nutrients only when the soil truly asks for it.'
  },
  {
    id: 'food',
    label: 'Food Security',
    tagline: 'Clean, traceable yield',
    icon: Sprout,
    metric: '220+',
    metricLabel: 'farms cultivated',
    desc: 'From export strawberries to premium salad greens, we help growers raise pesticide-free, export-grade produce — securing food safety and higher margins for local agrarian communities.'
  }
];

const LEDGER = [
  { target: 220, suffix: '+', label: 'Active customers', note: 'Commercial & individual growers' },
  { target: 10, suffix: '+', label: 'Large-scale projects', note: 'Fully commissioned greenhouses' },
  { target: 8, suffix: '+', label: 'Years of excellence', note: 'Pioneering agritech since 2018' },
  { target: 100, suffix: '%', label: 'Locally engineered', note: 'Software, design & assembly' }
];

export default function AboutView({ onNavigate }: AboutViewProps) {
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subEmail, setSubEmail] = useState('');

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

  const quickLinks: { id: PageId; n: string; label: string }[] = [
    { id: 'about-story', n: '01', label: 'Our Story & History' },
    { id: 'about-commitment', n: '02', label: 'Sovereign Commitment' },
    { id: 'about-news', n: '03', label: 'Newsroom & Press' }
  ];

  return (
    <div className="min-h-screen text-[#1F2321] px-6 py-12 lg:py-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-20">

        {/* HEADER */}
        <Reveal className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-700 font-semibold">
              CodeGen · Agritech
            </span>
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-black text-gray-950 tracking-tight leading-[0.95]">
            About <span className="text-emerald-600">AiGROW</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-gray-500 leading-relaxed font-light max-w-2xl">
            A subsidiary of CodeGen International, merging software &amp; electronics with agricultural science since 2018
            — led by Dr. Harsha Subasinghe.
          </p>

          {/* Facts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
            {[
              ['Founded', '2018 · Colombo'],
              ['Parent', 'CodeGen International'],
              ['Discipline', 'Precision Agritech']
            ].map(([k, v]) => (
              <div key={k} className="glass rounded-2xl p-4">
                <div className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-1">{k}</div>
                <div className="font-sans text-sm font-semibold text-gray-900">{v}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => go('contact')}
            className="w-fit px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-sm font-bold transition-all flex items-center gap-2 group shadow-lg shadow-emerald-600/15"
          >
            Start a Project
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>

        {/* VISION */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gray-400">The Vision</span>
            <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight leading-tight mt-3">
              We don’t sell greenhouses. We grow intelligent operating systems for living crops.
            </h2>
            <p className="font-sans text-sm text-gray-500 leading-relaxed font-light mt-4">
              Since 2018, engineering food safety, efficiency and climate resilience across the island.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl shadow-emerald-900/5">
            <img
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1000"
              alt="Hands cradling a young sprout"
              className="w-full h-64 md:h-80 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </Reveal>

        {/* KEYWORDS */}
        <div className="flex flex-wrap gap-2.5">
          {KEYWORDS.map((k) => (
            <span key={k} className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 font-sans text-sm font-medium text-gray-700">
              <Leaf className="h-3.5 w-3.5 text-emerald-500" />
              {k}
            </span>
          ))}
        </div>

        {/* BY THE NUMBERS */}
        <section>
          <Reveal className="mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gray-400">By the Numbers</span>
            <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight mt-2">
              Eight years, measured
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {LEDGER.map((row) => (
              <div key={row.label} className="glass rounded-2xl p-5">
                <StatsCounter target={row.target} suffix={row.suffix} />
                <div className="font-sans text-sm font-bold text-gray-900 mt-1.5">{row.label}</div>
                <div className="font-sans text-xs text-gray-400 font-light mt-0.5">{row.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CONVICTIONS */}
        <section>
          <Reveal className="mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gray-400">What Defines Us</span>
            <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight mt-2">
              Four convictions, one system
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.id} delay={(i % 2) * 0.08} className="glass rounded-3xl p-6 flex flex-col gap-3 h-full">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="text-right">
                      <div className="font-mono text-2xl font-black text-emerald-600 leading-none">{p.metric}</div>
                      <div className="font-sans text-[10px] text-gray-400 uppercase tracking-wide mt-1">{p.metricLabel}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-sans text-lg font-bold text-gray-950">{p.label}</h3>
                    <p className="font-sans text-xs text-emerald-700 font-medium italic">{p.tagline}</p>
                  </div>
                  <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">{p.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* NEWSROOM */}
        <section>
          <Reveal className="flex items-end justify-between gap-4 mb-6">
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
          </Reveal>

          <div className="flex flex-col">
            {NEWS_DATA.slice(0, 3).map((item) => (
              <button
                key={item.id}
                id={`news-card-${item.id}`}
                onClick={() => go('about-news')}
                className="group flex items-center gap-5 py-5 border-t border-gray-200 last:border-b text-left hover:bg-emerald-50/40 transition-colors -mx-3 px-3 rounded-lg"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-600 font-bold w-24 shrink-0">
                  {item.category}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-sans text-base font-bold text-gray-950 leading-snug group-hover:text-emerald-800 transition-colors">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[11px] text-gray-400">{item.date} · {item.readTime}</span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-300 shrink-0 transition-colors group-hover:text-emerald-600" />
              </button>
            ))}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="glass-green rounded-3xl p-8 md:p-10 flex flex-col gap-5">
          <span className="font-mono text-xs text-emerald-700 font-bold uppercase tracking-[0.3em]">The AiGROW Digest</span>
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight leading-tight max-w-lg">
            Field research, nutrient recipes and farm case studies — in your inbox.
          </h2>
          {emailSubscribed ? (
            <div className="p-5 bg-white rounded-2xl border border-emerald-100 flex items-center gap-3.5 text-emerald-800 shadow-lg shadow-emerald-900/5 w-fit">
              <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-bold text-sm">Subscription successful!</h4>
                <p className="text-xs text-emerald-700 mt-0.5">Thanks for joining the AiGROW Digest.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md w-full">
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
            </form>
          )}
          <p className="font-sans text-[10px] text-gray-400 font-medium tracking-wide">
            No spam. Unsubscribe anytime. Operated under strict CodeGen data guidelines.
          </p>
        </section>

      </div>
    </div>
  );
}
