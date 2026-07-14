import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
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
    <section className="py-20 px-6 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="max-w-3xl mb-10">
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
        </div>

        {/* Console */}
        <div className="glass rounded-3xl p-5 md:p-7 grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT — simple greenhouse visual */}
          <div className="flex flex-col gap-3">
            <div className="relative rounded-2xl overflow-hidden border border-gray-100 min-h-[280px] flex-1">
              {/* Sky reacts to temperature */}
              <motion.div className="absolute inset-0" animate={{ backgroundColor: sky }} transition={{ duration: 1 }} />

              {/* Sun (dims when shaded) */}
              <motion.div className="absolute top-5 right-6" animate={{ opacity: controls.shade ? 0.35 : 1 }} transition={{ duration: 0.5 }}>
                <Sun className="h-12 w-12 text-amber-400" />
              </motion.div>

              {/* Shade screen */}
              {controls.shade && <div className="absolute inset-x-0 top-0 h-1/3 bg-emerald-950/15" />}

              {/* Active controls chips */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 max-w-[70%]">
                {CONTROL_LIST.filter(c => controls[c.key]).map(({ key, short, icon: Icon }) => (
                  <span key={key} className="inline-flex items-center gap-1 rounded-full bg-white/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                    <Icon className="h-3 w-3" /> {short}
                  </span>
                ))}
              </div>

              {/* Soil + plants (scale & colour reflect health) */}
              <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#6b4a30] to-transparent" />
              <div className="absolute bottom-3 inset-x-0 flex items-end justify-around px-8">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: plantScale, color: plantColor }}
                    transition={{ scale: { type: 'spring', stiffness: 120, damping: 16 }, color: { duration: 0.8 } }}
                    style={{ transformOrigin: 'bottom center', color: plantColor }}
                  >
                    <Sprout className="h-9 w-9" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white/60 px-4 py-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">System Status</span>
              <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider ${allOptimal ? 'text-emerald-600' : 'text-amber-600'}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${allOptimal ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                {allOptimal ? 'Optimal' : `Adjusting ${inRangeCount}/4`}
              </span>
            </div>
          </div>

          {/* RIGHT — readouts + controls */}
          <div className="flex flex-col gap-4">
            {/* Gauges */}
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((m) => {
                const pct = Math.min(100, Math.max(0, ((m.value - m.min) / (m.max - m.min)) * 100));
                const bandLeft = ((m.optLow - m.min) / (m.max - m.min)) * 100;
                const bandWidth = ((m.optHigh - m.optLow) / (m.max - m.min)) * 100;
                const inRange = baseByKey[m.key] >= m.optLow && baseByKey[m.key] <= m.optHigh;
                const Icon = m.icon;
                return (
                  <div key={m.key} className="rounded-xl border border-gray-100 bg-white p-3.5">
                    <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wide text-gray-400 mb-2">
                      <Icon className="h-3 w-3 text-emerald-500" />{m.label}
                    </span>
                    <div className="flex items-baseline gap-0.5 mb-2">
                      <span className={`font-mono text-xl font-black ${inRange ? 'text-emerald-600' : 'text-amber-600'}`}>{m.display}</span>
                      <span className="font-mono text-[9px] text-gray-400">{m.unit}</span>
                    </div>
                    <div className="relative h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="absolute inset-y-0 rounded-full bg-emerald-500/15" style={{ left: `${bandLeft}%`, width: `${bandWidth}%` }} />
                      <motion.div
                        className={`absolute inset-y-0 left-0 rounded-full ${inRange ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        animate={{ width: `${pct}%` }}
                        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Control toggles */}
            <div className="grid grid-cols-2 gap-3">
              {CONTROL_LIST.map(({ key, short, label, icon: Icon }) => {
                const on = controls[key];
                return (
                  <button
                    key={key}
                    onClick={() => toggle(key)}
                    title={label}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-bold transition-all ${
                      on ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-white border-gray-200 text-gray-500 hover:border-emerald-200'
                    }`}
                  >
                    <span className={`flex h-6 w-6 items-center justify-center rounded-lg ${on ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    {short}
                    <span className={`ml-auto h-1.5 w-1.5 rounded-full ${on ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-auto">
              <button onClick={autoOptimize} className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 transition-colors">
                <Sparkles className="h-4 w-4" /> Auto-optimize
              </button>
              <button onClick={reset} title="Reset" className="flex items-center justify-center h-11 w-11 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-emerald-600 hover:border-emerald-300 transition-colors">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* CTA bar */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 glass-green rounded-2xl px-5 py-4">
          <p className="font-sans text-sm text-gray-700 font-medium text-center sm:text-left">
            {allOptimal ? 'Perfect growing conditions — this is what runs 24/7 on an AiGROW farm.' : 'Keep tuning, or let automation hold these conditions around the clock.'}
          </p>
          <button
            onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="shrink-0 flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 transition-colors group"
          >
            Automate my farm
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
