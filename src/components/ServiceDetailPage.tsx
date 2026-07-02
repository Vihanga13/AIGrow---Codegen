import { PageId } from '../types';
import { SERVICES_DATA } from '../data';
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
import CTABanner from './CTABanner';

interface ServiceDetailPageProps {
  serviceId: 'greenhouse' | 'indoor-farming' | 'home-gardening' | 'fresh-produce';
  onNavigate: (pageId: PageId) => void;
  onSelectProductForEnquiry: (productName: string) => void;
}

export default function ServiceDetailPage({
  serviceId,
  onNavigate,
  onSelectProductForEnquiry
}: ServiceDetailPageProps) {
  const service = SERVICES_DATA.find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#FAFAFA] text-gray-950 p-6">
        <h2 className="text-xl font-bold mb-4">Service Not Found</h2>
        <button onClick={() => onNavigate('services')} className="px-5 py-2 bg-emerald-600 text-white rounded-lg">
          Back to Services
        </button>
      </div>
    );
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return <Home className="w-8 h-8" />;
      case 'Layers': return <Layers className="w-8 h-8" />;
      case 'Leaf': return <Leaf className="w-8 h-8" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8" />;
      default: return <Leaf className="w-8 h-8" />;
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
      if (sIdx === 0) { // Commercial
        if (dIdx === 0) return <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        if (dIdx === 1) return <Wind className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        return <Layers className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      } else { // Individual
        if (dIdx === 0) return <Building2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        return <Leaf className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      }
    }
    if (serviceId === 'indoor-farming') {
      if (sIdx === 0) { // Mushrooms
        if (dIdx === 0) return <Droplets className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        if (dIdx === 1) return <Activity className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        return <Grid className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      } else { // Containers
        if (dIdx === 0) return <Home className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        if (dIdx === 1) return <Settings className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        return <Droplets className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      }
    }
    if (serviceId === 'home-gardening') {
      if (sIdx === 0) { // Residential
        if (dIdx === 0) return <Smartphone className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        return <Sprout className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      } else { // Commercial landscaping
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

  // Specific custom images to match the design
  const getServiceImage = (id: string) => {
    switch (id) {
      case 'greenhouse':
        return 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1200';
      case 'indoor-farming':
        return 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=1200';
      case 'home-gardening':
        return 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200';
      case 'fresh-produce':
        return 'https://images.unsplash.com/photo-1610348725531-843dff163e2c?auto=format&fit=crop&q=80&w=1200';
      default:
        return 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1200';
    }
  };

  const handleEnquire = () => {
    onSelectProductForEnquiry(`Service: ${service.title}`);
    onNavigate('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-[#1F2321] py-12 px-6">
      <div className="w-full mx-auto">
        
        {/* Breadcrumb / Back button */}
        <div className="mb-8">
          <button 
            onClick={() => onNavigate('services')}
            className="group flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Services Overview
          </button>
        </div>

        {/* Hero split layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              {getIcon(service.iconName)}
            </div>
            
            <h1 className="font-sans text-4xl sm:text-5xl font-extrabold text-gray-950 tracking-tight leading-none">
              {service.title}
            </h1>
            
            <p className="font-sans text-lg text-emerald-800 font-medium leading-relaxed">
              {service.shortDesc}
            </p>

            <p className="font-sans text-gray-600 leading-relaxed font-light text-base">
              {service.fullDesc}
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <button 
                onClick={handleEnquire}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-emerald-600/10 flex items-center gap-2"
              >
                Enquire About This Service
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-emerald-50">
              <img 
                src={getServiceImage(service.id)} 
                alt={service.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Core Deliverables / Highlights list */}
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm mb-16">
          <h2 className="font-sans text-2xl font-bold text-gray-900 tracking-tight mb-8">
            Core Service Deliverables
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((feature, idx) => {
              const meta = getFeatureMetadata(service.id, idx);
              return (
                <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl bg-gray-50/50 border border-gray-100/50 hover:bg-emerald-50/20 hover:border-emerald-100/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100/50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    {meta.icon}
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-semibold text-gray-900 mb-1">{meta.title}</h4>
                    <p className="font-sans text-xs text-gray-500 leading-relaxed">{feature}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Subcategories/Tiers if any */}
        {service.subCategories && service.subCategories.length > 0 && (
          <section className="mb-16">
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <h2 className="font-sans text-3xl font-extrabold text-gray-950 tracking-tight mb-3">
                Tailored Engagement Tiers
              </h2>
              <p className="font-sans text-sm text-gray-500 font-light">
                We design specialized solutions scaled perfectly to meet the demands of both commercial giants and domestic smallholders.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {service.subCategories.map((sub, sIdx) => (
                <div 
                  key={sIdx}
                  className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-4">
                      {sIdx === 0 ? <Zap className="w-3.5 h-3.5" /> : <Users className="w-3.5 h-3.5" />}
                      {sub.name}
                    </div>
                    <p className="font-sans text-sm text-gray-600 font-medium mb-6">
                      {sub.description}
                    </p>

                    <div className="flex flex-col gap-4">
                      {sub.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex gap-3 items-start text-xs text-gray-600">
                          {getSubDetailIcon(service.id, sIdx, dIdx)}
                          <span className="font-sans leading-relaxed">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-50">
                    <button 
                      onClick={handleEnquire}
                      className="text-xs text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1 group transition-colors"
                    >
                      Enquire For This Tier
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Process steps / standard timeline */}
        {service.process && service.process.length > 0 && (
          <section className="bg-emerald-50 rounded-3xl p-8 md:p-12 border border-emerald-100/50 mb-16">
            <div className="mb-10">
              <span className="font-mono text-xs text-emerald-700 font-semibold uppercase tracking-wider block mb-2">Our Method</span>
              <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-950 tracking-tight">
                Process & Deployment Steps
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((pStep, pIdx) => (
                <div key={pIdx} className="bg-white rounded-2xl p-6 border border-emerald-100/30 shadow-xs relative">
                  <span className="absolute top-4 right-4 font-mono text-3xl font-extrabold text-emerald-100 leading-none">
                    {pStep.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                    <Settings className="w-5 h-5" />
                  </div>
                  <h4 className="font-sans text-sm font-bold text-gray-950 mb-2">{pStep.title}</h4>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">{pStep.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Greenhouse Project Responsibility Matrix */}
        {serviceId === 'greenhouse' && (
          <section className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm mb-16">
            <div className="mb-6">
              <span className="font-mono text-xs text-emerald-600 font-bold uppercase tracking-widest block mb-2">
                Operational Framework
              </span>
              <h2 className="font-sans text-2xl font-bold text-gray-950 tracking-tight">
                Project Responsibility Matrix (DBOM Model)
              </h2>
              <p className="font-sans text-xs text-gray-500 font-light mt-1">
                Under our Design, Build, Operate, & Maintain (DBOM) model, we streamline the entire lifecycle of your commercial greenhouse deployment.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 font-mono text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-4 px-6">Component</th>
                    <th className="py-4 px-6">Responsible Party</th>
                    <th className="py-4 px-6">Rationale & Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-sans font-bold text-gray-900">Land Preparations</td>
                    <td className="py-4 px-6 font-mono font-semibold text-emerald-700">AiGROW</td>
                    <td className="py-4 px-6 font-sans text-gray-500 font-light">Streamlines site preparations and development.</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-sans font-bold text-gray-900">Facility Design & Build</td>
                    <td className="py-4 px-6 font-mono font-semibold text-emerald-700">AiGROW</td>
                    <td className="py-4 px-6 font-sans text-gray-500 font-light">Ensures optimal layout and integration of technology.</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-sans font-bold text-gray-900">Management & Operation</td>
                    <td className="py-4 px-6 font-mono font-semibold text-emerald-700">AiGROW</td>
                    <td className="py-4 px-6 font-sans text-gray-500 font-light">Guarantees peak crop health, yield, and quality control.</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-sans font-bold text-gray-900">Capital Investment</td>
                    <td className="py-4 px-6 font-mono font-semibold text-blue-700">Client</td>
                    <td className="py-4 px-6 font-sans text-gray-500 font-light">Secures ownership of a high-performing asset.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Support section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-2">Sovereign Integrity</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-light">Assembled inside Sri Lanka under strict quality parameters.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-2">Continuous Support</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-light">Dedicated local agricultural consultants available to audit systems.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-2">100% Pesticide Free</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-light">Ensuring clean food safety and optimal nutrition on every flush.</p>
          </div>
        </section>

        {/* Shared CTA */}
        <CTABanner onNavigate={onNavigate} />

      </div>
    </div>
  );
}
