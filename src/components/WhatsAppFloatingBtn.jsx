import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloatingBtn = () => {
  const { isRTL, lang } = useLanguage();

  const chatText = lang === 'ar' 
    ? 'مرحباً كود فورج، أود الاستفسار عن باقات وخدمات الوكالة.'
    : 'Hello Code Forge, I would like to inquire about your creative services.';

  const url = `https://wa.me/971563639479?text=${encodeURIComponent(chatText)}`;

  return (
    <div className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-40 flex items-center gap-2 group`}>
      {/* Tooltip on hover */}
      <div className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0c0e14]/95 border border-emerald-500/30 text-xs font-semibold text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>{lang === 'ar' ? 'تحدث معنا عبر الواتساب' : 'Chat on WhatsApp (+971 563639479)'}</span>
      </div>

      {/* Floating Button */}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20"
        title="Chat on WhatsApp"
        aria-label="WhatsApp Chat"
      >
        <MessageCircle className="w-7 h-7 fill-white/20 stroke-[2.2]" />
        
        {/* Pulse ring */}
        <span className="absolute -inset-1 rounded-full border-2 border-emerald-400 opacity-60 animate-ping pointer-events-none" />
      </a>
    </div>
  );
};

