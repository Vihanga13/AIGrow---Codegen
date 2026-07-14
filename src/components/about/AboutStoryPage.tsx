import { PageId } from '../../types';
import { ArrowLeft, Quote } from 'lucide-react';
import CTABanner from '../CTABanner';
import Reveal from '../Reveal';

interface AboutStoryPageProps {
  onNavigate: (pageId: PageId) => void;
}

const TIMELINE = [
  {
    year: '2018',
    title: 'Foundation & Setup',
    tag: 'The beginning',
    desc: 'AiGROW is established inside Trace Expert City, Colombo as a tech-focused subsidiary of CodeGen International. Dr. Harsha Subasinghe lays the vision to combine IoT and agricultural science.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=900'
  },
  {
    year: '2020',
    title: 'First Commercial Deployments',
    tag: 'Going commercial',
    desc: 'Launched turnkey automated greenhouses in the hill country of Kegalle and Kandy. Introduced capacitive LoRa sensor nodes to Sri Lankan growers.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=900'
  },
  {
    year: '2022',
    title: 'Sovereign Core Initiative',
    tag: 'Built local',
    desc: 'Shifted full manufacturing and assembly local to Colombo. Developed custom printed circuit boards (PCBs) and injection-molded enclosures to avoid import-currency dependencies.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=900'
  },
  {
    year: '2024',
    title: 'SLASSCOM Innovation Showcase',
    tag: 'Recognised',
    desc: 'Showcased automated precision fertigation solutions at major national summits, securing industry recognition and expansion into local dry-zone agrarian communities.',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=900'
  },
  {
    year: '2026',
    title: 'Advanced AI Dosing Release',
    tag: 'Intelligence at scale',
    desc: 'Introduced cloud-based deep agronomy profiles — remotely advising hundreds of crops daily on water, nutrients and humidity-index goals.',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=900'
  }
];

export default function AboutStoryPage({ onNavigate }: AboutStoryPageProps) {
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

        {/* Opening statement */}
        <section className="mb-14">
          <span className="font-mono text-xs text-emerald-700 font-bold uppercase tracking-[0.3em] block mb-5">
            Our Journey · 2018 → 2026
          </span>
          <h1 className="font-sans text-4xl md:text-5xl font-black text-gray-950 tracking-tight leading-[0.95] max-w-3xl">
            Merging software, hardware &amp; agronomy into one <span className="text-emerald-600">living system</span>.
          </h1>
          <p className="font-sans text-base text-gray-500 leading-relaxed font-light max-w-2xl mt-6">
            By applying CodeGen’s advanced software capabilities to commercial farming, we let growers automate the
            entire microclimate lifecycle and lift yield outputs.
          </p>
          <div className="glass-green rounded-2xl p-5 flex gap-4 items-start max-w-lg mt-6">
            <Quote className="w-6 h-6 text-emerald-600 shrink-0" />
            <p className="font-sans text-sm text-gray-700 italic leading-relaxed">
              “We build intelligent closed-loop agricultural operating systems.”
              <span className="not-italic font-semibold text-gray-900 block mt-1">— Dr. Harsha Subasinghe, CEO</span>
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-8">
          <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight mb-8">Our history</h2>
          <div className="flex flex-col gap-6">
            {TIMELINE.map((item) => (
              <Reveal key={item.year} className="glass rounded-3xl overflow-hidden grid grid-cols-1 sm:grid-cols-[200px_1fr]">
                <div className="relative h-40 sm:h-full min-h-[160px] overflow-hidden">
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <span className="absolute top-3 left-3 font-mono text-lg font-black text-white drop-shadow">{item.year}</span>
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <span className="inline-flex items-center w-fit px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
                    {item.tag}
                  </span>
                  <h3 className="font-sans text-xl font-extrabold text-gray-950 tracking-tight mb-2">{item.title}</h3>
                  <p className="font-sans text-sm text-gray-500 leading-relaxed font-light">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <CTABanner onNavigate={onNavigate} />
      </div>
    </div>
  );
}
