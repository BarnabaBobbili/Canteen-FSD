/**
 * DashStack Theme Configuration
 * Design system colors and styles based on DashStack UI Kit
 */

export const dashStackColors = {
  // Primary Colors
  primary: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1', // Main primary color
    600: '#4F46E5', // Primary hover
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },

  // Secondary Colors
  secondary: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },

  // Success Colors
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },

  // Warning Colors
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  // Danger Colors
  danger: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  // Info Colors
  info: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9',
    600: '#0284C7',
    700: '#0369A1',
    800: '#075985',
    900: '#0C4A6E',
  },

  // Neutral/Gray Colors
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

/**
 * Stat card configurations for dashboard
 */
export const statCardStyles = {
  totalUser: {
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    lightBg: 'bg-indigo-100',
    gradientFrom: 'from-indigo-500',
    gradientTo: 'to-indigo-600',
  },
  totalOrder: {
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    lightBg: 'bg-yellow-100',
    gradientFrom: 'from-yellow-500',
    gradientTo: 'to-yellow-600',
  },
  totalSales: {
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    lightBg: 'bg-green-100',
    gradientFrom: 'from-green-500',
    gradientTo: 'to-green-600',
  },
  totalPending: {
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-600',
    lightBg: 'bg-pink-100',
    gradientFrom: 'from-pink-500',
    gradientTo: 'to-pink-600',
  },
  inventory: {
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    lightBg: 'bg-purple-100',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-purple-600',
  },
  menu: {
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    lightBg: 'bg-blue-100',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-blue-600',
  },
};

/**
 * Shadow configurations
 */
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

/**
 * Border radius configurations
 */
export const borderRadius = {
  sm: '0.375rem',
  default: '0.5rem',
  md: '0.625rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
};

/**
 * Typography configurations
 */
export const typography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

export default {
  colors: dashStackColors,
  statCardStyles,
  shadows,
  borderRadius,
  typography,
};
