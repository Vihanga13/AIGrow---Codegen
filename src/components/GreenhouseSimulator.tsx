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
  Check,
  ArrowRight,
  Fan,
  Sun
} from 'lucide-react';
import { PageId } from '../types';

interface GreenhouseSimulatorProps {
  onNavigate: (pageId: PageId) => void;
}

type Controls = {
  fans: boolean;
  mist: boolean;
  shade: boolean;
  irrigation: boolean;
};

type Metric = {
  key: string;
  label: string;
  unit: string;
  icon: typeof Wind;
  value: number;
  display: string;
  min: number;
  max: number;
  optLow: number;
  optHigh: number;
  optLabel: string;
};

const CONTROL_LIST: { key: keyof Controls; label: string; short: string; icon: typeof Wind }[] = [
  { key: 'fans', label: 'Ventilation Fans', short: 'Fans', icon: Wind },
  { key: 'mist', label: 'Misting System', short: 'Mist', icon: Droplets },
  { key: 'shade', label: 'Shade Screen', short: 'Shade', icon: Umbrella },
  { key: 'irrigation', label: 'Drip Irrigation', short: 'Drip', icon: Droplet }
];

// Compact HUD gauge — used both as an overlay (desktop) and a strip (mobile)
function GaugeChip({ m, baseValue }: { m: Metric; baseValue: number }) {
  const pct = Math.min(100, Math.max(0, ((m.value - m.min) / (m.max - m.min)) * 100));
  const bandLeft = ((m.optLow - m.min) / (m.max - m.min)) * 100;
  const bandWidth = ((m.optHigh - m.optLow) / (m.max - m.min)) * 100;
  const inRange = baseValue >= m.optLow && baseValue <= m.optHigh;
  const Icon = m.icon;
  return (
    <motion.div
      animate={{ borderColor: inRange ? 'rgba(76,154,91,0.4)' : 'rgba(76,154,91,0.14)' }}
      className="glass rounded-xl p-3 shadow-sm"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-1.5 font-sans text-[10px] font-bold text-gray-600 uppercase tracking-wide">
          <Icon className="h-3.5 w-3.5 text-emerald-600" />
          {m.label}
        </span>
        <span className={`flex h-4 w-4 items-center justify-center rounded-full ${inRange ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
          {inRange ? <Check className="h-2.5 w-2.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />}
        </span>
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <motion.span
          key={m.display}
          initial={{ opacity: 0.5, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          className={`font-mono text-xl font-black tracking-tight ${inRange ? 'text-emerald-600' : 'text-gray-800'}`}
        >
          {m.display}
        </motion.span>
        <span className="font-mono text-[10px] text-gray-400 font-medium">{m.unit}</span>
      </div>
      <div className="relative h-1.5 w-full rounded-full bg-gray-200/70 overflow-hidden">
        <div className="absolute inset-y-0 rounded-full bg-emerald-500/15" style={{ left: `${bandLeft}%`, width: `${bandWidth}%` }} />
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${inRange ? 'bg-emerald-500' : 'bg-amber-400'}`}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </motion.div>
  );
}

