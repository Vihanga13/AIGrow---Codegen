import { PageId } from '../types';
import { Building2, Calendar, Leaf, Trophy, ShieldAlert, ArrowRight, BookOpen } from 'lucide-react';
import StatsCounter from './StatsCounter';
import CTABanner from './CTABanner';

interface AboutStoryPageProps {
  onNavigate: (pageId: PageId) => void;
}

export default function AboutStoryPage({ onNavigate }: AboutStoryPageProps) {
  const timeline = [
    {
      year: '2018',
      title: 'Foundation & Setup',
      desc: 'AiGROW is established inside Trace Expert City, Colombo as a tech-focused subsidiary of CodeGen International. Dr. Harsha Subasinghe lays the vision to combine IoT and agricultural science.'
    },
    {
      year: '2020',
      title: 'First Commercial Deployments',
      desc: 'Launched turnkey automated greenhouses in the hill country of Kegalle and Kandy. Introduced capacitive LoRa sensor nodes to Sri Lankan growers.'
    },
    {
      year: '2022',
      title: 'Sovereign Core Initiative',
      desc: 'Shifted full manufacturing and assembly local to Colombo. Developed custom printed circuit boards (PCBs) and custom injection molded enclosures to avoid import-currency dependencies.'
    },
    {
      year: '2024',
      title: 'SLASSCOM Innovation Showcase',
      desc: 'Showcased automated precision fertigation solutions at major national summits, securing industry recognition and expansion into local dry-zone agrarian communities.'
    },
    {
      year: '2026',
      title: 'Advanced AI Dosing Release',
      desc: 'Introduced cloud-based deep agronomy profiles. Remotely advising hundreds of crops daily on water, nutrients, and humidity index goals.'
    }
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-[#1F2321] py-12 px-6">
      <div className="w-full mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <button 
            onClick={() => onNavigate('about')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors font-medium"
          >
            ← Back to About Overview
          </button>
        </div>

        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 flex flex-col gap-6 animate-slide-in">
            <span className="font-mono text-xs text-emerald-600 font-bold uppercase tracking-widest block">
              Our Journey
            </span>
            <h1 className="font-sans text-4xl sm:text-5xl font-extrabold text-gray-950 tracking-tight leading-none">
              Merging Software, Hardware & Agronomy
            </h1>
            <p className="font-sans text-base text-gray-600 leading-relaxed font-light">
              We believe the future of agriculture lies in high-precision, software-driven solutions. By applying CodeGens advanced software capabilities to commercial farming, we enable growers to automate the entire microclimate lifecycle and increase yield outputs.
            </p>
            <p className="font-sans text-xs text-gray-500 italic leading-relaxed">
              "We don't just sell greenhouses; we build intelligent closed-loop agricultural operating systems." — Dr. Harsha Subasinghe, CEO CodeGen International
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-square max-w-sm mx-auto bg-emerald-50">
              <img 
                src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800" 
                alt="Seeds grow in hands"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
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

        {/* Timeline */}
        <section className="mb-16">
          <div className="text-center mb-12 max-w-xl mx-auto">
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight mb-2">Our History</h2>
            <p className="font-sans text-xs text-gray-500 font-light">A timeline of sustainable innovation from trace laboratory concepts to island-wide systems.</p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-8 relative border-l-2 border-emerald-100 pl-6 ml-4 sm:ml-auto">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-white border-4 border-emerald-500 transition-all group-hover:scale-125" />
                
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs hover:border-emerald-100 transition-all">
                  <span className="font-mono text-xs font-bold text-emerald-600 block mb-1">{item.year}</span>
                  <h3 className="font-sans text-base font-bold text-gray-950 mb-2">{item.title}</h3>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to action */}
        <CTABanner onNavigate={onNavigate} />

      </div>
    </div>
  );
}
