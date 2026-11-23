const PLACEHOLDER_TOKENS = ['TU_NUMERO_AQUI', 'YOUR_NUMBER_HERE', '0000000000'];

export function sanitizeWhatsAppNumber(rawNumber: string): string {
  const trimmed = rawNumber.trim();
  if (!trimmed || PLACEHOLDER_TOKENS.some((token) => trimmed.toUpperCase().includes(token))) {
    return '';
  }
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (digitsOnly.length < 8 || digitsOnly.length > 15) {
    return '';
  }
  return digitsOnly;
}

export function isValidWhatsAppNumber(rawNumber: string): boolean {
  return sanitizeWhatsAppNumber(rawNumber).length >= 8;
}

export function buildWhatsAppUrl(rawNumber: string, message: string): string | null {
  const cleanNumber = sanitizeWhatsAppNumber(rawNumber);
  if (!cleanNumber) {
    if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) {
      console.warn(
        '[A tu manera digital] WHATSAPP_NUMBER no está configurado correctamente. Configura un número internacional solo con dígitos en src/config/brand.ts.'
      );
    }
    return null;
  }
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

export function buildProjectWhatsAppMessage(projectName: string): string {
  return `Hola, vengo de la web de A tu manera digital. Vi el proyecto ${projectName} en su portafolio y me gustaría cotizar una página web para mi negocio.`;
}
