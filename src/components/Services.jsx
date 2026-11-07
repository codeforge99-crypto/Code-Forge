import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ServiceModal } from './ServiceModal';
import { 
  ArrowRight, 
  ArrowLeft, 
  Code2, 
  Palette, 
  Film, 
  Cpu
} from 'lucide-react';

export const Services = ({ onSelectServiceForCalculator }) => {
  const { t, isRTL } = useLanguage();
  const [activeModalService, setActiveModalService] = useState(null);

  const getServiceIcon = (id) => {
    switch (id) {
      case 'web':
        return <Code2 className="w-4 h-4 text-white" />;
      case 'design':
        return <Palette className="w-4 h-4 text-white" />;
      case 'video':
        return <Film className="w-4 h-4 text-white" />;
      case 'solutions':
        return <Cpu className="w-4 h-4 text-white" />;
      default:
        return <Code2 className="w-4 h-4 text-white" />;
    }
  };

  const handleScrollToCalculator = () => {
    const el = document.querySelector('#packages');
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="pill-badge mb-4">
            <span>✦ {t.services.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
            {t.services.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* 2x2 Services Grid matching reference */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {t.services.items.map((service) => (
            <div
              key={service.id}
              className="ref-card p-6 sm:p-8 flex flex-col justify-between group"
            >
              <div>
                {/* Top Row: Pill Tag + Visual Thumbnail */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-gray-300">
                    {getServiceIcon(service.id)}
                    <span>{service.tag}</span>
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="w-full sm:w-28 h-20 rounded-xl overflow-hidden border border-white/10 bg-black/40 shrink-0">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                    />
                  </div>
                </div>

                {/* Service Title in Pure Solid White */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                  {service.title}
                </h3>

                {/* Short Description in Normal Muted Gray */}
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Deliverables snippet */}
                <div className="space-y-2 mb-8">
                  {service.deliverables.slice(0, 3).map((del, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                  {service.deliverables.length > 3 && (
                    <p className="text-[11px] text-gray-500 font-normal pt-1">
                      + {service.deliverables.length - 3} more tailored deliverables
                    </p>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  onClick={() => setActiveModalService(service)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>{t.services.viewDetails}</span>
                  {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => {
                    if (onSelectServiceForCalculator) {
                      onSelectServiceForCalculator(service.id);
                    }
                    handleScrollToCalculator();
                  }}
                  className="px-4 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
                >
                  <span>Estimate Price</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA to calculator */}
        <div className="flex justify-center">
          <button
            onClick={handleScrollToCalculator}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-medium text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/12 transition-all shadow-sm"
          >
            <span>✦ View All Packages & Interactive Calculator</span>
            {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

      {/* Service Modal */}
      {activeModalService && (
        <ServiceModal
          service={activeModalService}
          onClose={() => setActiveModalService(null)}
          onSelectForQuote={(s) => {
            if (onSelectServiceForCalculator) {
              onSelectServiceForCalculator(s.id);
            }
            handleScrollToCalculator();
          }}
        />
      )}
    </section>
  );
};
