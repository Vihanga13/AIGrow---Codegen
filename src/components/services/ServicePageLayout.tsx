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

  const getIcon = (iconName: string, cls = 'w-6 h-6') => {
    switch (iconName) {
      case 'Home': return <Home className={cls} />;
      case 'Layers': return <Layers className={cls} />;
      case 'Leaf': return <Leaf className={cls} />;
      case 'Sparkles': return <Sparkles className={cls} />;
      default: return <Leaf className={cls} />;
    }
  };

  const getFeatureMetadata = (id: string, idx: number) => {
    switch (id) {
      case 'greenhouse':
        return [
          { title: 'Custom Structural Design', icon: <Wrench className="w-4.5 h-4.5" /> },
          { title: 'Ventilation & Thermal Control', icon: <Wind className="w-4.5 h-4.5" /> },
          { title: 'Fertigation & Drip Systems', icon: <Droplets className="w-4.5 h-4.5" /> },
          { title: 'Remote IoT Telemetry', icon: <Cpu className="w-4.5 h-4.5" /> }
        ][idx] ?? { title: `Feature ${idx + 1}`, icon: <CheckCircle className="w-4.5 h-4.5" /> };
      case 'indoor-farming':
        return [
          { title: 'Vertical Stack Layout', icon: <Grid className="w-4.5 h-4.5" /> },
          { title: 'LED Grow Spectrum', icon: <Lightbulb className="w-4.5 h-4.5" /> },
          { title: 'Fogging & Humidity Controls', icon: <Thermometer className="w-4.5 h-4.5" /> },
          { title: 'Hydroponic Substrates', icon: <Sprout className="w-4.5 h-4.5" /> }
        ][idx] ?? { title: `Feature ${idx + 1}`, icon: <CheckCircle className="w-4.5 h-4.5" /> };
      case 'home-gardening':
        return [
          { title: 'Self-Watering Containers', icon: <Droplets className="w-4.5 h-4.5" /> },
          { title: 'Living Green Walls', icon: <Layers className="w-4.5 h-4.5" /> },
          { title: 'Premium Raised Beds', icon: <Settings className="w-4.5 h-4.5" /> },
          { title: 'Smart App Irrigation', icon: <Smartphone className="w-4.5 h-4.5" /> }
        ][idx] ?? { title: `Feature ${idx + 1}`, icon: <CheckCircle className="w-4.5 h-4.5" /> };
      case 'fresh-produce':
        return [
          { title: 'Certified Organic Standards', icon: <ShieldCheck className="w-4.5 h-4.5" /> },
          { title: 'Nutrient-Rich Mineral Feed', icon: <Activity className="w-4.5 h-4.5" /> },
          { title: 'Full QR Code Traceability', icon: <QrCode className="w-4.5 h-4.5" /> },
          { title: 'Cold-Chain Shipping', icon: <Truck className="w-4.5 h-4.5" /> }
        ][idx] ?? { title: `Feature ${idx + 1}`, icon: <CheckCircle className="w-4.5 h-4.5" /> };
      default:
        return { title: `Deliverable ${idx + 1}`, icon: <CheckCircle className="w-4.5 h-4.5" /> };
    }
  };

  const getSubDetailIcon = (id: string, sIdx: number, dIdx: number) => {
    if (id === 'greenhouse') {
      if (sIdx === 0) return [<ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />, <Wind className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />][dIdx] ?? <Layers className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      return [<Building2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />][dIdx] ?? <Leaf className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
    }
    if (id === 'indoor-farming') {
      if (sIdx === 0) return [<Droplets className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />, <Activity className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />][dIdx] ?? <Grid className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      return [<Home className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />, <Settings className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />][dIdx] ?? <Droplets className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
    }
    if (id === 'home-gardening') {
      if (sIdx === 0) return [<Smartphone className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />][dIdx] ?? <Sprout className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      return [<Layers className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />][dIdx] ?? <Activity className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
    }
    return [<Sprout className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />, <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />, <Activity className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />][dIdx] ?? <Leaf className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
  };

  const getServiceImage = (id: string) => {
    switch (id) {
      case 'greenhouse': return 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1400';
      case 'indoor-farming': return 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=1400';
      case 'home-gardening': return 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1400';
      case 'fresh-produce': return 'https://images.unsplash.com/photo-1610348725531-843dff163e2c?auto=format&fit=crop&q=80&w=1400';
      default: return 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1400';
    }
  };

  const handleEnquire = () => {
    onSelectProductForEnquiry(`Service: ${service.title}`);
    onNavigate('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activeSub = service.subCategories?.[activeTier];
  const activeProc = service.process?.[activeStep];

  // Section nav (built from what this service actually has)
  const navSections = [
    { id: 'overview', label: 'Overview' },
    { id: 'deliverables', label: 'Deliverables' },
    ...(service.subCategories && service.subCategories.length ? [{ id: 'tiers', label: 'Engagement Tiers' }] : []),
    ...(service.process && service.process.length ? [{ id: 'process', label: 'Our Process' }] : []),
    ...(serviceId === 'greenhouse' ? [{ id: 'matrix', label: 'DBOM Model' }] : [])
  ];

  const facts = [
    { icon: ShieldCheck, text: 'Locally engineered & assembled in Sri Lanka' },
    { icon: Calendar, text: 'Continuous agronomic support & auditing' },
    { icon: Sparkles, text: '100% pesticide-free growing outcomes' }
  ];

  return (
    <div className="min-h-screen text-[#1F2321] py-12 px-6">
      <div className="w-full mx-auto">

        {/* Back */}
        <button
          onClick={() => { onNavigate('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="group mb-8 flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-emerald-600"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Services
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* STICKY SIDEBAR */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-600/25">
                {getIcon(service.iconName, 'w-7 h-7')}
              </div>
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-600">AiGROW Service</span>
                <h1 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight text-gray-950 leading-tight mt-1">
                  {service.title}
                </h1>
              </div>
              <p className="font-sans text-base italic font-medium text-emerald-800 leading-relaxed">
                {service.shortDesc}
              </p>

              {/* Quick facts */}
              <div className="glass rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
                {facts.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <f.icon className="h-4 w-4" />
                    </span>
                    <span className="font-sans text-xs text-gray-600 font-light leading-relaxed pt-1">{f.text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleEnquire}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 text-sm transition-all shadow-md shadow-emerald-600/15 group"
              >
                Enquire About This Service
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Section nav */}
              <nav className="hidden lg:flex flex-col border-l border-gray-200/70 pl-4 mt-2">
                {navSections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToId(s.id)}
                    className="group flex items-center gap-2 py-2 text-left font-sans text-sm font-medium text-gray-500 transition-colors hover:text-emerald-600"
                  >
                    <span className="h-px w-4 bg-gray-300 transition-all group-hover:w-6 group-hover:bg-emerald-500" />
                    {s.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* CONTENT */}
          <div className="lg:col-span-8 flex flex-col gap-14">

            {/* Hero image */}
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/50 shadow-xl shadow-emerald-900/5">
              <img src={getServiceImage(service.id)} alt={service.title} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent" />
            </div>

            {/* Overview */}
            <section id="overview" className="scroll-mt-28">
              <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-4">Overview</h2>
              <p className="font-sans text-lg text-gray-600 font-light leading-relaxed">{service.fullDesc}</p>
            </section>

            {/* Deliverables */}
            <section id="deliverables" className="scroll-mt-28">
              <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-6">Core Deliverables</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feature, idx) => {
                  const meta = getFeatureMetadata(service.id, idx);
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
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

            {/* Interactive tiers */}
            {service.subCategories && service.subCategories.length > 0 && activeSub && (
              <section id="tiers" className="scroll-mt-28">
                <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-6">Tailored Engagement Tiers</h2>
                <div className="flex flex-wrap gap-2 mb-5">
                  {service.subCategories.map((sub, idx) => {
                    const on = idx === activeTier;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveTier(idx)}
                        className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                          on ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/15' : 'glass text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {idx === 0 ? <Zap className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                        {sub.name}
                      </button>
                    );
                  })}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTier}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="glass rounded-3xl p-8 shadow-xl shadow-emerald-900/5"
                  >
                    <p className="font-sans text-sm text-gray-600 font-medium mb-6">{activeSub.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeSub.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex gap-3 items-start text-sm text-gray-600">
                          {getSubDetailIcon(service.id, activeTier, dIdx)}
                          <span className="font-sans leading-relaxed font-light">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </section>
            )}

            {/* Interactive process stepper */}
            {service.process && service.process.length > 0 && activeProc && (
              <section id="process" className="scroll-mt-28 glass-green rounded-3xl p-8 md:p-10">
                <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-8">Process &amp; Deployment</h2>
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
                      <button key={idx} onClick={() => setActiveStep(idx)} className="relative z-10 flex flex-col items-center gap-2">
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
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="glass rounded-2xl p-6 flex items-start gap-4"
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

            {/* DBOM matrix */}
            {serviceId === 'greenhouse' && (
              <section id="matrix" className="scroll-mt-28 glass rounded-3xl p-8 md:p-10 shadow-sm">
                <span className="font-mono text-xs text-emerald-600 font-bold uppercase tracking-widest block mb-2">Operational Framework</span>
                <h2 className="font-sans text-2xl font-bold text-gray-950 tracking-tight mb-6">Project Responsibility Matrix (DBOM)</h2>
                <div className="overflow-x-auto rounded-2xl border border-gray-100">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 font-mono text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-4 px-6">Component</th>
                        <th className="py-4 px-6">Responsible</th>
                        <th className="py-4 px-6">Outcome</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {[
                        ['Land Preparations', 'AiGROW', 'Streamlines site preparations and development.'],
                        ['Facility Design & Build', 'AiGROW', 'Ensures optimal layout and technology integration.'],
                        ['Management & Operation', 'AiGROW', 'Guarantees peak crop health, yield, and quality.'],
                        ['Capital Investment', 'Client', 'Secures ownership of a high-performing asset.']
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-emerald-50/40 transition-colors">
                          <td className="py-4 px-6 font-sans font-bold text-gray-900">{row[0]}</td>
                          <td className={`py-4 px-6 font-mono font-semibold ${row[1] === 'Client' ? 'text-blue-700' : 'text-emerald-700'}`}>{row[1]}</td>
                          <td className="py-4 px-6 font-sans text-gray-500 font-light">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Shared CTA */}
        <CTABanner onNavigate={onNavigate} />

      </div>
    </div>
  );
}
