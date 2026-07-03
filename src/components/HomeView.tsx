import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Activity
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

  const prevProject = () => {
    setCurrentProjectIdx((prev) => (prev === 0 ? PROJECTS_DATA.length - 1 : prev - 1));
  };

  const nextProject = () => {
    setCurrentProjectIdx((prev) => (prev === PROJECTS_DATA.length - 1 ? 0 : prev + 1));
  };

  const activeProject = PROJECTS_DATA[currentProjectIdx];

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
    { title: 'Higher yields with lower resource use', desc: 'Accelerated growth cycles deliver up to 3x yield compared to open-field systems.', icon: TrendingUp },
    { title: 'Water- and energy-efficient systems', desc: 'Precision sensor feedback loops save over 85% water and 40% energy.', icon: Zap },
    { title: 'Designed for circular economy principles', desc: 'Integrating upcycled local coconut husk substrates (coco-peat) and energy recovery loops.', icon: RefreshCw },
    { title: 'Data-driven decision making', desc: 'No guesswork. Continuous sensor logs feed automated adjustments and predictive feeding curves.', icon: LineChart },
    { title: 'Climate-resilient and scalable', desc: 'Solid protective structures shield crops from severe regional weather shifts.', icon: ShieldCheck },
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

      {/* 2. INTRODUCTION */}
      <section className="py-20 px-6 w-full mx-auto border-b border-gray-100">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          <div className="lg:col-span-5">
            <div className="text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold mb-3">
              Corporate Overview
            </div>
            <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-gray-950 mb-6">
              Where Innovation Meets Sustainability
            </h2>
          </div>
          <div className="lg:col-span-7 font-sans text-base md:text-lg text-gray-600 leading-relaxed font-light">
            <p className="mb-4">
              AiGROW is a sustainable agri-tech company dedicated to transforming how Sri Lanka grows its food. Backed by deep technological expertise and a strong commitment to environmental responsibility, we design innovative, scalable, and eco-friendly agricultural solutions that empower farmers, businesses, and communities across the island.
            </p>
            <p className="text-gray-900 font-normal">
              We don't just grow crops, we grow resilient ecosystems.
            </p>
          </div>
        </motion.div>
      </section>

      {/* 3. OUR MISSION */}
      <section className="py-20 px-6 w-full mx-auto border-b border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: [0.215, 0.610, 0.355, 1.000] }}
            className="lg:col-span-6 flex flex-col gap-6 order-2 lg:order-1"
          >
            <div className="text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold">
              Our True North
            </div>
            <h3 className="font-sans text-3xl font-bold tracking-tight text-gray-950">
              Transforming Sri Lankan Food Security
            </h3>
            <blockquote className="border-l-4 border-emerald-500 pl-4 font-sans text-lg italic text-emerald-800 font-medium bg-emerald-50/40 py-2.5 pr-2 rounded-r-lg">
              "To strengthen Sri Lanka's food systems through smart, sustainable, and circular agricultural innovations that improve productivity, protect the environment, and uplift local livelihoods."
            </blockquote>
            <p className="font-sans text-gray-600 leading-relaxed font-light">
              Through strategic automation and circular practices, we are designing food systems that secure predictable local harvests, reduce reliance on chemical imports, and build a climate-resilient Sri Lanka.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: [0.215, 0.610, 0.355, 1.000] }}
            className="lg:col-span-6 order-1 lg:order-2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-gray-100 img-zoom-wrap">
              <img
                src="https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=1000"
                alt="High-tech farming research"
                className="w-full h-80 object-cover img-zoom"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-emerald-950/10 mix-blend-multiply"></div>
            </div>
          </motion.div>

        </div>
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: numbered selector list */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {SERVICES_DATA.map((service, index) => {
                const active = index === activeServiceIdx;
                return (
                  <motion.button
                    key={service.id}
                    id={`home-service-card-${service.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    onMouseEnter={() => setActiveServiceIdx(index)}
                    onClick={() => setActiveServiceIdx(index)}
                    className={`group flex items-center gap-4 w-full p-5 rounded-2xl border text-left transition-all duration-300 ${
                      active
                        ? 'glass-green border-emerald-300/60 shadow-lg shadow-emerald-900/5'
                        : 'glass border-transparent hover:-translate-y-0.5'
                    }`}
                  >
                    <span className={`font-mono text-sm font-black tabular-nums transition-colors ${active ? 'text-emerald-600' : 'text-gray-300 group-hover:text-emerald-400'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      active ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {getServiceIcon(service.id)}
                    </span>
                    <span className="grow">
                      <span className="block font-sans text-base font-bold text-gray-900">{service.title}</span>
                    </span>
                    <ArrowRight className={`w-4 h-4 shrink-0 transition-all ${active ? 'text-emerald-600 translate-x-0' : 'text-gray-300 -translate-x-1 group-hover:translate-x-0'}`} />
                  </motion.button>
                );
              })}
            </div>

            {/* Right: animated detail panel */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeServiceIdx}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="glass rounded-3xl p-8 md:p-10 h-full flex flex-col justify-between relative overflow-hidden shadow-xl shadow-emerald-900/5"
                >
                  {/* Big watermark number */}
                  <span className="pointer-events-none absolute -top-6 -right-2 font-sans text-[9rem] font-black leading-none text-emerald-500/[0.06] select-none">
                    {String(activeServiceIdx + 1).padStart(2, '0')}
                  </span>

                  <div className="relative z-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white mb-6 shadow-lg shadow-emerald-600/20">
                      {getServiceIcon(SERVICES_DATA[activeServiceIdx].id)}
                    </div>
                    <h3 className="font-sans text-2xl font-bold text-gray-950 tracking-tight mb-3">
                      {SERVICES_DATA[activeServiceIdx].title}
                    </h3>
                    <p className="font-sans text-sm md:text-base text-gray-500 font-light leading-relaxed mb-6 max-w-lg">
                      {SERVICES_DATA[activeServiceIdx].shortDesc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                      {SERVICES_DATA[activeServiceIdx].features.slice(0, 4).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-gray-600">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="font-light leading-relaxed">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectService(SERVICES_DATA[activeServiceIdx].id)}
                    className="relative z-10 mt-8 w-fit flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all shadow-md shadow-emerald-600/10 group"
                  >
                    Explore {SERVICES_DATA[activeServiceIdx].title}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
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

        {/* Zig-zag connected timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center spine (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-3 bottom-3 w-px -translate-x-1/2 bg-gradient-to-b from-emerald-300 via-emerald-300/50 to-transparent" />
          {/* Left spine (mobile) */}
          <div className="lg:hidden absolute left-[21px] top-3 bottom-3 w-px bg-gradient-to-b from-emerald-300 to-transparent" />

          <div className="flex flex-col gap-8 lg:gap-6">
            {technologies.map((tech, idx) => {
              const isLeft = idx % 2 === 0;
              const num = String(idx + 1).padStart(2, '0');
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                  className="relative lg:grid lg:grid-cols-2 items-center"
                >
                  {/* Node badge on the spine */}
                  <div className="absolute z-10 left-[21px] lg:left-1/2 top-7 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 ring-4 ring-emerald-50">
                    <tech.icon className="w-5 h-5" />
                  </div>

                  {/* Card, alternating sides on desktop */}
                  <div className={`pl-14 lg:pl-0 ${isLeft ? 'lg:col-start-1 lg:pr-14 lg:text-right' : 'lg:col-start-2 lg:pl-14'}`}>
                    <div className="glass rounded-2xl p-6 md:p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5">
                      {/* Big ghost number */}
                      <span className={`pointer-events-none absolute -top-5 text-7xl font-black text-emerald-500/[0.08] select-none ${isLeft ? 'left-5' : 'right-5'}`}>
                        {num}
                      </span>
                      <div className={`relative z-10 flex flex-col ${isLeft ? 'lg:items-end' : 'items-start'}`}>
                        <span className="font-mono text-xs font-bold text-emerald-600 mb-2">{num}</span>
                        <h3 className="font-sans text-lg font-bold text-gray-900 mb-2">{tech.title}</h3>
                        <p className={`font-sans text-sm text-gray-500 leading-relaxed font-light max-w-md ${isLeft ? 'lg:text-right' : ''}`}>
                          {tech.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5b. INTERACTIVE GREENHOUSE SIMULATOR */}
      <GreenhouseSimulator onNavigate={onNavigate} />

      {/* 6. ADVANTAGES LIST */}
      <section className="py-20 px-6 w-full mx-auto border-b border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: [0.215, 0.610, 0.355, 1.000] }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg img-zoom-wrap">
              <img
                src="https://images.unsplash.com/photo-1535090486071-4157038d9885?auto=format&fit=crop&q=80&w=1000"
                alt="Resilient crops and sun"
                className="w-full h-80 object-cover img-zoom"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 from-emerald-950/20 to-transparent"></div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.215, 0.610, 0.355, 1.000] }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <div className="text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold">
              The AiGROW Edge
            </div>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-900">
              Why Growers Choose Our Platform
            </h2>
            <p className="font-sans text-gray-500 font-light text-sm md:text-base">
              Traditional farming is vulnerable to climate shifts, soil degradation, and nutrient volatility. AiGROW provides complete predictability.
            </p>

            <div className="flex flex-col gap-5 mt-2">
              {advantages.map((adv, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <adv.icon className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans text-sm font-bold text-gray-900">{adv.title}</h4>
                    <p className="font-sans text-xs text-gray-500 mt-0.5 leading-relaxed font-light">{adv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
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
            className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-12"
          >
            <div>
              <div className="text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold mb-2">
                Our Harvest of Success
              </div>
              <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-900 mb-3">
                Empowering Sri Lankan Farms
              </h2>
              <p className="font-sans text-xs text-gray-500 max-w-2xl font-light leading-relaxed">
                We have successfully established our technology around Sri Lanka and empowering over 50 farmers while bridging the gap of traditional farming and modern practices.
              </p>
            </div>
            
            {/* Control buttons */}
            <div className="flex gap-2">
              <button
                id="prev-project-btn"
                onClick={prevProject}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 bg-white hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                id="next-project-btn"
                onClick={nextProject}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 bg-white hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                aria-label="Next Project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Active Carousel Project Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: [0.215, 0.610, 0.355, 1.000] }}
            className="glass rounded-3xl shadow-xl shadow-emerald-900/5 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-5 h-64 sm:h-80 lg:h-auto relative img-zoom-wrap">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="absolute inset-0 w-full h-full object-cover img-zoom"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold uppercase tracking-wider">
                {activeProject.location}
              </div>
            </div>

            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs text-emerald-600 uppercase tracking-widest font-semibold">
                  {activeProject.type}
                </span>
                
                <h3 className="font-sans text-2xl font-bold text-gray-950 tracking-tight">
                  {activeProject.title}
                </h3>
                
                <p className="font-sans text-sm text-gray-500 leading-relaxed font-light">
                  {activeProject.summary}
                </p>

                {/* Micro Stats inside project */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-100 my-2">
                  {activeProject.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="font-mono text-base md:text-lg font-bold text-emerald-600">{stat.value}</span>
                      <span className="font-sans text-[10px] text-gray-400 font-medium tracking-wide uppercase mt-0.5">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                <button
                  onClick={() => onSelectProject(activeProject.id)}
                  className="px-5 py-2.5 bg-gray-50 text-gray-800 hover:bg-emerald-50 hover:text-emerald-700 font-medium rounded-xl text-xs transition-colors flex items-center gap-2 group"
                >
                  View Details
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <div className="flex gap-1.5">
                  {PROJECTS_DATA.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentProjectIdx(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentProjectIdx ? 'w-6 bg-emerald-600' : 'w-2 bg-gray-200 hover:bg-gray-300'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
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

      {/* 10. AWARDS STRIP */}
      <section className="py-16 bg-white border-b border-gray-100 px-6">
        <div className="w-full mx-auto">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans text-xs font-semibold text-gray-400 uppercase tracking-widest text-center mb-10"
          >
            Recognized Excellence in Agritech
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0 }}
              className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:border-emerald-200"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-emerald-100/50 flex items-center justify-center text-emerald-600">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-gray-800">E-Swabhimani Awards</h4>
                <p className="font-sans text-xs text-gray-500 mt-0.5">Digital Social Impact 2018</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:border-emerald-200"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-emerald-100/50 flex items-center justify-center text-emerald-600">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-gray-800">SLASSCOM National</h4>
                <p className="font-sans text-xs text-gray-500 mt-0.5">1st Runner-up Best Innovative Product in Agritech 2024</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:border-emerald-200"
            >
              <div className="w-12 h-12 shrink-0 rounded-xl bg-emerald-100/50 flex items-center justify-center text-emerald-600">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-sans text-sm font-bold text-gray-800">Pioneering AI Solutions</h4>
                <p className="font-sans text-xs text-gray-500 mt-0.5">Agricultural Productivity Award 2025</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 11. CLOSING CTA BANNER */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }}
        className="bg-emerald-950 text-white rounded-3xl p-10 md:p-16 w-full mx-auto my-16 relative overflow-hidden"
      >
        <div className="absolute right-0 bottom-0 w-80 h-80 text-emerald-900/40 pointer-events-none select-none">
          <Leaf className="w-full h-full rotate-45" />
        </div>
        
        <div className="relative z-10 max-w-2xl flex flex-col gap-6">
          <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest">
            A CodeGen Initiative
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight">
            Built for Those Who Feed the Nation
          </h2>
          <p className="font-sans text-gray-300 text-base md:text-lg leading-relaxed font-light">
            From individual farmers to agribusinesses and institutions, AiGROW delivers scalable solutions tailored to real agricultural needs. Reach out to AiGROW Team Today!
          </p>
          <button
            id="home-closing-cta-btn"
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-fit mt-4 px-7 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 group animate-pulse hover:animate-none"
          >
            Contact Us
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.section>

    </div>
  );
}
