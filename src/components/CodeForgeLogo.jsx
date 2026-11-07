import React from 'react';

export const CodeForgeLogo = ({ 
  size = 'md', 
  showTagline = true, 
  className = '' 
}) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-sm', sub: 'text-[8px]', gap: 'gap-2' },
    md: { icon: 'w-9 h-9 sm:w-10 sm:h-10', text: 'text-base sm:text-lg', sub: 'text-[9px] sm:text-[10px]', gap: 'gap-2.5 sm:gap-3' },
    lg: { icon: 'w-12 h-12 sm:w-14 sm:h-14', text: 'text-xl sm:text-2xl', sub: 'text-[10px] sm:text-xs', gap: 'gap-3 sm:gap-4' },
    xl: { icon: 'w-16 h-16 sm:w-20 sm:h-20', text: 'text-2xl sm:text-3xl', sub: 'text-xs sm:text-sm', gap: 'gap-4 sm:gap-5' },
  }[size] || { icon: 'w-10 h-10', text: 'text-lg', sub: 'text-[10px]', gap: 'gap-3' };

  return (
    <div className={`inline-flex items-center ${sizeMap.gap} select-none group ${className}`}>
      
      {/* Exact Authentic CF Emblem extracted directly from user's image */}
      <div className={`relative ${sizeMap.icon} rounded-xl bg-[#111319] border border-white/15 flex items-center justify-center p-1.5 shadow-sm group-hover:border-white/30 transition-all shrink-0`}>
        <img
          src="/logo-mark-white.png"
          alt="Code Forge Emblem"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className={`font-bold tracking-[0.22em] text-white leading-none ${sizeMap.text} uppercase`}>
          CODE FORGE
        </div>
        
        {showTagline && (
          <div className={`tracking-[0.28em] text-gray-400 font-medium uppercase ${sizeMap.sub} mt-1`}>
            BUILD • INNOVATE • GROW
          </div>
        )}
      </div>

    </div>
  );
};
