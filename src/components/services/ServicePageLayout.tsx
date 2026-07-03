import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../../types';
import { SERVICES_DATA } from '../../data';
import {
  Home,
  Layers,
  Leaf,
  Sparkles,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Settings,
  ShieldCheck,
  Zap,
  Users,
  Wrench,
  Wind,
  Droplets,
  Cpu,
  Grid,
  Lightbulb,
  Thermometer,
  Sprout,
  Smartphone,
  Activity,
  QrCode,
  Truck,
  Building2
} from 'lucide-react';
import CTABanner from '../CTABanner';

interface ServicePageLayoutProps {
  serviceId: 'greenhouse' | 'indoor-farming' | 'home-gardening' | 'fresh-produce';
  onNavigate: (pageId: PageId) => void;
  onSelectProductForEnquiry: (productName: string) => void;
}

export default function ServicePageLayout({
  serviceId,
  onNavigate,
  onSelectProductForEnquiry
}: ServicePageLayoutProps) {
  const service = SERVICES_DATA.find(s => s.id === serviceId);
  const [activeTier, setActiveTier] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-950 p-6">
        <h2 className="text-xl font-bold mb-4">Service Not Found</h2>
        <button onClick={() => onNavigate('services')} className="px-5 py-2 bg-emerald-600 text-white rounded-lg">
          Back to Services
        </button>
      </div>
    );
  }

  const getIcon = (iconName: string, cls = 'w-8 h-8') => {
    switch (iconName) {
      case 'Home': return <Home className={cls} />;
      case 'Layers': return <Layers className={cls} />;
      case 'Leaf': return <Leaf className={cls} />;
      case 'Sparkles': return <Sparkles className={cls} />;
      default: return <Leaf className={cls} />;
    }
  };

  const getFeatureMetadata = (serviceId: string, idx: number) => {
    switch (serviceId) {
      case 'greenhouse':
        switch (idx) {
          case 0: return { title: 'Custom Structural Design', icon: <Wrench className="w-4.5 h-4.5" /> };
          case 1: return { title: 'Ventilation & Thermal Control', icon: <Wind className="w-4.5 h-4.5" /> };
          case 2: return { title: 'Fertigation & Drip Systems', icon: <Droplets className="w-4.5 h-4.5" /> };
          case 3: return { title: 'Remote IoT Telemetry', icon: <Cpu className="w-4.5 h-4.5" /> };
          default: return { title: `Feature ${idx + 1}`, icon: <CheckCircle className="w-4.5 h-4.5" /> };
        }
      case 'indoor-farming':
        switch (idx) {
          case 0: return { title: 'Vertical Stack Layout', icon: <Grid className="w-4.5 h-4.5" /> };
          case 1: return { title: 'LED Grow Spectrum', icon: <Lightbulb className="w-4.5 h-4.5" /> };
          case 2: return { title: 'Fogging & Humidity Controls', icon: <Thermometer className="w-4.5 h-4.5" /> };
          case 3: return { title: 'Hydroponic Substrates', icon: <Sprout className="w-4.5 h-4.5" /> };
          default: return { title: `Feature ${idx + 1}`, icon: <CheckCircle className="w-4.5 h-4.5" /> };
        }
      case 'home-gardening':
        switch (idx) {
          case 0: return { title: 'Self-Watering Containers', icon: <Droplets className="w-4.5 h-4.5" /> };
          case 1: return { title: 'Living Green Walls', icon: <Layers className="w-4.5 h-4.5" /> };
          case 2: return { title: 'Premium Raised Beds', icon: <Settings className="w-4.5 h-4.5" /> };
          case 3: return { title: 'Smart App Irrigation', icon: <Smartphone className="w-4.5 h-4.5" /> };
          default: return { title: `Feature ${idx + 1}`, icon: <CheckCircle className="w-4.5 h-4.5" /> };
        }
      case 'fresh-produce':
        switch (idx) {
          case 0: return { title: 'Certified Organic Standards', icon: <ShieldCheck className="w-4.5 h-4.5" /> };
          case 1: return { title: 'Nutrient-Rich Mineral Feed', icon: <Activity className="w-4.5 h-4.5" /> };
          case 2: return { title: 'Full QR Code Traceability', icon: <QrCode className="w-4.5 h-4.5" /> };
          case 3: return { title: 'Cold-Chain Shipping', icon: <Truck className="w-4.5 h-4.5" /> };
          default: return { title: `Feature ${idx + 1}`, icon: <CheckCircle className="w-4.5 h-4.5" /> };
        }
      default:
        return { title: `Standard Deliverable ${idx + 1}`, icon: <CheckCircle className="w-4.5 h-4.5" /> };
    }
  };

  const getSubDetailIcon = (serviceId: string, sIdx: number, dIdx: number) => {
    if (serviceId === 'greenhouse') {
      if (sIdx === 0) {
        if (dIdx === 0) return <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        if (dIdx === 1) return <Wind className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        return <Layers className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      } else {
        if (dIdx === 0) return <Building2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        return <Leaf className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      }
    }
    if (serviceId === 'indoor-farming') {
      if (sIdx === 0) {
        if (dIdx === 0) return <Droplets className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        if (dIdx === 1) return <Activity className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        return <Grid className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      } else {
        if (dIdx === 0) return <Home className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        if (dIdx === 1) return <Settings className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        return <Droplets className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      }
    }
    if (serviceId === 'home-gardening') {
      if (sIdx === 0) {
        if (dIdx === 0) return <Smartphone className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        return <Sprout className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      } else {
        if (dIdx === 0) return <Layers className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        return <Activity className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      }
    }
    if (serviceId === 'fresh-produce') {
      if (dIdx === 0) return <Sprout className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      if (dIdx === 1) return <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      if (dIdx === 2) return <Activity className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      return <Leaf className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
    }
    return <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
  };

  const getServiceImage = (id: string) => {
    switch (id) {
      case 'greenhouse':
        return 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1600';
      case 'indoor-farming':
        return 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=1600';
      case 'home-gardening':
        return 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1600';
      case 'fresh-produce':
        return 'https://images.unsplash.com/photo-1610348725531-843dff163e2c?auto=format&fit=crop&q=80&w=1600';
      default:
        return 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1600';
    }
  };

  const handleEnquire = () => {
    onSelectProductForEnquiry(`Service: ${service.title}`);
    onNavigate('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeSub = service.subCategories?.[activeTier];
  const activeProc = service.process?.[activeStep];

  return (
    <div className="min-h-screen text-[#1F2321] py-12 px-6">
      <div className="w-full mx-auto">

        {/* CINEMATIC HERO */}
        <section className="relative rounded-3xl overflow-hidden mb-12 h-[440px] md:h-[540px] border border-white/40 shadow-xl shadow-emerald-900/10">
          <img
            src={getServiceImage(service.id)}
            alt={service.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/50 to-emerald-950/30" />

          {/* Back */}
          <button
            onClick={() => { onNavigate('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="absolute top-6 left-6 z-10 flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/25 px-4 py-2 text-xs font-semibold text-white/90 hover:bg-white/20 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Services
          </button>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 bottom-0 p-8 md:p-12"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 text-white mb-5">
              {getIcon(service.iconName)}
            </div>
            <h1 className="font-sans text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mb-4 max-w-3xl">
              {service.title}
            </h1>
            <p className="font-sans text-base md:text-lg text-white/85 font-light leading-relaxed max-w-2xl mb-6">
              {service.shortDesc}
            </p>
            <button
              onClick={handleEnquire}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-emerald-800 hover:bg-emerald-50 font-bold rounded-xl text-sm transition-all shadow-lg group"
            >
              Enquire About This Service
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </section>

        {/* Lead paragraph */}
        <div className="max-w-3xl mb-14">
          <p className="font-sans text-lg md:text-xl text-gray-600 font-light leading-relaxed">
            {service.fullDesc}
          </p>
        </div>

        {/* Core Deliverables */}
        <section className="mb-16">
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-8">
            Core Service Deliverables
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feature, idx) => {
              const meta = getFeatureMetadata(service.id, idx);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="glass rounded-2xl p-5 flex gap-4 items-start transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/5"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
                    {meta.icon}
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-bold text-gray-900 mb-1">{meta.title}</h4>
                    <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">{feature}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* INTERACTIVE TIERS */}
        {service.subCategories && service.subCategories.length > 0 && activeSub && (
          <section className="mb-16">
            <div className="mb-8">
              <span className="font-mono text-xs text-emerald-600 font-bold uppercase tracking-widest block mb-2">Choose Your Scale</span>
              <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight">
                Tailored Engagement Tiers
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Tier selector */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                {service.subCategories.map((sub, idx) => {
                  const on = idx === activeTier;
                  return (
                    <button
                      key={idx}
                      onMouseEnter={() => setActiveTier(idx)}
                      onClick={() => setActiveTier(idx)}
                      className={`flex items-center gap-3 w-full p-4 rounded-2xl border text-left transition-all duration-300 ${
                        on ? 'glass-green border-emerald-300/60 shadow-md shadow-emerald-900/5' : 'glass border-transparent hover:border-emerald-200/50'
                      }`}
                    >
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${on ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                        {idx === 0 ? <Zap className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                      </span>
                      <span className="font-sans text-sm font-bold text-gray-900">{sub.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tier detail */}
              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTier}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="glass rounded-3xl p-8 h-full shadow-xl shadow-emerald-900/5"
                  >
                    <h3 className="font-sans text-xl font-bold text-emerald-800 mb-2">{activeSub.name}</h3>
                    <p className="font-sans text-sm text-gray-600 font-medium mb-6">{activeSub.description}</p>
                    <div className="flex flex-col gap-4">
                      {activeSub.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex gap-3 items-start text-sm text-gray-600">
                          {getSubDetailIcon(service.id, activeTier, dIdx)}
                          <span className="font-sans leading-relaxed font-light">{detail}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleEnquire}
                      className="mt-8 text-xs text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1 group transition-colors"
                    >
                      Enquire For This Tier
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </section>
        )}

        {/* INTERACTIVE PROCESS STEPPER */}
        {service.process && service.process.length > 0 && activeProc && (
          <section className="glass-green rounded-3xl p-8 md:p-12 mb-16">
            <div className="mb-8">
              <span className="font-mono text-xs text-emerald-700 font-semibold uppercase tracking-wider block mb-2">Our Method</span>
              <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight">
                Process &amp; Deployment Steps
              </h2>
            </div>

            {/* Step nodes */}
            <div className="relative flex items-center justify-between mb-8">
              <div className="absolute left-5 right-5 top-5 h-0.5 bg-emerald-200" />
              <motion.div
                className="absolute left-5 top-5 h-0.5 bg-emerald-500"
                animate={{ width: `calc((100% - 40px) * ${activeStep / Math.max(1, service.process.length - 1)})` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
              {service.process.map((p, idx) => {
                const on = idx === activeStep;
                const done = idx < activeStep;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className="relative z-10 flex flex-col items-center gap-2 group"
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-full font-mono text-sm font-black transition-all duration-300 ${
                      on ? 'bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-600/30' : done ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-600 border border-emerald-200'
                    }`}>
                      {done ? <CheckCircle className="w-5 h-5" /> : p.step}
                    </span>
                    <span className={`hidden sm:block font-sans text-[11px] font-bold text-center max-w-[110px] leading-tight transition-colors ${on ? 'text-emerald-800' : 'text-gray-400'}`}>
                      {p.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active step detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl p-6 md:p-8 flex items-start gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-600/20">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-emerald-600">Step {activeProc.step}</span>
                    <span className="w-1 h-1 rounded-full bg-emerald-300" />
                    <h4 className="font-sans text-base font-bold text-gray-950">{activeProc.title}</h4>
                  </div>
                  <p className="font-sans text-sm text-gray-500 leading-relaxed font-light">{activeProc.description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </section>
        )}

        {/* Greenhouse Project Responsibility Matrix */}
        {serviceId === 'greenhouse' && (
          <section className="glass rounded-3xl p-8 md:p-12 shadow-sm mb-16">
            <div className="mb-6">
              <span className="font-mono text-xs text-emerald-600 font-bold uppercase tracking-widest block mb-2">
                Operational Framework
              </span>
              <h2 className="font-sans text-2xl font-bold text-gray-950 tracking-tight">
                Project Responsibility Matrix (DBOM Model)
              </h2>
              <p className="font-sans text-xs text-gray-500 font-light mt-1">
                Under our Design, Build, Operate, &amp; Maintain (DBOM) model, we streamline the entire lifecycle of your commercial greenhouse deployment.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 font-mono text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-4 px-6">Component</th>
                    <th className="py-4 px-6">Responsible Party</th>
                    <th className="py-4 px-6">Rationale &amp; Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="hover:bg-emerald-50/40 transition-colors">
                    <td className="py-4 px-6 font-sans font-bold text-gray-900">Land Preparations</td>
                    <td className="py-4 px-6 font-mono font-semibold text-emerald-700">AiGROW</td>
                    <td className="py-4 px-6 font-sans text-gray-500 font-light">Streamlines site preparations and development.</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/40 transition-colors">
                    <td className="py-4 px-6 font-sans font-bold text-gray-900">Facility Design &amp; Build</td>
                    <td className="py-4 px-6 font-mono font-semibold text-emerald-700">AiGROW</td>
                    <td className="py-4 px-6 font-sans text-gray-500 font-light">Ensures optimal layout and integration of technology.</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/40 transition-colors">
                    <td className="py-4 px-6 font-sans font-bold text-gray-900">Management &amp; Operation</td>
                    <td className="py-4 px-6 font-mono font-semibold text-emerald-700">AiGROW</td>
                    <td className="py-4 px-6 font-sans text-gray-500 font-light">Guarantees peak crop health, yield, and quality control.</td>
                  </tr>
                  <tr className="hover:bg-emerald-50/40 transition-colors">
                    <td className="py-4 px-6 font-sans font-bold text-gray-900">Capital Investment</td>
                    <td className="py-4 px-6 font-mono font-semibold text-blue-700">Client</td>
                    <td className="py-4 px-6 font-sans text-gray-500 font-light">Secures ownership of a high-performing asset.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Support highlights */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            { icon: ShieldCheck, title: 'Sovereign Integrity', desc: 'Assembled inside Sri Lanka under strict quality parameters.' },
            { icon: Calendar, title: 'Continuous Support', desc: 'Dedicated local agricultural consultants available to audit systems.' },
            { icon: Sparkles, title: '100% Pesticide Free', desc: 'Ensuring clean food safety and optimal nutrition on every flush.' }
          ].map((s, i) => (
            <div key={i} className="glass p-6 rounded-2xl shadow-xs text-center flex flex-col items-center transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-md shadow-emerald-600/20">
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-2">{s.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-light">{s.desc}</p>
            </div>
          ))}
        </section>

        {/* Shared CTA */}
        <CTABanner onNavigate={onNavigate} />

      </div>
    </div>
  );
}
