import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Leaf, 
  Cpu, 
  Thermometer, 
  Droplet, 
  CheckCircle, 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight,
  Building2,
  Layers,
  Sprout,
  Sparkles,
  TrendingUp,
  Zap,
  RefreshCw,
  LineChart,
  ShieldCheck,
  Wind,
  Droplets,
  Sun,
  Activity,
  Trophy,
  Medal,
  Star,
  Users
} from 'lucide-react';
import { PageId } from '../types';
import { SERVICES_DATA, PROJECTS_DATA } from '../data';
import StatsCounter from './StatsCounter';
import GreenhouseSimulator from './GreenhouseSimulator';

const HERO_SLIDES = [
  {
    subtitle: "SMART GREENHOUSE CO.",
    titleLeft: "AiGROW",
    titleRight: "FARMS",
    desc: "There is a moment in the growth of every seed when technology meets nature. We design hyper-efficient circular ecosystems to feed Sri Lanka sustainably.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-watering-greenhouse-plants-with-a-sprinkler-42336-large.mp4"
  },
  {
    subtitle: "CIRCULAR ECOSYSTEMS",
    titleLeft: "ZERO",
    titleRight: "WASTE",
    desc: "Engineering closed-loop agricultural projects where waste becomes nutrients. Our smart systems maximize yield while preserving Sri Lanka's beautiful resources.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-organic-vegetables-in-a-greenhouse-42335-large.mp4"
  },
  {
    subtitle: "IoT & AUTOMATION",
    titleLeft: "CLOUD",
    titleRight: "CROPS",
    desc: "Continuous real-time optimization powered by IoT sensors, precision irrigation, and intelligent crop monitoring algorithms built for climate resilience.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-smart-agriculture-technology-and-drone-monitoring-42352-large.mp4"
  }
];

