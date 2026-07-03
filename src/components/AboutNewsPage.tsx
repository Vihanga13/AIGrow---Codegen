import { useState, FormEvent } from 'react';
import { PageId } from '../types';
import { NEWS_DATA } from '../data';
import { Search, Calendar, Clock, ArrowRight, BookOpen, CheckCircle, Send } from 'lucide-react';
import CTABanner from './CTABanner';

interface AboutNewsPageProps {
  onNavigate: (pageId: PageId) => void;
}

export default function AboutNewsPage({ onNavigate }: AboutNewsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subEmail, setSubEmail] = useState('');

  const categories = ['All', 'Award', 'Innovation', 'Sustainability'];

  const filteredNews = NEWS_DATA.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
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
    <div className="bg-[#FAFAFA] min-h-screen text-[#1F2321] py-12 px-6">
      <div className="w-full mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <button 
            onClick={() => onNavigate('about')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors font-medium"
          >
            ← Back to About Overview
          </button>
        </div>

        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-xs text-emerald-600 font-bold uppercase tracking-widest block mb-2">
            Newsroom
          </span>
          <h1 className="font-sans text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mb-4">
            Latest Updates & Media Announcements
          </h1>
          <p className="font-sans text-sm text-gray-500 font-light max-w-2xl leading-relaxed">
            Follow our progress as we scale smart greenhouses, field-test LoRa sensors, and collaborate with national institutions to secure organic agritech innovation.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass rounded-2xl p-4 shadow-xs flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold font-sans transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search press articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-sans focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-gray-800 font-medium"
            />
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredNews.map((item) => (
              <div 
                key={item.id}
                className="glass rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-emerald-100"
              >
                <div>
                  <div className="h-48 relative overflow-hidden bg-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-white/95 backdrop-blur-xs rounded-lg text-[10px] font-mono font-extrabold text-emerald-700 uppercase tracking-wide">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 font-mono font-semibold">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{item.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{item.readTime}</span>
                    </div>

                    <h3 className="font-sans text-sm font-extrabold text-gray-950 leading-snug">
                      {item.title}
                    </h3>

                    <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-auto">
                  <button 
                    onClick={() => onNavigate('contact')}
                    className="text-xs text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-1 group transition-colors"
                  >
                    Read Full Coverage
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass rounded-3xl mb-16">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-sm font-bold text-gray-800">No press articles match your filter.</h3>
            <p className="text-xs text-gray-400 mt-1">Try resetting the search query or selecting a different category.</p>
          </div>
        )}

        {/* Newsletter Subscription */}
        <section className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="font-mono text-xs text-emerald-600 font-bold uppercase tracking-widest block">
              Knowledge Sharing
            </span>
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-950 tracking-tight leading-none">
              Cultivate Wisdom with AiGROW Digest
            </h2>
            <p className="font-sans text-xs text-gray-500 leading-relaxed font-light">
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
                  className="grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-sans focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-gray-800"
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
            <p className="font-sans text-[9px] text-gray-400 text-center mt-3 font-medium tracking-wide">
              No spam. Unsubscribe anytime. Operated under strict CodeGen data guidelines.
            </p>
          </div>
        </section>

        {/* Shared CTA */}
        <CTABanner onNavigate={onNavigate} />

      </div>
    </div>
  );
}
