import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Leaf,
  Cpu,
  Thermometer,
  Droplet,
  CheckCircle,
  Award,
  Building2,
  Layers,
  Sprout,
  Sparkles,
  TrendingUp,
  Zap,
  RefreshCw,
  LineChart,
  ShieldCheck,
  Users,
  Medal,
  Trophy,
  Star
} from 'lucide-react';
import { PageId } from '../types';
import { SERVICES_DATA, PROJECTS_DATA } from '../data';
import StatsCounter from './StatsCounter';
import Reveal from './Reveal';
import GreenhouseSimulator from './GreenhouseSimulator';

const HERO_SLIDES = [
  {
    subtitle: 'SMART GREENHOUSE CO.',
    titleLeft: 'AiGROW',
    titleRight: 'FARMS',
    desc: 'There is a moment in the growth of every seed when technology meets nature. We design hyper-efficient circular ecosystems to feed Sri Lanka sustainably.',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-watering-greenhouse-plants-with-a-sprinkler-42336-large.mp4'
  },
  {
    subtitle: 'CIRCULAR ECOSYSTEMS',
    titleLeft: 'ZERO',
    titleRight: 'WASTE',
    desc: "Engineering closed-loop agricultural projects where waste becomes nutrients. Our smart systems maximize yield while preserving Sri Lanka's beautiful resources.",
    video: 'https://assets.mixkit.co/videos/preview/mixkit-organic-vegetables-in-a-greenhouse-42335-large.mp4'
  },
  {
    subtitle: 'IoT & AUTOMATION',
    titleLeft: 'CLOUD',
    titleRight: 'CROPS',
    desc: 'Continuous real-time optimization powered by IoT sensors, precision irrigation, and intelligent crop monitoring algorithms built for climate resilience.',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-smart-agriculture-technology-and-drone-monitoring-42352-large.mp4'
  }
];

const SERVICE_IMAGES: Record<string, string> = {
  greenhouse: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1200',
  'indoor-farming': 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=1200',
  'home-gardening': 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200',
  'fresh-produce': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200'
};

interface HomeViewProps {
  onNavigate: (pageId: PageId) => void;
  onSelectService: (serviceId: string) => void;
  onSelectProject: (projectId: string) => void;
  onSelectProductForEnquiry?: (productName: string) => void;
}

