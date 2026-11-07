import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, TrendingUp, CheckCircle, MessageCircle } from 'lucide-react';

export const ProjectModal = ({ project, onClose }) => {
  const { isRTL } = useLanguage();
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#0e1017] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Cover Image */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-[#0e1017]/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-2 rounded-full bg-black/70 border border-white/20 text-gray-300 hover:text-white hover:bg-black/90 transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Floating Metric Pill */}
          <div className={`absolute bottom-4 ${isRTL ? 'right-6' : 'left-6'} inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 border border-white/20 text-white text-xs font-semibold backdrop-blur-md`}>
            <TrendingUp className="w-4 h-4 text-white" />
            <span>{project.metric}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {project.categoryName}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight leading-snug">
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
            {project.desc}
          </p>

          {/* Case Study Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                The Client Challenge
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                Code Forge Solution
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Result Highlight */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3 mb-6">
            <CheckCircle className="w-5 h-5 text-white shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-white block mb-0.5">
                Measurable Commercial Result:
              </span>
              <p className="text-xs text-gray-300">
                {project.results}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-medium text-gray-400">
                #{tag}
              </span>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <a
              href={`https://wa.me/971563639479?text=Hello%20Code%20Forge,%20I%20saw%20your%20work%20on%20${encodeURIComponent(project.title)}%20and%20would%20like%20a%20similar%20solution.`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-medium text-gray-300 hover:text-white bg-white/[0.04] border border-white/10 hover:border-white/20 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Discuss Similar Project via WhatsApp</span>
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-medium text-gray-300 bg-white/5 hover:bg-white/10 transition-colors"
            >
              Close Case Study
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