export default function GreenhouseSimulator({ onNavigate }: GreenhouseSimulatorProps) {
  const [controls, setControls] = useState<Controls>({
    fans: false, mist: false, shade: false, irrigation: false
  });

  // Tiny live "sensor jitter" so the readouts feel like a real telemetry feed
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
    { key: 'temp', label: 'Temp', unit: '°C', icon: Thermometer, value: base.temp + jitter.temp, display: (base.temp + jitter.temp).toFixed(1), min: 15, max: 35, optLow: 22, optHigh: 28, optLabel: '22–28°C' },
    { key: 'humidity', label: 'Humidity', unit: '%', icon: Droplets, value: base.humidity + jitter.humidity, display: Math.round(base.humidity + jitter.humidity).toString(), min: 20, max: 100, optLow: 65, optHigh: 80, optLabel: '65–80%' },
    { key: 'co2', label: 'CO₂', unit: 'ppm', icon: Cloud, value: base.co2 + jitter.co2, display: Math.round(base.co2 + jitter.co2).toString(), min: 400, max: 950, optLow: 400, optHigh: 700, optLabel: '400–700' },
    { key: 'soil', label: 'Soil', unit: '%', icon: Sprout, value: base.soil + jitter.soil, display: Math.round(base.soil + jitter.soil).toString(), min: 0, max: 100, optLow: 55, optHigh: 75, optLabel: '55–75%' }
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
            This is how AiGROW automation works. Flip the climate controls and watch the greenhouse, and its sensor gauges, respond in real time.
          </p>
        </motion.div>

        {/* IMMERSIVE MISSION-CONTROL STAGE */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Living greenhouse canvas */}
          <motion.div
            animate={{ boxShadow: allOptimal ? '0 0 0 3px rgba(76,154,91,0.35), 0 30px 60px -30px rgba(76,154,91,0.5)' : '0 20px 45px -25px rgba(15,30,18,0.35)' }}
            transition={{ duration: 0.6 }}
            className="relative h-[440px] sm:h-[500px] lg:h-[560px] rounded-3xl overflow-hidden border border-white/50"
          >
            {/* Sky */}
            <motion.div className="absolute inset-0" animate={{ backgroundColor: sky }} transition={{ duration: 1 }} />
            <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_-10%,rgba(255,255,255,0.5),transparent_60%)]" />

            {/* Sun */}
            <motion.div
              className="absolute top-6 right-8 lg:right-72"
              animate={{ opacity: controls.shade ? 0.3 : 1, scale: controls.shade ? 0.88 : 1, rotate: 360 }}
              transition={{ opacity: { duration: 0.6 }, scale: { duration: 0.6 }, rotate: { repeat: Infinity, ease: 'linear', duration: 40 } }}
            >
              <Sun className="h-16 w-16 text-amber-400 drop-shadow-[0_0_16px_rgba(251,191,36,0.55)]" />
            </motion.div>

            {/* Status badge */}
            <div className="absolute top-5 left-5 z-30">
              <motion.span
                animate={{ backgroundColor: allOptimal ? 'rgba(16,185,129,0.18)' : 'rgba(245,158,11,0.18)' }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/40 ${allOptimal ? 'text-emerald-800' : 'text-amber-800'}`}
              >
                <Sprout className="h-3.5 w-3.5" />
                {allOptimal ? 'Thriving' : health >= 0.5 ? 'Recovering' : 'Under stress'}
                <span className="opacity-60">· {inRangeCount}/4</span>
              </motion.span>
            </div>

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
                <motion.div
                  animate={{ rotate: controls.fans ? 360 : 0 }}
                  transition={controls.fans ? { repeat: Infinity, ease: 'linear', duration: 0.9 } : { duration: 0.5 }}
                >
                  <Fan className={`h-7 w-7 ${controls.fans ? 'text-emerald-600' : 'text-gray-400'}`} />
                </motion.div>
              </div>
            </div>

            {/* Mist */}
            <AnimatePresence>
              {controls.mist && (
                <div className="absolute inset-0 z-20 pointer-events-none">
                  {[18, 30, 44, 58, 70, 82].map((leftPct, i) => (
                    <motion.span
                      key={leftPct}
                      className="absolute bottom-40 h-2.5 w-2.5 rounded-full bg-white/70 blur-[2px]"
                      style={{ left: `${leftPct}%` }}
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: [0, 0.8, 0], y: [-4, -50] }}
                      exit={{ opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 2.4, delay: i * 0.28, ease: 'easeOut' }}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Irrigation drips */}
            <AnimatePresence>
              {controls.irrigation && (
                <div className="absolute inset-x-0 top-[48%] z-20 pointer-events-none">
                  {[28, 50, 72].map((leftPct, i) => (
                    <motion.span
                      key={leftPct}
                      className="absolute h-3 w-1 rounded-full bg-sky-400/80"
                      style={{ left: `${leftPct}%` }}
                      initial={{ y: 0, opacity: 0 }}
                      animate={{ y: [0, 80], opacity: [0, 1, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 1.1, delay: i * 0.35, ease: 'easeIn' }}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Soil */}
            <div className="absolute bottom-0 inset-x-0 h-20 z-10 bg-gradient-to-t from-[#6b4a30] via-[#6b4a30]/80 to-transparent" />

            {/* Plants */}
            <div className="absolute bottom-4 left-0 right-0 lg:right-64 z-20 flex items-end justify-around px-10">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: plantScale, rotate: [-2.5, 2.5, -2.5], color: plantColor }}
                  transition={{
                    scale: { type: 'spring', stiffness: 120, damping: 14 },
                    color: { duration: 0.8 },
                    rotate: { repeat: Infinity, duration: 3 + i * 0.4, ease: 'easeInOut' }
                  }}
                  style={{ transformOrigin: 'bottom center', color: plantColor }}
                >
                  <Sprout className="h-10 w-10" />
                </motion.div>
              ))}
            </div>

            {/* Gauge HUD overlay (desktop) */}
            <div className="hidden lg:flex absolute top-5 right-5 z-30 flex-col gap-2.5 w-56">
              {metrics.map((m) => (
                <GaugeChip key={m.key} m={m} baseValue={baseByKey[m.key]} />
              ))}
            </div>
          </motion.div>

          {/* Floating control dock */}
          <div className="relative z-30 -mt-9 mx-3 lg:mx-8 glass rounded-2xl p-3 md:p-4 shadow-xl shadow-emerald-900/10 flex flex-wrap items-center gap-2.5 justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {CONTROL_LIST.map(({ key, short, label, icon: Icon }) => {
                const active = controls[key];
                return (
                  <button
                    key={key}
                    onClick={() => toggle(key)}
                    title={label}
                    className={`flex items-center gap-2 pl-2.5 pr-3 py-2 rounded-xl border text-xs font-bold transition-all duration-300 ${
                      active
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-600/20'
                        : 'bg-white/50 text-gray-600 border-gray-200/70 hover:border-emerald-300'
                    }`}
                  >
                    <span className={`flex h-6 w-6 items-center justify-center rounded-lg ${active ? 'bg-white/20' : 'bg-gray-100'}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    {short}
                    <span className={`ml-0.5 h-1.5 w-1.5 rounded-full ${active ? 'bg-white' : 'bg-gray-300'}`} />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={autoOptimize}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/15"
              >
                <Sparkles className="h-4 w-4" />
                Auto-optimize
              </button>
              <button
                onClick={reset}
                title="Reset"
                className="flex items-center justify-center h-10 w-10 rounded-xl bg-white/60 border border-gray-200 text-gray-500 hover:text-gray-900 transition-all"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Gauge strip (mobile) */}
        <div className="lg:hidden grid grid-cols-2 gap-3 mt-4">
          {metrics.map((m) => (
            <GaugeChip key={m.key} m={m} baseValue={baseByKey[m.key]} />
          ))}
        </div>

        {/* CTA strip */}
        <div className="glass-green rounded-2xl p-5 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-sm text-emerald-900/80 font-medium text-center sm:text-left">
            {allOptimal
              ? 'Perfect growing conditions. This is what runs 24/7 on an AiGROW farm.'
              : 'Keep tuning, or let automation hold these conditions for you around the clock.'}
          </p>
          <button
            onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all group"
          >
            Automate my farm
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
