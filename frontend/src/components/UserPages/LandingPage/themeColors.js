/**
 * Theme color configurations for Landing Page
 * Provides vibrant colors for both light and dark modes
 */

export const getThemeColors = (theme) => {
  if (theme === 'dark') {
    return {
      // Backgrounds
      sectionBg: {
        hero: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        category: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0d1b2a 100%)',
        howItWorks: 'linear-gradient(135deg, #16213e 0%, #0f172a 50%, #1a1a2e 100%)',
        features: 'linear-gradient(135deg, #0d1b2a 0%, #1e293b 50%, #16213e 100%)',
        specials: 'linear-gradient(135deg, #1e293b 0%, #0d1b2a 50%, #16213e 100%)',
        cta: 'linear-gradient(135deg, #1a1a2e 0%, #0f172a 50%, #16213e 100%)'
      },
      // Text colors
      text: {
        primary: '#ffffff',
        secondary: '#e5e7eb',
        muted: '#9ca3af'
      },
      // Border colors
      border: {
        primary: '#ffffff',
        secondary: '#e5e7eb'
      },
      // Badge/Card backgrounds
      cardBg: {
        primary: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        secondary: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
        tertiary: 'linear-gradient(135deg, #475569 0%, #64748b 100%)'
      },
      // Vibrant accent colors for dark mode
      accents: {
        pink: '#ff1493', // Deep pink
        blue: '#00bfff', // Deep sky blue
        yellow: '#ffd700', // Gold
        orange: '#ffa500', // Orange
        purple: '#ba55d3', // Medium orchid
        cyan: '#00e5ff', // Neon cyan
        green: '#00ff7f' // Spring green
      },
      // Speed lines
      speedLines: {
        color1: 'rgba(255,20,147,0.6)', // Deep pink
        color2: 'rgba(0,191,255,0.6)', // Deep sky blue
        color3: 'rgba(255,215,0,0.6)'  // Gold
      }
    };
  }

  // Light mode colors
  return {
    // Backgrounds
    sectionBg: {
      hero: 'linear-gradient(135deg, #fff5f7 0%, #fffacd 100%)',
      category: 'linear-gradient(135deg, #fff0f5 0%, #ffe4e1 50%, #e0f7fa 100%)',
      howItWorks: 'linear-gradient(135deg, #e0f7fa 0%, #fff9c4 50%, #fce4ec 100%)',
      features: 'linear-gradient(135deg, #fff9c4 0%, #ffe4e1 50%, #e0f7fa 100%)',
      specials: 'linear-gradient(135deg, #ffe4e1 0%, #fff9c4 50%, #e0f7fa 100%)',
      cta: 'linear-gradient(135deg, #fce4ec 0%, #e0f7fa 50%, #fff9c4 100%)'
    },
    // Text colors
    text: {
      primary: '#111827',
      secondary: '#374151',
      muted: '#6b7280'
    },
    // Border colors
    border: {
      primary: '#111827',
      secondary: '#374151'
    },
    // Badge/Card backgrounds
    cardBg: {
      primary: 'linear-gradient(135deg, #ffffff 0%, #f8f8ff 100%)',
      secondary: 'linear-gradient(135deg, #ffd6e8 0%, #ffb3d9 100%)',
      tertiary: 'linear-gradient(135deg, #b3e5fc 0%, #81d4fa 100%)'
    },
    // Accent colors for light mode
    accents: {
      pink: '#ff69b4', // Hot pink
      blue: '#87ceeb', // Sky blue
      yellow: '#ffd700', // Gold
      orange: '#ffa500', // Orange
      purple: '#dda0dd', // Plum
      cyan: '#87ceeb', // Sky blue
      green: '#98fb98' // Pale green
    },
    // Speed lines
    speedLines: {
      color1: 'rgba(255,105,180,0.5)', // Hot pink
      color2: 'rgba(135,206,250,0.5)', // Sky blue
      color3: 'rgba(255,215,0,0.5)'    // Gold
    }
  };
};
