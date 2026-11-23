import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface WhatsAppButtonProps {
  label: string;
  message?: string;
  variant?: 'primary' | 'subtle' | 'header';
  className?: string;
  onClickAfter?: () => void;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  label,
  message = BRAND_CONFIG.whatsappDefaultMessage,
  variant = 'primary',
  className = '',
  onClickAfter,
}) => {
  const href = buildWhatsAppUrl(BRAND_CONFIG.whatsappNumber, message);

  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#7DEBFF] focus-visible:outline-offset-2';

  const variantStyles = {
    primary:
      'px-6 py-3.5 text-sm sm:text-[15px] rounded-sm bg-[#FF5A1F] text-[#050608] font-semibold hover:bg-[#FF7A32] shadow-[0_0_28px_-6px_rgba(255,90,31,0.55)] active:scale-[0.99]',
    subtle:
      'px-5 py-3 text-sm rounded-sm border border-[#D8DEE5]/20 bg-[#0A0D12] text-[#F5F7FA] hover:border-[#FF5A1F]/70 hover:text-[#FF7A32]',
    header:
      'px-4 py-2 text-xs sm:text-[13px] rounded-sm bg-[#FF5A1F] text-[#050608] font-semibold hover:bg-[#FF7A32]',
  }[variant];

  if (!href) {
    return (
      <button
        type="button"
        disabled
        title="Número de WhatsApp pendiente de configuración"
        className={`${baseStyles} ${variantStyles} opacity-50 cursor-not-allowed ${className}`}
      >
        <span>{label}</span>
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClickAfter}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      <span>{label}</span>
      <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
    </a>
  );
};
