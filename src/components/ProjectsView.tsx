import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Truck,
  Wind,
  Globe,
  Sparkles,
  Building2,
  Sprout,
  Leaf
} from 'lucide-react';
import { PageId, Project, ProjectCategory } from '../types';
import { PROJECTS_DATA } from '../data';

interface ProjectsViewProps {
  onNavigate: (pageId: PageId) => void;
  selectedProjectId: string;
  onSelectProjectId: (id: string) => void;
}

const CATEGORY_META: { id: ProjectCategory; label: string; blurb: string; icon: typeof Building2 }[] = [
  { id: 'greenhouse', label: 'Greenhouse Solutions', blurb: 'Commercial, climate-controlled greenhouse installations across the island.', icon: Building2 },
  { id: 'mushroom', label: 'Mushroom Projects', blurb: 'Automated indoor mushroom cultivation facilities.', icon: Sprout },
  { id: 'coconut', label: 'Coconut Farm', blurb: 'Smart automation for coconut estates.', icon: Leaf }
];

const hasCaseStudy = (p: Project) => Boolean(p.fullDescription);

export default function ProjectsView({
  onNavigate,
  selectedProjectId,
  onSelectProjectId
}: ProjectsViewProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const getOutcomeIcon = (projectId: string, index: number) => {
    if (projectId === 'kegalle') {
      return [<CloudRain className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />, <Layers className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />, <Award className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />][index]
        ?? <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
    }
    if (projectId === 'rajagiriya') {
      return [<Globe className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />, <Wind className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />, <Truck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />][index]
        ?? <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
    }
    return <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
  };

  // Deep-link from the Home page — only projects with a full case study can open.
  useEffect(() => {
    if (selectedProjectId) {
      const proj = PROJECTS_DATA.find((p) => p.id === selectedProjectId);
      if (proj && hasCaseStudy(proj)) setActiveProject(proj);
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

  /* =============================================================== */
  /* DETAIL — full case study (only reachable for documented projects) */
  /* =============================================================== */
  if (activeProject) {
    const p = activeProject;
    const catIcon = CATEGORY_META.find((c) => c.id === p.category)?.icon ?? Building2;
    const CatIcon = catIcon;

    return (
      <div className="min-h-screen text-[#1F2321] overflow-x-clip">
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden">
          {p.image ? (
            <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-emerald-950/20" />

          <div className="relative z-10 max-w-[96rem] mx-auto w-full px-6 pb-14 pt-28">
            <button
              onClick={handleCloseProject}
              className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors font-medium mb-10"
            >
              <X className="w-4 h-4" />
              Close & return to projects
            </button>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-bold uppercase tracking-wider mb-5">
              <MapPin className="w-3.5 h-3.5" />
              {p.location}
            </span>

            <p className="font-mono text-xs text-emerald-300 font-bold uppercase tracking-[0.25em] mb-4">{p.type}</p>

            <h1 className="font-sans text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.92] max-w-4xl">
              {p.title}
            </h1>
          </div>
        </section>

        <div className="max-w-[96rem] mx-auto px-6">
          {/* Stat band */}
          {p.stats && p.stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-emerald-100 rounded-3xl overflow-hidden -mt-10 relative z-20 shadow-xl shadow-emerald-900/10 border border-emerald-100">
              {p.stats.map((stat, idx) => (
                <div key={idx} className="bg-white p-5 md:p-6 flex flex-col justify-center">
                  <span className="font-mono text-2xl md:text-3xl font-black text-emerald-600 leading-none">{stat.value}</span>
                  <span className="font-sans text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2">{stat.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Body */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-16">
            <div className="lg:col-span-7">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-gray-400">The Brief</span>
              <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight mt-2 mb-5">
                How we cultivated it
              </h2>
              <p className="font-sans text-base text-gray-600 leading-relaxed font-light">{p.fullDescription}</p>
            </div>

            {p.outcomes && p.outcomes.length > 0 && (
              <div className="lg:col-span-5">
                <div className="glass rounded-3xl p-7 sticky top-8">
                  <h3 className="font-sans text-sm font-bold text-gray-900 flex items-center gap-2 mb-5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    Key project outcomes
                  </h3>
                  <div className="flex flex-col gap-4">
                    {p.outcomes.map((outcome, idx) => (
                      <div key={idx} className="flex gap-3 items-start text-xs text-gray-700 leading-relaxed">
                        {getOutcomeIcon(p.id, idx)}
                        <span className="font-sans font-light">{outcome}</span>
                      </div>
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
            )}
          </section>

          {/* Other documented deployments */}
          <section className="pb-20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-sans text-lg font-bold text-gray-900">More deployments</h3>
              <button onClick={handleCloseProject} className="text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" /> All projects
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PROJECTS_DATA.filter((o) => o.id !== p.id && hasCaseStudy(o)).map((o) => (
                <button
                  key={o.id}
                  onClick={() => handleOpenProject(o)}
                  className="group relative h-40 rounded-2xl overflow-hidden text-left border-2 border-white shadow-md"
                >
                  {o.image ? (
                    <img src={o.image} alt={o.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-800" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <CatIcon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <span className="font-mono text-[9px] text-emerald-300 uppercase tracking-wider">{o.location}</span>
                    <span className="font-sans text-sm font-bold text-white leading-snug">{o.title}</span>
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
  /* GALLERY — projects grouped by category                          */
  /* =============================================================== */
  return (
    <div className="min-h-screen text-[#1F2321] px-6 overflow-x-clip">
      <div className="max-w-[96rem] mx-auto py-12 lg:py-16">

        {/* Video banner hero */}
        <div className="relative overflow-hidden rounded-3xl bg-emerald-950 aspect-video md:aspect-[21/9] mb-14">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/Video/greenhouse-inside.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/45 to-emerald-950/40" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 max-w-3xl">
            <div className="inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-300 font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Our Work
            </div>
            <h1 className="font-sans text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-white leading-[0.95] mb-3 drop-shadow">
              Projects across <span className="text-emerald-400">Sri Lanka</span>
            </h1>
            <p className="font-sans text-gray-100 font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
              Greenhouse installations, indoor mushroom farms and smart coconut estates — grouped by the kind of work we do.
            </p>
          </div>
        </div>

        {/* Category sections */}
        <div className="flex flex-col gap-16">
          {CATEGORY_META.map((cat) => {
            const projects = PROJECTS_DATA.filter((p) => p.category === cat.id);
            if (projects.length === 0) return null;
            const CatIcon = cat.icon;

            return (
              <section key={cat.id}>
                {/* Category heading */}
                <div className="flex items-start gap-3 border-b border-gray-100 pb-4 mb-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <CatIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-sans text-2xl md:text-3xl font-extrabold text-gray-950 tracking-tight">{cat.label}</h2>
                      <span className="font-mono text-xs text-gray-400 font-bold">{projects.length}</span>
                    </div>
                    <p className="font-sans text-sm text-gray-500 font-light mt-0.5">{cat.blurb}</p>
                  </div>
                </div>

                {/* Project cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {projects.map((p) => {
                    const documented = hasCaseStudy(p);
                    const CardTag = documented ? 'button' : 'div';

                    return (
                      <CardTag
                        key={p.id}
                        {...(documented ? { onClick: () => handleOpenProject(p) } : {})}
                        className={`group text-left glass rounded-3xl overflow-hidden flex flex-col transition-all duration-300 ${
                          documented ? 'cursor-pointer hover:shadow-xl hover:shadow-emerald-900/5' : ''
                        }`}
                      >
                        {/* Visual */}
                        <div className="relative h-48 overflow-hidden">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.title}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-200/60">
                              <CatIcon className="h-12 w-12 text-emerald-500/50" />
                            </div>
                          )}
                          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-lg bg-white/90 backdrop-blur-sm px-2.5 py-1 font-mono text-[9px] font-bold text-emerald-800 uppercase tracking-wide">
                            <MapPin className="h-3 w-3" />
                            {p.location}
                          </span>
                        </div>

                        {/* Body */}
                        <div className="p-5 flex flex-col gap-2 flex-1">
                          <span className="font-mono text-[10px] text-emerald-600 uppercase tracking-widest font-semibold">{p.type}</span>
                          <h3 className="font-sans text-base font-bold text-gray-950 leading-snug">{p.title}</h3>
                          {p.summary && (
                            <p className="font-sans text-xs text-gray-500 font-light leading-relaxed line-clamp-3">{p.summary}</p>
                          )}
                          <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                            {documented ? (
                              <>View case study <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></>
                            ) : (
                              <span className="text-gray-400 font-medium">Case study coming soon</span>
                            )}
                          </span>
                        </div>
                      </CardTag>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-emerald-600/15 group"
          >
            Start your project
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
