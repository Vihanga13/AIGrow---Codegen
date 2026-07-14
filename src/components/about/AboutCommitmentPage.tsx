import { PageId } from '../../types';
import { ShieldCheck, MapPin, RefreshCw, Cpu, ArrowLeft } from 'lucide-react';
import CTABanner from '../CTABanner';
import Reveal from '../Reveal';

interface AboutCommitmentPageProps {
  onNavigate: (pageId: PageId) => void;
}

const COMMITMENTS = [
  {
    title: 'Local Assembly & Calibration',
    desc: 'All smart sensor hubs, capacitive probes and motorised dosing valves are designed, assembled and calibrated inside Trace Expert City, Colombo 10, by Sri Lankan software and electronics engineers.',
    icon: Cpu
  },
  {
    title: 'Economic Self-Reliance',
    desc: 'By avoiding finished-goods imports we protect agricultural projects from dollar volatility, customs bottlenecks and supply-chain holdups. Structural components are locally fabricated to high tolerances.',
    icon: ShieldCheck
  },
  {
    title: 'Upcycled Organic Grow Mediums',
    desc: 'We replace imported rockwool with Sri Lankan premium coco-peat blocks, pre-conditioned organically. This promotes circular waste management across the coconut-producing belt.',
    icon: RefreshCw
  },
  {
    title: 'Dry-Zone Agrarian Impact',
    desc: 'We donate solar-powered LoRa moisture pods to cooperative societies in dry districts like Vavuniya and Hambantota, saving over 65% of precious tube-well water resources.',
    icon: MapPin
  }
];

const CREED = [
  ['100%', 'Local software & design'],
  ['0', 'Imported finished goods'],
  ['65%', 'Dry-zone water saved']
];

export default function AboutCommitmentPage({ onNavigate }: AboutCommitmentPageProps) {
  return (
    <div className="min-h-screen text-[#1F2321] px-6 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <button
          onClick={() => onNavigate('about')}
          className="mb-8 flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors font-medium group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to About Overview
        </button>

        {/* Header */}
        <Reveal className="mb-10">
          <span className="font-mono text-xs text-emerald-700 font-bold uppercase tracking-[0.3em] block mb-5">
            Sovereignty & Responsibility
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-[0.95] max-w-3xl">
            Built in Sri Lanka. Engineered for <span className="text-emerald-600">independence.</span>
          </h1>
          <p className="font-sans text-base text-gray-500 leading-relaxed font-light max-w-2xl mt-6">
            Every sensor, controller and line of code is managed locally — so heavy monsoons, currency swings and
            resource stresses never break a harvest.
          </p>
        </Reveal>

        {/* Hero image */}
        <Reveal className="rounded-3xl overflow-hidden shadow-xl shadow-emerald-900/5 mb-10">
          <img
            src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=1600"
            alt="Sri Lankan agricultural landscape"
            className="w-full h-56 md:h-72 object-cover"
            referrerPolicy="no-referrer"
          />
        </Reveal>

        {/* Creed stats */}
        <div className="grid grid-cols-3 gap-4 mb-16">
          {CREED.map(([n, l]) => (
            <div key={l} className="glass rounded-2xl p-5 text-center">
              <div className="font-mono text-3xl md:text-4xl font-black text-emerald-600 leading-none">{n}</div>
              <div className="font-sans text-xs text-gray-500 mt-2 font-medium leading-tight">{l}</div>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <section>
          <Reveal className="mb-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gray-400">The Manifesto</span>
            <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight mt-2">
              Four pillars of local commitment
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {COMMITMENTS.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={(i % 2) * 0.08} className="glass rounded-3xl p-6 flex flex-col gap-3 h-full">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shrink-0">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-emerald-600 uppercase tracking-widest font-bold">Pillar 0{i + 1}</span>
                  </div>
                  <h3 className="font-sans text-lg font-bold text-gray-950">{c.title}</h3>
                  <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">{c.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </section>

        <div className="mt-4">
          <CTABanner onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
