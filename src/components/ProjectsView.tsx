import { useState, useEffect } from 'react';
import { 
  MapPin, 
  Layers, 
  Calendar, 
  X, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Award,
  CloudRain,
  ShieldCheck,
  Users,
  CheckSquare,
  Truck,
  Wind,
  Clock,
  Activity,
  Globe
} from 'lucide-react';
import { PageId, Project } from '../types';
import { PROJECTS_DATA } from '../data';
import Reveal from './Reveal';

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
      const match = PROJECTS_DATA.find(p => p.id === selectedProjectId);
      if (match) {
        setActiveProject(match);
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

  return (
    <div className="bg-[#FAFDFB]/10 min-h-screen py-12 px-6">
      <div className="w-full mx-auto">
        
        {activeProject ? (
          /* PROJECT DETAILS PAGE VIEW */
          <div className="flex flex-col gap-8">
            {/* Back button */}
            <button
              onClick={handleCloseProject}
              className="w-fit flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-all font-semibold"
            >
              <X className="w-4 h-4" />
              Close Project Details & Return
            </button>

            {/* High level details sheet */}
            <div className="glass rounded-3xl p-8 md:p-12 shadow-xl shadow-emerald-900/5 grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Image and quick stats */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="relative rounded-2xl overflow-hidden shadow-md aspect-video img-zoom-wrap">
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover img-zoom"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold uppercase tracking-wider">
                    {activeProject.location}
                  </div>
                </div>

                {/* Stat grid */}
                <div className="grid grid-cols-2 gap-4">
                  {activeProject.stats.map((stat, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                      <span className="font-sans text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                        {stat.label}
                      </span>
                      <span className="font-mono text-xl md:text-2xl font-bold text-emerald-600 leading-none">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Long details and outcomes */}
              <div className="lg:col-span-6 flex flex-col gap-6 justify-between">
                <div>
                  <span className="font-mono text-xs text-emerald-600 uppercase tracking-widest font-semibold block mb-2">
                    {activeProject.type}
                  </span>
                  
                  <h1 className="font-sans text-3xl font-extrabold text-gray-950 tracking-tight leading-tight mb-4">
                    {activeProject.title}
                  </h1>

                  <p className="font-sans text-gray-600 leading-relaxed font-light text-sm md:text-base border-t border-gray-50 pt-4">
                    {activeProject.fullDescription}
                  </p>
                </div>

                {/* Project outcomes checklist */}
                <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                  <h3 className="font-sans text-sm font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    Key Project Outcomes
                  </h3>
                  
                  <div className="flex flex-col gap-3">
                    {activeProject.outcomes.map((outcome, idx) => (
                      <div key={idx} className="flex gap-3 items-start text-xs text-gray-700 leading-relaxed">
                        {getOutcomeIcon(activeProject.id, idx)}
                        <span className="font-sans font-light">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-6 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => {
                      onNavigate('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-xs transition-all flex items-center gap-2"
                  >
                    Start Similar Project
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCloseProject}
                    className="px-6 py-3 bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium rounded-xl text-xs transition-all border border-gray-100"
                  >
                    Back to Gallery
                  </button>
                </div>

              </div>

            </div>
          </div>
        ) : (
          /* PROJECTS GALLERY GRID VIEW */
          <div className="flex flex-col gap-10">
            {/* Gallery title */}
            <Reveal className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
                Our Showcased Deploys
              </div>
              <h1 className="font-sans text-4xl font-extrabold tracking-tight text-gray-950 mb-4">
                Cultivated Success Stories
              </h1>
              <p className="font-sans text-gray-500 font-light text-base md:text-lg">
                Explore our commercial greenhouse structures, community farms, and automated mushroom factories across Sri Lanka.
              </p>
            </Reveal>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="projects-masonry-grid">
              {PROJECTS_DATA.map((proj, idx) => (
                <Reveal
                  key={proj.id}
                  delay={(idx % 3) * 0.1}
                  className="glass rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1"
                >
                  <div id={`project-card-gallery-${proj.id}`}>
                    <div className="h-56 relative overflow-hidden img-zoom-wrap">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover img-zoom"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-lg text-[9px] font-mono font-bold text-emerald-800 uppercase tracking-wide">
                        {proj.location}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col gap-3">
                      <span className="font-mono text-[10px] text-emerald-600 uppercase tracking-widest font-semibold">
                        {proj.type}
                      </span>
                      
                      <h3 className="font-sans text-base font-bold text-gray-950 leading-snug">
                        {proj.title}
                      </h3>

                      <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">
                        {proj.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 mt-auto flex items-center justify-between border-t border-gray-50/50">
                    <button
                      id={`project-gallery-btn-view-${proj.id}`}
                      onClick={() => handleOpenProject(proj)}
                      className="text-xs text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1 group transition-colors mt-4"
                    >
                      View Project Details
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
