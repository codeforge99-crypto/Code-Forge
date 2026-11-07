import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ProjectModal } from './ProjectModal';
import { 
  ArrowRight, 
  ArrowLeft, 
  ExternalLink, 
  TrendingUp 
} from 'lucide-react';

export const Portfolio = () => {
  const { t, isRTL } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const filterOptions = [
    { id: 'all', label: t.portfolio.filterAll },
    { id: 'web', label: t.portfolio.filterWeb },
    { id: 'design', label: t.portfolio.filterDesign },
    { id: 'video', label: t.portfolio.filterVideo },
    { id: 'solutions', label: t.portfolio.filterSolutions },
  ];

  const filteredProjects = activeFilter === 'all'
    ? t.portfolio.items
    : t.portfolio.items.filter(item => item.category === activeFilter);

  return (
    <section id="work" className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching reference */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="pill-badge mb-4">
            <span>✦ {t.portfolio.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
            {t.portfolio.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            {t.portfolio.subtitle}
          </p>
        </div>

        {/* Filter Pills matching reference */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {filterOptions.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeFilter === f.id
                  ? 'bg-white text-black shadow-md'
                  : 'bg-white/[0.04] text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProjectModal(project)}
              className="ref-card overflow-hidden flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden bg-black/50">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101218] via-transparent to-transparent opacity-90" />

                  {/* Metric Floating Badge in normal white */}
                  <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 border border-white/20 text-white text-[11px] font-semibold backdrop-blur-md`}>
                    <TrendingUp className="w-3.5 h-3.5 text-white" />
                    <span>{project.metric}</span>
                  </div>

                  {/* Category Tag */}
                  <div className={`absolute bottom-3 ${isRTL ? 'right-4' : 'left-4'} text-[11px] font-semibold text-gray-400 uppercase tracking-wider`}>
                    {project.categoryName}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">
                    {project.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-[10px] text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">
                <span>{t.portfolio.viewCaseStudy}</span>
                {isRTL ? (
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center">
          <a
            href="https://wa.me/971563639479?text=Hello%20Code%20Forge,%20I%20would%20like%20to%20view%20more%20portfolio%20samples%20and%20discuss%20a%20project."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-medium text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
          >
            <span>Request Full Portfolio PDF via WhatsApp (+971 563639479)</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-300" />
          </a>
        </div>

      </div>

      {/* Case Study Modal */}
      {activeProjectModal && (
        <ProjectModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />
      )}
    </section>
  );
};
