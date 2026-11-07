import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, Phone, ArrowRight, ArrowLeft } from 'lucide-react';

export const CtaBanner = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner matching reference bottom container */}
        <div className="relative rounded-[32px] overflow-hidden p-8 sm:p-12 lg:p-16 border border-white/12 bg-[#0e1017] shadow-2xl">
          
          {/* Subtle fluid ribbon glow matching reference bottom banner */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute -bottom-24 -right-24 w-[420px] h-[360px] bg-gradient-to-tr from-cyan-500/40 via-blue-600/30 to-purple-600/30 rounded-full blur-[80px] transform rotate-12" />
            <div className="absolute -top-24 -left-24 w-[360px] h-[300px] bg-gradient-to-br from-purple-600/30 to-blue-500/20 rounded-full blur-[90px]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            
            <div className="pill-badge mb-6">
              <span>✦ Code Forge Creative Studio</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
              {t.ctaBanner.title}
            </h2>

            <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 max-w-2xl">
              {t.ctaBanner.subtitle}
            </p>

            {/* CTAs matching reference */}
            <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
              <a
                href="https://wa.me/971563639479?text=Hello%20Code%20Forge,%20I%20would%20like%20to%20schedule%20a%20consultation."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-black bg-white hover:bg-gray-200 transition-all shadow-md active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-black" />
                <span>{t.ctaBanner.btnConsult}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </a>

              <a
                href="tel:+971563639479"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/20 transition-all"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>{t.ctaBanner.btnCall}</span>
              </a>
            </div>

            <div className="mt-8 text-xs text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>
                {isRTL 
                  ? 'متاحون للمشاريع في عجمان، وكافة أنحاء الإمارات وعالمياً' 
                  : 'Available for new projects in Ajman, across the UAE & Globally'}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
