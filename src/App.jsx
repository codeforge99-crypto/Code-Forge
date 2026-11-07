import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyUs } from './components/WhyUs';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { QuoteCalculator } from './components/QuoteCalculator';
import { Testimonials } from './components/Testimonials';
import { CtaBanner } from './components/CtaBanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingBtn } from './components/WhatsAppFloatingBtn';

function MainContent() {
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const handleSelectServiceForCalculator = (serviceId) => {
    setSelectedServiceId(serviceId);
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-white reference-bg ambient-lighting selection:bg-white selection:text-black">
      {/* Navbar with Sticky Glass Effect, Language Switcher & Quick Call */}
      <Navbar />

      <main>
        {/* Hero Section with Interactive 3D Glowing Particle Sphere */}
        <Hero />

        {/* Why Code Forge is the Right Choice (matching reference section 2) */}
        <WhyUs />

        {/* About Us: Narrative, Impact Statistics & Core Values */}
        <AboutUs />

        {/* Core Services: Web Dev, Graphic Design, Video Editing, Digital Solutions */}
        <Services onSelectServiceForCalculator={handleSelectServiceForCalculator} />

        {/* Portfolio & Case Studies: Filterable showcase with metrics */}
        <Portfolio />

        {/* Interactive Custom Package Builder & Instant Quote Estimator */}
        <QuoteCalculator preselectedCategory={selectedServiceId} />

        {/* Client Testimonials & Ratings */}
        <Testimonials />

        {/* Future-Ready Call To Action Banner */}
        <CtaBanner />

        {/* Contact Information & Project Inquiry Form */}
        <ContactSection />
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp Consultation Button */}
      <WhatsAppFloatingBtn />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
