import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Leaf, 
  Check, 
  ArrowRight, 
  Send, 
  CheckCircle, 
  Newspaper 
} from 'lucide-react';
import { PageId } from '../types';
import { NEWS_DATA } from '../data';
import StatsCounter from './StatsCounter';

interface AboutViewProps {
  onNavigate: (pageId: PageId) => void;
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subEmail, setSubEmail] = useState('');

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (subEmail.trim() && subEmail.includes('@')) {
      setEmailSubscribed(true);
      setSubEmail('');
    }
  };

  return (
    <div className="bg-[#FAFDFB]/10 min-h-screen text-[#1F2321] py-12 px-6">
      <div className="w-full mx-auto">
        
        {/* 1. HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <div className="text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold">
              Our Identity
            </div>
            <h1 className="font-sans text-4xl font-extrabold tracking-tight text-gray-950 leading-none">
              Pioneering Sustainable Agritech
            </h1>
            <p className="font-sans text-gray-500 leading-relaxed font-light text-base md:text-lg">
              AiGROW was established in 2018 as a subsidiary of CodeGen International with a clear vision: to merge Software & Electronics with agricultural sciences. Led by Dr. Harsha Subasinghe, we engineer precision solutions that secure food safety, increase agricultural efficiency, and build climate resilience across the island.
            </p>
            <button
              onClick={() => {
                onNavigate('about-story');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-fit px-5 py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100/80 rounded-xl text-xs font-bold transition-all flex items-center gap-2 group border border-emerald-100"
            >
              Read Our Full Story & History
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-gray-100/50">
              <img 
                src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1000" 
                alt="Agricultural fields and hands holding sprout"
                className="w-full h-80 md:h-[380px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-emerald-950/10 mix-blend-multiply"></div>
            </div>
          </motion.div>
        </section>

        {/* 2. STATS BAR (ANIMATED) */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-8 md:p-12 shadow-xl shadow-emerald-900/5 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-20"
        >
          <div className="flex flex-col items-center">
            <StatsCounter target={220} suffix="+" />
            <span className="font-sans text-sm font-semibold text-gray-800 mt-2">Active Customers</span>
            <span className="font-sans text-xs text-gray-400 mt-1 font-light">Commercial & individual clients</span>
          </div>

          <div className="flex flex-col items-center">
            <StatsCounter target={10} suffix="+" />
            <span className="font-sans text-sm font-semibold text-gray-800 mt-2">Large-Scale Projects</span>
            <span className="font-sans text-xs text-gray-400 mt-1 font-light">Fully commissioned smart greenhouses</span>
          </div>

          <div className="flex flex-col items-center">
            <StatsCounter target={8} suffix="+" />
            <span className="font-sans text-sm font-semibold text-gray-800 mt-2">Years of Tech Excellence</span>
            <span className="font-sans text-xs text-gray-400 mt-1 font-light">Pioneering agritech since 2018</span>
          </div>
        </motion.section>

        {/* 3. COMMITMENT TO SRI LANKA SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }}
          className="bg-emerald-50 rounded-3xl p-8 md:p-12 border border-emerald-100/50 mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/60 text-emerald-800 text-xs font-semibold uppercase tracking-wider w-fit">
              Sovereign Supply Chains
            </div>
            
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
              Our Sovereign Commitment to Sri Lanka
            </h2>
            
            <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
              By designing, manufacturing, and assembling our sensor pods, controllers, and greenhouses locally in Sri Lanka, we completely bypass foreign supply chain hurdles and currency instabilities.
            </p>

            <button
              onClick={() => {
                onNavigate('about-commitment');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-fit px-5 py-2.5 bg-white text-emerald-800 hover:bg-emerald-100/30 rounded-xl text-xs font-bold transition-all flex items-center gap-2 group border border-emerald-200"
            >
              Learn More About Our Commitment
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>

            <div className="flex flex-col gap-3 mt-1">
              {[
                'Local design, assembly, and software maintenance inside Trace Expert City, Colombo.',
                'Utilizing Sri Lankan materials including upcycled coconut husk substrate (coco-peat).',
                'Empowering dry-zone farmers in Vavuniya and Hambantota with smart water units.',
                'Fostering high-paying agritech engineering roles for local university graduates.'
              ].map((val, index) => (
                <div key={index} className="flex gap-2.5 items-start text-xs text-gray-700">
                  <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-sans font-light">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800" 
                alt="Beautiful local fields in Sri Lanka"
                className="w-full h-72 md:h-[350px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-emerald-950/15"></div>
            </div>
          </div>

        </motion.section>

        {/* 4. NEWS & AWARDS GRID */}
        <section className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-10"
          >
            <div>
              <div className="text-emerald-600 font-mono text-xs uppercase tracking-wider font-semibold mb-2">
                Company News
              </div>
              <h2 className="font-sans text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                Latest Updates & Press Coverage
              </h2>
            </div>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="about-news-grid">
            {NEWS_DATA.map((item, index) => (
              <motion.div
                key={item.id}
                id={`news-card-${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5"
              >
                <div>
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wide">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-medium font-mono">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>

                    <h3 className="font-sans text-base font-bold text-gray-950 leading-snug">
                      {item.title}
                    </h3>

                    <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <button 
                    onClick={() => {
                      onNavigate('about-news');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1 group transition-colors"
                  >
                    Read Full Coverage
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. BLOG TEASER SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }}
          className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-xl shadow-gray-100/25 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="font-mono text-xs text-emerald-600 font-bold uppercase tracking-widest block">
              Knowledge Sharing
            </span>
            <h2 className="font-sans text-2xl font-bold text-gray-950 tracking-tight leading-none">
              Cultivate Wisdom with AiGROW Digest
            </h2>
            <p className="font-sans text-sm text-gray-500 leading-relaxed font-light">
              We periodically publish field research digests detailing hydroponic tomato nutrient recipes, mushroom room humidity algorithms, and real-world farm case studies. Sign up to get our agritech publications delivered to your inbox.
            </p>
          </div>

          <div className="lg:col-span-5">
            {emailSubscribed ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3.5 text-emerald-800 text-sm font-medium">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold">Subscription Successful!</h4>
                  <p className="text-xs text-emerald-700 mt-0.5">Thank you for subscribing to the AiGROW Digest.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your professional email"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  className="grow px-4.5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-sans focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-gray-800"
                />
                <button
                  type="submit"
                  className="px-5 py-3.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center shrink-0"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </form>
            )}
            <p className="font-sans text-[10px] text-gray-400 text-center mt-3 font-medium tracking-wide">
              No spam. Unsubscribe anytime. Operated under strict CodeGen data guidelines.
            </p>
          </div>

        </motion.section>

      </div>
    </div>
  );
}
