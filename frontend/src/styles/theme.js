/**
 * Smart Canteen Management System - Theme Configuration
 * Based on the Inventory Management Dashboard design
 *
 * Primary Color: #1570EF (Blue)
 * Background: #F4F5FA (Light Gray)
 */

export const theme = {
  // Primary Colors
  colors: {
    primary: '#1570EF',
    primaryLight: '#3B82F6',
    primaryBg: '#E0F2FE',

    // Background
    background: '#F4F5FA',
    white: '#FFFFFF',

    // Text Colors
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',

    // Status Colors
    success: '#10B981',
    successBg: '#ECFDF5',
    warning: '#F59E0B',
    warningBg: '#FFF7ED',
    error: '#EF4444',
    errorBg: '#FEF2F2',
    info: '#0EA5E9',
    infoBg: '#DBEAFE',
    purple: '#8B5CF6',
    purpleBg: '#F5F3FF',

    // Border & Divider
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #1570EF 0%, #3B82F6 100%)',
    success: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    warning: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    purple: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  },

  // Shadows
  shadows: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(21, 112, 239, 0.3), 0 4px 6px -4px rgba(21, 112, 239, 0.15)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },

  // Border Radius
  borderRadius: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },

  // Typography
  typography: {
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
  },

  // Spacing
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },

  // Z-index
  zIndex: {
    dropdown: 50,
    modal: 100,
    tooltip: 200,
    notification: 300,
  },
};

// Helper functions for easy access
export const getColor = (colorName) => theme.colors[colorName] || colorName;
export const getGradient = (gradientName) => theme.gradients[gradientName] || gradientName;
export const getShadow = (shadowName) => theme.shadows[shadowName] || shadowName;

export default theme;
