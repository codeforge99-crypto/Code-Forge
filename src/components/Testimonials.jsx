import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Star, CheckCircle2 } from 'lucide-react';

export const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching reference */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="pill-badge mb-4">
            <span>✦ {t.testimonials.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
            {t.testimonials.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* Testimonials 3-Card Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {t.testimonials.items.map((item, idx) => (
            <div
              key={idx}
              className="ref-card p-8 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text in Normal Gray */}
                <p className="text-sm text-gray-300 leading-relaxed mb-6 italic">
                  "{item.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-6 border-t border-white/10">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border border-white/20"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white">
                      {item.name}
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" title="Verified Client" />
                  </div>
                  <p className="text-xs text-gray-400">
                    {item.role} • <span className="text-gray-300">{item.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Rating Banner */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 py-4 px-6 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-gray-400 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm font-mono">4.9 / 5.0</span>
            <div className="flex text-amber-400">★★★★★</div>
          </div>
          <span>•</span>
          <span>Google Reviews & Verified Clients</span>
          <span>•</span>
          <span className="text-gray-300 font-medium">99.4% On-Time Delivery</span>
        </div>

      </div>
    </section>
  );
};
