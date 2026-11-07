import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { submitServiceBooking } from '../lib/supabase';
import { X, CheckCircle2, MessageCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export const ServiceModal = ({ service, onClose, onSelectForQuote }) => {
  const { isRTL } = useLanguage();
  if (!service) return null;

  const handleBookService = () => {
    onClose();
    if (onSelectForQuote) {
      onSelectForQuote(service);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#0e1017] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Image with close button */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-[#0e1017]/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-2 rounded-full bg-black/60 border border-white/20 text-gray-300 hover:text-white hover:bg-black/80 transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge over image */}
          <div className={`absolute bottom-4 ${isRTL ? 'right-6' : 'left-6'} pill-badge bg-black/70 border-white/20 text-white`}>
            <span>✦ {service.tag}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
            {service.title}
          </h3>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
            {service.shortDesc}
          </p>

          {/* Deliverables */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Included Deliverables & Scope
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-200">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ideal for note */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-8">
            <p className="text-xs text-gray-300 font-medium">
              <span className="font-bold text-white">Best Suited For: </span>
              {service.idealFor}
            </p>
          </div>

          {/* Footer CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <a
              href={`https://wa.me/971563639479?text=Hello%20Code%20Forge,%20I%20am%20interested%20in%20your%20${encodeURIComponent(service.tag)}%20package.`}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                submitServiceBooking({
                  serviceId: service.id,
                  serviceTitle: service.title,
                  notes: 'Client clicked Discuss via WhatsApp for ' + service.tag
                }).catch(() => {});
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-medium text-gray-300 hover:text-white bg-white/[0.04] border border-white/10 hover:border-white/20 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Discuss via WhatsApp (+971 563639479)</span>
            </a>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleBookService}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-black bg-white hover:bg-gray-200 transition-all shadow-sm"
              >
                <span>Customize & Estimate in Calculator</span>
                {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
