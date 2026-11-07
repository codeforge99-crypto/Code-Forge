import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { submitContactInquiry } from '../lib/supabase';
import confetti from 'canvas-confetti';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export const ContactSection = () => {
  const { t, isRTL } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: t.contact.formServiceOptions[0],
    budget: '$1,000 - $3,000',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContactInquiry(formData);
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="pill-badge mb-4">
            <Mail className="w-3.5 h-3.5 text-gray-300" />
            <span>✦ {t.contact.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
            {t.contact.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Phone Card */}
            <div className="ref-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 text-white">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                    {t.contact.phoneLabel}
                  </span>
                  <a 
                    href="tel:+971563639479" 
                    className="text-lg sm:text-xl font-bold text-white hover:text-gray-200 transition-colors font-mono tracking-wide"
                  >
                    +971 563639479
                  </a>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href="https://wa.me/971563639479?text=Hello%20Code%20Forge,%20I%20would%20like%20to%20discuss%20a%20project."
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white bg-white/[0.06] border border-white/12 hover:bg-white/10 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp Chat</span>
                    </a>
                    <a
                      href="tel:+971563639479"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white bg-white/[0.03] border border-white/10 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Direct Call</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="ref-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 text-white">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
                    {t.contact.emailLabel}
                  </span>
                  <a 
                    href={`mailto:${t.contact.emailValue}`} 
                    className="text-base font-bold text-white hover:text-gray-200 transition-colors font-mono"
                  >
                    {t.contact.emailValue}
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Average response time: &lt; 2 hours</p>
                </div>
              </div>
            </div>

            {/* Location & Hours */}
            <div className="ref-card p-6 space-y-4">
              <div className="flex items-start gap-3 text-xs text-gray-300">
                <MapPin className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block mb-0.5">{t.contact.officeLabel}</span>
                  <span className="text-gray-400">{t.contact.officeValue}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-start gap-3 text-xs text-gray-300">
                <Clock className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block mb-0.5">{t.contact.hoursLabel}</span>
                  <span className="text-gray-400">{t.contact.hoursValue}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Project Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="ref-card p-8 sm:p-10 border border-white/15">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-2">
                        {t.contact.formName} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-2">
                        {t.contact.formEmail} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-2">
                        {t.contact.formPhone} *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+971 50 123 4567"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-2">
                        {t.contact.formService}
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#141722] border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 transition-colors cursor-pointer"
                      >
                        {t.contact.formServiceOptions.map((opt, idx) => (
                          <option key={idx} value={opt} className="bg-[#141722] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-300 block mb-2">
                      {t.contact.formMessage} *
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Please describe your project, deliverables, and targets..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-black bg-white hover:bg-gray-200 transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-black" />
                    <span>{isSubmitting ? t.contact.formSubmitting : t.contact.formSubmit}</span>
                    {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>
              ) : (
                <div className="py-12 px-4 text-center animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Inquiry Dispatched Successfully!
                  </h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto mb-6 leading-relaxed">
                    {t.contact.formSuccess}
                  </p>
                  <a
                    href={`https://wa.me/971563639479?text=Hello%20Code%20Forge,%20I%20just%20submitted%20an%20inquiry%20for%20${encodeURIComponent(formData.service)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-medium text-white bg-white/[0.06] border border-white/15 hover:bg-white/10 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Speed up: Chat now on WhatsApp (+971 563639479)</span>
                  </a>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
