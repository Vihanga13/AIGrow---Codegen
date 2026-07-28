import { MapPin, Phone, Mail, ShieldCheck, Calendar, Sparkles, Facebook, ArrowUpRight } from 'lucide-react';
import { PageId } from '../types';

interface ContactViewProps {
  onNavigate: (pageId: PageId) => void;
  selectedProductName: string;
  onClearSelectedProductName: () => void;
}

const WHATSAPP_NUMBER = '94769487184'; // 94 76 948 7184
const WHATSAPP_DISPLAY = '+94 76 948 7184';
const FACEBOOK_URL = 'https://facebook.com/AiGROW';

/** Official WhatsApp glyph (lucide has no WhatsApp brand mark). */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 005.71 1.447h.006c6.585 0 11.946-5.335 11.949-11.896 0-3.176-1.24-6.165-3.487-8.413" />
    </svg>
  );
}

export default function ContactView({ selectedProductName }: ContactViewProps) {
  // Build a prefilled WhatsApp message, carrying any product/estimate enquiry context.
  const buildWhatsAppText = () => {
    if (selectedProductName.startsWith('Project Estimate:')) {
      return `Hi AiGROW, I calculated a setup estimate on your Price Calculator:\n\n${selectedProductName.replace('Project Estimate: ', '')}\n\nCould you review my configuration and send a technical proposal?`;
    }
    if (selectedProductName.startsWith('Service:')) {
      return `Hi AiGROW, I'd like to enquire about your ${selectedProductName.replace('Service: ', '')} service.`;
    }
    if (selectedProductName) {
      return `Hi AiGROW, I'd like to enquire about the "${selectedProductName}" — pricing, delivery and setup details please.`;
    }
    return 'Hi AiGROW, I would like to learn more about your smart agriculture solutions.';
  };

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppText())}`;

  return (
    <div className="min-h-screen text-[#1F2321] px-6 py-12 lg:py-16">
      <div className="max-w-[96rem] mx-auto">

        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-700 font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Connect With Us
          </div>
          <h1 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950 mb-4 leading-[1.05]">
            Let’s Grow Together
          </h1>
          <p className="font-sans text-gray-500 font-light text-base md:text-lg">
            Message us directly on WhatsApp or Facebook and our agritech team will get back to you right away.
          </p>
        </div>

        {/* Enquiry context (from a product/service "Enquire" click) */}
        {selectedProductName && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-2.5 text-sm text-emerald-800">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Your enquiry about <strong>{selectedProductName.replace(/^(Project Estimate|Service): /, '')}</strong> is ready — it’ll be included in your message.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* DIRECT CONTACT BUTTONS */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* WhatsApp */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass rounded-3xl p-6 md:p-7 flex items-center gap-5 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25">
                <WhatsAppIcon className="h-8 w-8" />
              </span>
              <div className="flex-1 min-w-0">
                <h2 className="font-sans text-lg font-bold text-gray-950">Chat on WhatsApp</h2>
                <p className="font-sans text-sm text-gray-500 font-light mt-0.5">Fastest way to reach us — usually replies within minutes.</p>
                <span className="font-mono text-sm font-bold text-emerald-700 mt-1.5 block">{WHATSAPP_DISPLAY}</span>
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-300 shrink-0 transition-all group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Facebook */}
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass rounded-3xl p-6 md:p-7 flex items-center gap-5 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#1877F2] text-white shadow-lg shadow-[#1877F2]/25">
                <Facebook className="h-8 w-8" />
              </span>
              <div className="flex-1 min-w-0">
                <h2 className="font-sans text-lg font-bold text-gray-950">Message us on Facebook</h2>
                <p className="font-sans text-sm text-gray-500 font-light mt-0.5">Follow our latest builds and send us a message.</p>
                <span className="font-mono text-sm font-bold text-emerald-700 mt-1.5 block">@AiGROW</span>
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-300 shrink-0 transition-all group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <p className="font-sans text-xs text-gray-400 font-light px-1">
              Prefer email? Write to <a href="mailto:info@aigrow.lk" className="text-emerald-700 font-medium hover:underline">info@aigrow.lk</a> or call the office below.
            </p>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="glass rounded-3xl p-6 flex flex-col gap-4">
              <h4 className="font-sans text-xs font-bold text-gray-400 uppercase tracking-wider">CodeGen Agritech HQ</h4>
              <div className="flex flex-col gap-3 text-xs text-gray-600">
                <div className="flex gap-2 items-start">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Trace Expert City, Bay 15 & 16, Maradana Rd, Colombo 10, Sri Lanka</span>
                </div>
                <a href="tel:+94112024700" className="flex gap-2 items-center hover:text-emerald-700 transition-colors">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>+94 11 202 4700</span>
                </a>
                <a href="mailto:info@aigrow.lk" className="flex gap-2 items-center hover:text-emerald-700 transition-colors">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>info@aigrow.lk</span>
                </a>
              </div>
            </div>

            <div className="glass-green rounded-3xl p-6 flex flex-col gap-4">
              <h4 className="font-sans text-sm font-bold text-gray-900">Why growers work with us</h4>
              {[
                { icon: ShieldCheck, text: 'Locally engineered & assembled in Sri Lanka' },
                { icon: Calendar, text: 'Continuous agronomic support & auditing' },
                { icon: Sparkles, text: '100% pesticide-free growing outcomes' }
              ].map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/60 text-emerald-600">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-sans text-xs text-gray-600 font-light leading-relaxed pt-0.5">{f.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
