import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Building2,
  Sprout,
  Cpu,
  Wrench,
  User,
  MessageSquare,
  ClipboardCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles
} from 'lucide-react';
import { PageId } from '../types';

interface ContactViewProps {
  onNavigate: (pageId: PageId) => void;
  selectedProductName: string;
  onClearSelectedProductName: () => void;
}

const INTERESTS = [
  { value: 'Greenhouse Construction', label: 'Greenhouse Construction', desc: 'Custom engineering & climate-controlled structures', icon: Building2 },
  { value: 'Fresh Produce', label: 'Premium Fresh Produce', desc: 'Export-grade, pesticide-free crop supply', icon: Sprout },
  { value: 'Equipment', label: 'Smart Hardware', desc: 'Controllers, sensor pods, drippers & meters', icon: Cpu },
  { value: 'Services', label: 'Consultation & Services', desc: 'Site audits, training & AI automation upgrades', icon: Wrench }
];

const STEPS = [
  { key: 'interest', label: 'Focus', title: 'What brings you in?', hint: 'Pick the area closest to your goal — it routes you to the right engineer.', icon: Sparkles },
  { key: 'details', label: 'You', title: 'Who should we reply to?', hint: 'We only use these to send your technical quote back. No spam, ever.', icon: User },
  { key: 'brief', label: 'Brief', title: 'Tell us about the project', hint: 'Location, crop, scale (acres / sq ft) and automation goals help us scope fast.', icon: MessageSquare },
  { key: 'review', label: 'Review', title: 'Confirm & submit', hint: 'A quick check before it reaches our Colombo engineering panel.', icon: ClipboardCheck }
];

