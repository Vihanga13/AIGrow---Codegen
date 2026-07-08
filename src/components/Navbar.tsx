import { useState, useRef, useEffect, ReactElement } from 'react';
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
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

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

  // Which nav key owns the sliding highlight pill (hover wins, else active page)
  const activeNavKey =
    currentPage === 'home' ? 'home'
    : isServicesActive ? 'services'
    : isProductsActive ? 'products'
    : isAboutActive ? 'about'
    : currentPage === 'projects' ? 'projects'
    : currentPage === 'shop' ? 'shop'
    : currentPage === 'contact' ? 'contact'
    : null;
  const highlight = hoveredNav ?? activeNavKey;

  const currentActiveZone = liveData.find(z => z.id === selectedZone) || liveData[0];

  const isDarkTheme = currentPage === 'home' && !isScrolled;

  // ---- Floating "island" styling helpers -------------------------------------
  const islandShell = `backdrop-blur-xl border rounded-2xl transition-all duration-300 ${
    isDarkTheme
      ? 'bg-white/10 border-white/15 shadow-lg shadow-black/10'
      : 'bg-white/85 border-gray-200/70 shadow-lg shadow-gray-300/30'
  }`;

  const getLinkClass = (isActive: boolean) => {
    if (isActive) {
      return isDarkTheme ? 'text-emerald-300 font-bold' : 'text-emerald-600 font-bold';
    }
    return isDarkTheme
      ? 'text-white/85 hover:text-white font-medium'
      : 'text-gray-600 hover:text-gray-900 font-medium';
  };

  // Shared dropdown panel renderer (kept identical across the three menus)
  const renderDropdownPanel = (
    items: { id: PageId; label: string; desc: string; icon: ReactElement }[],
    overviewId: PageId,
    overviewLabel: string
  ) => (
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white border border-gray-100 rounded-2xl shadow-2xl p-4 flex flex-col gap-2 animate-slide-in z-50 mt-3 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']">
      {items.map((sub) => (
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
          onClick={() => handleNavClick(overviewId)}
          className="w-full text-center py-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50/30 hover:bg-emerald-50/70 rounded-lg transition-all"
        >
          {overviewLabel}
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex flex-col"
      ref={dropdownRef}
    >
      {/* FLOATING ISLANDS ROW */}
      <div className={`w-full px-4 sm:px-6 flex items-start gap-3 transition-all duration-300 ${isScrolled ? 'pt-2.5' : 'pt-4 lg:pt-5'}`}>

        {/* ISLAND 1 — LOGO */}
        <div
          onClick={() => handleNavClick('home')}
          id="nav-logo-container"
          className={`${islandShell} flex items-center gap-3 cursor-pointer group select-none px-4 py-2.5`}
        >
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
            isDarkTheme
              ? 'bg-white/10 text-emerald-300 group-hover:bg-white/20'
              : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'
          }`}>
            <motion.div
              animate={{ rotate: [0, -10, 0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            >
              <Leaf className="w-5 h-5" />
            </motion.div>
          </div>
          <div className="pr-1">
            <div className="flex items-baseline gap-1">
              <span className={`font-sans text-lg font-bold tracking-tight leading-none transition-colors ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>AiGROW</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <p className={`font-mono text-[8px] tracking-[0.2em] uppercase leading-none mt-1 transition-colors ${isDarkTheme ? 'text-gray-300' : 'text-gray-400'}`}>
              CodeGen International
            </p>
          </div>
        </div>

        {/* ISLAND 2 — CENTER NAVIGATION (desktop) with sliding highlight pill */}
        <div
          className={`${islandShell} hidden min-[960px]:flex items-center gap-0.5 px-2 py-2 min-[960px]:ml-auto`}
          onMouseLeave={() => { setHoveredNav(null); setOpenDropdown(null); }}
        >
          {/* Home */}
          <button
            id="nav-item-home"
            onMouseEnter={() => { setHoveredNav('home'); setOpenDropdown(null); }}
            onClick={() => handleNavClick('home')}
            className={`relative font-sans text-sm tracking-wide px-2.5 py-2 rounded-xl transition-colors ${getLinkClass(currentPage === 'home')}`}
          >
            {highlight === 'home' && (
              <motion.span
                layoutId="nav-pill"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                className={`absolute inset-0 rounded-xl ${isDarkTheme ? 'bg-white/15' : 'bg-emerald-50'}`}
              />
            )}
            <span className="relative z-10">Home</span>
          </button>

          {/* Services Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={() => { handleMouseEnter('services'); setHoveredNav('services'); }}
          >
            <button
              id="nav-item-services-trigger"
              onClick={() => handleNavClick('services')}
              className={`relative flex items-center gap-1 font-sans text-sm tracking-wide px-2.5 py-2 rounded-xl transition-colors ${getLinkClass(isServicesActive)}`}
            >
              {highlight === 'services' && (
                <motion.span layoutId="nav-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} className={`absolute inset-0 rounded-xl ${isDarkTheme ? 'bg-white/15' : 'bg-emerald-50'}`} />
              )}
              <span className="relative z-10 flex items-center gap-1">
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'services' ? 'rotate-180' : ''}`} />
              </span>
            </button>
            {openDropdown === 'services' && renderDropdownPanel(servicesDropdown, 'services', 'View Services Overview')}
          </div>

          {/* Products Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={() => { handleMouseEnter('products'); setHoveredNav('products'); }}
          >
            <button
              id="nav-item-products-trigger"
              onClick={() => handleNavClick('products')}
              className={`relative flex items-center gap-1 font-sans text-sm tracking-wide px-2.5 py-2 rounded-xl transition-colors ${getLinkClass(isProductsActive)}`}
            >
              {highlight === 'products' && (
                <motion.span layoutId="nav-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} className={`absolute inset-0 rounded-xl ${isDarkTheme ? 'bg-white/15' : 'bg-emerald-50'}`} />
              )}
              <span className="relative z-10 flex items-center gap-1">
                Products
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'products' ? 'rotate-180' : ''}`} />
              </span>
            </button>
            {openDropdown === 'products' && renderDropdownPanel(productsDropdown, 'products', 'View Products Catalog')}
          </div>

          {/* About Us Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={() => { handleMouseEnter('about'); setHoveredNav('about'); }}
          >
            <button
              id="nav-item-about-trigger"
              onClick={() => handleNavClick('about')}
              className={`relative flex items-center gap-1 font-sans text-sm tracking-wide px-2.5 py-2 rounded-xl transition-colors ${getLinkClass(isAboutActive)}`}
            >
              {highlight === 'about' && (
                <motion.span layoutId="nav-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} className={`absolute inset-0 rounded-xl ${isDarkTheme ? 'bg-white/15' : 'bg-emerald-50'}`} />
              )}
              <span className="relative z-10 flex items-center gap-1">
                About
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'about' ? 'rotate-180' : ''}`} />
              </span>
            </button>
            {openDropdown === 'about' && renderDropdownPanel(aboutDropdown, 'about', 'View About Us Overview')}
          </div>

          {/* Projects */}
          <button
            id="nav-item-projects"
            onMouseEnter={() => { setHoveredNav('projects'); setOpenDropdown(null); }}
            onClick={() => handleNavClick('projects')}
            className={`relative font-sans text-sm tracking-wide px-2.5 py-2 rounded-xl transition-colors ${getLinkClass(currentPage === 'projects')}`}
          >
            {highlight === 'projects' && (
              <motion.span layoutId="nav-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} className={`absolute inset-0 rounded-xl ${isDarkTheme ? 'bg-white/15' : 'bg-emerald-50'}`} />
            )}
            <span className="relative z-10">Projects</span>
          </button>

          {/* Shop */}
          <button
            id="nav-item-shop"
            onMouseEnter={() => { setHoveredNav('shop'); setOpenDropdown(null); }}
            onClick={() => handleNavClick('shop')}
            className={`relative font-sans text-sm tracking-wide px-2.5 py-2 rounded-xl transition-colors ${getLinkClass(currentPage === 'shop')}`}
          >
            {highlight === 'shop' && (
              <motion.span layoutId="nav-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} className={`absolute inset-0 rounded-xl ${isDarkTheme ? 'bg-white/15' : 'bg-emerald-50'}`} />
            )}
            <span className="relative z-10">Shop</span>
          </button>

          {/* Contact */}
          <button
            id="nav-item-contact"
            onMouseEnter={() => { setHoveredNav('contact'); setOpenDropdown(null); }}
            onClick={() => handleNavClick('contact')}
            className={`relative font-sans text-sm tracking-wide px-2.5 py-2 rounded-xl transition-colors ${getLinkClass(currentPage === 'contact')}`}
          >
            {highlight === 'contact' && (
              <motion.span layoutId="nav-pill" transition={{ type: 'spring', stiffness: 420, damping: 34 }} className={`absolute inset-0 rounded-xl ${isDarkTheme ? 'bg-white/15' : 'bg-emerald-50'}`} />
            )}
            <span className="relative z-10">Contact</span>
          </button>
        </div>

        {/* ISLAND 3 — ACTIONS (desktop) */}
        <div className={`${islandShell} hidden min-[960px]:flex items-center gap-1.5 px-2 py-2`}>

          {/* Live Farm Monitor */}
          <div className="relative">
            <button
              onClick={() => {
                setIsTelemetryOpen(!isTelemetryOpen);
                setOpenDropdown(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 border ${
                isTelemetryOpen
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
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
              <span className="hidden min-[1280px]:inline">Live Farm Monitor</span>
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
            className="relative overflow-hidden flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium transition-all duration-300 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 group"
          >
            <motion.span
              animate={{ x: ['-120%', '220%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', repeatDelay: 1.6 }}
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25"
            />
            <span className="relative z-10 flex items-center gap-2">
              Start Project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>
        </div>

        {/* MOBILE HAMBURGER ISLAND */}
        <button
          id="nav-mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className={`${islandShell} min-[960px]:hidden ml-auto flex items-center justify-center w-12 h-12 transition-colors ${
            isDarkTheme ? 'text-white' : 'text-gray-700'
          }`}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU DRAWER (floating card) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="min-[960px]:hidden mx-4 mt-3 bg-white border border-gray-100 rounded-3xl shadow-2xl z-50 overflow-y-auto max-h-[calc(100vh-120px)]"
          >
          <div className="flex flex-col p-5 gap-3">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
