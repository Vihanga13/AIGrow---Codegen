import { useState, FormEvent, useRef, MouseEvent as ReactMouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  ArrowRight,
  Send,
  CheckCircle,
  Cpu,
  ShieldCheck,
  Droplet,
  Sprout,
  Leaf,
  Quote,
  MapPin,
  Newspaper,
  Plus
} from 'lucide-react';
import { PageId } from '../types';
import { NEWS_DATA } from '../data';
import StatsCounter from './StatsCounter';

interface AboutViewProps {
  onNavigate: (pageId: PageId) => void;
}

/* ------------------------------------------------------------------ */
/* Mouse-parallax tilt wrapper — reacts to the cursor for a 3D feel    */
/* ------------------------------------------------------------------ */
function TiltCard({ children, className = '', max = 10 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), { stiffness: 160, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), { stiffness: 160, damping: 18 });

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => { px.set(0); py.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* The four things that define AiGROW — driven by the interactive explorer */
const PILLARS = [
  {
    id: 'engineering',
    label: 'Precision Engineering',
    tagline: 'Software-defined agriculture',
    icon: Cpu,
    metric: '100%',
    metricLabel: 'in-house firmware',
    desc: 'We fuse CodeGen’s software heritage with custom PCBs, capacitive probes and motorised dosing valves — closed-loop operating systems for living crops rather than off-the-shelf hardware.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=900'
  },
  {
    id: 'sovereignty',
    label: 'Local Sovereignty',
    tagline: 'Built in Trace Expert City',
    icon: ShieldCheck,
    metric: '0',
    metricLabel: 'imported finished goods',
    desc: 'Designed, assembled and calibrated in Colombo. By bypassing foreign supply chains we shield every deployment from currency swings, customs delays and spare-part droughts.',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=900'
  },
  {
    id: 'resilience',
    label: 'Climate Resilience',
    tagline: 'Water where it matters',
    icon: Droplet,
    metric: '65%',
    metricLabel: 'tube-well water saved',
    desc: 'Solar LoRa moisture pods keep dry-zone growers in Vavuniya and Hambantota productive through erratic monsoons, dosing water and nutrients only when the soil truly asks for it.',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=900'
  },
  {
    id: 'food',
    label: 'Food Security',
    tagline: 'Clean, traceable yield',
    icon: Sprout,
    metric: '220+',
    metricLabel: 'farms cultivated',
    desc: 'From export strawberries to premium salad greens, we help growers raise pesticide-free, export-grade produce — securing food safety and higher margins for local agrarian communities.',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=900'
  }
] as const;

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

  const pillar = PILLARS.find(p => p.id === activePillar) ?? PILLARS[0];

  return (
    <div className="min-h-screen text-[#1F2321] py-12 px-6 overflow-x-clip">
      <div className="max-w-7xl mx-auto">

        {/* ============================================================= */}
        {/* 1. EDITORIAL HERO — oversized index, layered tilting imagery  */}
        {/* ============================================================= */}
        <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center mb-28">
          {/* Ghost word behind the headline */}
          <span
            aria-hidden
            className="pointer-events-none select-none absolute -top-10 -left-4 text-[22vw] lg:text-[13rem] font-black leading-none tracking-tighter text-emerald-600/[0.06]"
          >
            2018
          </span>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative z-10 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-700 font-semibold">
                Our Identity
              </span>
            </div>

            <h1 className="font-sans text-4xl md:text-6xl font-extrabold tracking-tight text-gray-950 leading-[0.95]">
              Pioneering{' '}
              <span className="relative inline-block">
                <span className="relative z-10">Sustainable</span>
                <span className="absolute bottom-1.5 left-0 right-0 h-3 md:h-4 bg-emerald-200/70 -rotate-1 z-0" />
              </span>{' '}
              Agritech
            </h1>

            <p className="font-sans text-gray-500 leading-relaxed font-light text-base md:text-lg max-w-xl">
              AiGROW was established in 2018 as a subsidiary of CodeGen International with a clear vision: to merge
              Software &amp; Electronics with agricultural sciences. Led by Dr. Harsha Subasinghe, we engineer precision
              solutions that secure food safety, boost efficiency and build climate resilience across the island.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => go('about-story')}
                className="px-5 py-3 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-sm font-bold transition-all flex items-center gap-2 group shadow-lg shadow-emerald-600/15"
              >
                Read Our Full Story
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => go('about-commitment')}
                className="px-5 py-3 glass text-emerald-800 hover:bg-white/80 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
              >
                Our Commitment
              </button>
            </div>
          </motion.div>

          {/* Layered tilting imagery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-6 relative z-10"
          >
            <TiltCard className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-emerald-900/20 border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1000"
                  alt="Hands holding a young sprout above soil"
                  className="w-full h-80 md:h-[440px] object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/30 to-transparent" />
              </div>

              {/* Floating live badge — lifts off the card in 3D */}
              <div
                style={{ transform: 'translateZ(60px)' }}
                className="absolute -bottom-5 -left-5 glass rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-gray-500">Agritech since</div>
                  <div className="font-sans text-lg font-extrabold text-gray-950 leading-none">2018</div>
                </div>
              </div>

              {/* Floating location chip */}
              <div
                style={{ transform: 'translateZ(40px)' }}
                className="absolute -top-4 -right-3 glass rounded-full px-3.5 py-2 shadow-lg flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-sans text-[11px] font-bold text-gray-800">Colombo, LK</span>
              </div>
            </TiltCard>
          </motion.div>
        </section>

        {/* ============================================================= */}
        {/* 2. IDENTITY BENTO GRID — asymmetric, hover-reactive tiles     */}
        {/* ============================================================= */}
        <section className="mb-28">
          <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[150px] gap-4">
            {/* Big mission tile */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="col-span-2 row-span-2 glass-green rounded-3xl p-7 flex flex-col justify-between relative overflow-hidden group"
            >
              <Leaf className="absolute -right-8 -bottom-8 w-44 h-44 text-emerald-600/10 rotate-12 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" />
              <Quote className="w-8 h-8 text-emerald-600" />
              <div className="relative z-10">
                <p className="font-sans text-lg md:text-2xl font-bold text-gray-900 leading-snug tracking-tight">
                  “We don’t just sell greenhouses — we build intelligent closed-loop agricultural operating systems.”
                </p>
                <div className="mt-4 font-mono text-xs text-emerald-800 uppercase tracking-wider">
                  Dr. Harsha Subasinghe · CEO, CodeGen International
                </div>
              </div>
            </motion.div>

            {/* Stat tiles */}
            {[
              { target: 220, suffix: '+', label: 'Active customers', sub: 'Commercial & individual' },
              { target: 10, suffix: '+', label: 'Large-scale projects', sub: 'Smart greenhouses live' },
              { target: 8, suffix: '+', label: 'Years of excellence', sub: 'Pioneering since 2018' },
              { target: 100, suffix: '%', label: 'Locally engineered', sub: 'Software, design & assembly' }
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: 0.05 * i }}
                className="glass rounded-3xl p-5 flex flex-col justify-center hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300"
              >
                <StatsCounter target={s.target} suffix={s.suffix} />
                <span className="font-sans text-sm font-semibold text-gray-800 mt-1.5">{s.label}</span>
                <span className="font-sans text-[11px] text-gray-400 font-light">{s.sub}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================================= */}
        {/* 3. INTERACTIVE PILLAR EXPLORER — pick a value, watch it swap  */}
        {/* ============================================================= */}
        <section className="mb-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-700 font-semibold mb-2">
                What Defines Us
              </div>
              <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight">
                Four convictions, one system
              </h2>
            </div>
            <p className="font-sans text-sm text-gray-500 font-light max-w-sm">
              Hover or tap each conviction to explore how it shapes the products we ship and the farms we grow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Selector rail */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {PILLARS.map((p) => {
                const Icon = p.icon;
                const isActive = p.id === activePillar;
                return (
                  <button
                    key={p.id}
                    onMouseEnter={() => setActivePillar(p.id)}
                    onClick={() => setActivePillar(p.id)}
                    className={`relative text-left rounded-2xl p-5 transition-all duration-300 border ${
                      isActive
                        ? 'bg-white border-emerald-200 shadow-lg shadow-emerald-900/5'
                        : 'glass border-transparent hover:border-emerald-100'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="pillar-marker"
                        className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-emerald-500"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <div className="flex items-center gap-4 pl-2">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-sans text-base font-bold text-gray-950">{p.label}</div>
                        <div className="font-sans text-xs text-gray-400 font-light">{p.tagline}</div>
                      </div>
                      <ArrowRight className={`w-4 h-4 transition-all ${isActive ? 'text-emerald-600 translate-x-0 opacity-100' : 'text-gray-300 -translate-x-1 opacity-0'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Animated display panel */}
            <div className="lg:col-span-7">
              <div className="relative h-full min-h-[420px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-emerald-900/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={pillar.id}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <img
                      src={pillar.image}
                      alt={pillar.label}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-9">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={pillar.id + '-txt'}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.4 }}
                      className="text-white"
                    >
                      <div className="flex items-end gap-3 mb-3">
                        <span className="font-mono text-5xl md:text-6xl font-black leading-none text-emerald-300">{pillar.metric}</span>
                        <span className="font-sans text-xs uppercase tracking-wider text-emerald-100/80 mb-1.5">{pillar.metricLabel}</span>
                      </div>
                      <h3 className="font-sans text-2xl font-bold tracking-tight mb-2">{pillar.label}</h3>
                      <p className="font-sans text-sm text-white/80 leading-relaxed font-light max-w-lg">{pillar.desc}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================= */}
        {/* 4. NEWS — offset magazine strip                               */}
        {/* ============================================================= */}
        <section className="mb-28">
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-700 font-semibold mb-2">
                Company News
              </div>
              <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight">
                From the newsroom
              </h2>
            </div>
            <button
              onClick={() => go('about-news')}
              className="hidden sm:flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors group shrink-0"
            >
              <Newspaper className="w-4 h-4" />
              All coverage
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="about-news-grid">
            {NEWS_DATA.slice(0, 3).map((item, index) => (
              <motion.button
                key={item.id}
                id={`news-card-${item.id}`}
                onClick={() => go('about-news')}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group text-left glass rounded-3xl overflow-hidden flex flex-col hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 ${
                  index === 1 ? 'md:-translate-y-6' : ''
                }`}
              >
                <div className="h-52 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wide">
                    {item.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-3 text-xs text-gray-400 font-medium font-mono">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>
                  <h3 className="font-sans text-base font-bold text-gray-950 leading-snug">{item.title}</h3>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">{item.summary}</p>
                  <span className="mt-auto pt-2 text-xs text-emerald-600 font-bold flex items-center gap-1">
                    Read full coverage
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* ============================================================= */}
        {/* 5. NEWSLETTER                                                 */}
        {/* ============================================================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative glass-green rounded-3xl p-8 md:p-14 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="absolute -left-10 -top-10 w-48 h-48 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
          <div className="lg:col-span-7 flex flex-col gap-4 relative z-10">
            <span className="font-mono text-xs text-emerald-700 font-bold uppercase tracking-[0.25em]">
              Knowledge Sharing
            </span>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight leading-tight">
              Cultivate wisdom with the AiGROW Digest
            </h2>
            <p className="font-sans text-sm text-gray-500 leading-relaxed font-light max-w-xl">
              Field research digests on hydroponic tomato nutrient recipes, mushroom-room humidity algorithms and
              real-world farm case studies — delivered straight to your inbox.
            </p>
          </div>

          <div className="lg:col-span-5 relative z-10">
            <AnimatePresence mode="wait">
              {emailSubscribed ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-white rounded-2xl border border-emerald-100 flex items-center gap-3.5 text-emerald-800 shadow-lg shadow-emerald-900/5"
                >
                  <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Subscription successful!</h4>
                    <p className="text-xs text-emerald-700 mt-0.5">Thank you for subscribing to the AiGROW Digest.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubscribe}
                  className="flex gap-2"
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
            <p className="font-sans text-[10px] text-gray-400 text-center mt-3 font-medium tracking-wide flex items-center justify-center gap-1">
              <Plus className="w-3 h-3" /> No spam. Unsubscribe anytime. Operated under strict CodeGen data guidelines.
            </p>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
