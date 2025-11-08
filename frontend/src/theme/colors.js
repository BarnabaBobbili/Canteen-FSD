/**
 * Theme colors for Canteen User Website
 * Based on modern food ordering app aesthetics
 */

export const colors = {
  // Primary colors from prompt
  primary: '#FF7A00',      // Warm orange
  secondary: '#8FCB9B',    // Fresh green
  text: '#2E3A47',         // Slate
  background: '#F9F9F9',   // Off-white
  accent: '#FFE200',       // Highlight yellow

  // Additional colors for UI
  white: '#FFFFFF',
  black: '#000000',

  // Status colors
  success: '#8FCB9B',
  warning: '#FFE200',
  error: '#FF4444',
  info: '#4A90E2',

  // Grays
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Gradients (Tailwind classes)
  gradients: {
    primary: 'from-[#FF7A00] to-[#FF9A40]',
    secondary: 'from-[#8FCB9B] to-[#6FB87D]',
    hero: 'from-[#FF7A00] via-[#FFE200] to-[#8FCB9B]',
    card: 'from-white to-gray-50'
  }
};

export default colors;
