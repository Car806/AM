import React from 'react';

interface BrandMarkProps {
  showWordmark?: boolean;
  compact?: boolean;
  className?: string;
}

export const BrandMark: React.FC<BrandMarkProps> = ({
  showWordmark = true,
  compact = false,
  className = '',
}) => {
  return (
    <span className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Monograma geométrico AM. fiel al logotipo de marca */}
      <svg
        width={compact ? 32 : 38}
        height={compact ? 22 : 26}
        viewBox="0 0 118 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Trazo izquierdo de la A */}
        <path
          d="M27.5 11L4.5 64H18.5C22.5 64 25.5 61.5 27.2 57.5L36.5 34.5L27.5 11Z"
          fill="#F5F7FA"
        />
        {/* Pierna derecha / puente hacia la M */}
        <path
          d="M28.5 11H41.5L56.5 47.5L70.5 11H84.5L88.5 64H75.2L73.2 33.5L60.2 64H49.2L35.5 31L28.5 11Z"
          fill="#F5F7FA"
        />
        {/* Tercer trazo diagonal de la M */}
        <path
          d="M84.5 11L98.5 64H85.5L77.5 29L84.5 11Z"
          fill="#D8DEE5"
        />
        {/* Punto cuadrado naranja eléctrico */}
        <rect x="103" y="51" width="13" height="13" fill="#FF5A1F" />
      </svg>

      {showWordmark && (
        <span className="font-display text-[15px] sm:text-base font-semibold tracking-normal text-[#F5F7FA] whitespace-nowrap shrink-0">
          A tu manera <span className="text-[#FF5A1F]">digital</span>
        </span>
      )}
    </span>
  );
};
