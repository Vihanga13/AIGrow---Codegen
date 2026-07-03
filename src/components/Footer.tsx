import { Leaf, Phone, Mail, MapPin, Facebook, Linkedin, Instagram, ArrowUpRight, ArrowRight } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (pageId: PageId) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (id: PageId) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="relative overflow-hidden bg-emerald-950 font-sans text-emerald-100/80">
      {/* Top brand accent line */}
      <div className="h-px w-full from-transparent via-emerald-500/50 to-transparent" />

      {/* Large brand wordmark watermark (kept behind content, but visible) */}
      <div className="pointer-events-none absolute -bottom-10 right-0 z-0 select-none overflow-hidden px-6 text-right">
        <span className="block font-sans text-[22vw] font-black leading-none tracking-tighter text-white/10 lg:text-[16vw]">
          AiGROW
        </span>
      </div>

      {/* Decorative leaf motif */}
      <div className="pointer-events-none absolute -right-10 top-10 h-72 w-72 text-emerald-900/40 select-none">
        <Leaf className="h-full w-full rotate-12" />
      </div>

      <div className="relative z-10 mx-auto w-full px-6 py-16 lg:py-20">
        {/* Brand statement banner */}
        <div className="mb-14 flex flex-col gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-400">
              <span className="h-px w-10 bg-emerald-500/60" />
              Growing with Goodness
            </div>
            <h2 className="max-w-xl font-sans text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
              Let's build a resilient, <span className="text-emerald-400">sustainable</span> food future for Sri Lanka.
            </h2>
          </div>

          <button
            onClick={() => handleLinkClick('contact')}
            className="group flex w-fit items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
          >
            Start Your Project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Main columns */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_0.9fr_1fr] lg:gap-16">
          {/* Brand / identity */}
          <div className="flex flex-col gap-6">
            <div className="flex cursor-pointer items-center gap-3 group" onClick={() => handleLinkClick('home')}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 transition-colors group-hover:bg-emerald-400/20">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <span className="block text-2xl font-bold tracking-tight text-white">AiGROW</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-400/70">CodeGen Subsidiary</span>
              </div>
            </div>

            <p className="max-w-md text-sm leading-6 text-emerald-100/60">
              Smart sensing, precision automation, and circular design for high-yield agricultural ecosystems across Sri Lanka. Rooted in Sri Lanka. Built for tomorrow.
            </p>

            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-emerald-100/70 transition-all hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-300"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-400/70">Navigate</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'services', label: 'Services' },
                { id: 'products', label: 'Products' },
                { id: 'projects', label: 'Projects' },
                { id: 'shop', label: 'Shop' },
                { id: 'about', label: 'About' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id as PageId)}
                  className="group flex items-center justify-between border-b border-transparent py-2 text-left text-sm text-emerald-100/70 transition-all hover:border-white/10 hover:text-white"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400/40 transition-colors group-hover:text-emerald-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-400/70">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-emerald-100/70">
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span className="leading-6">
                  CodeGen International, Trace Expert City,<br />
                  Bay 15 & 16, Maradana Rd,<br />
                  Colombo 10, Sri Lanka
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href="tel:+94112024700"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/10"
                >
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <span>+94 11 202 4700</span>
                </a>
                <a
                  href="mailto:info@aigrow.lk"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/10"
                >
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <span>info@aigrow.lk</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-emerald-100/50 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <p>© {currentYear} AiGROW (Pvt) Ltd.</p>
            <span className="hidden text-emerald-100/20 sm:inline">•</span>
            <p>A subsidiary of <span className="text-emerald-100/80">CodeGen International</span></p>
          </div>
          <div className="flex gap-5">
            <button onClick={() => handleLinkClick('privacy')} className="transition-colors hover:text-emerald-300">Privacy</button>
            <button onClick={() => handleLinkClick('terms')} className="transition-colors hover:text-emerald-300">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
}