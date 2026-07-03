import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  Layers, 
  Leaf, 
  Sparkles, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Search, 
  Wrench, 
  HardHat, 
  Activity, 
  QrCode, 
  ExternalLink,
  Wind,
  Droplets,
  Cpu,
  Grid,
  Lightbulb,
  Thermometer,
  Sprout,
  Smartphone,
  Truck
} from 'lucide-react';
import { PageId, Service } from '../types';
import { SERVICES_DATA } from '../data';
import CTABanner from './CTABanner';

interface ServicesViewProps {
  onNavigate: (pageId: PageId) => void;
  selectedServiceId: string;
  onSelectServiceId: (id: string) => void;
}

export default function ServicesView({
  onNavigate,
  selectedServiceId,
  onSelectServiceId
}: ServicesViewProps) {
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Fallback to greenhouse if not specified
  useEffect(() => {
    if (!selectedServiceId) {
      onSelectServiceId('greenhouse');
    }
  }, [selectedServiceId, onSelectServiceId]);

  const activeService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Leaf': return <Leaf className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      default: return <Leaf className="w-6 h-6" />;
    }
  };

  const getFeatureIcon = (serviceId: string, idx: number) => {
    switch (serviceId) {
      case 'greenhouse':
        switch (idx) {
          case 0: return <Wrench className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
          case 1: return <Wind className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
          case 2: return <Droplets className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
          case 3: return <Cpu className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
          default: return <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        }
      case 'indoor-farming':
        switch (idx) {
          case 0: return <Grid className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
          case 1: return <Lightbulb className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
          case 2: return <Thermometer className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
          case 3: return <Sprout className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
          default: return <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        }
      case 'home-gardening':
        switch (idx) {
          case 0: return <Droplets className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
          case 1: return <Layers className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
          case 2: return <Wrench className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
          case 3: return <Smartphone className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
          default: return <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        }
      case 'fresh-produce':
        switch (idx) {
          case 0: return <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
          case 1: return <Activity className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
          case 2: return <QrCode className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
          case 3: return <Truck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
          default: return <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        }
      default:
        return <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
    }
  };

  const getProcessIcon = (step: string) => {
    switch (step) {
      case '01': return <Search className="w-5 h-5" />;
      case '02': return <Wrench className="w-5 h-5" />;
      case '03': return <HardHat className="w-5 h-5" />;
      case '04': return <Activity className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const handleTabChange = (id: string) => {
    onSelectServiceId(id);
    const element = document.getElementById('services-detail-anchor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#FAFDFB]/10 min-h-screen text-[#1F2321] py-12 px-6">
      <div className="w-full mx-auto">
        
        {/* Header Title & Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            Our Expertise
          </div>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-gray-950 mb-4">
            Precision Agricultural Solutions
          </h1>
          <p className="font-sans text-gray-500 font-light text-base md:text-lg">
            From design and engineering to cloud-based monitoring and export-grade produce, we are reforming Sri Lankan farming protocols.
          </p>
        </motion.div>

        {/* Tab Navigation Menu */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          ref={tabsContainerRef}
          className="flex flex-wrap justify-center gap-3 border-b border-gray-100 pb-8 mb-12"
          id="services-tabs"
        >
          {SERVICES_DATA.map((service) => {
            const isActive = service.id === selectedServiceId;
            return (
              <button
                key={service.id}
                id={`service-tab-button-${service.id}`}
                onClick={() => handleTabChange(service.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-sans text-sm font-semibold transition-all duration-300 ${
                  isActive 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/15' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-950'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-emerald-600'}>
                  {getIcon(service.iconName)}
                </span>
                {service.title}
              </button>
            );
          })}
        </motion.div>

        {/* Anchor point for scrolling */}
        <div id="services-detail-anchor" className="scroll-mt-24"></div>

        {/* Detailed active service section */}
        <motion.div 
          key={selectedServiceId}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start glass rounded-3xl p-8 md:p-12 shadow-xl shadow-emerald-900/5"
        >
          
          {/* Left Column: Brief and Features */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2">
              {getIcon(activeService.iconName)}
            </div>

            <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
              {activeService.title}
            </h2>

            <p className="font-sans text-gray-600 leading-relaxed font-light text-sm md:text-base">
              {activeService.fullDesc}
            </p>

            <button
              onClick={() => {
                onNavigate(`services-${activeService.id}` as PageId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-2 w-fit px-5 py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100/80 rounded-xl text-xs font-bold transition-all flex items-center gap-2 group border border-emerald-100"
            >
              Explore Dedicated Service Page & Sub-Tiers
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Bullet Point List */}
            <div className="flex flex-col gap-3 mt-4">
              <h4 className="font-sans text-xs font-bold text-gray-400 uppercase tracking-wider">
                Core Deliverables
              </h4>
              {activeService.features.map((feature, i) => (
                <div key={i} className="flex gap-2.5 items-start text-sm">
                  {getFeatureIcon(activeService.id, i)}
                  <span className="font-sans text-gray-700 font-light">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sub-categories and process */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Subcategories (e.g. Commercial vs Individual tiers) */}
            {activeService.subCategories && (
              <div className="flex flex-col gap-6">
                <h3 className="font-sans text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">
                  Technical Service Tiers
                </h3>
                
                <div className="flex flex-col gap-6">
                  {activeService.subCategories.map((sub, idx) => (
                    <div key={idx} className="bg-gray-50/70 rounded-2xl p-6 border border-gray-100">
                      <h4 className="font-sans text-base font-bold text-emerald-800 mb-1">{sub.name}</h4>
                      <p className="font-sans text-xs text-gray-500 mb-4 font-light">{sub.description}</p>
                      
                      <div className="flex flex-col gap-2.5">
                        {sub.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex gap-2 items-start text-xs text-gray-700 leading-relaxed font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5"></span>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Section: Design, Build, Operate, Maintain Timeline (Only for Greenhouse) */}
            {activeService.id === 'greenhouse' && activeService.process && (
              <div className="flex flex-col gap-6 mt-4">
                <h3 className="font-sans text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">
                  Our Comprehensive Design-to-Maintain Process
                </h3>

                <div className="relative pl-6 border-l border-emerald-100 flex flex-col gap-8">
                  {activeService.process.map((pStep, i) => (
                    <div key={i} className="relative">
                      {/* Step Indicator Dot */}
                      <div className="absolute -left-[37px] top-1 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center text-white">
                      </div>

                      <div className="bg-emerald-50/20 p-5 rounded-2xl border border-emerald-100/50">
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className="font-mono text-xs font-bold text-emerald-600">{pStep.step}</span>
                          <span className="w-1 h-1 rounded-full bg-emerald-300"></span>
                          <h4 className="font-sans text-sm font-bold text-gray-900">{pStep.title}</h4>
                        </div>
                        <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">
                          {pStep.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Special Traceability QR Code Mock (Only for Fresh Produce) */}
            {activeService.id === 'fresh-produce' && (
              <div className="bg-emerald-50/30 border border-emerald-100 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 mt-4">
                <div className="p-4 glass rounded-2xl shadow-sm shrink-0">
                  {/* Mock QR Code element */}
                  <div className="w-32 h-32 bg-gray-50 flex flex-col items-center justify-center border border-gray-100 rounded-xl relative group">
                    <QrCode className="w-24 h-24 text-gray-800" />
                    <span className="absolute bottom-1 font-mono text-[7px] text-emerald-600 font-semibold tracking-wider bg-emerald-50 px-1.5 py-0.5 rounded">
                      TRACE: AGX-711
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase w-fit">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    100% Secure Food Safety
                  </div>
                  <h4 className="font-sans text-base font-bold text-gray-900">Scan & Trace with Real Logs</h4>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">
                    Every bag of our hydroponic lettuce and peppers has a unique QR code. Scan it to see real data: seed quality certificates, pH levels during growth, water filtration logs, and the exact timestamp it was harvested from the greenhouse.
                  </p>
                  <button 
                    onClick={() => onNavigate('contact')}
                    className="text-emerald-700 font-semibold text-xs flex items-center gap-1.5 hover:text-emerald-800"
                  >
                    Partner as a Retailer
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>

        </motion.div>

        {/* Reusable CTA Banner */}
        <CTABanner 
          onNavigate={onNavigate}
          title="Grow with AiGROW today"
          subtitle="Join us in cultivating change across Sri Lanka. Let's design, build, and automate your farming projects."
        />

      </div>
    </div>
  );
}
