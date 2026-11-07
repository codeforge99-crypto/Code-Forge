import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HeroSphere } from './HeroSphere';
import { 
  ArrowRight, 
  ArrowLeft, 
  Zap, 
  ShieldCheck, 
  Globe2,
  CheckCircle2,
  MessageCircle
} from 'lucide-react';

export const Hero = () => {
  const { t, isRTL } = useLanguage();

  const handleScroll = (id) => {
    const el = document.querySelector(id);
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Subtitle, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            
            {/* Pill Badge matching reference */}
            <div className="pill-badge mb-6">
              <span>✦ {t.hero.badge}</span>
            </div>

            {/* Main Headline - Normal Solid White like the Reference */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.14] mb-6">
              {t.hero.titlePart1} {t.hero.titlePart2} <br className="hidden sm:inline" />
              {t.hero.titlePart3}
            </h1>

            {/* Subtitle - Normal Muted Gray like the Reference */}
            <p className="text-base sm:text-lg text-gray-400 font-normal leading-relaxed max-w-2xl mb-8">
              {t.hero.subtitle}
            </p>

            {/* Dual CTAs matching reference */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => handleScroll('#packages')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm text-black bg-white hover:bg-gray-200 transition-all active:scale-95 shadow-md"
              >
                <span>{t.hero.ctaPrimary}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleScroll('#work')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/20 transition-all"
              >
                <span>{t.hero.ctaSecondary}</span>
              </button>

              <a
                href="https://wa.me/971563639479?text=Hello%20Code%20Forge,%20I%20want%20to%20discuss%20a%20project."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-full text-xs font-medium text-gray-300 bg-white/[0.03] border border-white/10 hover:border-white/20 hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>+971 563639479</span>
              </a>
            </div>

            {/* Trust Points Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 w-full">
              <div className="flex items-center gap-2 text-xs text-gray-400 font-normal">
                <Zap className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                <span>{t.hero.badges.speed}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 font-normal">
                <CheckCircle2 className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                <span>{t.hero.badges.quality}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 font-normal">
                <ShieldCheck className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                <span>{t.hero.badges.ownership}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 font-normal">
                <Globe2 className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                <span>{t.hero.badges.location}</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Fluid Particle Sphere (Visual Graphic matching reference) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <HeroSphere />
          </div>

        </div>
      </div>
    </section>
  );
};
