import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { submitQuoteRequest } from '../lib/supabase';
import confetti from 'canvas-confetti';
import { 
  Check, 
  Clock, 
  Calculator, 
  MessageCircle, 
  Phone, 
  Send,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const QuoteCalculator = ({ preselectedCategory }) => {
  const { t, isRTL } = useLanguage();

  const [selectedServices, setSelectedServices] = useState(['web_starter', 'marketing_print']);
  const [selectedTimeline, setSelectedTimeline] = useState('normal');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (id) => {
    setSelectedServices(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const timelineObj = t.calculator.timelineOptions.find(opt => opt.id === selectedTimeline) || t.calculator.timelineOptions[0];

  const baseTotal = selectedServices.reduce((sum, serviceId) => {
    const item = t.calculator.options.find(opt => opt.id === serviceId);
    return sum + (item ? item.price : 0);
  }, 0);

  const finalTotal = Math.round(baseTotal * timelineObj.multiplier);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedServices.length === 0) return;
    setIsSubmitting(true);

    try {
      await submitQuoteRequest({
        clientName,
        clientPhone,
        selectedServices: selectedServices.map(id => t.calculator.options.find(opt => opt.id === id)?.name || id),
        timeline: timelineObj.name,
        estimatedTotal: finalTotal
      });
    } catch (err) {
      console.error('Error submitting quote request:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }
  };

  const serviceNames = selectedServices
    .map(id => t.calculator.options.find(opt => opt.id === id)?.name)
    .filter(Boolean)
    .join(', ');

  const whatsappMessage = encodeURIComponent(
    `Hello Code Forge, I generated a custom package quote:\n\n` +
    `• Services: ${serviceNames}\n` +
    `• Timeline: ${timelineObj.name}\n` +
    `• Estimated Investment: $${finalTotal.toLocaleString()}\n\n` +
    `I would like to discuss and book this package.`
  );

  const whatsappUrl = `https://wa.me/971563639479?text=${whatsappMessage}`;

  return (
    <section id="packages" className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header matching reference */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="pill-badge mb-4">
            <Calculator className="w-3.5 h-3.5 text-gray-300" />
            <span>✦ {t.calculator.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
            {t.calculator.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Main 2-Column Calculator Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Service Selection & Timeline (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Services Grid */}
            <div className="ref-card p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-white/10 text-white text-xs flex items-center justify-center font-mono font-bold">1</span>
                <span>{t.calculator.servicesTitle}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {t.calculator.options.map((option) => {
                  const isSelected = selectedServices.includes(option.id);
                  return (
                    <div
                      key={option.id}
                      onClick={() => toggleService(option.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-white/[0.08] border-white/40 shadow-sm'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-sm font-bold text-white">
                            {option.name}
                          </span>
                          <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-white border-white text-black' : 'border-white/20'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                          {option.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                        <span className="text-gray-500 font-mono">From</span>
                        <span className="font-mono font-bold text-white text-sm">
                          ${option.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Timeline Urgency */}
            <div className="ref-card p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-white/10 text-white text-xs flex items-center justify-center font-mono font-bold">2</span>
                <span>{t.calculator.timelineTitle}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {t.calculator.timelineOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedTimeline(opt.id)}
                    className={`p-3.5 rounded-2xl border text-xs font-semibold text-center transition-all ${
                      selectedTimeline === opt.id
                        ? 'bg-white text-black border-white shadow-sm'
                        : 'bg-white/[0.02] border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <Clock className="w-4 h-4 mx-auto mb-1.5 opacity-70" />
                    <span>{opt.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Estimate Summary */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="ref-card p-6 sm:p-8 border border-white/15 relative overflow-hidden">
              
              <h3 className="text-xl font-bold text-white mb-6 flex items-center justify-between">
                <span>{t.calculator.summaryTitle}</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white font-mono">
                  {selectedServices.length} selected
                </span>
              </h3>

              {/* Selected List */}
              <div className="space-y-2 mb-6 max-h-48 overflow-y-auto pr-1">
                {selectedServices.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">
                    {t.calculator.noneSelected}
                  </p>
                ) : (
                  selectedServices.map(id => {
                    const item = t.calculator.options.find(opt => opt.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                        <span className="text-gray-300 truncate max-w-[65%]">{item.name}</span>
                        <span className="font-mono text-white font-medium">${item.price}</span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Timeline note */}
              <div className="flex items-center justify-between text-xs text-gray-400 py-2 border-b border-white/10 mb-6">
                <span>Timeline Delivery:</span>
                <span className="font-semibold text-white">{timelineObj.name}</span>
              </div>

              {/* Total Calculation */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 mb-6">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-gray-400 font-medium">{t.calculator.estimatedBudget}:</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-white tracking-tight font-mono">
                      ${finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 leading-tight mt-2">
                  *Transparent estimate. Final proposal customized after free discovery consultation.
                </p>
              </div>

              {/* Direct Booking Actions */}
              <div className="space-y-3">
                {/* 1. WhatsApp Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>{t.calculator.bookWhatsappBtn}</span>
                </a>

                {/* 2. Direct Phone Call Button */}
                <a
                  href="tel:+971563639479"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs font-medium text-gray-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-gray-300" />
                  <span>{t.calculator.directCallBtn}</span>
                </a>

                {/* 3. Quick Form Submit */}
                {!submitted ? (
                  <form onSubmit={handleFormSubmit} className="pt-3 border-t border-white/10 space-y-2">
                    <input
                      type="text"
                      placeholder="Your Name / Company"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp (+971 ...)"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={selectedServices.length === 0 || isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-black bg-white hover:bg-gray-200 transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5 text-black" />
                      <span>{isSubmitting ? 'Submitting to Code Forge...' : t.calculator.requestQuoteBtn}</span>
                    </button>
                  </form>
                ) : (
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 text-center animate-in fade-in duration-300">
                    <CheckCircle2 className="w-8 h-8 text-white mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-white mb-1">
                      {t.calculator.modalSuccessTitle}
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {t.calculator.modalSuccessDesc}
                    </p>
                  </div>
                )}
              </div>

              {/* Trust footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-4 text-[11px] text-gray-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gray-300" />
                  No Hidden Fees
                </span>
                <span>•</span>
                <span>NDA Protected</span>
                <span>•</span>
                <span>UAE Standard Contract</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
