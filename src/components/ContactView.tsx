import { useState, useEffect, FormEvent } from 'react';
import { Send, CheckCircle2, AlertCircle, MapPin, Phone, Mail, ShieldCheck, Calendar, Sparkles } from 'lucide-react';
import { PageId } from '../types';

interface ContactViewProps {
  onNavigate: (pageId: PageId) => void;
  selectedProductName: string;
  onClearSelectedProductName: () => void;
}

export default function ContactView({ selectedProductName, onClearSelectedProductName }: ContactViewProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Greenhouse Construction');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Prefill from a product "Enquire" click or the project estimator
  useEffect(() => {
    if (selectedProductName) {
      if (selectedProductName.startsWith('Project Estimate:')) {
        setInterest('Greenhouse Construction');
        setMessage(
          `I have calculated a project estimation on the AiGROW Price Calculator:\n\n${selectedProductName.replace('Project Estimate: ', '')}\n\nPlease review my configuration and provide a final technical design proposal.`
        );
      } else {
        setInterest('Equipment');
        setMessage(`I would like to enquire about pricing, delivery, and setup details for the "${selectedProductName}". Please provide a full technical quote.`);
      }
    }
  }, [selectedProductName]);

  const validate = () => {
    const e: { [key: string]: string } = {};
    if (!fullName.trim()) e.fullName = 'Full Name is required';
    if (!email.trim()) e.email = 'Email Address is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Please provide a valid email (e.g. name@domain.com)';
    if (!phone.trim()) e.phone = 'Contact Number is required';
    else if (!/^[+0-9\s-]{8,20}$/.test(phone)) e.phone = 'Please enter a valid phone number';
    if (!message.trim()) e.message = 'Message content cannot be empty';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      onClearSelectedProductName();
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setInterest('Greenhouse Construction');
    setMessage('');
    setErrors({});
  };

  const inputBase =
    'px-4 py-3 bg-gray-50 border rounded-xl text-sm font-sans text-gray-800 focus:outline-none focus:bg-white transition-all w-full';
  const errClass = (k: string) => (errors[k] ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500');

  return (
    <div className="min-h-screen text-[#1F2321] px-6 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-700 font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Connect With Us
          </div>
          <h1 className="font-sans text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950 mb-4 leading-[1.05]">
            Let’s Grow Together
          </h1>
          <p className="font-sans text-gray-500 font-light text-base md:text-lg">
            Have a project in mind, need smart equipment quotes, or want to partner on export crops? Get in touch with
            CodeGen’s agritech team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* FORM */}
          <div className="lg:col-span-7 glass rounded-3xl p-7 md:p-9 shadow-xl shadow-emerald-900/5">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center gap-6 py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="flex flex-col gap-2 max-w-md">
                  <h2 className="font-sans text-2xl font-bold text-gray-950">Inquiry Submitted!</h2>
                  <p className="font-sans text-sm text-gray-500 leading-relaxed font-light">
                    Thank you, <strong className="text-gray-800">{fullName}</strong>. Your inquiry regarding{' '}
                    <strong>{interest}</strong> has been received by our central engineering panel in Colombo.
                  </p>
                  <p className="font-sans text-xs text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-100 mt-2 font-medium">
                    A CodeGen agritech engineer will review your specifications and contact you at <strong>{email}</strong> within 24 business hours.
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl text-xs transition-colors border border-gray-100"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" id="contact-inquiry-form">
                {/* Full name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fullName" className="font-sans text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your first and last name"
                    className={`${inputBase} ${errClass('fullName')}`}
                  />
                  {errors.fullName && (
                    <span className="text-red-500 text-[11px] font-semibold flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3.5 h-3.5" />{errors.fullName}
                    </span>
                  )}
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-sans text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className={`${inputBase} ${errClass('email')}`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-[11px] font-semibold flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3.5 h-3.5" />{errors.email}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="font-sans text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Contact No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+94 77 XXXXXXX"
                      className={`${inputBase} ${errClass('phone')}`}
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-[11px] font-semibold flex items-center gap-1 mt-0.5">
                        <AlertCircle className="w-3.5 h-3.5" />{errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Interest */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="interest" className="font-sans text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Primary Area of Interest <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="interest"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className={`${inputBase} border-gray-200 focus:border-emerald-500`}
                  >
                    <option value="Greenhouse Construction">Greenhouse Construction / Engineering</option>
                    <option value="Fresh Produce">Premium Fresh Produce Retail</option>
                    <option value="Equipment">Smart Hardware / Equipment Buying</option>
                    <option value="Services">Consultation & General Services</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-sans text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Tell Us About Your Project <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details such as farm location, crop types, scale (e.g., number of acres or sq ft), and automation desires."
                    className={`${inputBase} leading-relaxed resize-none ${errClass('message')}`}
                  />
                  {errors.message && (
                    <span className="text-red-500 text-[11px] font-semibold flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3.5 h-3.5" />{errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  id="contact-btn-submit"
                  className="mt-2 w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center gap-2"
                >
                  Submit Project Specifications
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
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
                <div className="flex gap-2 items-center">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>+94 11 202 4700</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>info@aigrow.lk</span>
                </div>
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
