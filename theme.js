export const C = {
  navy: '#15356D',
  deepNavy: '#092A5B',
  orange: '#FC8226',
  orangeSoft: '#FFF0E2',
  pale: '#F3F5FA',
  paleBlue: '#EAF0FA',
  background: '#FFFFFF',
  border: '#DDE6F4',
  muted: '#8091AB',
  red: '#E05A4E',
  redSoft: '#FFF0EE',
  green: '#238B61',
  greenSoft: '#EDF8F0',
};

export const FONT = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
};

export const emailValid = (text) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim());
export const phoneValid = (text) => /^\+?[\d\s-]{10,18}$/.test(text.trim());
export const strongPassword = (text) => text.length >= 8 && /[A-Z]/.test(text) && /\d/.test(text) && /[^a-zA-Z\d]/.test(text);
export const secondsLabel = (seconds) => {
  const total = Math.max(0, seconds);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
};
