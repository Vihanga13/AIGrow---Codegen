import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../../types';
import { NEWS_DATA } from '../../data';
import { Search, Calendar, Clock, ArrowRight, ArrowLeft, ArrowUpRight, BookOpen, CheckCircle, Send } from 'lucide-react';
import CTABanner from '../CTABanner';

interface AboutNewsPageProps {
  onNavigate: (pageId: PageId) => void;
}

export default function AboutNewsPage({ onNavigate }: AboutNewsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subEmail, setSubEmail] = useState('');

  const categories = ['All', 'Award', 'Innovation', 'Sustainability'];

  const filteredNews = NEWS_DATA.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // The first match becomes the featured splash; the rest fill the mosaic
  const [featured, ...rest] = filteredNews;

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (subEmail.trim() && subEmail.includes('@')) {
      setEmailSubscribed(true);
      setSubEmail('');
    }
  };

  return (
    <div className="min-h-screen text-[#1F2321] py-12 px-6 overflow-x-clip">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('about')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors font-medium group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to About Overview
          </button>
        </div>

        {/* Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-gray-950 pb-6 mb-10">
          <div>
            <span className="font-mono text-xs text-emerald-700 font-bold uppercase tracking-[0.25em] block mb-2">
              Newsroom
            </span>
            <h1 className="font-sans text-4xl sm:text-6xl font-extrabold text-gray-950 tracking-tight leading-[0.9]">
              The AiGROW Press
            </h1>
          </div>
          <p className="font-sans text-sm text-gray-500 font-light max-w-sm leading-relaxed">
            Scaling smart greenhouses, field-testing LoRa sensors and collaborating with national institutions to
            secure organic agritech innovation.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 rounded-full text-xs font-bold font-sans transition-colors duration-200 ${
                  selectedCategory === cat ? 'text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {selectedCategory === cat && (
                  <motion.span
                    layoutId="news-cat-pill"
                    className="absolute inset-0 bg-emerald-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search press articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/70 border border-gray-200 rounded-full text-xs font-sans focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-gray-800 font-medium"
            />
          </div>
        </div>

        {filteredNews.length > 0 ? (
          <div className="mb-20">
            {/* Featured splash */}
            <AnimatePresence mode="wait">
              {featured && (
                <motion.button
                  key={featured.id}
                  onClick={() => onNavigate('contact')}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="group relative w-full text-left rounded-4xl overflow-hidden border-4 border-white shadow-2xl shadow-emerald-900/10 mb-6 h-[380px] md:h-[460px] block"
                >
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-10 max-w-3xl">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-mono font-bold uppercase tracking-wider">
                        {featured.category}
                      </span>
                      <span className="text-[11px] font-mono text-white/70 uppercase tracking-wider">Featured</span>
                    </div>
                    <h2 className="font-sans text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
                      {featured.title}
                    </h2>
                    <p className="font-sans text-sm text-white/80 leading-relaxed font-light max-w-2xl mb-4">
                      {featured.summary}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-mono text-white/70">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                      <span className="ml-auto hidden sm:flex items-center gap-1 text-white font-bold group-hover:gap-2 transition-all">
                        Read coverage <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Mosaic of the rest */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((item, i) => (
                  <motion.button
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    onClick={() => onNavigate('contact')}
                    className="group text-left glass rounded-3xl overflow-hidden flex flex-col hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300"
                  >
                    <div className="h-44 relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-lg text-[10px] font-mono font-extrabold text-emerald-700 uppercase tracking-wide">
                        {item.category}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <div className="flex items-center gap-3 text-[10px] text-gray-400 font-mono font-semibold">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{item.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{item.readTime}</span>
                      </div>
                      <h3 className="font-sans text-sm font-extrabold text-gray-950 leading-snug">{item.title}</h3>
                      <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">{item.summary}</p>
                      <span className="mt-auto pt-2 text-xs text-emerald-600 font-bold flex items-center gap-1">
                        Read full coverage
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-3xl mb-20">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-sm font-bold text-gray-800">No press articles match your filter.</h3>
            <p className="text-xs text-gray-400 mt-1">Try resetting the search query or selecting a different category.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-5 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Newsletter */}
        <section className="relative glass-green rounded-3xl p-8 md:p-14 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="absolute -left-10 -top-10 w-48 h-48 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
          <div className="lg:col-span-7 flex flex-col gap-4 relative z-10">
            <span className="font-mono text-xs text-emerald-700 font-bold uppercase tracking-[0.25em]">
              Knowledge Sharing
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-gray-950 tracking-tight leading-tight">
              Cultivate wisdom with the AiGROW Digest
            </h2>
            <p className="font-sans text-sm text-gray-500 leading-relaxed font-light max-w-xl">
              Field research digests on hydroponic tomato nutrient recipes, mushroom-room humidity algorithms and
              real-world farm case studies — delivered straight to your inbox.
            </p>
          </div>

          <div className="lg:col-span-5 relative z-10">
            <AnimatePresence mode="wait">
              {emailSubscribed ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-white rounded-2xl border border-emerald-100 flex items-center gap-3.5 text-emerald-800 shadow-lg shadow-emerald-900/5"
                >
                  <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Subscription successful!</h4>
                    <p className="text-xs text-emerald-700 mt-0.5">Thank you for subscribing to the AiGROW Digest.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your professional email"
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    className="grow px-4 py-3.5 bg-white/70 border border-emerald-100 rounded-xl text-sm font-sans focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-gray-800"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center shrink-0"
                  >
                    <Send className="w-4.5 h-4.5" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            <p className="font-sans text-[10px] text-gray-400 text-center mt-3 font-medium tracking-wide">
              No spam. Unsubscribe anytime. Operated under strict CodeGen data guidelines.
            </p>
          </div>
        </section>

        <CTABanner onNavigate={onNavigate} />
      </div>
    </div>
  );
}
