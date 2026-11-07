import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CodeForgeLogo } from './CodeForgeLogo';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ArrowUp
} from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { href: '#services', label: t.nav.services },
    { href: '#about', label: t.nav.about },
    { href: '#work', label: t.nav.work },
    { href: '#packages', label: t.nav.packages },
    { href: '#testimonials', label: t.nav.testimonials },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <footer className="pt-20 pb-12 border-t border-white/10 bg-[#06070a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
              <CodeForgeLogo size="lg" />
            </a>
            
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-gray-300">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span>{t.footer.dubaiBadge}</span>
            </div>
          </div>

          {/* Quick Links Column (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a 
                    href={item.href} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Graphic Design & Logos
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Video Editing & Reels
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Digital Solutions & Cloud
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.footer.contactTitle}
            </h4>

            <a 
              href="tel:+971563639479" 
              className="flex items-center gap-2.5 text-xs text-gray-300 hover:text-white transition-colors font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-gray-300 shrink-0" />
              <span>+971 563639479</span>
            </a>

            <a 
              href="https://wa.me/971563639479" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2.5 text-xs text-gray-300 hover:text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>WhatsApp Direct Chat</span>
            </a>

            <a 
              href={`mailto:${t.contact.emailValue}`} 
              className="flex items-center gap-2.5 text-xs text-gray-300 hover:text-white transition-colors font-mono"
            >
              <Mail className="w-3.5 h-3.5 text-gray-300 shrink-0" />
              <span>{t.contact.emailValue}</span>
            </a>

            <div className="flex items-start gap-2.5 text-xs text-gray-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-gray-300 shrink-0 mt-0.5" />
              <span>{t.contact.officeValue}</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Code Forge. {t.footer.rights}
          </p>

          <div className="flex items-center gap-4">
            <a href="#services" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#services" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