export default function HomeView({
  onNavigate,
  onSelectService,
  onSelectProject,
  onSelectProductForEnquiry
}: HomeViewProps) {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [selectedBuild, setSelectedBuild] = useState<number | null>(null);

  // Price calculator state
  const [calcType, setCalcType] = useState<'greenhouse' | 'vertical' | 'domestic'>('greenhouse');
  const [calcSize, setCalcSize] = useState<number>(5000);
  const [calcAddons, setCalcAddons] = useState({
    climate: true,
    fertigation: true,
    humidifier: false,
    moisture: true,
    growLights: false
  });

  // Auto-advance hero slides
  useEffect(() => {
    const id = setInterval(() => setCurrentSlideIdx((p) => (p + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);

  const getCalcDetails = () => {
    let baseRate = 1250;
    let label = 'Commercial Greenhouse Structure';
    let sizeMin = 1000;
    let sizeMax = 50000;
    let sizeStep = 500;

    if (calcType === 'vertical') {
      baseRate = 4800;
      label = 'Indoor Vertical Farm Layout';
      sizeMin = 100;
      sizeMax = 10000;
      sizeStep = 100;
    } else if (calcType === 'domestic') {
      baseRate = 850;
      label = 'Urban / Home Gardening Setup';
      sizeMin = 50;
      sizeMax = 2000;
      sizeStep = 50;
    }

    const baseCost = calcSize * baseRate;
    const climateCost = calcAddons.climate ? 185000 : 0;
    const fertigationCost = calcAddons.fertigation ? 840000 : 0;
    const humidifierCost = calcAddons.humidifier ? 64000 : 0;
    const moistureCost = calcAddons.moisture ? 28000 : 0;
    const lightsNeeded = calcType === 'vertical' ? Math.ceil(calcSize / 50) : Math.ceil(calcSize / 200);
    const growLightsCost = calcAddons.growLights ? lightsNeeded * 38500 : 0;
    const addonsCost = climateCost + fertigationCost + humidifierCost + moistureCost + growLightsCost;
    const totalCost = baseCost + addonsCost;

    return { baseRate, label, sizeMin, sizeMax, sizeStep, baseCost, climateCost, fertigationCost, humidifierCost, moistureCost, growLightsCost, addonsCost, totalCost, lightsNeeded };
  };

  const calcDetails = getCalcDetails();

  const handleInquireEstimate = () => {
    const typeLabel = calcType === 'greenhouse' ? 'Turnkey Greenhouse' : calcType === 'vertical' ? 'Indoor Vertical Farming' : 'Home Gardening';
    const activeAddonsText = Object.entries(calcAddons)
      .filter(([, val]) => val)
      .map(([key]) => {
        if (key === 'climate') return 'Smart Climate Control (LKR 185,000)';
        if (key === 'fertigation') return 'Precision Fertigation System (LKR 840,000)';
        if (key === 'humidifier') return 'Automated Humidifier (LKR 64,000)';
        if (key === 'moisture') return 'Soil Moisture Sensor Pack (LKR 28,000)';
        if (key === 'growLights') return `Smart LED Grow Lights (${calcDetails.lightsNeeded} units - LKR ${calcDetails.growLightsCost.toLocaleString()})`;
        return key;
      })
      .join(', ');

    const quoteDetails = `Project Estimate: ${typeLabel} (${calcSize.toLocaleString()} sq ft)
- Base Structural Cost: LKR ${calcDetails.baseCost.toLocaleString()} (at LKR ${calcDetails.baseRate}/sq ft)
- Selected Equipment Add-ons: ${activeAddonsText || 'None'}
- Equipment Cost Total: LKR ${calcDetails.addonsCost.toLocaleString()}
- Estimated Setup Investment: LKR ${calcDetails.totalCost.toLocaleString()} (approximate setup, subject to physical site audit)`;

    if (onSelectProductForEnquiry) {
      onSelectProductForEnquiry(quoteDetails);
      onNavigate('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'greenhouse': return <Building2 className="w-5 h-5" />;
      case 'indoor-farming': return <Layers className="w-5 h-5" />;
      case 'home-gardening': return <Sprout className="w-5 h-5" />;
      case 'fresh-produce': return <Sparkles className="w-5 h-5" />;
      default: return <Leaf className="w-5 h-5" />;
    }
  };

  const advantages = [
    { title: 'Higher yields with lower resource use', desc: 'Accelerated growth cycles deliver up to 3x yield compared to open-field systems.', icon: TrendingUp, stat: '3×', statLabel: 'Yield vs. open field' },
    { title: 'Water- and energy-efficient systems', desc: 'Precision sensor feedback loops save over 85% water and 40% energy.', icon: Zap, stat: '85%', statLabel: 'Less water used' },
    { title: 'Designed for circular economy principles', desc: 'Integrating upcycled local coconut husk substrates (coco-peat) and energy recovery loops.', icon: RefreshCw, stat: '100%', statLabel: 'Circular coco-peat media' },
    { title: 'Data-driven decision making', desc: 'No guesswork. Continuous sensor logs feed automated adjustments and predictive feeding curves.', icon: LineChart, stat: '24/7', statLabel: 'Live sensor decisions' },
    { title: 'Climate-resilient and scalable', desc: 'Solid protective structures shield crops from severe regional weather shifts.', icon: ShieldCheck, stat: '365d', statLabel: 'Year-round harvests' }
  ];

  const technologies = [
    { icon: Cpu, title: 'IoT Sensor Networks', description: 'Real-time tracking of soil moisture, humidity, and nutrient levels.' },
    { icon: Thermometer, title: 'Climate Control', description: 'Control over Temperature, Humidity, CO2, Automated venting, shading, and cooling that reacts to local weather shifts instantly.' },
    { icon: Droplet, title: 'Precision Fertigation', description: 'Smart systems that deliver the exact drop of water and nutrient needed, zero waste, maximum growth.' }
  ];

  const missionPillars = [
    { label: 'Improve Productivity', icon: TrendingUp, desc: 'Smart, data-driven systems that lift yields per acre while cutting waste and guesswork.' },
    { label: 'Protect the Environment', icon: Leaf, desc: 'Circular, low-input methods that conserve water, reduce chemicals, and restore soil health.' },
    { label: 'Uplift Livelihoods', icon: Users, desc: 'Technology and training that grow farmer incomes and strengthen rural communities.' }
  ];

  const keywords = ['IoT-Enabled Systems', 'Climate-Smart', 'Circular Economy', '100% Pesticide-Free', 'Data-Driven', 'Rooted in Sri Lanka', 'Precision Fertigation', 'Built for Tomorrow'];

  const awards = [
    { year: '2018', org: 'E-Swabhimani Awards', title: 'Digital Social Impact', desc: 'National recognition for technology creating measurable social good across Sri Lankan agriculture.', icon: Medal },
    { year: '2024', org: 'SLASSCOM National', title: '1st Runner-up · Best Innovative Product in Agritech', desc: 'Among the nation’s most innovative technology products for our precision agritech platform.', icon: Trophy },
    { year: '2025', org: 'AI Excellence Awards', title: 'Pioneering AI Solutions for Agricultural Productivity', desc: 'Awarded for advancing AI-driven crop management and data-led productivity gains for growers.', icon: Star }
  ];

  const slide = HERO_SLIDES[currentSlideIdx];

  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* 1. HERO — single clean statement over cinematic video */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center bg-gray-950 text-white overflow-hidden">
        {HERO_SLIDES.map((s, idx) => (
          <motion.video
            key={idx}
            autoPlay
            loop
            muted
            playsInline
            initial={false}
            animate={{ opacity: currentSlideIdx === idx ? 1 : 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={s.video} type="video/mp4" />
          </motion.video>
        ))}
        <div className="absolute inset-0 bg-gray-950/70" />

        <div className="relative z-10 w-full max-w-3xl px-6 text-center flex flex-col items-center">
          <motion.div
            key={`sub-${currentSlideIdx}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-[0.3em] text-emerald-300 uppercase font-bold mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {slide.subtitle}
          </motion.div>

          <motion.h1
            key={`title-${currentSlideIdx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.9]"
          >
            {slide.titleLeft} <span className="text-emerald-400">{slide.titleRight}</span>
          </motion.h1>

          <motion.p
            key={`desc-${currentSlideIdx}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl font-sans text-sm sm:text-base text-gray-200 font-light leading-relaxed"
          >
            {slide.desc}
          </motion.p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button
              id="hero-split-cta"
              onClick={() => { onNavigate('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-colors flex items-center gap-2 group"
            >
              Explore Our Services
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white rounded-xl text-sm font-bold transition-colors"
            >
              Start a Project
            </button>
          </div>

          {/* Slide dots */}
          <div className="mt-10 flex items-center gap-2.5">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIdx(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${currentSlideIdx === idx ? 'w-7 bg-emerald-400' : 'w-1.5 bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <Reveal className="lg:col-span-7">
            <div className="text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold mb-4">
              Corporate Overview
            </div>
            <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-gray-950 leading-[1.15]">
              Where Innovation Meets <span className="text-emerald-600">Sustainability</span>
            </h2>
            <p className="mt-6 font-sans text-base md:text-lg text-gray-600 leading-relaxed font-light">
              AiGROW is a sustainable agri-tech company dedicated to transforming how Sri Lanka grows its food. Backed by deep technological expertise and a strong commitment to environmental responsibility, we design innovative, scalable, and eco-friendly agricultural solutions that empower farmers, businesses, and communities across the island.
            </p>
            <p className="mt-4 font-sans text-lg text-gray-900 font-semibold">
              We don't just grow crops, we grow resilient ecosystems.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 grid grid-cols-2 gap-3">
            {[
              { icon: Award, target: 8, suffix: '+', label: 'Years of experience', sub: 'Since 2018' },
              { icon: Users, target: 220, suffix: '+', label: 'Customers served' },
              { icon: Building2, target: 10, suffix: '+', label: 'Projects delivered' },
              { icon: Leaf, text: 'CodeGen', label: 'A proud subsidiary' }
            ].map((f, i) => (
              <div key={i} className="glass rounded-2xl p-5 flex flex-col gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <f.icon className="h-5 w-5" />
                </span>
                {'target' in f && typeof f.target === 'number' ? (
                  <div className="[&>div]:text-3xl [&>div]:md:text-4xl">
                    <StatsCounter target={f.target} suffix={f.suffix} />
                  </div>
                ) : (
                  <div className="font-mono text-2xl md:text-3xl font-semibold text-emerald-600 tracking-tight">{f.text}</div>
                )}
                <span className="font-sans text-[11px] text-gray-500 font-medium leading-tight">
                  {f.label}
                  {f.sub && <span className="block text-gray-400 font-light">{f.sub}</span>}
                </span>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Capability keywords */}
        <div className="max-w-6xl mx-auto mt-12 flex flex-wrap justify-center gap-2.5">
          {keywords.map((k) => (
            <span key={k} className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 font-sans text-sm font-semibold text-gray-700">
              <Leaf className="h-3.5 w-3.5 text-emerald-500" />
              {k}
            </span>
          ))}
        </div>
      </section>

      {/* 3. OUR MISSION */}
      <section className="py-20 px-6 bg-emerald-50/30">
        <div className="max-w-6xl mx-auto">
          <Reveal className="max-w-3xl mb-12">
            <div className="text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold mb-3">
              Our True North
            </div>
            <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-gray-950 mb-6">
              Transforming Sri Lankan Food Security
            </h2>
            <blockquote className="border-l-4 border-emerald-500 pl-4 font-sans text-lg italic text-emerald-800 font-medium">
              "To strengthen Sri Lanka's food systems through smart, sustainable, and circular agricultural innovations that improve productivity, protect the environment, and uplift local livelihoods."
            </blockquote>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {missionPillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.label} delay={i * 0.08} className="glass rounded-2xl p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white mb-4">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-sans text-base font-bold text-gray-900 mb-2">{p.label}</h3>
                  <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">{p.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SERVICES */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="max-w-3xl mb-12">
            <div className="text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold mb-3">
              What We Deliver
            </div>
            <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-gray-950 mb-4">
              Modular Agritech Services
            </h2>
            <p className="font-sans text-gray-500 font-light text-base md:text-lg">
              Four core specialized solutions engineered to bring technology to farming.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES_DATA.map((service, index) => (
              <Reveal key={service.id} delay={(index % 2) * 0.08}>
                <button
                  id={`home-service-card-${service.id}`}
                  onClick={() => onSelectService(service.id)}
                  className="group w-full text-left glass rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5 flex flex-col h-full"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={SERVICE_IMAGES[service.id]}
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 to-transparent" />
                    <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm text-white border border-white/25">
                      {getServiceIcon(service.id)}
                    </div>
                    <h3 className="absolute bottom-4 left-5 right-5 font-sans text-xl font-bold text-white tracking-tight">
                      {service.title}
                    </h3>
                  </div>

                  <div className="p-6 flex flex-col gap-4 flex-1">
                    <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">{service.shortDesc}</p>
                    <div className="flex flex-col gap-1.5">
                      {service.features.slice(0, 2).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-gray-600">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="font-light leading-relaxed">{feat}</span>
                        </div>
                      ))}
                    </div>
                    <span className="mt-auto pt-1 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                      Explore {service.title}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TECHNOLOGY HIGHLIGHTS */}
      <section className="py-20 px-6 bg-emerald-50/30">
        <div className="max-w-6xl mx-auto">
          <Reveal className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold mb-3">
              <span className="h-px w-8 bg-emerald-400" />
              At AiGROW, Technology Meets Nature
            </div>
            <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-gray-950 mb-4">
              Snippets of Our Most Popular Products
            </h2>
            <p className="font-sans text-gray-500 font-light leading-relaxed">
              We integrate IoT-enabled systems, climate control, data-driven precision farming practices, and sustainable materials to create efficient, low-waste agricultural solutions tailored for Sri Lankan conditions.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {technologies.map((t, i) => {
              const Icon = t.icon;
              return (
                <Reveal key={t.title} delay={i * 0.08} className="glass rounded-2xl p-6 h-full">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white mb-4">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-sans text-lg font-bold text-gray-900 mb-2">{t.title}</h3>
                  <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">{t.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5b. INTERACTIVE GREENHOUSE SIMULATOR */}
      <GreenhouseSimulator onNavigate={onNavigate} />

      {/* 6. ADVANTAGES */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="max-w-3xl mb-12">
            <div className="text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold mb-3">
              The AiGROW Edge
            </div>
            <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-gray-950 mb-4">
              Why Growers Choose Our Platform
            </h2>
            <p className="font-sans text-gray-500 font-light text-base md:text-lg">
              Traditional farming is vulnerable to climate shifts, soil degradation, and nutrient volatility. Here's the edge AiGROW gives you.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {advantages.map((adv, i) => {
              const Icon = adv.icon;
              return (
                <Reveal key={adv.title} delay={(i % 3) * 0.08} className="glass rounded-2xl p-6 flex flex-col gap-3 h-full">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-2xl font-black text-emerald-600">{adv.stat}</span>
                  </div>
                  <h3 className="font-sans text-base font-bold text-gray-900">{adv.title}</h3>
                  <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">{adv.desc}</p>
                  <span className="mt-auto font-mono text-[11px] text-emerald-700/70 font-semibold uppercase tracking-wide pt-1">
                    {adv.statLabel}
                  </span>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. STATS BAR */}
      <section className="py-16 px-6 bg-emerald-50/30 border-y border-emerald-100/60">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { target: 85, suffix: '%', label: 'Remote Monitoring', sub: 'Real-time IoT coverage' },
            { target: 70, suffix: '%', prefix: '-', label: 'Operation Costs', sub: 'Resource utilization drop' },
            { target: 80, suffix: '%', prefix: '+', label: 'Average Crop Yield', sub: 'Compared to open fields' },
            { target: 100, suffix: '%', label: 'Pesticide Free', sub: 'Pure, certified harvests' }
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center p-4">
              <StatsCounter target={s.target} suffix={s.suffix} prefix={s.prefix} />
              <span className="font-sans text-sm font-semibold text-gray-800 mt-2">{s.label}</span>
              <span className="font-sans text-xs text-gray-400 mt-1 font-light">{s.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. PROJECTS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="max-w-3xl mb-12">
            <div className="text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold mb-3">
              Our Harvest of Success
            </div>
            <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-gray-950 mb-4">
              Empowering Sri Lankan Farms
            </h2>
            <p className="font-sans text-gray-500 max-w-2xl font-light leading-relaxed text-base">
              We have successfully established our technology around Sri Lanka, empowering over 50 farmers while bridging the gap of traditional farming and modern practices.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS_DATA.map((proj, index) => (
              <Reveal key={proj.id} delay={(index % 3) * 0.08}>
                <button
                  onClick={() => onSelectProject(proj.id)}
                  className="group w-full text-left glass rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5 flex flex-col h-full"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-lg bg-white/90 backdrop-blur-sm px-2.5 py-1 font-mono text-[9px] font-bold text-emerald-800 uppercase tracking-wide">
                      {proj.location}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <span className="font-mono text-[10px] text-emerald-600 uppercase tracking-widest font-semibold">{proj.type}</span>
                    <h3 className="font-sans text-base font-bold text-gray-950 leading-snug">{proj.title}</h3>
                    <p className="font-sans text-xs text-gray-500 font-light leading-relaxed">{proj.summary}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {proj.stats.slice(0, 3).map((stat, i) => (
                        <div key={i} className="rounded-lg bg-emerald-50 px-2.5 py-1.5">
                          <span className="block font-mono text-sm font-black text-emerald-600 leading-none">{stat.value}</span>
                          <span className="block font-sans text-[8px] text-gray-400 uppercase tracking-wide mt-0.5">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                    <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                      View Project Details
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PRICE CALCULATOR */}
      <section className="py-20 px-6 bg-emerald-50/30 border-y border-emerald-100/60">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center max-w-3xl mx-auto mb-14">
            <span className="font-mono text-xs text-emerald-600 font-bold uppercase tracking-widest block mb-2">
              Cost Estimation Tool
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-gray-950 mb-3">
              Agritech Setup Price Calculator
            </h2>
            <p className="font-sans text-sm text-gray-500 font-light max-w-xl mx-auto leading-relaxed">
              Estimate your initial infrastructure setup and smart automation equipment costs in Sri Lankan Rupees (LKR) to plan your digital agritech farm.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Controls */}
            <div className="lg:col-span-7 glass rounded-3xl p-6 md:p-8 flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider">01. Select Project Architecture</span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { type: 'greenhouse' as const, size: 5000, icon: Building2, name: 'Greenhouse', sub: 'Commercial polytunnels' },
                    { type: 'vertical' as const, size: 1000, icon: Layers, name: 'Vertical Farm', sub: 'Indoor multi-layer stack' },
                    { type: 'domestic' as const, size: 200, icon: Sprout, name: 'Home Garden', sub: 'Urban & backyard units' }
                  ].map((opt) => {
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.type}
                        onClick={() => { setCalcType(opt.type); setCalcSize(opt.size); }}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          calcType === opt.type ? 'border-emerald-500 bg-emerald-50/40 text-emerald-950 shadow-sm' : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        <Icon className="w-5 h-5 mb-2 text-emerald-600" />
                        <span className="font-sans text-xs font-bold block">{opt.name}</span>
                        <span className="font-sans text-[10px] text-gray-400 block mt-0.5">{opt.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider">02. Choose Cultivation Area</span>
                  <span className="font-mono text-sm font-bold text-emerald-600">
                    {calcSize.toLocaleString()} <span className="text-[10px] text-gray-400 font-medium">sq ft</span>
                  </span>
                </div>
                <input
                  type="range"
                  min={calcDetails.sizeMin}
                  max={calcDetails.sizeMax}
                  step={calcDetails.sizeStep}
                  value={calcSize}
                  onChange={(e) => setCalcSize(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-gray-100 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                  <span>{calcDetails.sizeMin.toLocaleString()} sq ft</span>
                  <span>{calcDetails.sizeMax.toLocaleString()} sq ft</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider">03. Smart Equipment Add-ons (Optional)</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: 'climate' as const, name: 'Smart Climate Unit', sub: 'LKR 185,000 / flat' },
                    { key: 'fertigation' as const, name: 'Precision Fertigation', sub: 'LKR 840,000 / injector' },
                    { key: 'humidifier' as const, name: 'Automated Humidifier', sub: 'LKR 64,000 / unit' },
                    { key: 'moisture' as const, name: 'Moisture Sensor Pack', sub: 'LKR 28,000 / 5 probes' }
                  ].map((a) => (
                    <label key={a.key} className="flex gap-3 items-start p-3 bg-gray-50/40 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50 transition-all select-none">
                      <input
                        type="checkbox"
                        checked={calcAddons[a.key]}
                        onChange={(e) => setCalcAddons({ ...calcAddons, [a.key]: e.target.checked })}
                        className="accent-emerald-600 w-4 h-4 rounded-sm border-gray-200 mt-0.5"
                      />
                      <div>
                        <span className="font-sans text-xs font-bold text-gray-800 block">{a.name}</span>
                        <span className="font-sans text-[10px] text-gray-400 block mt-0.5">{a.sub}</span>
                      </div>
                    </label>
                  ))}

                  <label className="col-span-1 sm:col-span-2 flex gap-3 items-start p-3 bg-gray-50/40 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50 transition-all select-none">
                    <input
                      type="checkbox"
                      checked={calcAddons.growLights}
                      onChange={(e) => setCalcAddons({ ...calcAddons, growLights: e.target.checked })}
                      className="accent-emerald-600 w-4 h-4 rounded-sm border-gray-200 mt-0.5"
                    />
                    <div>
                      <span className="font-sans text-xs font-bold text-gray-800 block">
                        Hyper-Red Smart LED Grow Lights ({calcDetails.lightsNeeded} units needed)
                      </span>
                      <span className="font-sans text-[10px] text-gray-400 block mt-0.5">
                        Mimics solar spectrum. LKR 38,500 each / Total LKR {(calcDetails.lightsNeeded * 38500).toLocaleString()}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Estimate sheet */}
            <div className="lg:col-span-5 bg-white border border-gray-100 rounded-3xl p-6 shadow-md flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="font-sans text-xs font-bold text-gray-900 uppercase tracking-wide">AiGROW Estimation Sheet</h3>
                    <span className="font-mono text-[9px] text-gray-400 mt-0.5 block uppercase">Local Design, Colombo HQ</span>
                  </div>
                  <span className="font-mono text-[9px] font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-sm uppercase tracking-wider">PROVISIONAL</span>
                </div>

                <div className="flex flex-col gap-3.5 text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-gray-500 font-light">
                      {calcDetails.label} ({calcSize.toLocaleString()} sq ft at LKR {calcDetails.baseRate}/sq ft)
                    </span>
                    <span className="font-mono text-gray-800 font-semibold shrink-0">LKR {calcDetails.baseCost.toLocaleString()}</span>
                  </div>
                  {calcAddons.climate && (
                    <div className="flex justify-between items-baseline">
                      <span className="font-sans text-gray-500 font-light">Smart Climate Control Unit</span>
                      <span className="font-mono text-gray-800 shrink-0">LKR {calcDetails.climateCost.toLocaleString()}</span>
                    </div>
                  )}
                  {calcAddons.fertigation && (
                    <div className="flex justify-between items-baseline">
                      <span className="font-sans text-gray-500 font-light">Precision Fertigation Injector</span>
                      <span className="font-mono text-gray-800 shrink-0">LKR {calcDetails.fertigationCost.toLocaleString()}</span>
                    </div>
                  )}
                  {calcAddons.humidifier && (
                    <div className="flex justify-between items-baseline">
                      <span className="font-sans text-gray-500 font-light">Automated Humidifier Unit</span>
                      <span className="font-mono text-gray-800 shrink-0">LKR {calcDetails.humidifierCost.toLocaleString()}</span>
                    </div>
                  )}
                  {calcAddons.moisture && (
                    <div className="flex justify-between items-baseline">
                      <span className="font-sans text-gray-500 font-light">LoRa Soil Moisture Sensor Pack</span>
                      <span className="font-mono text-gray-800 shrink-0">LKR {calcDetails.moistureCost.toLocaleString()}</span>
                    </div>
                  )}
                  {calcAddons.growLights && (
                    <div className="flex justify-between items-baseline">
                      <span className="font-sans text-gray-500 font-light">Smart LED Grow Lights ({calcDetails.lightsNeeded} x LKR 38,500)</span>
                      <span className="font-mono text-gray-800 shrink-0">LKR {calcDetails.growLightsCost.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-sans text-sm font-bold text-gray-900 uppercase">Estimated Total Cost</span>
                  <div className="text-right">
                    <span className="font-mono text-xl sm:text-2xl font-black text-emerald-600">LKR {calcDetails.totalCost.toLocaleString()}</span>
                    <span className="font-mono text-[9px] text-gray-400 block mt-0.5">+ VAT & local logistics charges</span>
                  </div>
                </div>
                <button
                  id="calc-submit-quote-btn"
                  onClick={handleInquireEstimate}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 group shadow-lg shadow-emerald-600/10"
                >
                  Submit Estimate for Technical Proposal
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. AWARDS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="max-w-3xl mb-12">
            <div className="text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold mb-3">
              Awards &amp; Recognition
            </div>
            <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-gray-950 mb-4">
              Recognized Excellence in Agritech
            </h2>
            <p className="font-sans text-gray-500 font-light text-base md:text-lg">
              A track record celebrated by Sri Lanka&apos;s leading technology and innovation bodies.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {awards.map((a, idx) => {
              const Icon = a.icon;
              return (
                <Reveal key={a.year} delay={idx * 0.1} className="glass rounded-3xl p-7 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-sm font-black text-gray-300">{a.year}</span>
                  </div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-600 mb-1.5">{a.org}</p>
                  <h3 className="font-sans text-base font-bold text-gray-900 leading-snug mb-2">{a.title}</h3>
                  <p className="font-sans text-xs text-gray-500 font-light leading-relaxed">{a.desc}</p>
                  <span className="inline-flex items-center gap-1 mt-4 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 w-fit">
                    <CheckCircle className="h-3 w-3" /> Verified
                  </span>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. CLOSING CTA */}
      <section className="px-6 pb-16">
        <Reveal className="max-w-6xl mx-auto rounded-3xl bg-emerald-950 text-white p-10 md:p-16">
          <div className="max-w-2xl flex flex-col gap-6">
            <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest">A CodeGen Initiative</span>
            <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight">
              Built for Those Who Feed the Nation
            </h2>
            <p className="font-sans text-gray-300 text-base md:text-lg leading-relaxed font-light">
              From individual farmers to agribusinesses and institutions, AiGROW delivers scalable solutions tailored to real agricultural needs.
            </p>

            <div className="mt-2">
              <span className="block font-sans text-xs font-semibold text-emerald-300/80 uppercase tracking-wider mb-3">
                What are you building?
              </span>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { label: 'Turnkey Greenhouse', icon: Building2 },
                  { label: 'Indoor Farm', icon: Layers },
                  { label: 'Home Garden', icon: Sprout },
                  { label: 'Smart Equipment', icon: Cpu }
                ].map((b, idx) => {
                  const on = selectedBuild === idx;
                  const Icon = b.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedBuild(on ? null : idx)}
                      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                        on ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white/10 border-white/20 text-white/90 hover:bg-white/20'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {b.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              id="home-closing-cta-btn"
              onClick={() => {
                const builds = ['Turnkey Greenhouse', 'Indoor Farm', 'Home Garden', 'Smart Equipment'];
                if (selectedBuild !== null && onSelectProductForEnquiry) {
                  onSelectProductForEnquiry(builds[selectedBuild]);
                }
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-fit mt-5 px-7 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-sm transition-colors duration-300 flex items-center gap-2 group"
            >
              {selectedBuild !== null
                ? `Start my ${['Greenhouse', 'Indoor Farm', 'Home Garden', 'Equipment'][selectedBuild]} project`
                : 'Start Your Project'}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
