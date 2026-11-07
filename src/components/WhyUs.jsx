import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Zap, Sparkles, TrendingUp, ArrowRight, ArrowLeft } from 'lucide-react';

export const WhyUs = () => {
  const { t, isRTL } = useLanguage();

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5 text-white" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-white" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-white" />;
      default:
        return <Zap className="w-5 h-5 text-white" />;
    }
  };

  const handleScroll = (id) => {
    const el = document.querySelector(id);
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching reference */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="pill-badge mb-4">
            <span>✦ {t.whyUs.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
            {t.whyUs.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            {t.whyUs.subtitle}
          </p>
        </div>

        {/* 3 Featured Cards matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {t.whyUs.cards.map((card) => (
            <div
              key={card.id}
              className="ref-card p-8 flex flex-col justify-between group"
            >
              <div>
                {/* Icon in dark pill */}
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6 text-white group-hover:border-white/25 transition-colors">
                  {getIcon(card.icon)}
                </div>

                {/* Title in Normal Pure White */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {card.title}
                </h3>

                {/* Description in Normal Muted Gray */}
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {card.desc}
                </p>
              </div>

              {/* Action Link */}
              <button 
                onClick={() => handleScroll('#services')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <span>{card.linkText}</span>
                {isRTL ? (
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Centered button matching reference */}
        <div className="flex justify-center">
          <button
            onClick={() => handleScroll('#services')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
          >
            <span>Explore Our Services</span>
            {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>
    </section>
  );
};