// Background imagery for the expanding Services panels (keyed by service id)
const SERVICE_IMAGES: Record<string, string> = {
  'greenhouse': 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1200',
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
  const [currentProjectIdx, setCurrentProjectIdx] = useState(0);
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [activeTechIdx, setActiveTechIdx] = useState(0);
  const [activeEdgeIdx, setActiveEdgeIdx] = useState(0);
  const [projPaused, setProjPaused] = useState(false);
  const [activeAwardIdx, setActiveAwardIdx] = useState(1);
  const [activeMissionIdx, setActiveMissionIdx] = useState(0);
  const [selectedBuild, setSelectedBuild] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Interactive Simulation states for the live Hero dashboard widget
  const [simFans, setSimFans] = useState(false);
  const [simWater, setSimWater] = useState(false);
  const [simShade, setSimShade] = useState(false);

  // Price Calculator States
  const [calcType, setCalcType] = useState<'greenhouse' | 'vertical' | 'domestic'>('greenhouse');
  const [calcSize, setCalcSize] = useState<number>(5000);
  const [calcAddons, setCalcAddons] = useState({
    climate: true,
    fertigation: true,
    humidifier: false,
    moisture: true,
    growLights: false
  });

  const getCalcDetails = () => {
    let baseRate = 1250; // LKR per sq ft
    let label = "Commercial Greenhouse Structure";
    let sizeMin = 1000;
    let sizeMax = 50000;
    let sizeStep = 500;

    if (calcType === 'vertical') {
      baseRate = 4800;
      label = "Indoor Vertical Farm Layout";
      sizeMin = 100;
      sizeMax = 10000;
      sizeStep = 100;
    } else if (calcType === 'domestic') {
      baseRate = 850;
      label = "Urban / Home Gardening Setup";
      sizeMin = 50;
      sizeMax = 2000;
      sizeStep = 50;
    }

    const baseCost = calcSize * baseRate;

    // Addons cost in LKR
    let climateCost = calcAddons.climate ? 185000 : 0;
    let fertigationCost = calcAddons.fertigation ? 840000 : 0;
    let humidifierCost = calcAddons.humidifier ? 64000 : 0;
    let moistureCost = calcAddons.moisture ? 28000 : 0;
    
    const lightsNeeded = calcType === 'vertical' ? Math.ceil(calcSize / 50) : Math.ceil(calcSize / 200);
    const growLightsCost = calcAddons.growLights ? lightsNeeded * 38500 : 0;

    const addonsCost = climateCost + fertigationCost + humidifierCost + moistureCost + growLightsCost;
    const totalCost = baseCost + addonsCost;

    return {
      baseRate,
      label,
      sizeMin,
      sizeMax,
      sizeStep,
      baseCost,
      climateCost,
      fertigationCost,
      humidifierCost,
      moistureCost,
      growLightsCost,
      addonsCost,
      totalCost,
      lightsNeeded
    };
  };

  const calcDetails = getCalcDetails();

  const handleInquireEstimate = () => {
    const typeLabel = calcType === 'greenhouse' ? 'Turnkey Greenhouse' : calcType === 'vertical' ? 'Indoor Vertical Farming' : 'Home Gardening';
    const activeAddonsText = Object.entries(calcAddons)
      .filter(([_, val]) => val)
      .map(([key, _]) => {
        if (key === 'climate') return 'Smart Climate Control (LKR 185,000)';
        if (key === 'fertigation') return 'Precision Fertigation System (LKR 840,000)';
        if (key === 'humidifier') return 'Automated Humidifier (LKR 64,000)';
        if (key === 'moisture') return 'Soil Moisture Sensor Pack (LKR 28,000)';
        if (key === 'growLights') return `Smart LED Grow Lights (${calcDetails.lightsNeeded} units - LKR ${(calcDetails.growLightsCost).toLocaleString()})`;
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

  const activeProject = PROJECTS_DATA[currentProjectIdx];

  // Auto-advance the projects showcase (pauses on hover)
  useEffect(() => {
    if (projPaused) return;
    const id = setInterval(() => {
      setCurrentProjectIdx((p) => (p + 1) % PROJECTS_DATA.length);
    }, 5000);
    return () => clearInterval(id);
  }, [projPaused]);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'greenhouse': return <Building2 className="w-6 h-6" />;
      case 'indoor-farming': return <Layers className="w-6 h-6" />;
      case 'home-gardening': return <Sprout className="w-6 h-6" />;
      case 'fresh-produce': return <Sparkles className="w-6 h-6" />;
      default: return <Leaf className="w-6 h-6" />;
    }
  };

  // Advantages values list perfectly integrated with PDF text
  const advantages = [
    { title: 'Higher yields with lower resource use', desc: 'Accelerated growth cycles deliver up to 3x yield compared to open-field systems.', icon: TrendingUp, stat: '3×', statLabel: 'Yield vs. open field' },
    { title: 'Water- and energy-efficient systems', desc: 'Precision sensor feedback loops save over 85% water and 40% energy.', icon: Zap, stat: '85%', statLabel: 'Less water used' },
    { title: 'Designed for circular economy principles', desc: 'Integrating upcycled local coconut husk substrates (coco-peat) and energy recovery loops.', icon: RefreshCw, stat: '100%', statLabel: 'Circular coco-peat media' },
    { title: 'Data-driven decision making', desc: 'No guesswork. Continuous sensor logs feed automated adjustments and predictive feeding curves.', icon: LineChart, stat: '24/7', statLabel: 'Live sensor decisions' },
    { title: 'Climate-resilient and scalable', desc: 'Solid protective structures shield crops from severe regional weather shifts.', icon: ShieldCheck, stat: '365d', statLabel: 'Year-round harvests' },
  ];

  const technologies = [
    {
      icon: Cpu,
      title: 'IoT Sensor Networks',
      description: 'Real-time tracking of soil moisture, humidity, and nutrient levels.'
    },
    {
      icon: Thermometer,
      title: 'Climate Control',
      description: 'Control over Temperature, Humidity, CO2, Automated venting, shading, and cooling that reacts to local weather shifts instantly.'
    },
    {
      icon: Droplet,
      title: 'Precision Fertigation',
      description: 'Smart systems that deliver the exact drop of water and nutrient needed, zero waste, maximum growth.'
    }
  ];

  return (
    <div className="bg-[#FAFDFB]/30 min-h-screen selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      
      {/* 1. HERO SECTION (CINEMATIC SPLIT-SCREEN RESONSIVE UNIQUE LAYOUT BASED ON USER SPECIFICATION) */}
      <section id="hero-split-showcase" className="relative h-screen flex items-center bg-gray-950 text-white overflow-hidden border-b border-white/5 select-none">

        {/* Full Screen Cinematic Background Videos (Cross-fading with Framer Motion) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {HERO_SLIDES.map((slide, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlideIdx === idx ? 1 : 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover scale-105"
              >
                <source src={slide.video} type="video/mp4" />
              </video>
            </motion.div>
          ))}

          {/* Subtle Ambient Vignettes & Radial Gradients (kept light so the footage stays visible) */}
          <div className="absolute inset-0 from-gray-950/80 via-gray-950/40 to-transparent"></div>
          <div className="absolute inset-0 from-gray-950/70 via-transparent to-gray-950/30"></div>
        </div>

        {/* Dynamic Architectural Split Background Cover Pane (Desktop Only: Covers precisely 45% of width) */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[45%] from-[#081510]/80 via-[#030e0a]/70 to-[#020a07]/85 backdrop-blur-md border-r z-10 hidden lg:block">
          {/* Subtle vertical aesthetic line matching the architectural theme */}
          <div className="absolute right-0 inset-y-0 from-transparent via-emerald-500/10 to-transparent"></div>
        </div>

        {/* Decorative Floating Hanging Botanical Branches (Direct match to the uploaded visual layout!) */}
        <div className="absolute top-0 left-[35%] lg:left-[43%] -translate-x-1/2 w-56 h-56 opacity-80 pointer-events-none z-30 hidden sm:block">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-emerald-400/90 drop-shadow-[0_8px_24px_rgba(16,185,129,0.15)]">
            <path
              d="M15 15 C 65 45, 95 85, 105 125"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="opacity-40 text-emerald-500"
            />
            {/* Elegant botanical leafy outlines & solids */}
            <path
              d="M52 42 C 37 27, 22 42, 52 72 C 82 42, 67 27, 52 42 Z"
              fill="currentColor"
              className="text-emerald-500 fill-current opacity-90"
            />
            <path
              d="M92 82 C 77 67, 62 82, 92 112 C 122 82, 107 67, 92 82 Z"
              fill="currentColor"
              className="text-emerald-400 fill-current opacity-85"
            />
            <path
              d="M78 118 C 65 108, 53 118, 78 143 C 103 118, 91 108, 78 118 Z"
              fill="currentColor"
              className="text-emerald-600 fill-current opacity-70"
            />
            <path
              d="M112 148 C 102 141, 94 148, 112 165 C 130 148, 122 141, 112 148 Z"
              fill="currentColor"
              className="text-teal-400 fill-current opacity-90"
            />
          </svg>
        </div>

        {/* Main Content Layout Container */}
        <div className="relative z-20 w-full h-full px-6 sm:px-12 flex flex-col justify-between py-12 lg:py-16 pointer-events-none">

          {/* Top Brand & Navbar Menu Links (Aligned beautifully as shown in visual layout) */}


          {/* Center Showcase Panel with Exact Split-Typography Alignment */}
          <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center my-auto">

            {/* LEFT PANE COLUMN: Subtitle, Left Word, Desc, CTA Button */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center text-left lg:pr-10 pointer-events-auto mt-8 lg:mt-0">
              <div className="max-w-md w-full lg:ml-auto">
                {/* Small tracking-widest uppercase category subtitle */}
                <motion.div
                  key={`sub-${currentSlideIdx}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-emerald-400 uppercase mb-4 font-bold flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {HERO_SLIDES[currentSlideIdx].subtitle}
                </motion.div>

                {/* Left side title word (Perfect right alignment on large screen, meets split) */}
                <div className="overflow-hidden lg:text-right">
                  <motion.h1
                    key={`titleL-${currentSlideIdx}`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-7xl lg:text-[100px] font-black text-transparent bg-clip-text bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center leading-none uppercase tracking-tight font-sans lg:-mr-1"
                  >
                    {HERO_SLIDES[currentSlideIdx].titleLeft}
                  </motion.h1>
                </div>

                {/* Mobile-only right word stack */}
                <div className="block lg:hidden overflow-hidden mt-1">
                  <motion.h1
                    key={`titleR-mob-${currentSlideIdx}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl sm:text-7xl font-black text-white leading-none uppercase tracking-tight font-sans"
                  >
                    {HERO_SLIDES[currentSlideIdx].titleRight}
                  </motion.h1>
                </div>

                {/* Clean Descriptive paragraph */}
                <motion.p
                  key={`desc-${currentSlideIdx}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-sm sm:text-base text-gray-300 italic font-light mt-6 leading-relaxed max-w-sm"
                >
                  "{HERO_SLIDES[currentSlideIdx].desc}"
                </motion.p>

                {/* Learn More link with dynamic underline effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="mt-8"
                >
                  <button
                    id="hero-split-cta"
                    onClick={() => {
                      onNavigate('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors border-b border-emerald-400/20 pb-1 cursor-pointer group"
                  >
                    LEARN MORE
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.div>
              </div>
            </div>

            {/* RIGHT PANE COLUMN: Right Word (Only shown on large screens for visual split design) */}
            <div className="hidden lg:flex w-full lg:w-[55%] h-full flex-col justify-center text-left lg:pl-10 pointer-events-auto">
              <div className="overflow-hidden">
                <motion.h1
                  key={`titleR-${currentSlideIdx}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="text-5xl sm:text-7xl lg:text-[100px] font-black text-white leading-none uppercase tracking-tight font-sans lg:-ml-1"
                >
                  {HERO_SLIDES[currentSlideIdx].titleRight}
                </motion.h1>
              </div>
            </div>

          </div>

          {/* Bottom Interactive Pagination & Slide Controls */}
          <div className="w-full flex items-center justify-between z-30 pointer-events-auto">

            {/* Standard quick details info badge */}
            <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-gray-400">
              <span className="text-emerald-400 font-bold">GRID SYNCED</span>
              <span className="opacity-40">|</span>
              <span>OUTDOOR DEPLOYMENTS ACTIVE</span>
              <span className="opacity-40">|</span>
              <span>SRI LANKA SPECIFIC OPTIMIZATIONS</span>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between w-full md:w-auto gap-8">

              {/* Dynamic Slide Dots indicators (Diamond format inspired by visual layout) */}
              <div className="flex items-center gap-4">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIdx(idx)}
                    className="relative flex items-center justify-center p-2 cursor-pointer group"
                    title={`Go to Slide ${idx + 1}`}
                  >
                    <div className={`w-2.5 h-2.5 rotate-45 transition-all duration-300 ${
                      currentSlideIdx === idx
                        ? 'bg-emerald-400 scale-125 shadow-lg shadow-emerald-400/50 border border-emerald-400'
                        : 'bg-transparent border border-white/30 group-hover:border-white/70'
                    }`} />
                  </button>
                ))}
              </div>

              {/* Minimal translucent navigation arrows */}
              <div className="flex gap-2">
                <button
                  id="hero-slide-prev"
                  onClick={() => setCurrentSlideIdx((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
                  className="p-3 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all rounded-lg cursor-pointer"
                  title="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <button
                  id="hero-slide-next"
                  onClick={() => setCurrentSlideIdx((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1))}
                  className="p-3 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all rounded-lg cursor-pointer"
                  title="Next Slide"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* 2. INTRODUCTION — editorial split + animated figures + capability marquee */}
      <section className="py-20 px-6 w-full mx-auto border-b border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Statement */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }}
            className="lg:col-span-7"
          >
            <div className="text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold mb-4">
              Corporate Overview
            </div>
            <h2 className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-gray-950 leading-[1.1]">
              Where Innovation Meets{' '}
              <span className="relative inline-block text-emerald-600">
                Sustainability
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 -bottom-1 h-1 w-full origin-left rounded-full bg-emerald-400/60"
                />
              </span>
            </h2>
            <p className="mt-6 font-sans text-base md:text-lg text-gray-600 leading-relaxed font-light max-w-2xl">
              AiGROW is a sustainable agri-tech company dedicated to transforming how Sri Lanka grows its food. Backed by deep technological expertise and a strong commitment to environmental responsibility, we design innovative, scalable, and eco-friendly agricultural solutions that empower farmers, businesses, and communities across the island.
            </p>
            <p className="mt-4 font-sans text-lg text-gray-900 font-semibold">
              We don't just grow crops, we grow resilient ecosystems.
            </p>
          </motion.div>

          {/* Animated key-figure tiles */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 grid grid-cols-2 gap-3"
          >
            {[
              { icon: Award, target: 8, suffix: '+', label: 'Years of experience', sub: 'Since 2018' },
              { icon: Users, target: 220, suffix: '+', label: 'Customers served' },
              { icon: Building2, target: 10, suffix: '+', label: 'Projects delivered' },
              { icon: Leaf, text: 'CodeGen', label: 'A proud subsidiary' }
            ].map((f, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-5 flex flex-col gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/5"
              >
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
          </motion.div>
        </div>

        {/* Capability marquee */}
        <div className="relative mt-14 border-y border-emerald-100/60 py-4">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#eef5f0] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#eef5f0] to-transparent" />
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
            className="flex w-max items-center gap-3"
          >
            {[...Array(2)].flatMap((_, dup) =>
              ['IoT-Enabled Systems', 'Climate-Smart', 'Circular Economy', '100% Pesticide-Free', 'Data-Driven', 'Rooted in Sri Lanka', 'Precision Fertigation', 'Built for Tomorrow'].map((k, i) => (
                <span
                  key={`${dup}-${i}`}
                  className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 font-sans text-sm font-semibold text-gray-700 whitespace-nowrap"
                >
                  <Leaf className="h-3.5 w-3.5 text-emerald-500" />
                  {k}
                </span>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* 3. OUR MISSION — interactive "True North" compass */}
      <section className="py-20 px-6 w-full mx-auto border-b border-gray-100">
        {(() => {
          const pillars = [
            { label: 'Improve Productivity', short: 'Productivity', icon: TrendingUp, deg: 0, pos: { x: 50, y: 11 }, desc: 'Smart, data-driven systems that lift yields per acre while cutting waste and guesswork.' },
            { label: 'Protect the Environment', short: 'Environment', icon: Leaf, deg: 135, pos: { x: 82, y: 71 }, desc: 'Circular, low-input methods that conserve water, reduce chemicals, and restore soil health.' },
            { label: 'Uplift Livelihoods', short: 'Livelihoods', icon: Users, deg: -135, pos: { x: 18, y: 71 }, desc: 'Technology and training that grow farmer incomes and strengthen rural communities.' }
          ];
          const active = pillars[activeMissionIdx];
          const ActiveIcon = active.icon;
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* Left: statement + active pillar detail */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 order-2 lg:order-1 flex flex-col gap-6"
              >
                <div className="text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold">
                  Our True North
                </div>
                <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-gray-950">
                  Transforming Sri Lankan Food Security
                </h2>
                <blockquote className="border-l-4 border-emerald-500 pl-4 font-sans text-lg italic text-emerald-800 font-medium bg-emerald-50/40 py-2.5 pr-2 rounded-r-lg">
                  "To strengthen Sri Lanka's food systems through smart, sustainable, and circular agricultural innovations that improve productivity, protect the environment, and uplift local livelihoods."
                </blockquote>

                {/* Active pillar detail */}
                <motion.div
                  key={activeMissionIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-green rounded-2xl p-5 flex items-start gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-600/20">
                    <ActiveIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="font-sans text-sm font-bold text-gray-900">{active.label}</h4>
                    <p className="font-sans text-xs text-gray-600 mt-1 leading-relaxed font-light">{active.desc}</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right: interactive compass */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 order-1 lg:order-2"
              >
                <div className="relative mx-auto w-full max-w-sm aspect-square">
                  {/* Compass dial + ticks */}
                  <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
                    <circle cx="100" cy="100" r="94" fill="none" stroke="rgba(76,154,91,0.25)" strokeWidth="1.5" />
                    <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(76,154,91,0.15)" strokeWidth="1" />
                    {Array.from({ length: 36 }).map((_, i) => {
                      const ang = (i / 36) * 2 * Math.PI;
                      const major = i % 9 === 0;
                      const r1 = 94;
                      const r2 = major ? 82 : 88;
                      return (
                        <line
                          key={i}
                          x1={100 + r1 * Math.sin(ang)} y1={100 - r1 * Math.cos(ang)}
                          x2={100 + r2 * Math.sin(ang)} y2={100 - r2 * Math.cos(ang)}
                          stroke={major ? 'rgba(76,154,91,0.5)' : 'rgba(76,154,91,0.2)'}
                          strokeWidth={major ? 1.5 : 1}
                        />
                      );
                    })}
                  </svg>

                  {/* "N" true-north marker */}
                  <span className="absolute top-1.5 left-1/2 -translate-x-1/2 font-mono text-[10px] font-black text-emerald-600">N</span>

                  {/* Center compass + swinging needle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative flex h-28 w-28 items-center justify-center rounded-full glass shadow-lg">
                      <motion.div
                        animate={{ rotate: active.deg }}
                        transition={{ type: 'spring', stiffness: 80, damping: 12 }}
                      >
                        <svg width="84" height="84" viewBox="0 0 84 84">
                          <polygon points="42,8 49,42 42,37 35,42" fill="#4C9A5B" />
                          <polygon points="42,76 49,42 42,47 35,42" fill="#9AA6A0" />
                        </svg>
                      </motion.div>
                      <span className="absolute h-3 w-3 rounded-full bg-emerald-600 ring-4 ring-white/70" />
                    </div>
                  </div>

                  {/* Pillar nodes */}
                  {pillars.map((p, idx) => {
                    const on = idx === activeMissionIdx;
                    const Icon = p.icon;
                    return (
                      <button
                        key={idx}
                        onMouseEnter={() => setActiveMissionIdx(idx)}
                        onClick={() => setActiveMissionIdx(idx)}
                        style={{ left: `${p.pos.x}%`, top: `${p.pos.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1"
                        aria-label={p.label}
                      >
                        {on && <span className="absolute top-0 h-14 w-14 rounded-2xl bg-emerald-400/40 animate-ping" />}
                        <span className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 ${
                          on ? 'bg-emerald-500 text-white border-emerald-500 scale-110 shadow-lg shadow-emerald-600/30' : 'glass text-emerald-600 border-white/60 hover:scale-105'
                        }`}>
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className={`font-mono text-[9px] font-bold uppercase tracking-wide transition-colors ${on ? 'text-emerald-700' : 'text-gray-400'}`}>
                          {p.short}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          );
        })()}
      </section>

      {/* 4. OUR SERVICES OVERVIEW — interactive selector + animated detail panel */}
      <section className="py-20 bg-emerald-50/20 border-b border-gray-100 px-6">
        <div className="w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }}
            className="max-w-3xl mb-14"
          >
            <div className="text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold mb-3">
              What We Deliver
            </div>
            <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-gray-950 mb-4">
              Modular Agritech Services
            </h2>
            <p className="font-sans text-gray-500 font-light text-base md:text-lg">
              Four core specialized solutions engineered to bring technology to farming. Pick one to explore.
            </p>
          </motion.div>

          {/* Expanding image-panel gallery */}
          <div className="flex flex-col lg:flex-row gap-3 lg:h-[520px]">
            {SERVICES_DATA.map((service, index) => {
              const active = index === activeServiceIdx;
              const num = String(index + 1).padStart(2, '0');
              return (
                <motion.div
                  key={service.id}
                  id={`home-service-card-${service.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  onMouseEnter={() => setActiveServiceIdx(index)}
                  onClick={() => setActiveServiceIdx(index)}
                  className={`group relative overflow-hidden rounded-3xl cursor-pointer bg-emerald-900 border border-white/30 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
                    active ? 'h-[420px] lg:h-full lg:flex-[3.4]' : 'h-[86px] lg:h-full lg:flex-[1]'
                  }`}
                >
                  {/* Background image */}
                  <img
                    src={SERVICE_IMAGES[service.id]}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                      active ? 'scale-105 opacity-100' : 'opacity-60 group-hover:opacity-80'
                    }`}
                  />
                  {/* Overlay */}
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    active
                      ? 'bg-gradient-to-t from-emerald-950/95 via-emerald-950/45 to-emerald-950/10'
                      : 'bg-emerald-950/65'
                  }`} />

                  {/* Number */}
                  <span className="absolute top-5 left-6 z-10 font-mono text-xs font-black tracking-widest text-white/80">
                    {num}
                  </span>
                  {/* Icon chip */}
                  <div className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm text-white border border-white/25">
                    {getServiceIcon(service.id)}
                  </div>

                  {/* Collapsed label — horizontal on mobile, vertical on desktop */}
                  <span className={`lg:hidden absolute bottom-5 left-6 z-10 font-sans text-lg font-bold text-white transition-opacity duration-300 ${active ? 'opacity-0' : 'opacity-100'}`}>
                    {service.title}
                  </span>
                  <span className={`hidden lg:block absolute bottom-7 left-1/2 -translate-x-1/2 z-10 [writing-mode:vertical-rl] rotate-180 whitespace-nowrap font-sans text-base font-bold text-white transition-opacity duration-300 ${active ? 'opacity-0' : 'opacity-100'}`}>
                    {service.title}
                  </span>

                  {/* Expanded content */}
                  <div className={`absolute inset-x-0 bottom-0 z-10 p-6 md:p-8 transition-all duration-500 ${
                    active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
                  }`}>
                    <h3 className="font-sans text-2xl font-bold text-white tracking-tight mb-2 drop-shadow">
                      {service.title}
                    </h3>
                    <p className="font-sans text-sm text-white/85 font-light leading-relaxed mb-4 max-w-md">
                      {service.shortDesc}
                    </p>
                    <div className="flex flex-col gap-1.5 mb-5">
                      {service.features.slice(0, 2).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-white/80">
                          <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                          <span className="font-light leading-relaxed">{feat}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectService(service.id);
                      }}
                      className="w-fit flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-bold transition-all shadow-lg group/btn"
                    >
                      Explore {service.title}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile helper hint */}
          <p className="lg:hidden text-center font-mono text-[10px] text-gray-400 uppercase tracking-wider mt-4">
            Tap a panel to expand
          </p>
        </div>
      </section>

      {/* 5. TECHNOLOGY HIGHLIGHTS — zig-zag timeline layout */}
      <section className="py-20 px-6 w-full mx-auto border-b border-gray-100 overflow-hidden">
        {/* Editorial split header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-16 max-w-6xl mx-auto"
        >
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold mb-3">
              <span className="h-px w-8 bg-emerald-400" />
              At AiGROW, Technology Meets Nature
            </div>
            <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-gray-950">
              Snippets of Our Most Popular Products
            </h2>
          </div>
          <p className="lg:col-span-6 font-sans text-gray-500 font-light leading-relaxed lg:pb-1">
            We integrate IoT-enabled systems, climate control, data-driven precision farming practices, and sustainable materials to create efficient, low-waste agricultural solutions tailored for Sri Lankan conditions.
          </p>
        </motion.div>

        {/* Interactive radial tech orbit */}
        {(() => {
          const NODE_POS = [
            { x: 50, y: 9 },   // top
            { x: 85, y: 67 },  // bottom-right
            { x: 15, y: 67 }   // bottom-left
          ];
          const activeTech = technologies[activeTechIdx];
          return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-5xl mx-auto">
              {/* Orbit diagram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="relative mx-auto w-full max-w-sm aspect-square"
              >
                {/* Decorative rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
                  className="absolute inset-4 rounded-full border border-dashed border-emerald-300/50"
                />
                <div className="absolute inset-[18%] rounded-full border border-emerald-200/40" />

                {/* Connectors with flowing data animation */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
                  {NODE_POS.map((p, idx) => {
                    const active = idx === activeTechIdx;
                    return (
                      <motion.line
                        key={idx}
                        x1="50" y1="50" x2={p.x} y2={p.y}
                        stroke={active ? '#4C9A5B' : '#A7C3AC'}
                        strokeWidth={active ? 1.4 : 0.7}
                        strokeDasharray="3 4"
                        strokeLinecap="round"
                        animate={{ strokeDashoffset: [0, -14] }}
                        transition={{ repeat: Infinity, duration: active ? 0.9 : 2, ease: 'linear' }}
                        opacity={active ? 1 : 0.5}
                      />
                    );
                  })}
                </svg>

                {/* Center hub */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                  <motion.span
                    animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                    className="absolute inset-0 m-auto h-20 w-20 rounded-full bg-emerald-400/40"
                  />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl shadow-emerald-600/30">
                    <Leaf className="h-8 w-8" />
                  </div>
                  <span className="mt-2 font-mono text-[9px] uppercase tracking-widest text-emerald-700 font-bold">
                    AiGROW Core
                  </span>
                </div>

                {/* Tech nodes */}
                {technologies.map((tech, idx) => {
                  const p = NODE_POS[idx];
                  const active = idx === activeTechIdx;
                  return (
                    <button
                      key={idx}
                      onMouseEnter={() => setActiveTechIdx(idx)}
                      onClick={() => setActiveTechIdx(idx)}
                      style={{ left: `${p.x}%`, top: `${p.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                      aria-label={tech.title}
                    >
                      {active && (
                        <span className="absolute inset-0 rounded-2xl bg-emerald-400/50 animate-ping" />
                      )}
                      <span className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 ${
                        active
                          ? 'bg-emerald-500 text-white border-emerald-500 scale-110 shadow-lg shadow-emerald-600/30'
                          : 'glass text-emerald-600 border-white/60 hover:scale-105'
                      }`}>
                        <tech.icon className="h-6 w-6" />
                      </span>
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] font-bold text-gray-400">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </button>
                  );
                })}
              </motion.div>

              {/* Detail card (swaps as you select a node) */}
              <div className="relative">
                <motion.div
                  key={activeTechIdx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-xl shadow-emerald-900/5"
                >
                  <span className="pointer-events-none absolute -top-6 -right-2 font-sans text-[9rem] font-black leading-none text-emerald-500/[0.06] select-none">
                    {String(activeTechIdx + 1).padStart(2, '0')}
                  </span>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-600/20">
                        <activeTech.icon className="h-7 w-7" />
                      </div>
                      <span className="font-mono text-xs font-bold text-emerald-600 uppercase tracking-widest">
                        Core Technology {String(activeTechIdx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="font-sans text-2xl font-bold text-gray-950 tracking-tight mb-3">
                      {activeTech.title}
                    </h3>
                    <p className="font-sans text-sm md:text-base text-gray-500 font-light leading-relaxed">
                      {activeTech.description}
                    </p>

                    {/* Selector dots */}
                    <div className="flex items-center gap-2 mt-8">
                      {technologies.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveTechIdx(idx)}
                          aria-label={`Show technology ${idx + 1}`}
                          className={`h-2 rounded-full transition-all ${idx === activeTechIdx ? 'w-8 bg-emerald-600' : 'w-2 bg-gray-200 hover:bg-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 5b. INTERACTIVE GREENHOUSE SIMULATOR */}
      <GreenhouseSimulator onNavigate={onNavigate} />

      {/* 6. ADVANTAGES — interactive stat dial + accordion */}
      <section className="py-20 px-6 w-full mx-auto border-b border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <div className="text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold mb-3">
            The AiGROW Edge
          </div>
          <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-gray-950 mb-4">
            Why Growers Choose Our Platform
          </h2>
          <p className="font-sans text-gray-500 font-light text-base md:text-lg">
            Traditional farming is vulnerable to climate shifts, soil degradation, and nutrient volatility. Explore the edge AiGROW gives you.
          </p>
        </motion.div>

        {(() => {
          const activeEdge = advantages[activeEdgeIdx];
          const R = 86;
          const CIRC = 2 * Math.PI * R;
          const fill = (activeEdgeIdx + 1) / advantages.length;
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Animated stat dial */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-5 glass-green rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col items-center justify-center text-center shadow-xl shadow-emerald-900/5 min-h-[360px]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white mb-2 shadow-lg shadow-emerald-600/20">
                  <activeEdge.icon className="h-6 w-6" />
                </div>

                <div className="relative w-52 h-52 my-2">
                  <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                    <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(76,154,91,0.15)" strokeWidth="12" />
                    <motion.circle
                      cx="100" cy="100" r={R} fill="none" stroke="#4C9A5B" strokeWidth="12" strokeLinecap="round"
                      strokeDasharray={CIRC}
                      animate={{ strokeDashoffset: CIRC * (1 - fill) }}
                      transition={{ type: 'spring', stiffness: 90, damping: 18 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      key={activeEdge.stat}
                      initial={{ opacity: 0, scale: 0.8, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="font-mono text-5xl font-black text-emerald-700 tracking-tight"
                    >
                      {activeEdge.stat}
                    </motion.span>
                    <span className="font-sans text-[11px] text-emerald-800/70 font-semibold mt-1 max-w-[7rem] leading-tight">
                      {activeEdge.statLabel}
                    </span>
                  </div>
                </div>

                <motion.h4
                  key={activeEdge.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-sans text-base font-bold text-gray-900 mt-2 max-w-xs"
                >
                  {activeEdge.title}
                </motion.h4>
              </motion.div>

              {/* Accordion list */}
              <div className="lg:col-span-7 flex flex-col gap-2.5">
                {advantages.map((adv, idx) => {
                  const active = idx === activeEdgeIdx;
                  const num = String(idx + 1).padStart(2, '0');
                  return (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.4, delay: idx * 0.06 }}
                      onMouseEnter={() => setActiveEdgeIdx(idx)}
                      onClick={() => setActiveEdgeIdx(idx)}
                      className={`w-full text-left rounded-2xl border p-4 md:p-5 transition-all duration-300 ${
                        active ? 'glass-green border-emerald-300/60 shadow-md shadow-emerald-900/5' : 'glass border-transparent hover:border-emerald-200/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`font-mono text-sm font-black tabular-nums transition-colors ${active ? 'text-emerald-600' : 'text-gray-300'}`}>
                          {num}
                        </span>
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${active ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                          <adv.icon className="h-5 w-5" />
                        </span>
                        <h4 className="grow font-sans text-sm md:text-base font-bold text-gray-900">{adv.title}</h4>
                        <span className={`shrink-0 font-mono text-xs font-bold ${active ? 'text-emerald-600' : 'text-gray-300'}`}>{adv.stat}</span>
                        <ChevronRight className={`w-4 h-4 shrink-0 text-emerald-500 transition-transform duration-300 ${active ? 'rotate-90' : ''}`} />
                      </div>
                      <div className={`overflow-hidden transition-all duration-300 ${active ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="font-sans text-xs md:text-sm text-gray-500 leading-relaxed font-light pt-3 pl-[4.5rem]">
                          {adv.desc}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </section>

      {/* 7. STATS BAR (ANIMATED) */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6 }}
        className="py-16 bg-white border-b border-gray-100"
      >
        <div className="w-full mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex flex-col items-center text-center p-4">
            <StatsCounter target={85} suffix="%" />
            <span className="font-sans text-sm font-semibold text-gray-800 mt-2">Remote Monitoring</span>
            <span className="font-sans text-xs text-gray-400 mt-1 font-light">Real-time IoT coverage</span>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <StatsCounter target={70} suffix="%" prefix="-" />
            <span className="font-sans text-sm font-semibold text-gray-800 mt-2">Operation Costs</span>
            <span className="font-sans text-xs text-gray-400 mt-1 font-light">Resource utilization drop</span>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <StatsCounter target={80} suffix="%" prefix="+" />
            <span className="font-sans text-sm font-semibold text-gray-800 mt-2">Average Crop Yield</span>
            <span className="font-sans text-xs text-gray-400 mt-1 font-light">Compared to open fields</span>
          </div>

          <div className="flex flex-col items-center text-center p-4">
            <StatsCounter target={100} suffix="%" />
            <span className="font-sans text-sm font-semibold text-gray-800 mt-2">Pesticide Free</span>
            <span className="font-sans text-xs text-gray-400 mt-1 font-light">Pure, certified harvests</span>
          </div>

        </div>
      </motion.section>

      {/* 8. PROJECTS CAROUSEL */}
      <section className="py-20 bg-gray-50/30 border-b border-gray-100 px-6">
        <div className="w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-10"
          >
            <div className="text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold mb-3">
              Our Harvest of Success
            </div>
            <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-gray-950 mb-4">
              Empowering Sri Lankan Farms
            </h2>
            <p className="font-sans text-gray-500 max-w-2xl font-light leading-relaxed text-base">
              We have successfully established our technology around Sri Lanka, empowering over 50 farmers while bridging the gap of traditional farming and modern practices.
            </p>
          </motion.div>

          {/* Cinematic featured showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.215, 0.610, 0.355, 1.000] }}
            onMouseEnter={() => setProjPaused(true)}
            onMouseLeave={() => setProjPaused(false)}
            className="relative rounded-3xl overflow-hidden h-[540px] shadow-xl shadow-emerald-900/10 border border-white/40"
          >
            {/* Crossfading Ken-Burns backgrounds */}
            {PROJECTS_DATA.map((proj, idx) => (
              <motion.img
                key={proj.id}
                src={proj.image}
                alt={proj.title}
                referrerPolicy="no-referrer"
                initial={false}
                animate={{ opacity: idx === currentProjectIdx ? 1 : 0, scale: idx === currentProjectIdx ? 1.08 : 1 }}
                transition={{ opacity: { duration: 1 }, scale: { duration: 6, ease: 'linear' } }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ))}
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/45 to-emerald-950/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/70 via-transparent to-transparent" />

            {/* Thumbnail filmstrip (desktop) */}
            <div className="hidden md:flex absolute top-6 right-6 z-20 flex-col gap-3 w-44">
              {PROJECTS_DATA.map((proj, idx) => {
                const active = idx === currentProjectIdx;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setCurrentProjectIdx(idx)}
                    className={`relative h-20 w-full rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      active ? 'border-emerald-400 shadow-lg scale-100' : 'border-white/30 opacity-70 hover:opacity-100 scale-95'
                    }`}
                  >
                    <img src={proj.image} alt={proj.title} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-emerald-950/40" />
                    <span className="absolute bottom-1.5 left-2 right-2 text-left font-mono text-[9px] font-bold text-white uppercase tracking-wide leading-tight truncate">
                      {proj.location.split(',')[0]}
                    </span>
                    {active && (
                      <motion.span
                        layoutId="proj-thumb-active"
                        className="absolute inset-0 rounded-lg ring-2 ring-emerald-400"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-8 md:p-12 md:pr-56">
              <motion.div
                key={currentProjectIdx}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white mb-4">
                  {activeProject.location}
                </span>
                <p className="font-mono text-xs text-emerald-300 uppercase tracking-widest font-semibold mb-2">
                  {activeProject.type}
                </p>
                <h3 className="font-sans text-2xl md:text-4xl font-bold text-white tracking-tight mb-3 max-w-2xl">
                  {activeProject.title}
                </h3>
                <p className="font-sans text-sm text-white/80 font-light leading-relaxed max-w-xl mb-6">
                  {activeProject.summary}
                </p>

                {/* Glass stat chips */}
                <div className="flex flex-wrap gap-2.5 mb-7">
                  {activeProject.stats.map((stat, i) => (
                    <div key={i} className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-3.5 py-2">
                      <span className="block font-mono text-base md:text-lg font-black text-emerald-300 leading-none">{stat.value}</span>
                      <span className="block font-sans text-[9px] text-white/60 font-medium uppercase tracking-wide mt-1">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onSelectProject(activeProject.id)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs transition-all shadow-lg group"
                >
                  View Project Details
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Thumbnail filmstrip (mobile) */}
          <div className="md:hidden grid grid-cols-3 gap-2.5 mt-3">
            {PROJECTS_DATA.map((proj, idx) => {
              const active = idx === currentProjectIdx;
              return (
                <button
                  key={proj.id}
                  onClick={() => setCurrentProjectIdx(idx)}
                  className={`relative h-16 rounded-xl overflow-hidden border-2 transition-all ${active ? 'border-emerald-500' : 'border-transparent opacity-70'}`}
                >
                  <img src={proj.image} alt={proj.title} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-emerald-950/30" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. PRICE CALCULATOR */}
      <section className="py-20 bg-[#F9FBFA] border-b border-gray-100 px-6">
        <div className="w-full mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="font-mono text-xs text-emerald-600 font-bold uppercase tracking-widest block mb-2">
              Cost Estimation Tool
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-gray-950 mb-3">
              Agritech Setup Price Calculator
            </h2>
            <p className="font-sans text-xs text-gray-500 font-light max-w-xl mx-auto leading-relaxed">
              Estimate your initial infrastructure setup and smart automation equipment costs in Sri Lankan Rupees (LKR) to plan your digital agritech farm.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Calculator Controls (Left 7 Columns) */}
            <div className="lg:col-span-7 glass rounded-3xl p-6 md:p-8 shadow-xl shadow-emerald-900/5 flex flex-col gap-8">
              
              {/* Type Selection */}
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  01. Select Project Architecture
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      setCalcType('greenhouse');
                      setCalcSize(5000);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      calcType === 'greenhouse' 
                        ? 'border-emerald-500 bg-emerald-50/40 text-emerald-950 shadow-sm' 
                        : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <Building2 className="w-5 h-5 mb-2 text-emerald-600" />
                    <span className="font-sans text-xs font-bold block">Greenhouse</span>
                    <span className="font-sans text-[10px] text-gray-400 block mt-0.5">Commercial polytunnels</span>
                  </button>

                  <button
                    onClick={() => {
                      setCalcType('vertical');
                      setCalcSize(1000);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      calcType === 'vertical' 
                        ? 'border-emerald-500 bg-emerald-50/40 text-emerald-950 shadow-sm' 
                        : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <Layers className="w-5 h-5 mb-2 text-emerald-600" />
                    <span className="font-sans text-xs font-bold block">Vertical Farm</span>
                    <span className="font-sans text-[10px] text-gray-400 block mt-0.5">Indoor multi-layer stack</span>
                  </button>

                  <button
                    onClick={() => {
                      setCalcType('domestic');
                      setCalcSize(200);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      calcType === 'domestic' 
                        ? 'border-emerald-500 bg-emerald-50/40 text-emerald-950 shadow-sm' 
                        : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <Sprout className="w-5 h-5 mb-2 text-emerald-600" />
                    <span className="font-sans text-xs font-bold block">Home Garden</span>
                    <span className="font-sans text-[10px] text-gray-400 block mt-0.5">Urban & backyard units</span>
                  </button>
                </div>
              </div>

              {/* Slider Input */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    02. Choose Cultivation Area
                  </span>
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

              {/* Equipment Add-on Checkboxes */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  03. Smart Equipment Add-ons (Optional)
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex gap-3 items-start p-3 bg-gray-50/40 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50 transition-all select-none">
                    <input
                      type="checkbox"
                      checked={calcAddons.climate}
                      onChange={(e) => setCalcAddons({ ...calcAddons, climate: e.target.checked })}
                      className="accent-emerald-600 w-4 h-4 rounded-sm border-gray-200 mt-0.5"
                    />
                    <div>
                      <span className="font-sans text-xs font-bold text-gray-800 block">Smart Climate Unit</span>
                      <span className="font-sans text-[10px] text-gray-400 block mt-0.5">LKR 185,000 / flat</span>
                    </div>
                  </label>

                  <label className="flex gap-3 items-start p-3 bg-gray-50/40 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50 transition-all select-none">
                    <input
                      type="checkbox"
                      checked={calcAddons.fertigation}
                      onChange={(e) => setCalcAddons({ ...calcAddons, fertigation: e.target.checked })}
                      className="accent-emerald-600 w-4 h-4 rounded-sm border-gray-200 mt-0.5"
                    />
                    <div>
                      <span className="font-sans text-xs font-bold text-gray-800 block">Precision Fertigation</span>
                      <span className="font-sans text-[10px] text-gray-400 block mt-0.5">LKR 840,000 / injector</span>
                    </div>
                  </label>

                  <label className="flex gap-3 items-start p-3 bg-gray-50/40 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50 transition-all select-none">
                    <input
                      type="checkbox"
                      checked={calcAddons.humidifier}
                      onChange={(e) => setCalcAddons({ ...calcAddons, humidifier: e.target.checked })}
                      className="accent-emerald-600 w-4 h-4 rounded-sm border-gray-200 mt-0.5"
                    />
                    <div>
                      <span className="font-sans text-xs font-bold text-gray-800 block">Automated Humidifier</span>
                      <span className="font-sans text-[10px] text-gray-400 block mt-0.5">LKR 64,000 / unit</span>
                    </div>
                  </label>

                  <label className="flex gap-3 items-start p-3 bg-gray-50/40 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50 transition-all select-none">
                    <input
                      type="checkbox"
                      checked={calcAddons.moisture}
                      onChange={(e) => setCalcAddons({ ...calcAddons, moisture: e.target.checked })}
                      className="accent-emerald-600 w-4 h-4 rounded-sm border-gray-200 mt-0.5"
                    />
                    <div>
                      <span className="font-sans text-xs font-bold text-gray-800 block">Moisture Sensor Pack</span>
                      <span className="font-sans text-[10px] text-gray-400 block mt-0.5">LKR 28,000 / 5 probes</span>
                    </div>
                  </label>

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

            {/* Price Estimate Live Invoice (Right 5 Columns) */}
            <div className="lg:col-span-5 bg-white border border-gray-100 rounded-3xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between h-full">
              {/* Carbon Invoice Header */}
              <div>
                <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="font-sans text-xs font-bold text-gray-900 uppercase tracking-wide">
                      AiGROW Estimation Sheet
                    </h3>
                    <span className="font-mono text-[9px] text-gray-400 mt-0.5 block uppercase">
                      Local Design, Colombo HQ
                    </span>
                  </div>
                  <span className="font-mono text-[9px] font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-sm uppercase tracking-wider">
                    PROVISIONAL
                  </span>
                </div>

                {/* Estimate line items */}
                <div className="flex flex-col gap-3.5 text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans text-gray-500 font-light">
                      {calcDetails.label} ({calcSize.toLocaleString()} sq ft at LKR {calcDetails.baseRate}/sq ft)
                    </span>
                    <span className="font-mono text-gray-800 font-semibold shrink-0">
                      LKR {calcDetails.baseCost.toLocaleString()}
                    </span>
                  </div>

                  {calcAddons.climate && (
                    <div className="flex justify-between items-baseline">
                      <span className="font-sans text-gray-500 font-light">
                        Smart Climate Control Unit
                      </span>
                      <span className="font-mono text-gray-800 shrink-0">
                        LKR {calcDetails.climateCost.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {calcAddons.fertigation && (
                    <div className="flex justify-between items-baseline">
                      <span className="font-sans text-gray-500 font-light">
                        Precision Fertigation Injector
                      </span>
                      <span className="font-mono text-gray-800 shrink-0">
                        LKR {calcDetails.fertigationCost.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {calcAddons.humidifier && (
                    <div className="flex justify-between items-baseline">
                      <span className="font-sans text-gray-500 font-light">
                        Automated Humidifier Unit
                      </span>
                      <span className="font-mono text-gray-800 shrink-0">
                        LKR {calcDetails.humidifierCost.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {calcAddons.moisture && (
                    <div className="flex justify-between items-baseline">
                      <span className="font-sans text-gray-500 font-light">
                        LoRa Soil Moisture Sensor Pack
                      </span>
                      <span className="font-mono text-gray-800 shrink-0">
                        LKR {calcDetails.moistureCost.toLocaleString()}
                      </span>
                    </div>
                  )}

                  {calcAddons.growLights && (
                    <div className="flex justify-between items-baseline">
                      <span className="font-sans text-gray-500 font-light">
                        Smart LED Grow Lights ({calcDetails.lightsNeeded} x LKR 38,500)
                      </span>
                      <span className="font-mono text-gray-800 shrink-0">
                        LKR {calcDetails.growLightsCost.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total Summary Block */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-sans text-sm font-bold text-gray-900 uppercase">
                    Estimated Total Cost
                  </span>
                  <div className="text-right">
                    <span className="font-mono text-xl sm:text-2xl font-black text-emerald-600">
                      LKR {calcDetails.totalCost.toLocaleString()}
                    </span>
                    <span className="font-mono text-[9px] text-gray-400 block mt-0.5">
                      + VAT & local logistics charges
                    </span>
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

      {/* 10. AWARDS — interactive timeline + featured trophy */}
      <section className="py-20 px-6 w-full mx-auto border-b border-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <div className="text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold mb-3">
            Awards &amp; Recognition
          </div>
          <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-gray-950 mb-4">
            Recognized Excellence in Agritech
          </h2>
          <p className="font-sans text-gray-500 font-light text-base md:text-lg">
            A track record celebrated by Sri Lanka&apos;s leading technology and innovation bodies.
          </p>
        </motion.div>

        {(() => {
          const awards = [
            { year: '2018', org: 'E-Swabhimani Awards', title: 'Digital Social Impact', desc: 'National recognition for technology creating measurable social good across Sri Lankan agriculture.', icon: Medal },
            { year: '2024', org: 'SLASSCOM National', title: '1st Runner-up · Best Innovative Product in Agritech', desc: 'Honoured among the nation’s most innovative technology products for our precision agritech platform.', icon: Trophy },
            { year: '2025', org: 'AI Excellence Awards', title: 'Pioneering AI Solutions for Agricultural Productivity', desc: 'Awarded for advancing AI-driven crop management and data-led productivity gains for growers.', icon: Star }
          ];
          const active = awards[activeAwardIdx];
          const ActiveIcon = active.icon;
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Year timeline selector */}
              <div className="lg:col-span-4 relative">
                <div className="absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-emerald-300 via-emerald-300/50 to-transparent" />
                <div className="flex flex-col gap-3">
                  {awards.map((a, idx) => {
                    const on = idx === activeAwardIdx;
                    const Icon = a.icon;
                    return (
                      <button
                        key={a.year}
                        onMouseEnter={() => setActiveAwardIdx(idx)}
                        onClick={() => setActiveAwardIdx(idx)}
                        className={`relative z-10 flex items-center gap-4 p-3 rounded-2xl text-left transition-all duration-300 ${
                          on ? 'glass-green shadow-md shadow-emerald-900/5' : 'hover:bg-white/40'
                        }`}
                      >
                        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          on ? 'bg-emerald-500 text-white border-emerald-500 scale-105 shadow-lg shadow-emerald-600/25' : 'bg-white text-emerald-600 border-emerald-100'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className={`block font-mono text-lg font-black tabular-nums ${on ? 'text-emerald-700' : 'text-gray-800'}`}>{a.year}</span>
                          <span className="block font-sans text-xs text-gray-500 font-medium">{a.org}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Featured award card */}
              <div className="lg:col-span-8">
                <motion.div
                  key={activeAwardIdx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden rounded-3xl bg-emerald-950 text-white p-8 md:p-12 h-full flex flex-col justify-between shadow-xl shadow-emerald-900/20 border border-emerald-800/50"
                >
                  {/* Animated shine sweep */}
                  <motion.div
                    animate={{ x: ['-30%', '160%'] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', repeatDelay: 1.5 }}
                    className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  />
                  {/* Watermark year */}
                  <span className="pointer-events-none absolute -bottom-8 -right-2 font-sans text-[10rem] font-black leading-none text-white/[0.04] select-none">
                    {active.year}
                  </span>
                  {/* Radial green glow */}
                  <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-600/30">
                        <ActiveIcon className="h-8 w-8" />
                      </div>
                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-200">
                          <CheckCircle className="h-3 w-3" /> Verified · {active.year}
                        </span>
                        <p className="font-mono text-xs text-emerald-300 uppercase tracking-widest font-semibold mt-2">{active.org}</p>
                      </div>
                    </div>
                    <h3 className="font-sans text-2xl md:text-3xl font-bold tracking-tight mb-3 max-w-lg">
                      {active.title}
                    </h3>
                    <p className="font-sans text-sm md:text-base text-white/70 font-light leading-relaxed max-w-lg">
                      {active.desc}
                    </p>
                  </div>

                  {/* Progress dots */}
                  <div className="relative z-10 flex items-center gap-2 mt-8">
                    {awards.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveAwardIdx(idx)}
                        aria-label={`Award ${idx + 1}`}
                        className={`h-2 rounded-full transition-all ${idx === activeAwardIdx ? 'w-8 bg-emerald-400' : 'w-2 bg-white/25 hover:bg-white/50'}`}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 11. CLOSING CTA BANNER — interactive "what are you building?" */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }}
        className="relative overflow-hidden rounded-3xl bg-emerald-950 text-white p-10 md:p-16 w-full mx-auto my-16"
      >
        {/* Animated aurora glows */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
          className="pointer-events-none absolute -top-24 -left-10 h-72 w-72 rounded-full bg-emerald-500/25 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
          className="pointer-events-none absolute -bottom-28 right-8 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl"
        />
        {/* Drifting leaves */}
        {[{ l: '14%', d: 0, s: 26 }, { l: '46%', d: 2.5, s: 18 }, { l: '78%', d: 1.2, s: 30 }].map((lf, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute text-emerald-700/30 select-none"
            style={{ left: lf.l }}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: [-40, 460], opacity: [0, 0.5, 0], rotate: [0, 200] }}
            transition={{ repeat: Infinity, duration: 11 + lf.d * 2, delay: lf.d, ease: 'linear' }}
          >
            <Leaf style={{ width: lf.s, height: lf.s }} />
          </motion.div>
        ))}

        <div className="relative z-10 max-w-2xl flex flex-col gap-6">
          <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest">
            A CodeGen Initiative
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight">
            Built for Those Who Feed the Nation
          </h2>
          <p className="font-sans text-gray-300 text-base md:text-lg leading-relaxed font-light">
            From individual farmers to agribusinesses and institutions, AiGROW delivers scalable solutions tailored to real agricultural needs.
          </p>

          {/* Interactive project-type chips */}
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
                      on
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-white/10 border-white/20 text-white/90 hover:bg-white/20 hover:border-white/30'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {b.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary CTA with shine sweep */}
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
            className="relative overflow-hidden w-fit mt-5 px-7 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-sm transition-colors duration-300 flex items-center gap-2 group shadow-lg shadow-emerald-500/20"
          >
            <motion.span
              animate={{ x: ['-120%', '220%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', repeatDelay: 1.5 }}
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25"
            />
            <span className="relative z-10 flex items-center gap-2">
              {selectedBuild !== null
                ? `Start my ${['Greenhouse', 'Indoor Farm', 'Home Garden', 'Equipment'][selectedBuild]} project`
                : 'Start Your Project'}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </motion.section>

    </div>
  );
}
