import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, ArrowRight, ArrowLeft, Award, Image as ImageIcon } from 'lucide-react';

export const AboutUs = () => {
  const { t, isRTL } = useLanguage();
  const [showOfficialLogo, setShowOfficialLogo] = useState(false);

  const handleScroll = (id) => {
    const el = document.querySelector(id);
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with Subtle Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 group shadow-2xl bg-[#090b10]">
              
              {showOfficialLogo ? (
                <div className="w-full h-[420px] sm:h-[480px] p-6 flex flex-col items-center justify-center bg-[#07080c] relative">
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl max-w-sm">
                    <img
                      src="/logo.jpg"
                      alt="Code Forge Official Brand Identity"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <span className="text-xs text-gray-400 mt-4 font-mono tracking-wider">
                    Official Code Forge Brand Identity Mark
                  </span>
                </div>
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                  alt="Code Forge Creative Studio"
                  className="w-full h-[420px] sm:h-[480px] object-cover filter contrast-[1.05] brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-transparent opacity-80 pointer-events-none" />
              
              {/* Floating Award & Logo Toggle Pill */}
              <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-2xl bg-[#0d0f15]/95 backdrop-blur-md border border-white/15 flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/15 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white tracking-wide">
                      BUILD • INNOVATE • GROW
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Al Tallah, Al Muwaihat 2, Ajman, UAE
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowOfficialLogo(!showOfficialLogo)}
                  className="px-2.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[10px] font-semibold text-gray-300 hover:text-white flex items-center gap-1 transition-colors"
                  title="Toggle official brand mark view"
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>{showOfficialLogo ? 'Studio' : 'Brand Logo'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Stats Grid & Core Values */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            
            <div className="pill-badge mb-4">
              <span>✦ {t.about.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
              {t.about.title}
            </h2>

            <p className="text-base text-gray-300 leading-relaxed mb-4">
              {t.about.p1}
            </p>

            <p className="text-sm text-gray-400 leading-relaxed mb-8">
              {t.about.p2}
            </p>

            {/* Stats Grid matching reference */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full py-6 border-y border-white/10 mb-8">
              {t.about.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Values Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8">
              {t.about.values.map((val, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>{val}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleScroll('#contact')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-black bg-white hover:bg-gray-200 transition-all shadow-sm"
              >
                <span>{t.about.cta}</span>
                {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>

              <a
                href="tel:+971563639479"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-medium text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
              >
                <span>Direct: +971 563639479</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
