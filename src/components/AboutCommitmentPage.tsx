import { PageId } from '../types';
import { ShieldCheck, MapPin, CheckCircle, RefreshCw, Cpu, Award } from 'lucide-react';
import CTABanner from './CTABanner';

interface AboutCommitmentPageProps {
  onNavigate: (pageId: PageId) => void;
}

export default function AboutCommitmentPage({ onNavigate }: AboutCommitmentPageProps) {
  const commitments = [
    {
      title: 'Local Assembly & Calibration',
      desc: 'All smart sensor hubs, capacitive probes, and motorized dosing valves are designed, assembled, and calibrated inside Trace Expert City, Colombo 10, by Sri Lankan software and electronics engineers.',
      icon: <Cpu className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Economic Self-Reliance',
      desc: 'By avoiding finished-goods imports, we protect agricultural projects from dollar volatility, customs bottlenecks, and supply-chain holdups. Our structural components are locally fabricated to high tolerances.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Upcycled Organic Grow Mediums',
      desc: 'We replace imported rockwool with Sri Lankan premium coco-peat blocks, which are pre-conditioned organically. This promotes circular waste management in the coconut-producing belt.',
      icon: <RefreshCw className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Dry-Zone Agrarian Impact',
      desc: 'We donate solar-powered LoRa moisture pods to cooperative societies in dry districts like Vavuniya and Hambantota, saving over 65% of precious tube-well water resources.',
      icon: <MapPin className="w-6 h-6 text-emerald-600" />
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

        {/* Hero split layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 flex flex-col gap-6 animate-slide-in">
            <span className="font-mono text-xs text-emerald-600 font-bold uppercase tracking-widest block">
              Sovereignty & Responsibility
            </span>
            <h1 className="font-sans text-4xl sm:text-5xl font-extrabold text-gray-950 tracking-tight leading-none">
              Built in Sri Lanka. Engineered for Independence.
            </h1>
            <p className="font-sans text-base text-gray-600 leading-relaxed font-light">
              Sri Lankan agriculture faces unique challenges, including heavy monsoons, unpredictable currency fluctuations, and localized resource stresses. Our sovereign commitment is to ensure that every sensor, controller, and software code is managed locally, ensuring 100% operational resilience.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-emerald-50">
              <img 
                src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800" 
                alt="Local Sri Lankan agricultural scenery"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Commitments Grid */}
        <section className="mb-16">
          <div className="text-center mb-12 max-w-xl mx-auto">
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight mb-2">
              Our Four Pillars of Local Commitment
            </h2>
            <p className="font-sans text-xs text-gray-500 font-light">
              How we support local sovereignty and protect agricultural infrastructure from external supply dependencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commitments.map((com, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xs hover:border-emerald-100 hover:shadow-lg transition-all duration-300 flex flex-col gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  {com.icon}
                </div>
                <div>
                  <h3 className="font-sans text-base font-bold text-gray-900 mb-2">{com.title}</h3>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">{com.desc}</p>
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
