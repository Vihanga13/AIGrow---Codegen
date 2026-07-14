import { useState, FormEvent } from 'react';
import { PageId } from '../../types';
import { NEWS_DATA } from '../../data';
import { Search, Calendar, Clock, ArrowRight, ArrowLeft, BookOpen, CheckCircle, Send } from 'lucide-react';
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

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (subEmail.trim() && subEmail.includes('@')) {
      setEmailSubscribed(true);
      setSubEmail('');
    }
  };

  return (
    <div className="min-h-screen text-[#1F2321] py-12 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <button
          onClick={() => onNavigate('about')}
          className="mb-8 flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors font-medium group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to About Overview
        </button>

        {/* Header */}
        <div className="mb-10">
          <span className="font-mono text-xs text-emerald-700 font-bold uppercase tracking-[0.25em] block mb-2">
            Newsroom
          </span>
          <h1 className="font-sans text-4xl sm:text-5xl font-extrabold text-gray-950 tracking-tight mb-4">
            The AiGROW Press
          </h1>
          <p className="font-sans text-sm text-gray-500 font-light max-w-2xl leading-relaxed">
            Scaling smart greenhouses, field-testing LoRa sensors and collaborating with national institutions to secure
            organic agritech innovation.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold font-sans transition-colors ${
                  selectedCategory === cat ? 'bg-emerald-600 text-white' : 'glass text-gray-600 hover:text-gray-900'
                }`}
              >
                {cat}
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

        {/* News grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredNews.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate('contact')}
                className="group text-left glass rounded-3xl overflow-hidden flex flex-col hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300"
              >
                <div className="h-44 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-lg text-[10px] font-mono font-extrabold text-emerald-700 uppercase tracking-wide">
                    {item.category}
                  </div>
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
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-3xl mb-16">
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
        <section className="glass-green rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 flex flex-col gap-4">
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

          <div className="lg:col-span-5">
            {emailSubscribed ? (
              <div className="p-6 bg-white rounded-2xl border border-emerald-100 flex items-center gap-3.5 text-emerald-800 shadow-lg shadow-emerald-900/5">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">Subscription successful!</h4>
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
                  className="grow px-4 py-3.5 bg-white/70 border border-emerald-100 rounded-xl text-sm font-sans focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-gray-800"
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
        </section>

        <CTABanner onNavigate={onNavigate} />
      </div>
    </div>
  );
}
