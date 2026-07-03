import { ShieldCheck, ArrowRight } from 'lucide-react';
import { PageId } from '../types';
import Reveal from './Reveal';

interface PrivacyViewProps {
  onNavigate: (pageId: PageId) => void;
}

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide directly through our contact forms, quote calculators, and equipment inquiries — including your name, email address, phone number, and project specifications. We also collect anonymous usage data such as pages visited and device type to improve our services.'
  },
  {
    title: '2. How We Use Your Information',
    body: 'Your information is used to respond to inquiries, prepare technical proposals and cost estimates, deliver purchased equipment, and communicate updates about AiGROW solutions. We never sell your personal data to third parties.'
  },
  {
    title: '3. Data Storage & Security',
    body: 'Inquiry data is processed and stored securely by CodeGen International, our parent company, at our Colombo facilities. We apply industry-standard safeguards to protect your data against unauthorized access, alteration, or disclosure.'
  },
  {
    title: '4. Cookies & Analytics',
    body: 'Our website uses minimal cookies to remember your preferences and understand aggregate traffic patterns. You can disable cookies in your browser settings without losing access to core site features.'
  },
  {
    title: '5. Sharing With Partners',
    body: 'We may share relevant project details with our engineering, logistics, and agronomy partners strictly to fulfill your request. These partners are bound by confidentiality obligations consistent with this policy.'
  },
  {
    title: '6. Your Rights',
    body: 'You may request access to, correction of, or deletion of your personal data at any time by contacting us. We will respond to verified requests within a reasonable timeframe in line with applicable Sri Lankan data protection standards.'
  },
  {
    title: '7. Updates to This Policy',
    body: 'We may revise this Privacy Policy periodically. Material changes will be reflected here with an updated revision date. Continued use of our services after changes constitutes acceptance of the revised policy.'
  }
];

export default function PrivacyView({ onNavigate }: PrivacyViewProps) {
  return (
    <div className="bg-[#FAFDFB]/10 min-h-screen text-[#1F2321] py-12 px-6">
      <div className="w-full max-w-4xl mx-auto">

        {/* Header */}
        <Reveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Legal & Compliance
          </div>
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-gray-950 mb-4">
            Privacy Policy
          </h1>
          <p className="font-sans text-gray-500 font-light text-base md:text-lg">
            How AiGROW collects, uses, and protects your information.
          </p>
          <p className="font-mono text-[11px] text-gray-400 uppercase tracking-wider mt-4">
            Last updated: January 2026
          </p>
        </Reveal>

        {/* Sections */}
        <div className="flex flex-col gap-6">
          {SECTIONS.map((section, idx) => (
            <Reveal
              key={section.title}
              delay={Math.min(idx * 0.05, 0.3)}
              className="glass rounded-2xl p-6 md:p-8 shadow-sm"
            >
              <h2 className="font-sans text-lg font-bold text-gray-950 mb-3">
                {section.title}
              </h2>
              <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
                {section.body}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Contact CTA */}
        <Reveal className="mt-10 bg-emerald-950 text-white rounded-3xl p-8 md:p-10 flex flex-col gap-4">
          <h3 className="font-sans text-xl font-bold">Questions about your data?</h3>
          <p className="font-sans text-sm text-gray-300 font-light leading-relaxed max-w-xl">
            Reach out to our team and we'll walk you through exactly what we hold and how it's used.
          </p>
          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-fit mt-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold text-sm transition-all flex items-center gap-2 group"
          >
            Contact Us
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>

      </div>
    </div>
  );
}
