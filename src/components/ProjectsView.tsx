import { useState, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  MapPin,
  Layers,
  X,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Award,
  CloudRain,
  ShieldCheck,
  Users,
  CheckSquare,
  Truck,
  Wind,
  Globe,
  Sparkles
} from 'lucide-react';
import { PageId, Project } from '../types';
import { PROJECTS_DATA } from '../data';

interface ProjectsViewProps {
  onNavigate: (pageId: PageId) => void;
  selectedProjectId: string;
  onSelectProjectId: (id: string) => void;
}

export default function ProjectsView({
  onNavigate,
  selectedProjectId,
  onSelectProjectId
}: ProjectsViewProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [focused, setFocused] = useState(0);

  // Mouse-parallax for the cinematic stage image
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), { stiffness: 120, damping: 20 });
  const ty = useSpring(useTransform(my, [-0.5, 0.5], [-16, 16]), { stiffness: 120, damping: 20 });

  const handleStageMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const resetStage = () => { mx.set(0); my.set(0); };

  const getOutcomeIcon = (projectId: string, index: number) => {
    if (projectId === 'kegalle') {
      switch (index) {
        case 0: return <CloudRain className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        case 1: return <Layers className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        case 2: return <Award className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        default: return <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      }
    }
    if (projectId === 'rise-bellwood') {
      switch (index) {
        case 0: return <Users className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        case 1: return <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        case 2: return <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        default: return <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      }
    }
    if (projectId === 'rajagiriya') {
      switch (index) {
        case 0: return <Globe className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        case 1: return <Wind className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        case 2: return <Truck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
        default: return <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      }
    }
    return <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
  };

  // Sync with selectedProjectId deep-links from Home page
  useEffect(() => {
    if (selectedProjectId) {
      const idx = PROJECTS_DATA.findIndex(p => p.id === selectedProjectId);
      if (idx >= 0) {
        setActiveProject(PROJECTS_DATA[idx]);
        setFocused(idx);
      }
    }
  }, [selectedProjectId]);

  const handleOpenProject = (project: Project) => {
    setActiveProject(project);
    onSelectProjectId(project.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseProject = () => {
    setActiveProject(null);
    onSelectProjectId('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const focusedProject = PROJECTS_DATA[focused];

  /* =============================================================== */
  /* DETAIL — full-bleed cinematic case study                        */
  /* =============================================================== */
  if (activeProject) {
    return (
      <div className="min-h-screen text-[#1F2321] overflow-x-clip">
        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-end overflow-hidden">
          <img
            src={activeProject.image}
            alt={activeProject.title}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-emerald-950/20" />

          <div className="relative z-10 max-w-6xl mx-auto w-full px-6 pb-14 pt-28">
            <button
              onClick={handleCloseProject}
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors font-medium group mb-10"
            >
              <X className="w-4 h-4" />
              Close & return to gallery
            </button>

            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-bold uppercase tracking-wider mb-5"
            >
              <MapPin className="w-3.5 h-3.5" />
              {activeProject.location}
            </motion.span>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-mono text-xs text-emerald-300 font-bold uppercase tracking-[0.25em] mb-4"
            >
              {activeProject.type}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-sans text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.92] max-w-4xl"
            >
              {activeProject.title}
            </motion.h1>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6">
          {/* Stat band */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-emerald-100 rounded-3xl overflow-hidden -mt-10 relative z-20 shadow-xl shadow-emerald-900/10 border border-emerald-100">
            {activeProject.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white p-5 md:p-6 flex flex-col justify-center"
              >
                <span className="font-mono text-2xl md:text-3xl font-black text-emerald-600 leading-none">{stat.value}</span>
                <span className="font-sans text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Body */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16">
            <div className="lg:col-span-7">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gray-400">The Brief</span>
              <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight mt-2 mb-5">
                How we cultivated it
              </h2>
              <p className="font-sans text-base text-gray-600 leading-relaxed font-light">
                {activeProject.fullDescription}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="glass rounded-3xl p-7 sticky top-8">
                <h3 className="font-sans text-sm font-bold text-gray-900 flex items-center gap-2 mb-5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Key project outcomes
                </h3>
                <div className="flex flex-col gap-4">
                  {activeProject.outcomes.map((outcome, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="flex gap-3 items-start text-xs text-gray-700 leading-relaxed"
                    >
                      {getOutcomeIcon(activeProject.id, idx)}
                      <span className="font-sans font-light">{outcome}</span>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="mt-7 w-full px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 group shadow-lg shadow-emerald-600/15"
                >
                  Start a similar project
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </section>

          {/* Other projects */}
          <section className="pb-20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-sans text-lg font-bold text-gray-900">More deployments</h3>
              <button onClick={handleCloseProject} className="text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" /> All projects
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PROJECTS_DATA.filter(p => p.id !== activeProject.id).map(p => (
                <button
                  key={p.id}
                  onClick={() => handleOpenProject(p)}
                  className="group relative h-40 rounded-2xl overflow-hidden text-left border-2 border-white shadow-md"
                >
                  <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <span className="font-mono text-[9px] text-emerald-300 uppercase tracking-wider">{p.location}</span>
                    <span className="font-sans text-sm font-bold text-white leading-snug">{p.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  /* =============================================================== */
  /* GALLERY — interactive cinematic command deck                    */
  /* =============================================================== */
  return (
    <div className="min-h-screen text-[#1F2321] px-6 overflow-x-clip">
      <div className="max-w-7xl mx-auto py-12 lg:py-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-700 font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Showcased Deployments
            </div>
            <h1 className="font-sans text-4xl md:text-6xl font-black tracking-tighter text-gray-950 leading-[0.9]">
              Cultivated
              <br />
              <span className="text-emerald-600">success stories</span>
            </h1>
          </div>
          <p className="font-sans text-gray-500 font-light text-sm max-w-sm leading-relaxed">
            Commercial greenhouses, community farms and automated mushroom factories across Sri Lanka. Select a case to
            explore it.
          </p>
        </div>

        {/* Command deck */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(320px,400px)] gap-5 items-stretch">

          {/* Cinematic stage */}
          <div
            onMouseMove={handleStageMove}
            onMouseLeave={resetStage}
            className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl shadow-emerald-900/15 min-h-[420px] lg:min-h-[560px] group"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={focusedProject.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <motion.img
                  style={{ x: tx, y: ty, scale: 1.12 }}
                  src={focusedProject.image}
                  alt={focusedProject.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/40 to-emerald-950/10" />
              </motion.div>
            </AnimatePresence>

            {/* Big index watermark */}
            <span className="absolute top-5 right-7 font-mono text-7xl md:text-8xl font-black text-white/10 leading-none pointer-events-none select-none">
              0{focused + 1}
            </span>

            {/* Stage content */}
            <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={focusedProject.id + '-info'}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-[11px] font-bold uppercase tracking-wider mb-4">
                    <MapPin className="w-3 h-3" />
                    {focusedProject.location}
                  </span>
                  <p className="font-mono text-[11px] text-emerald-300 font-bold uppercase tracking-[0.25em] mb-2">
                    {focusedProject.type}
                  </p>
                  <h2 className="font-sans text-3xl md:text-4xl font-black text-white tracking-tight leading-[0.95] mb-3 max-w-xl">
                    {focusedProject.title}
                  </h2>
                  <p className="font-sans text-sm text-white/75 leading-relaxed font-light max-w-lg mb-6">
                    {focusedProject.summary}
                  </p>

                  {/* Animated stat readout */}
                  <div className="flex flex-wrap gap-x-8 gap-y-3 mb-7">
                    {focusedProject.stats.slice(0, 3).map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                      >
                        <div className="font-mono text-2xl md:text-3xl font-black text-white leading-none">{stat.value}</div>
                        <div className="font-sans text-[10px] text-emerald-200/70 uppercase tracking-wider mt-1.5">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleOpenProject(focusedProject)}
                    className="w-fit px-6 py-3.5 bg-white text-emerald-800 hover:bg-emerald-50 font-bold rounded-xl text-sm transition-all flex items-center gap-2 group/btn shadow-lg"
                  >
                    Open full case study
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Selector rail */}
          <div className="flex flex-col gap-3">
            {PROJECTS_DATA.map((p, i) => {
              const isActive = i === focused;
              return (
                <button
                  key={p.id}
                  id={`project-card-gallery-${p.id}`}
                  onMouseEnter={() => setFocused(i)}
                  onClick={() => (isActive ? handleOpenProject(p) : setFocused(i))}
                  className={`group relative flex-1 text-left rounded-3xl p-5 border overflow-hidden transition-all duration-300 ${
                    isActive
                      ? 'bg-white border-emerald-200 shadow-lg shadow-emerald-900/5'
                      : 'glass border-transparent hover:border-emerald-100'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="proj-marker"
                      className="absolute left-0 top-5 bottom-5 w-1 rounded-full bg-emerald-500"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <div className="flex items-start gap-4 pl-2">
                    <span className={`font-mono text-lg font-black shrink-0 transition-colors ${isActive ? 'text-emerald-600' : 'text-gray-300'}`}>
                      0{i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className={`w-3 h-3 shrink-0 ${isActive ? 'text-emerald-500' : 'text-gray-300'}`} />
                        <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 truncate">{p.location}</span>
                      </div>
                      <h3 className={`font-sans text-base font-bold leading-snug transition-colors ${isActive ? 'text-gray-950' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {p.title}
                      </h3>

                      {/* Reveal on active: quick stats + open hint */}
                      <motion.div
                        initial={false}
                        animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center gap-4 mt-3">
                          {p.stats.slice(0, 2).map((s) => (
                            <div key={s.label}>
                              <div className="font-mono text-sm font-bold text-emerald-600 leading-none">{s.value}</div>
                              <div className="font-sans text-[9px] text-gray-400 uppercase tracking-wider mt-1">{s.label}</div>
                            </div>
                          ))}
                          <span className="ml-auto flex items-center gap-1 text-xs font-bold text-emerald-700">
                            Open <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer hint */}
        <p className="text-center font-sans text-xs text-gray-400 font-light mt-8">
          Hover a case to preview · click to open the full study
        </p>
      </div>
    </div>
  );
}
