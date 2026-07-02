import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Menu, 
  X, 
  ArrowRight, 
  ChevronDown,
  Building2,
  Layers,
  Sparkles,
  Cpu,
  Activity,
  Droplet,
  BookOpen,
  ShieldCheck,
  Newspaper,
  Sprout,
  Sun,
  Thermometer,
  RefreshCw,
  Gauge
} from 'lucide-react';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (pageId: PageId) => void;
}

interface AgriZone {
  id: 'nuwara-eliya' | 'hambantota' | 'colombo';
  name: string;
  elevation: string;
  temp: number;
  humidity: number;
  soilMoisture: number;
  ec: number;
  crop: string;
  status: 'optimal' | 'watering' | 'ventilating';
}

const AGRI_ZONES: AgriZone[] = [
  {
    id: 'nuwara-eliya',
    name: 'Nuwara Eliya Greenhouse',
    elevation: 'High Country (1,868m)',
    temp: 18.4,
    humidity: 82,
    soilMoisture: 68,
    ec: 1.4,
    crop: 'Export Strawberries & Bell Peppers',
    status: 'optimal'
  },
  {
    id: 'hambantota',
    name: 'Hambantota Smart Field',
    elevation: 'Dry Zone Coast (15m)',
    temp: 31.2,
    humidity: 62,
    soilMoisture: 52,
    ec: 1.8,
    crop: 'Melons & Premium Salad Greens',
    status: 'watering'
  },
  {
    id: 'colombo',
    name: 'Colombo R&D Lab',
    elevation: 'Wet Zone Urban (5m)',
    temp: 24.5,
    humidity: 68,
    soilMoisture: 72,
    ec: 1.2,
    crop: 'Botanical Cloning & Seed Trials',
    status: 'optimal'
  }
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'services' | 'products' | 'about' | null>(null);
  
  // Mobile accordion state
  const [mobileExpanded, setMobileExpanded] = useState<'services' | 'products' | 'about' | 'telemetry' | null>(null);

  // Live agricultural zones state
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<'nuwara-eliya' | 'hambantota' | 'colombo'>('nuwara-eliya');
  const [liveData, setLiveData] = useState<AgriZone[]>(AGRI_ZONES);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setIsTelemetryOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLiveData(prev => prev.map(zone => ({
        ...zone,
        temp: +(zone.temp + (Math.random() - 0.5) * 1.2).toFixed(1),
        humidity: Math.min(100, Math.max(30, Math.round(zone.humidity + (Math.random() - 0.5) * 5))),
        soilMoisture: Math.min(100, Math.max(20, Math.round(zone.soilMoisture + (Math.random() - 0.5) * 6))),
        ec: +(Math.max(0.4, zone.ec + (Math.random() - 0.5) * 0.3)).toFixed(2)
      })));
      setIsRefreshing(false);
    }, 600);
  };

  const servicesDropdown = [
    { id: 'services-greenhouse' as PageId, label: 'Turnkey Greenhouses', desc: 'Custom climate-controlled designs', icon: <Building2 className="w-4 h-4 text-emerald-600 shrink-0" /> },
    { id: 'services-indoor-farming' as PageId, label: 'Indoor Farming', desc: 'Vertical-stack automated setups', icon: <Layers className="w-4 h-4 text-emerald-600 shrink-0" /> },
    { id: 'services-home-gardening' as PageId, label: 'Home Gardening & Landscaping', desc: 'Aesthetic modern eco spaces', icon: <Leaf className="w-4 h-4 text-emerald-600 shrink-0" /> },
    { id: 'services-fresh-produce' as PageId, label: 'Premium Fresh Produce', desc: 'Pesticide-free export-grade crops', icon: <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" /> },
  ];

  const productsDropdown = [
    { id: 'products-environmental' as PageId, label: 'Environmental Control', desc: 'Climate controllers & mist systems', icon: <Cpu className="w-4 h-4 text-emerald-600 shrink-0" /> },
    { id: 'products-resource' as PageId, label: 'Resource Monitoring', desc: 'EC, soil moisture & flow sensor hubs', icon: <Activity className="w-4 h-4 text-emerald-600 shrink-0" /> },
    { id: 'products-irrigation' as PageId, label: 'Irrigation Optimisation', desc: 'Dosing units & micro drip systems', icon: <Droplet className="w-4 h-4 text-emerald-600 shrink-0" /> },
  ];

  const aboutDropdown = [
    { id: 'about-story' as PageId, label: 'Our Story & Identity', desc: 'Sustainable agritech subsidiary since 2018', icon: <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" /> },
    { id: 'about-commitment' as PageId, label: 'Sovereign Commitment', desc: 'Trace Expert City Colombo manufacturing', icon: <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" /> },
    { id: 'about-news' as PageId, label: 'Latest News Room', desc: 'Announcements & innovation awards', icon: <Newspaper className="w-4 h-4 text-emerald-600 shrink-0" /> },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setIsOpen(false);
    setOpenDropdown(null);
    setIsTelemetryOpen(false);
    setMobileExpanded(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDropdown = (type: 'services' | 'products' | 'about') => {
    setOpenDropdown(openDropdown === type ? null : type);
    setIsTelemetryOpen(false);
  };

  const handleMouseEnter = (type: 'services' | 'products' | 'about') => {
    setOpenDropdown(type);
    setIsTelemetryOpen(false);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  // Helper active checkers
  const isServicesActive = currentPage === 'services' || currentPage.startsWith('services-');
  const isProductsActive = currentPage === 'products' || currentPage.startsWith('products-');
  const isAboutActive = currentPage === 'about' || currentPage.startsWith('about-');

  const currentActiveZone = liveData.find(z => z.id === selectedZone) || liveData[0];

  const isDarkTheme = currentPage === 'home' && !isScrolled;

  const getLinkClass = (isActive: boolean) => {
    if (isActive) {
      return isDarkTheme 
        ? 'text-emerald-400 font-bold' 
        : 'text-emerald-600 font-bold';
    }
    return isDarkTheme 
      ? 'text-white/85 hover:text-white font-medium' 
      : 'text-gray-600 hover:text-gray-900 font-medium';
  };

  return (
    <div 
      className={`z-50 w-full flex flex-col transition-all duration-300 ${
        isScrolled 
          ? 'fixed top-0 left-0 right-0 shadow-lg shadow-gray-100/10' 
          : 'absolute top-0 left-0 right-0'
      }`} 
      ref={dropdownRef}
    >
      {/* 1. UPPER AGRICULTURAL STATUS RIBBON */}
      <div className={`bg-emerald-950 text-emerald-100/95 text-[10px] md:text-[11px] font-sans border-b border-emerald-900/60 px-6 transition-all duration-300 overflow-hidden ${
        isScrolled ? 'h-0 py-0 opacity-0 border-none' : 'py-2 opacity-100'
      }`}>
        <div className="w-full mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 md:gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
            </span>
            <span className="font-semibold text-emerald-300 tracking-wider uppercase text-[9px]">Active Cycle:</span>
            <span className="opacity-90 font-light text-emerald-200/90">Yala irrigation optimization active across Sri Lankan greenhouse hubs.</span>
          </div>
          <div className="flex items-center gap-3 divide-x divide-emerald-800/80 text-[10px]">
            <div className="flex items-center gap-1 pl-3 font-medium">
              <span className="text-emerald-400">🌱</span> Avg Yield: <span className="font-bold text-white">+14.6%</span>
            </div>
            <div className="flex items-center gap-1 pl-3 font-medium">
              <span className="text-emerald-400">💧</span> Water Saved: <span className="font-bold text-white">38,420L</span>
            </div>
            <div className="flex items-center gap-1 pl-3 font-medium">
              <span className="text-emerald-400">⚡</span> Efficiency: <span className="font-bold text-emerald-300">98.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN FLOATING/STICKY NAVIGATION BAR */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'py-3 bg-white/90 backdrop-blur-md border-b border-gray-150/70 shadow-md shadow-gray-100/50' 
            : isDarkTheme 
              ? 'py-5 bg-transparent border-b border-transparent' 
              : 'py-5 bg-white/50 backdrop-blur-md border-b border-gray-100/50'
        }`}
      >
        <div className="w-full mx-auto px-6 flex items-center justify-between h-12">
        {/* Logo and Subsidiary Info */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
          id="nav-logo-container"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
            isDarkTheme 
              ? 'bg-white/10 text-emerald-400 group-hover:bg-white/20' 
              : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'
          }`}>
            <Leaf className="w-5.5 h-5.5" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className={`font-sans text-xl font-bold tracking-tight transition-colors ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>AiGROW</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <p className={`font-mono text-[9px] tracking-wider uppercase leading-none mt-0.5 transition-colors ${isDarkTheme ? 'text-gray-300' : 'text-gray-400'}`}>
              CodeGen International
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {/* Home */}
          <button
            id="nav-item-home"
            onClick={() => handleNavClick('home')}
            className={`font-sans text-sm tracking-wide transition-all relative py-2 ${getLinkClass(currentPage === 'home')}`}
          >
            Home
            {currentPage === 'home' && (
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${isDarkTheme ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
            )}
          </button>

          {/* Services Dropdown Trigger */}
          <div 
            className="relative py-2"
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              id="nav-item-services-trigger"
              onClick={() => handleNavClick('services')}
              className={`flex items-center gap-1 font-sans text-sm tracking-wide transition-all ${getLinkClass(isServicesActive)}`}
            >
              Services
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'services' ? 'rotate-180' : ''}`} />
            </button>

            {/* Services Dropdown Panel */}
            {openDropdown === 'services' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 flex flex-col gap-2 animate-slide-in z-50 mt-1 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']">
                {servicesDropdown.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleNavClick(sub.id)}
                    className="flex gap-3 items-start p-2.5 rounded-xl text-left hover:bg-emerald-50/50 transition-colors group"
                  >
                    <div className="mt-1 p-1 bg-emerald-50 group-hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors">
                      {sub.icon}
                    </div>
                    <div>
                      <div className="font-sans text-xs font-bold text-gray-950">{sub.label}</div>
                      <div className="font-sans text-[10px] text-gray-400 mt-0.5 font-light">{sub.desc}</div>
                    </div>
                  </button>
                ))}
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button
                    onClick={() => handleNavClick('services')}
                    className="w-full text-center py-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50/30 hover:bg-emerald-50/70 rounded-lg transition-all"
                  >
                    View Services Overview
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Products Dropdown Trigger */}
          <div 
            className="relative py-2"
            onMouseEnter={() => handleMouseEnter('products')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              id="nav-item-products-trigger"
              onClick={() => handleNavClick('products')}
              className={`flex items-center gap-1 font-sans text-sm tracking-wide transition-all ${getLinkClass(isProductsActive)}`}
            >
              Products
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'products' ? 'rotate-180' : ''}`} />
            </button>

            {/* Products Dropdown Panel */}
            {openDropdown === 'products' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 flex flex-col gap-2 animate-slide-in z-50 mt-1 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']">
                {productsDropdown.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleNavClick(sub.id)}
                    className="flex gap-3 items-start p-2.5 rounded-xl text-left hover:bg-emerald-50/50 transition-colors group"
                  >
                    <div className="mt-1 p-1 bg-emerald-50 group-hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors">
                      {sub.icon}
                    </div>
                    <div>
                      <div className="font-sans text-xs font-bold text-gray-950">{sub.label}</div>
                      <div className="font-sans text-[10px] text-gray-400 mt-0.5 font-light">{sub.desc}</div>
                    </div>
                  </button>
                ))}
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button
                    onClick={() => handleNavClick('products')}
                    className="w-full text-center py-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50/30 hover:bg-emerald-50/70 rounded-lg transition-all"
                  >
                    View Products Catalog
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* About Us Dropdown Trigger */}
          <div 
            className="relative py-2"
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              id="nav-item-about-trigger"
              onClick={() => handleNavClick('about')}
              className={`flex items-center gap-1 font-sans text-sm tracking-wide transition-all ${getLinkClass(isAboutActive)}`}
            >
              About Us
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'about' ? 'rotate-180' : ''}`} />
            </button>

            {/* About Dropdown Panel */}
            {openDropdown === 'about' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 flex flex-col gap-2 animate-slide-in z-50 mt-1 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']">
                {aboutDropdown.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleNavClick(sub.id)}
                    className="flex gap-3 items-start p-2.5 rounded-xl text-left hover:bg-emerald-50/50 transition-colors group"
                  >
                    <div className="mt-1 p-1 bg-emerald-50 group-hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors">
                      {sub.icon}
                    </div>
                    <div>
                      <div className="font-sans text-xs font-bold text-gray-950">{sub.label}</div>
                      <div className="font-sans text-[10px] text-gray-400 mt-0.5 font-light">{sub.desc}</div>
                    </div>
                  </button>
                ))}
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button
                    onClick={() => handleNavClick('about')}
                    className="w-full text-center py-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50/30 hover:bg-emerald-50/70 rounded-lg transition-all"
                  >
                    View About Us Overview
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Projects */}
          <button
            id="nav-item-projects"
            onClick={() => handleNavClick('projects')}
            className={`font-sans text-sm tracking-wide transition-all relative py-2 ${getLinkClass(currentPage === 'projects')}`}
          >
            Projects
            {currentPage === 'projects' && (
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${isDarkTheme ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
            )}
          </button>

          {/* Shop */}
          <button
            id="nav-item-shop"
            onClick={() => handleNavClick('shop')}
            className={`font-sans text-sm tracking-wide transition-all relative py-2 ${getLinkClass(currentPage === 'shop')}`}
          >
            Shop
            {currentPage === 'shop' && (
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${isDarkTheme ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
            )}
          </button>

          {/* Contact */}
          <button
            id="nav-item-contact"
            onClick={() => handleNavClick('contact')}
            className={`font-sans text-sm tracking-wide transition-all relative py-2 ${getLinkClass(currentPage === 'contact')}`}
          >
            Contact
            {currentPage === 'contact' && (
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${isDarkTheme ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
            )}
          </button>
        </div>

        {/* Action Button & Agri-Monitor Widget */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Agri-Monitor Widget Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setIsTelemetryOpen(!isTelemetryOpen);
                setOpenDropdown(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 relative border ${
                isTelemetryOpen 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/10' 
                  : isDarkTheme
                    ? 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-100 hover:bg-emerald-100/70'
              }`}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isTelemetryOpen ? 'bg-white' : isDarkTheme ? 'bg-emerald-300' : 'bg-emerald-400'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                  isTelemetryOpen ? 'bg-white' : isDarkTheme ? 'bg-emerald-400' : 'bg-emerald-500'
                }`}></span>
              </span>
              <Sprout className="w-3.5 h-3.5" />
              <span>Live Farm Monitor</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isTelemetryOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Telemetry Dropdown */}
            <AnimatePresence>
              {isTelemetryOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-3 w-96 bg-white border border-gray-100 rounded-3xl shadow-2xl p-5 flex flex-col gap-4 z-50 origin-top-right"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                      <h4 className="font-sans text-xs font-bold text-gray-950 uppercase tracking-wider flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5 text-emerald-600" />
                        Active Hub Telemetry
                      </h4>
                      <p className="font-sans text-[10px] text-gray-400 mt-0.5">Real-time Sri Lankan microclimates</p>
                    </div>
                    
                    <button
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                      title="Poll Sensors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </button>
                  </div>

                  {/* Zone selectors */}
                  <div className="grid grid-cols-3 gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100/50">
                    {liveData.map((zone) => (
                      <button
                        key={zone.id}
                        onClick={() => setSelectedZone(zone.id)}
                        className={`py-1.5 text-[10px] font-bold rounded-lg transition-all ${
                          selectedZone === zone.id 
                            ? 'bg-white text-emerald-700 shadow-sm border border-emerald-100/30' 
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        {zone.id === 'nuwara-eliya' ? 'High Country' : zone.id === 'hambantota' ? 'Dry Zone' : 'Urban Lab'}
                      </button>
                    ))}
                  </div>

                  {/* Active Zone Metrics Display */}
                  <div className="flex flex-col gap-3">
                    <div className="bg-emerald-50/20 rounded-xl p-3 border border-emerald-100/20">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-sans text-xs font-bold text-gray-900 block">{currentActiveZone.name}</span>
                          <span className="font-mono text-[9px] text-gray-400 block mt-0.5">{currentActiveZone.elevation}</span>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          currentActiveZone.status === 'optimal' 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' 
                            : 'bg-amber-50 text-amber-800 border border-amber-100 animate-pulse'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${currentActiveZone.status === 'optimal' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                          {currentActiveZone.status}
                        </span>
                      </div>
                      <div className="mt-2 text-[10px] text-emerald-800/90 font-medium flex items-center gap-1">
                        <span>🌾</span>
                        <span>{currentActiveZone.crop}</span>
                      </div>
                    </div>

                    {/* 4 Sensor Cards */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100/50 flex items-center gap-2">
                        <div className="p-1 rounded-lg bg-red-50 text-red-600">
                          <Thermometer className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-sans text-[9px] text-gray-400 block leading-none">Temp</span>
                          <span className="font-mono text-xs font-bold text-gray-900 block mt-1">{currentActiveZone.temp}°C</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100/50 flex items-center gap-2">
                        <div className="p-1 rounded-lg bg-blue-50 text-blue-600">
                          <Droplet className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-sans text-[9px] text-gray-400 block leading-none">Rel. Humid</span>
                          <span className="font-mono text-xs font-bold text-gray-900 block mt-1">{currentActiveZone.humidity}%</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100/50 flex items-center gap-2">
                        <div className="p-1 rounded-lg bg-emerald-50 text-emerald-600">
                          <Sprout className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-sans text-[9px] text-gray-400 block leading-none">Soil Moist.</span>
                          <span className="font-mono text-xs font-bold text-gray-900 block mt-1">{currentActiveZone.soilMoisture}%</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100/50 flex items-center gap-2">
                        <div className="p-1 rounded-lg bg-purple-50 text-purple-600">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="font-sans text-[9px] text-gray-400 block leading-none">Nutrient EC</span>
                          <span className="font-mono text-xs font-bold text-gray-900 block mt-1">{currentActiveZone.ec} mS/cm</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center font-mono text-[9px] text-gray-400 pt-1 border-t border-gray-100">
                    Connected: Sri Lankan IoT Gateway (SSL Secure)
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button
            id="nav-btn-start-project"
            onClick={() => handleNavClick('contact')}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/10 active:scale-98 animate-pulse-once"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          id="nav-mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 transition-colors ${
            isDarkTheme ? 'text-white hover:text-emerald-300' : 'text-gray-600 hover:text-gray-900'
          } focus:outline-none`}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer with Expandable Accordions */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 z-50 overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="flex flex-col p-6 gap-3">
            {/* Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`flex items-center justify-between py-2.5 px-4 rounded-xl text-left font-sans text-sm ${
                currentPage === 'home' ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Home
            </button>

            {/* Services Accordion */}
            <div className="flex flex-col border border-gray-50 rounded-xl overflow-hidden">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'services' ? null : 'services')}
                className={`flex items-center justify-between py-2.5 px-4 text-left font-sans text-sm font-semibold text-gray-800 bg-gray-50/50`}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'services' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'services' && (
                <div className="flex flex-col gap-1 p-2 bg-white">
                  <button
                    onClick={() => handleNavClick('services')}
                    className="text-left font-sans text-xs font-semibold text-emerald-600 hover:text-emerald-700 py-2 px-3 rounded-lg hover:bg-gray-50"
                  >
                    • View Services Overview
                  </button>
                  {servicesDropdown.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => handleNavClick(sub.id)}
                      className="flex items-center gap-2 text-left font-sans text-xs text-gray-600 hover:text-gray-950 py-2.5 px-3 rounded-lg hover:bg-gray-50"
                    >
                      {sub.icon}
                      <span>{sub.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Products Accordion */}
            <div className="flex flex-col border border-gray-50 rounded-xl overflow-hidden">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'products' ? null : 'products')}
                className="flex items-center justify-between py-2.5 px-4 text-left font-sans text-sm font-semibold text-gray-800 bg-gray-50/50"
              >
                <span>Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'products' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'products' && (
                <div className="flex flex-col gap-1 p-2 bg-white">
                  <button
                    onClick={() => handleNavClick('products')}
                    className="text-left font-sans text-xs font-semibold text-emerald-600 hover:text-emerald-700 py-2 px-3 rounded-lg hover:bg-gray-50"
                  >
                    • View Products Catalog
                  </button>
                  {productsDropdown.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => handleNavClick(sub.id)}
                      className="flex items-center gap-2 text-left font-sans text-xs text-gray-600 hover:text-gray-950 py-2.5 px-3 rounded-lg hover:bg-gray-50"
                    >
                      {sub.icon}
                      <span>{sub.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* About Us Accordion */}
            <div className="flex flex-col border border-gray-50 rounded-xl overflow-hidden">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'about' ? null : 'about')}
                className="flex items-center justify-between py-2.5 px-4 text-left font-sans text-sm font-semibold text-gray-800 bg-gray-50/50"
              >
                <span>About Us</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'about' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'about' && (
                <div className="flex flex-col gap-1 p-2 bg-white">
                  <button
                    onClick={() => handleNavClick('about')}
                    className="text-left font-sans text-xs font-semibold text-emerald-600 hover:text-emerald-700 py-2 px-3 rounded-lg hover:bg-gray-50"
                  >
                    • View About Us Overview
                  </button>
                  {aboutDropdown.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => handleNavClick(sub.id)}
                      className="flex items-center gap-2 text-left font-sans text-xs text-gray-600 hover:text-gray-950 py-2.5 px-3 rounded-lg hover:bg-gray-50"
                    >
                      {sub.icon}
                      <span>{sub.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Live Farm Monitor Accordion (Mobile) */}
            <div className="flex flex-col border border-emerald-100 rounded-xl overflow-hidden bg-emerald-50/10">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'telemetry' ? null : 'telemetry')}
                className="flex items-center justify-between py-2.5 px-4 text-left font-sans text-sm font-bold text-emerald-800 bg-emerald-50/40"
              >
                <span className="flex items-center gap-1.5">
                  <Sprout className="w-4 h-4 text-emerald-600 animate-pulse" />
                  Live Farm Monitor
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === 'telemetry' ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded === 'telemetry' && (
                <div className="flex flex-col gap-3 p-4 bg-white">
                  <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border border-gray-100">
                    <span className="font-sans text-xs text-gray-500">Selected Zone:</span>
                    <select
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value as any)}
                      className="font-sans text-xs font-bold text-emerald-700 bg-white border border-gray-200 rounded px-2 py-1 outline-none"
                    >
                      <option value="nuwara-eliya">Nuwara Eliya</option>
                      <option value="hambantota">Hambantota</option>
                      <option value="colombo">Colombo Lab</option>
                    </select>
                  </div>

                  <div className="bg-emerald-50/30 p-3 rounded-lg border border-emerald-100/50">
                    <div className="font-sans text-xs font-bold text-gray-900 leading-none">{currentActiveZone.name}</div>
                    <div className="font-mono text-[9px] text-gray-400 mt-1">{currentActiveZone.elevation}</div>
                    <div className="font-sans text-[10px] text-emerald-800 font-medium mt-1.5">🌾 {currentActiveZone.crop}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <span className="text-[9px] text-gray-400 block">Temp</span>
                      <span className="font-mono text-xs font-bold text-gray-900 mt-0.5 block">{currentActiveZone.temp}°C</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <span className="text-[9px] text-gray-400 block">Humidity</span>
                      <span className="font-mono text-xs font-bold text-gray-900 mt-0.5 block">{currentActiveZone.humidity}%</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <span className="text-[9px] text-gray-400 block">Soil Moist.</span>
                      <span className="font-mono text-xs font-bold text-gray-900 mt-0.5 block">{currentActiveZone.soilMoisture}%</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg text-center">
                      <span className="text-[9px] text-gray-400 block">Nutrient EC</span>
                      <span className="font-mono text-xs font-bold text-gray-900 mt-0.5 block">{currentActiveZone.ec} mS</span>
                    </div>
                  </div>

                  <button
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="w-full py-2 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-150 flex items-center justify-center gap-1.5 transition-colors active:bg-emerald-100"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>{isRefreshing ? 'Polling Sensors...' : 'Poll Live Sensors'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Projects */}
            <button
              onClick={() => handleNavClick('projects')}
              className={`flex items-center justify-between py-2.5 px-4 rounded-xl text-left font-sans text-sm ${
                currentPage === 'projects' ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Projects
            </button>

            {/* Shop */}
            <button
              onClick={() => handleNavClick('shop')}
              className={`flex items-center justify-between py-2.5 px-4 rounded-xl text-left font-sans text-sm ${
                currentPage === 'shop' ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Shop
            </button>

            {/* Contact */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`flex items-center justify-between py-2.5 px-4 rounded-xl text-left font-sans text-sm ${
                currentPage === 'contact' ? 'bg-emerald-50 text-emerald-600 font-bold' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Contact
            </button>

            {/* Action button */}
            <button
              id="nav-mobile-btn-start-project"
              onClick={() => handleNavClick('contact')}
              className="flex items-center justify-center gap-2 mt-2 w-full py-3 bg-emerald-600 text-white rounded-xl text-sm font-semibold transition-colors hover:bg-emerald-700"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      </nav>
    </div>
  );
}
