import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wind,
  Droplets,
  Droplet,
  Umbrella,
  Thermometer,
  Sprout,
  Cloud,
  Sparkles,
  RefreshCw,
  ArrowRight,
  Fan,
  Sun
} from 'lucide-react';
import { PageId } from '../types';

interface GreenhouseSimulatorProps {
  onNavigate: (pageId: PageId) => void;
}

type Controls = { fans: boolean; mist: boolean; shade: boolean; irrigation: boolean };

type Metric = {
  key: string; label: string; unit: string; icon: typeof Wind;
  value: number; display: string; min: number; max: number; optLow: number; optHigh: number;
};

const CONTROL_LIST: { key: keyof Controls; short: string; label: string; icon: typeof Wind }[] = [
  { key: 'fans', short: 'Fans', label: 'Ventilation Fans', icon: Wind },
  { key: 'mist', short: 'Mist', label: 'Misting System', icon: Droplets },
  { key: 'shade', short: 'Shade', label: 'Shade Screen', icon: Umbrella },
  { key: 'irrigation', short: 'Drip', label: 'Drip Irrigation', icon: Droplet }
];

export default function GreenhouseSimulator({ onNavigate }: GreenhouseSimulatorProps) {
  const [controls, setControls] = useState<Controls>({ fans: false, mist: false, shade: false, irrigation: false });

  const [jitter, setJitter] = useState({ temp: 0, humidity: 0, co2: 0, soil: 0 });
  useEffect(() => {
    const id = setInterval(() => {
      setJitter({
        temp: (Math.random() - 0.5) * 0.5,
        humidity: (Math.random() - 0.5) * 1.6,
        co2: (Math.random() - 0.5) * 16,
        soil: (Math.random() - 0.5) * 1.2
      });
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const base = useMemo(() => {
    const { fans, mist, shade, irrigation } = controls;
    const temp = 30.5 - (fans ? 3.5 : 0) - (shade ? 2.4 : 0) - (mist ? 1.2 : 0);
    const humidity = Math.min(100, Math.max(25, 58 + (mist ? 20 : 0) - (fans ? 9 : 0)));
    const co2 = 880 - (fans ? 470 : 0);
    const soil = Math.min(100, Math.max(0, 38 + (irrigation ? 30 : 0) + (mist ? 4 : 0)));
    return { temp, humidity, co2, soil };
  }, [controls]);

  const metrics: Metric[] = [
    { key: 'temp', label: 'Temp', unit: '°C', icon: Thermometer, value: base.temp + jitter.temp, display: (base.temp + jitter.temp).toFixed(1), min: 15, max: 35, optLow: 22, optHigh: 28 },
    { key: 'humidity', label: 'Humidity', unit: '%', icon: Droplets, value: base.humidity + jitter.humidity, display: Math.round(base.humidity + jitter.humidity).toString(), min: 20, max: 100, optLow: 65, optHigh: 80 },
    { key: 'co2', label: 'CO₂', unit: 'ppm', icon: Cloud, value: base.co2 + jitter.co2, display: Math.round(base.co2 + jitter.co2).toString(), min: 400, max: 950, optLow: 400, optHigh: 700 },
    { key: 'soil', label: 'Soil', unit: '%', icon: Sprout, value: base.soil + jitter.soil, display: Math.round(base.soil + jitter.soil).toString(), min: 0, max: 100, optLow: 55, optHigh: 75 }
  ];

  const baseByKey: Record<string, number> = { temp: base.temp, humidity: base.humidity, co2: base.co2, soil: base.soil };
  const inRangeCount = metrics.filter(m => baseByKey[m.key] >= m.optLow && baseByKey[m.key] <= m.optHigh).length;
  const allOptimal = inRangeCount === metrics.length;
  const health = inRangeCount / metrics.length;

  const toggle = (key: keyof Controls) => setControls(prev => ({ ...prev, [key]: !prev[key] }));
  const autoOptimize = () => setControls({ fans: true, mist: true, shade: false, irrigation: true });
  const reset = () => setControls({ fans: false, mist: false, shade: false, irrigation: false });

  const sky = base.temp >= 29 ? '#F6E2C2' : base.temp <= 21 ? '#D8E8F2' : '#DCF0E1';
  const plantColor = health >= 0.75 ? '#3D7A48' : health >= 0.4 ? '#5C8C63' : '#A7B0A6';
  const plantScale = 0.72 + health * 0.42;

  return (
    <section className="py-20 px-6 w-full mx-auto border-b border-gray-100">
      <div className="w-full mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10"
        >
          <div className="flex items-center gap-2 text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Interactive Demo · Live Telemetry
          </div>
          <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-gray-950 mb-4">
            Take the controls of a smart greenhouse
          </h2>
          <p className="font-sans text-gray-500 font-light text-base md:text-lg">
            Step into the AiGROW control console. Flip the climate controls and watch the live greenhouse feed and instrument readouts respond in real time.
          </p>
        </motion.div>

        {/* DARK CONTROL CONSOLE */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gray-950 border border-white/10 shadow-2xl shadow-emerald-900/20 p-4 sm:p-6"
        >
          {/* Grid + glow ambience */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:26px_26px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_at_15%_-10%,rgba(76,154,91,0.18),transparent_60%)]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-5">

            {/* LEFT — live camera feed */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex items-center justify-between mb-2 font-mono text-[10px] uppercase tracking-widest">
                <span className="flex items-center gap-1.5 text-red-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" /> REC · CAM 01 — Greenhouse Feed
                </span>
                <span className="text-white/40">1920×1080 · 60fps</span>
              </div>

              <div className="relative flex-1 min-h-[320px] rounded-2xl overflow-hidden border border-white/10">
                {/* Sky */}
                <motion.div className="absolute inset-0" animate={{ backgroundColor: sky }} transition={{ duration: 1 }} />
                <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_-10%,rgba(255,255,255,0.5),transparent_60%)]" />

                {/* Sun */}
                <motion.div
                  className="absolute top-6 right-10"
                  animate={{ opacity: controls.shade ? 0.3 : 1, scale: controls.shade ? 0.88 : 1, rotate: 360 }}
                  transition={{ opacity: { duration: 0.6 }, scale: { duration: 0.6 }, rotate: { repeat: Infinity, ease: 'linear', duration: 40 } }}
                >
                  <Sun className="h-14 w-14 text-amber-400 drop-shadow-[0_0_16px_rgba(251,191,36,0.55)]" />
                </motion.div>

                {/* Shade screen */}
                <AnimatePresence>
                  {controls.shade && (
                    <motion.div
                      initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }}
                      transition={{ type: 'spring', stiffness: 90, damping: 18 }}
                      className="absolute inset-x-0 top-0 h-2/5 z-10 bg-[repeating-linear-gradient(180deg,rgba(30,58,35,0.28)_0px,rgba(30,58,35,0.28)_3px,transparent_3px,transparent_9px)]"
                    />
                  )}
                </AnimatePresence>

                {/* Roof frame */}
                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 400 300">
                  <path d="M20 120 L200 40 L380 120" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinejoin="round" />
                  <path d="M40 120 L40 250 M360 120 L360 250 M200 52 L200 250" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
                  <path d="M120 84 L120 250 M280 84 L280 250" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                </svg>

                {/* Fan */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70 border border-white shadow-sm backdrop-blur-sm">
                    <motion.div animate={{ rotate: controls.fans ? 360 : 0 }} transition={controls.fans ? { repeat: Infinity, ease: 'linear', duration: 0.9 } : { duration: 0.5 }}>
                      <Fan className={`h-7 w-7 ${controls.fans ? 'text-emerald-600' : 'text-gray-400'}`} />
                    </motion.div>
                  </div>
                </div>

                {/* Mist */}
                <AnimatePresence>
                  {controls.mist && (
                    <div className="absolute inset-0 z-20 pointer-events-none">
                      {[18, 30, 44, 58, 70, 82].map((leftPct, i) => (
                        <motion.span key={leftPct} className="absolute bottom-24 h-2.5 w-2.5 rounded-full bg-white/70 blur-[2px]" style={{ left: `${leftPct}%` }}
                          initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0, 0.8, 0], y: [-4, -46] }} exit={{ opacity: 0 }}
                          transition={{ repeat: Infinity, duration: 2.4, delay: i * 0.28, ease: 'easeOut' }} />
                      ))}
                    </div>
                  )}
                </AnimatePresence>

                {/* Irrigation */}
                <AnimatePresence>
                  {controls.irrigation && (
                    <div className="absolute inset-x-0 top-[45%] z-20 pointer-events-none">
                      {[24, 40, 56, 72].map((leftPct, i) => (
                        <motion.span key={leftPct} className="absolute h-3 w-1 rounded-full bg-sky-400/80" style={{ left: `${leftPct}%` }}
                          initial={{ y: 0, opacity: 0 }} animate={{ y: [0, 70], opacity: [0, 1, 0] }} exit={{ opacity: 0 }}
                          transition={{ repeat: Infinity, duration: 1.1, delay: i * 0.3, ease: 'easeIn' }} />
                      ))}
                    </div>
                  )}
                </AnimatePresence>

                {/* Soil + plants */}
                <div className="absolute bottom-0 inset-x-0 h-16 z-10 bg-gradient-to-t from-[#6b4a30] via-[#6b4a30]/80 to-transparent" />
                <div className="absolute bottom-3 inset-x-0 z-20 flex items-end justify-around px-10">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.div key={i}
                      animate={{ scale: plantScale, rotate: [-2.5, 2.5, -2.5], color: plantColor }}
                      transition={{ scale: { type: 'spring', stiffness: 120, damping: 14 }, color: { duration: 0.8 }, rotate: { repeat: Infinity, duration: 3 + i * 0.4, ease: 'easeInOut' } }}
                      style={{ transformOrigin: 'bottom center', color: plantColor }}>
                      <Sprout className="h-9 w-9" />
                    </motion.div>
                  ))}
                </div>

                {/* HUD scanline */}
                <motion.div
                  className="absolute inset-x-0 h-16 z-30 pointer-events-none bg-gradient-to-b from-white/10 to-transparent"
                  animate={{ y: ['-20%', '120%'] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                />
              </div>
            </div>

            {/* RIGHT — readouts + controls */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Status */}
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">System Status</span>
                <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider ${allOptimal ? 'text-emerald-400' : 'text-amber-400'}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${allOptimal ? 'bg-emerald-400 shadow-[0_0_8px_rgba(76,154,91,0.8)]' : 'bg-amber-400 animate-pulse'}`} />
                  {allOptimal ? 'Optimal' : `Adjusting ${inRangeCount}/4`}
                </span>
              </div>

              {/* Neon gauges */}
              <div className="grid grid-cols-2 gap-2.5">
                {metrics.map((m) => {
                  const pct = Math.min(100, Math.max(0, ((m.value - m.min) / (m.max - m.min)) * 100));
                  const bandLeft = ((m.optLow - m.min) / (m.max - m.min)) * 100;
                  const bandWidth = ((m.optHigh - m.optLow) / (m.max - m.min)) * 100;
                  const inRange = baseByKey[m.key] >= m.optLow && baseByKey[m.key] <= m.optHigh;
                  const Icon = m.icon;
                  return (
                    <div key={m.key} className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wide text-white/50">
                          <Icon className="h-3 w-3 text-emerald-400" />{m.label}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-0.5 mb-2">
                        <motion.span key={m.display} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }}
                          className={`font-mono text-xl font-black ${inRange ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(76,154,91,0.6)]' : 'text-amber-400'}`}>
                          {m.display}
                        </motion.span>
                        <span className="font-mono text-[9px] text-white/40">{m.unit}</span>
                      </div>
                      <div className="relative h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="absolute inset-y-0 rounded-full bg-emerald-400/15" style={{ left: `${bandLeft}%`, width: `${bandWidth}%` }} />
                        <motion.div
                          className={`absolute inset-y-0 left-0 rounded-full ${inRange ? 'bg-emerald-400 shadow-[0_0_10px_rgba(76,154,91,0.6)]' : 'bg-amber-400'}`}
                          animate={{ width: `${pct}%` }}
                          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Neon control toggles */}
              <div className="grid grid-cols-2 gap-2.5">
                {CONTROL_LIST.map(({ key, short, label, icon: Icon }) => {
                  const on = controls[key];
                  return (
                    <button
                      key={key}
                      onClick={() => toggle(key)}
                      title={label}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-bold transition-all duration-300 ${
                        on
                          ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300 shadow-[0_0_20px_rgba(76,154,91,0.25)]'
                          : 'bg-white/5 border-white/10 text-white/55 hover:border-white/25'
                      }`}
                    >
                      <span className={`flex h-6 w-6 items-center justify-center rounded-lg ${on ? 'bg-emerald-400/20 text-emerald-300' : 'bg-white/5 text-white/50'}`}>
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      {short}
                      <span className={`ml-auto h-1.5 w-1.5 rounded-full ${on ? 'bg-emerald-400 shadow-[0_0_6px_rgba(76,154,91,0.8)]' : 'bg-white/20'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex gap-2.5 mt-auto">
                <button onClick={autoOptimize} className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 text-xs font-bold py-2.5 transition-colors shadow-[0_0_20px_rgba(76,154,91,0.3)]">
                  <Sparkles className="h-4 w-4" /> Auto-optimize
                </button>
                <button onClick={reset} title="Reset" className="flex items-center justify-center h-10 w-10 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white transition-colors">
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* CTA bar */}
          <div className="relative mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3">
            <p className="font-sans text-sm text-emerald-100/80 font-medium text-center sm:text-left">
              {allOptimal ? 'Perfect growing conditions — this is what runs 24/7 on an AiGROW farm.' : 'Keep tuning, or let automation hold these conditions around the clock.'}
            </p>
            <button
              onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="shrink-0 flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 text-xs font-bold px-5 py-2.5 transition-colors group"
            >
              Automate my farm
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
