import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'light';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'full', showTagline = true }) => {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-white' : 'text-[#1B4D2E]';
  const goldColor = '#C49A45';
  const leafColor = isLight ? '#4ADE80' : '#1B4D2E';

  if (variant === 'compact') {
    return (
      <div className={`flex flex-col items-center select-none text-center ${className}`}>
        <span className={`font-serif font-black text-xl md:text-2xl ${textColor} tracking-[0.12em] leading-none`}>
          ÖZYEŞİL
        </span>
        <div className="flex items-center justify-center gap-1.5 w-full mt-0.5">
          <span className="h-[1px] bg-[#C49A45] flex-1 min-w-[12px]"></span>
          <span className="text-[9px] md:text-[10px] font-bold text-[#C49A45] tracking-[0.25em] uppercase leading-none">
            KOZMETİK
          </span>
          <span className="h-[1px] bg-[#C49A45] flex-1 min-w-[12px]"></span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center text-center select-none ${className}`}>
      {/* Brand Main Title - Serif & Emerald Green */}
      <h1 className={`font-serif text-2xl md:text-3xl lg:text-4xl font-black ${textColor} tracking-[0.12em] leading-none mb-1`}>
        ÖZYEŞİL
      </h1>

      {/* Golden Kozmetik Subtitle with Side Rules */}
      <div className="flex items-center justify-center gap-2 w-full max-w-[260px] my-1">
        <span className="h-[1px] bg-[#C49A45] flex-1"></span>
        <span className="text-xs md:text-sm font-bold text-[#C49A45] tracking-[0.3em] uppercase">
          KOZMETİK
        </span>
        <span className="h-[1px] bg-[#C49A45] flex-1"></span>
      </div>

      {/* Tagline */}
      {showTagline && (
        <p className={`text-[9px] md:text-[10px] font-bold ${isLight ? 'text-emerald-200' : 'text-[#1B4D2E]'} tracking-[0.2em] uppercase mt-1`}>
          DOĞAL GÜZELLİK, SAĞLIKLI SEN
        </p>
      )}

      {/* Leaf Icon Bottom Rule */}
      <div className="flex items-center justify-center gap-2 w-full max-w-[180px] mt-1.5">
        <span className={`h-[0.5px] ${isLight ? 'bg-white/30' : 'bg-[#1B4D2E]/40'} flex-1`}></span>
        {/* Leaf Pair Icon matching uploaded logo */}
        <div className="flex items-center justify-center text-[#1B4D2E] mx-1">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 18C12 18 6 15 5 9C4 3 10 3 12 7C14 3 20 3 19 9C18 15 12 18 12 18Z"
              fill={leafColor}
            />
          </svg>
        </div>
        <span className={`h-[0.5px] ${isLight ? 'bg-white/30' : 'bg-[#1B4D2E]/40'} flex-1`}></span>
      </div>
    </div>
  );
};
