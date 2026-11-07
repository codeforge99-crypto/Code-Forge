import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CodeForgeLogo } from './CodeForgeLogo';
import { 
  Phone, 
  Globe, 
  Menu, 
  X, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  MessageCircle
} from 'lucide-react';

export const Navbar = () => {
  const { lang, toggleLang, t, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: t.nav.services },
    { href: '#about', label: t.nav.about },
    { href: '#work', label: t.nav.work },
    { href: '#packages', label: t.nav.packages },
    { href: '#testimonials', label: t.nav.testimonials },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#08090d]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="group flex items-center focus:outline-none"
          >
            <CodeForgeLogo size="md" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-1.5 text-xs xl:text-sm font-medium text-gray-300 hover:text-white rounded-full hover:bg-white/[0.08] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Phone link */}
            <a 
              href="tel:+971563639479"
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-gray-300 hover:text-white rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
              title="Call Code Forge"
            >
              <Phone className="w-3.5 h-3.5 text-gray-300" />
              <span className="font-mono tracking-wide">+971 563639479</span>
            </a>

            {/* Language Switch Button */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/12 transition-all active:scale-95 group"
              title={lang === 'en' ? 'التحويل للغة العربية' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5 text-gray-300 group-hover:rotate-45 transition-transform duration-300" />
              <span>{t.nav.langSwitch}</span>
            </button>

            {/* Request a Quote CTA (matching reference white pill button) */}
            <a
              href="#packages"
              onClick={(e) => handleNavClick(e, '#packages')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-black bg-white hover:bg-gray-200 transition-all active:scale-95 cursor-pointer font-sans shadow-sm"
            >
              <span>{t.nav.quoteCta}</span>
              {isRTL ? (
                <ArrowLeft className="w-3.5 h-3.5" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5" />
              )}
            </a>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-white/[0.06] text-white border border-white/12"
            >
              <Globe className="w-3.5 h-3.5 text-gray-300" />
              <span>{t.nav.langSwitch}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/[0.06] border border-white/10 text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#0c0e14]/98 backdrop-blur-2xl border-b border-white/15 px-6 py-6 shadow-2xl transition-all animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2.5 text-base font-medium text-gray-200 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="tel:+971563639479"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm"
              >
                <Phone className="w-4 h-4 text-gray-300" />
                <span>+971 563639479</span>
              </a>

              <a
                href="https://wa.me/971563639479?text=Hello%20Code%20Forge,%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp (+971 563639479)</span>
              </a>

              <a
                href="#packages"
                onClick={(e) => handleNavClick(e, '#packages')}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-black font-semibold text-sm shadow-md"
              >
                <span>{t.nav.quoteCta}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