export default function ContactView({ selectedProductName, onClearSelectedProductName }: ContactViewProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);

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
      // Jump straight to identity capture since focus + brief are prefilled
      setStep(1);
      setDir(1);
    }
  }, [selectedProductName]);

  const validateStep = (s: number) => {
    const e: { [key: string]: string } = {};
    if (s === 0 && !interest) e.interest = 'Please choose an area of interest';
    if (s === 1) {
      if (!fullName.trim()) e.fullName = 'Full name is required';
      if (!email.trim()) e.email = 'Email address is required';
      else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Please provide a valid email (e.g. name@domain.com)';
      if (!phone.trim()) e.phone = 'Contact number is required';
      else if (!/^[+0-9\s-]{8,20}$/.test(phone)) e.phone = 'Please enter a valid phone number';
    }
    if (s === 2 && !message.trim()) e.message = 'Message content cannot be empty';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goTo = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
  };

  const handleNext = () => {
    if (validateStep(step)) goTo(Math.min(STEPS.length - 1, step + 1));
  };
  const handleBack = () => {
    setErrors({});
    goTo(Math.max(0, step - 1));
  };

  const chooseInterest = (value: string) => {
    setInterest(value);
    setErrors({});
    setDir(1);
    setTimeout(() => setStep(1), 240);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // validate all steps
    if (validateStep(0) && validateStep(1) && validateStep(2)) {
      setIsSubmitted(true);
      onClearSelectedProductName();
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setInterest('');
    setMessage('');
    setErrors({});
    setStep(0);
  };

  const progress = ((step + 1) / STEPS.length) * 100;
  const activeStep = STEPS[step];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -48 : 48, opacity: 0 })
  };

  const inputBase =
    'px-4 py-3 bg-gray-50 border rounded-xl text-sm font-sans text-gray-800 focus:outline-none focus:bg-white transition-all w-full';

  return (
    <div className="min-h-screen text-[#1F2321] px-6">
      <div className="max-w-7xl mx-auto py-12 lg:py-16">

        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-emerald-700 font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Start a Conversation
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-black tracking-tighter text-gray-950 leading-[0.9]">
            Let’s grow
            <br />
            <span className="text-emerald-600">something together.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ================= ASSISTANT PANEL ================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 flex flex-col gap-5">
            <div className="glass-green rounded-3xl p-7 md:p-8 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />

              {/* Progress */}
              <div className="flex items-center justify-between mb-2 relative z-10">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-700 font-bold">
                  Step {step + 1} / {STEPS.length}
                </span>
                <span className="font-mono text-[11px] text-gray-500">{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/60 overflow-hidden mb-7 relative z-10">
                <motion.div
                  className="h-full bg-emerald-500 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                />
              </div>

              {/* Contextual assistant message */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 mb-7"
                >
                  <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4">
                    <activeStep.icon className="w-5 h-5" />
                  </div>
                  <h2 className="font-sans text-xl font-extrabold text-gray-950 tracking-tight">{activeStep.title}</h2>
                  <p className="font-sans text-sm text-gray-600 font-light leading-relaxed mt-1.5">{activeStep.hint}</p>
                </motion.div>
              </AnimatePresence>

              {/* Vertical stepper */}
              <div className="flex flex-col gap-1 relative z-10">
                {STEPS.map((s, i) => {
                  const done = i < step;
                  const current = i === step;
                  return (
                    <button
                      key={s.key}
                      onClick={() => i <= step && goTo(i)}
                      disabled={i > step}
                      className={`flex items-center gap-3 py-2 text-left transition-opacity ${i > step ? 'opacity-40 cursor-not-allowed' : 'opacity-100'}`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-colors ${
                          done ? 'bg-emerald-500 text-white' : current ? 'bg-gray-950 text-white' : 'bg-white/70 text-gray-400 border border-gray-200'
                        }`}
                      >
                        {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
                      </span>
                      <span className={`font-sans text-sm font-semibold ${current ? 'text-gray-950' : 'text-gray-500'}`}>{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* HQ card */}
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
          </div>

          {/* ================= WIZARD PANEL ================= */}
          <div className="lg:col-span-7">
            <div className="glass rounded-3xl p-7 md:p-10 shadow-xl shadow-emerald-900/5 min-h-[460px] flex flex-col">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center gap-6 grow py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <div className="flex flex-col gap-2 max-w-md">
                    <h2 className="font-sans text-2xl font-bold text-gray-950">Inquiry submitted!</h2>
                    <p className="font-sans text-sm text-gray-500 leading-relaxed font-light">
                      Thank you, <strong className="text-gray-800">{fullName}</strong>. Your inquiry regarding{' '}
                      <strong>{interest}</strong> has reached our central engineering panel in Colombo.
                    </p>
                    <p className="font-sans text-xs text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-100 mt-2 font-medium">
                      A CodeGen agritech engineer will review your specifications and contact you at <strong>{email}</strong> within 24 business hours.
                    </p>
                  </div>
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl text-xs transition-colors border border-gray-100 mt-2"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col grow" id="contact-inquiry-form">
                  <div className="grow">
                    <AnimatePresence mode="wait" custom={dir}>
                      <motion.div
                        key={step}
                        custom={dir}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {/* STEP 0 — INTEREST */}
                        {step === 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {INTERESTS.map((opt) => {
                              const Icon = opt.icon;
                              const selected = interest === opt.value;
                              return (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => chooseInterest(opt.value)}
                                  className={`group relative text-left rounded-2xl p-5 border-2 transition-all duration-200 ${
                                    selected ? 'border-emerald-500 bg-emerald-50/60 shadow-md' : 'border-gray-100 bg-gray-50/50 hover:border-emerald-200 hover:bg-white'
                                  }`}
                                >
                                  <div
                                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                                      selected ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-600 group-hover:bg-emerald-100'
                                    }`}
                                  >
                                    <Icon className="w-5 h-5" />
                                  </div>
                                  <h3 className="font-sans text-sm font-bold text-gray-950">{opt.label}</h3>
                                  <p className="font-sans text-xs text-gray-500 font-light mt-1 leading-snug">{opt.desc}</p>
                                  <span
                                    className={`absolute top-4 right-4 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                                      selected ? 'bg-emerald-500 text-white scale-100' : 'scale-0'
                                    }`}
                                  >
                                    <Check className="w-3 h-3" />
                                  </span>
                                </button>
                              );
                            })}
                            {errors.interest && (
                              <span className="sm:col-span-2 text-red-500 text-[11px] font-semibold flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {errors.interest}
                              </span>
                            )}
                          </div>
                        )}

                        {/* STEP 1 — DETAILS */}
                        {step === 1 && (
                          <div className="flex flex-col gap-5">
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
                                className={`${inputBase} ${errors.fullName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'}`}
                              />
                              {errors.fullName && (
                                <span className="text-red-500 text-[11px] font-semibold flex items-center gap-1 mt-0.5">
                                  <AlertCircle className="w-3.5 h-3.5" />
                                  {errors.fullName}
                                </span>
                              )}
                            </div>

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
                                  className={`${inputBase} ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'}`}
                                />
                                {errors.email && (
                                  <span className="text-red-500 text-[11px] font-semibold flex items-center gap-1 mt-0.5">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    {errors.email}
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
                                  className={`${inputBase} ${errors.phone ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'}`}
                                />
                                {errors.phone && (
                                  <span className="text-red-500 text-[11px] font-semibold flex items-center gap-1 mt-0.5">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    {errors.phone}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* STEP 2 — BRIEF */}
                        {step === 2 && (
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="message" className="font-sans text-xs font-bold text-gray-700 uppercase tracking-wider">
                              Tell us about your project <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              id="message"
                              rows={8}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Provide details such as farm location, crop types, scale (e.g. number of acres or sq ft), and automation desires."
                              className={`${inputBase} leading-relaxed resize-none ${errors.message ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-emerald-500'}`}
                            />
                            {errors.message && (
                              <span className="text-red-500 text-[11px] font-semibold flex items-center gap-1 mt-0.5">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {errors.message}
                              </span>
                            )}
                          </div>
                        )}

                        {/* STEP 3 — REVIEW */}
                        {step === 3 && (
                          <div className="flex flex-col gap-3">
                            {[
                              { k: 'Area of interest', v: interest, edit: 0 },
                              { k: 'Full name', v: fullName, edit: 1 },
                              { k: 'Email', v: email, edit: 1 },
                              { k: 'Contact number', v: phone, edit: 1 },
                              { k: 'Project brief', v: message, edit: 2 }
                            ].map((row) => (
                              <div key={row.k} className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
                                <div className="min-w-0">
                                  <div className="font-mono text-[10px] uppercase tracking-wider text-gray-400 mb-1">{row.k}</div>
                                  <div className="font-sans text-sm text-gray-900 font-medium whitespace-pre-wrap break-words line-clamp-3">
                                    {row.v || <span className="text-gray-400 italic font-light">Not provided</span>}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => goTo(row.edit)}
                                  className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 shrink-0"
                                >
                                  Edit
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Nav controls */}
                  <div className="flex items-center gap-3 mt-8 pt-6 border-t border-gray-100">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-700 font-semibold text-xs transition-all flex items-center gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                    )}

                    {step < STEPS.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="ml-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-emerald-600/10 flex items-center gap-2 group"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        id="contact-btn-submit"
                        className="ml-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-emerald-600/10 flex items-center gap-2"
                      >
                        Submit Project Specifications
                        <Send className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
