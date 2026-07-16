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
import Reveal from '../Reveal';

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

  const facts = [
    { icon: ShieldCheck, text: 'Locally engineered & assembled in Sri Lanka' },
    { icon: Calendar, text: 'Continuous agronomic support & auditing' },
    { icon: Sparkles, text: '100% pesticide-free growing outcomes' }
  ];

  return (
    <div className="min-h-screen text-[#1F2321] py-12 px-6">
      <div className="max-w-[96rem] mx-auto">

        {/* Back */}
        <button
          onClick={() => { onNavigate('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="group mb-8 flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-emerald-600"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Services
        </button>

        {/* Header */}
        <div className="flex flex-col gap-5 mb-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-600/25">
            {getIcon(service.iconName, 'w-7 h-7')}
          </div>
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-600">AiGROW Service</span>
            <h1 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950 leading-tight mt-1">
              {service.title}
            </h1>
          </div>
          <p className="font-sans text-lg italic font-medium text-emerald-800 leading-relaxed max-w-2xl">
            {service.shortDesc}
          </p>
          <button
            onClick={handleEnquire}
            className="w-fit flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3.5 text-sm transition-all shadow-md shadow-emerald-600/15 group"
          >
            Enquire About This Service
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Hero image */}
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl shadow-emerald-900/5 mb-6">
          <img src={getServiceImage(service.id)} alt={service.title} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent" />
        </div>

        {/* Quick facts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-14">
          {facts.map((f, i) => (
            <div key={i} className="glass rounded-2xl p-4 flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <f.icon className="h-4 w-4" />
              </span>
              <span className="font-sans text-xs text-gray-600 font-light leading-relaxed pt-0.5">{f.text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-14">
          {/* Overview */}
          <section>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-4">Overview</h2>
            <p className="font-sans text-lg text-gray-600 font-light leading-relaxed">{service.fullDesc}</p>
          </section>

          {/* Deliverables */}
          <section>
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-6">Core Deliverables</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features.map((feature, idx) => {
                const meta = getFeatureMetadata(service.id, idx);
                return (
                  <Reveal key={idx} delay={(idx % 2) * 0.06} className="glass rounded-2xl p-5 flex gap-4 items-start h-full">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
                      {meta.icon}
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-bold text-gray-900 mb-1">{meta.title}</h4>
                      <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">{feature}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>

          {/* Engagement tiers — stacked cards */}
          {service.subCategories && service.subCategories.length > 0 && (
            <section>
              <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-6">Tailored Engagement Tiers</h2>
              <div className="flex flex-col gap-4">
                {service.subCategories.map((sub, sIdx) => (
                  <div key={sIdx} className="glass rounded-3xl p-6 md:p-7">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white font-mono text-sm font-bold shrink-0">
                        {sIdx + 1}
                      </span>
                      <h3 className="font-sans text-lg font-bold text-gray-950">{sub.name}</h3>
                    </div>
                    <p className="font-sans text-sm text-gray-600 font-light mb-5 leading-relaxed">{sub.description}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {sub.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex gap-3 items-start text-sm text-gray-600">
                          {getSubDetailIcon(service.id, sIdx, dIdx)}
                          <span className="font-sans leading-relaxed font-light">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Process — plain numbered list */}
          {service.process && service.process.length > 0 && (
            <section>
              <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight mb-6">Process &amp; Deployment</h2>
              <ol className="flex flex-col">
                {service.process.map((p, idx) => (
                  <li key={idx} className="flex gap-4 pb-6 last:pb-0">
                    <div className="flex flex-col items-center shrink-0">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white font-mono text-sm font-black">
                        {p.step}
                      </span>
                      {idx < service.process!.length - 1 && <span className="w-0.5 grow bg-emerald-100 mt-2" />}
                    </div>
                    <div className="pb-2">
                      <h4 className="font-sans text-base font-bold text-gray-950 mb-1">{p.title}</h4>
                      <p className="font-sans text-sm text-gray-500 leading-relaxed font-light">{p.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* DBOM matrix */}
          {serviceId === 'greenhouse' && (
            <section className="glass rounded-3xl p-6 md:p-8">
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

        {/* Shared CTA */}
        <CTABanner onNavigate={onNavigate} />

      </div>
    </div>
  );
}
