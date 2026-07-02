import { Leaf, Phone, Mail, MapPin, Facebook, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
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
    <footer className="border-t border-gray-100 bg-white font-sans text-gray-600">
      <div className="w-full mx-auto px-6 py-12 lg:py-14">
        <div className="mb-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-emerald-600">
          <span className="h-px w-10 bg-emerald-200" />
          Designed for resilient food systems
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_0.9fr_1fr] lg:gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleLinkClick('home')}>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-2xl font-semibold tracking-tight text-gray-900">AiGROW</span>
                <span className="font-mono text-[10px] tracking-[0.28em] text-gray-400 uppercase">CodeGen Subsidiary</span>
              </div>
            </div>

            <p className="max-w-md text-sm leading-6 text-gray-500">
              Smart sensing, precision automation, and circular design for high-yield agricultural ecosystems across Sri Lanka.
            </p>

            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-xs font-medium text-gray-600 transition-all hover:border-emerald-200 hover:text-emerald-600 hover:shadow-sm"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-3.5 h-3.5" />
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Navigate</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
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
                  className="group flex items-center justify-between border-b border-transparent py-1.5 text-left text-sm text-gray-600 transition-all hover:border-emerald-100 hover:text-emerald-600"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 transition-colors group-hover:text-emerald-400" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">Contact</h4>
            <div className="flex flex-col gap-4 text-sm text-gray-500">
              <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span className="leading-6">
                  CodeGen International, Trace Expert City,<br />
                  Bay 15 & 16, Maradana Rd,<br />
                  Colombo 10, Sri Lanka
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href="tel:+94112024700"
                  className="flex items-center gap-3 rounded-2xl border border-gray-100 px-4 py-3 transition-colors hover:border-emerald-200 hover:bg-emerald-50/40"
                >
                  <Phone className="h-4 w-4 text-emerald-600" />
                  <span>+94 11 202 4700</span>
                </a>
                <a
                  href="mailto:info@aigrow.lk"
                  className="flex items-center gap-3 rounded-2xl border border-gray-100 px-4 py-3 transition-colors hover:border-emerald-200 hover:bg-emerald-50/40"
                >
                  <Mail className="h-4 w-4 text-emerald-600" />
                  <span>info@aigrow.lk</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-gray-100 pt-6 text-xs text-gray-400 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <p>© {currentYear} AiGROW (Pvt) Ltd.</p>
            <span className="hidden sm:inline text-gray-300">•</span>
            <p>A subsidiary of <span className="text-gray-600">CodeGen International</span></p>
          </div>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-emerald-600">Privacy</a>
            <a href="#" className="transition-colors hover:text-emerald-600">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
