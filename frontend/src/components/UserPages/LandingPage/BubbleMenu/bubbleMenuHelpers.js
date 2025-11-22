/**
 * Helper functions and configurations for BubbleMenu
 */

/**
 * Get the correct dashboard route based on user role
 * @param {Object} user - User object with role property
 * @returns {string} Dashboard route path
 */
export const getDashboardRoute = (user) => {
  if (!user) return '/login';
  switch (user.role) {
    case 'admin': return '/admin';
    case 'manager': return '/manager';
    case 'cashier': return '/cashier';
    case 'staff': return '/kitchen';
    case 'customer': return '/profile';
    default: return '/profile';
  }
};

/**
 * Get menu items configuration based on theme and user
 * @param {string} theme - Current theme ('dark' or 'light')
 * @param {Object} user - Current user object
 * @param {Function} navigate - React Router navigate function
 * @returns {Array} Filtered menu items array
 */
export const getMenuItems = (theme, user, navigate) => {
  const allMenuItems = [
    {
      label: 'Specials',
      href: '#specials',
      ariaLabel: 'Today\'s Specials',
      rotation: -8,
      hoverStyles: {
        bgColor: theme === 'dark' ? '#ba55d3' : '#9c27b0',
        textColor: '#ffffff'
      }
    },
    {
      label: 'Menu',
      href: '#menu',
      ariaLabel: 'View Menu',
      rotation: 8,
      hoverStyles: {
        bgColor: theme === 'dark' ? '#ff1493' : '#ff69b4',
        textColor: '#ffffff'
      }
    },
    {
      label: 'How It Works',
      href: '#how-it-works',
      ariaLabel: 'How It Works',
      rotation: -8,
      hoverStyles: {
        bgColor: theme === 'dark' ? '#00bfff' : '#4dd0e1',
        textColor: '#ffffff'
      }
    },
    {
      label: 'My Account',
      onClick: () => navigate(getDashboardRoute(user)),
      ariaLabel: 'My Account',
      rotation: 8,
      hoverStyles: {
        bgColor: theme === 'dark' ? '#9c27b0' : '#ba55d3',
        textColor: '#ffffff'
      },
      showWhen: user // Only show when user IS logged in
    },
    {
      label: 'Sign In',
      onClick: () => navigate('/login'),
      ariaLabel: 'Sign In',
      rotation: 8,
      hoverStyles: {
        bgColor: theme === 'dark' ? '#32cd32' : '#10b981',
        textColor: '#ffffff'
      },
      showWhen: !user // Only show when user is NOT logged in
    }
  ];

  // Filter out items that shouldn't be shown
  return allMenuItems.filter(item => item.showWhen !== false);
};

/**
 * Get menu background and content colors based on theme
 * @param {string} theme - Current theme
 * @returns {Object} Object with menuBg and menuContentColor
 */
export const getMenuColors = (theme) => {
  const menuBg = theme === 'dark'
    ? 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)'
    : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';

  const menuContentColor = theme === 'dark' ? '#ffffff' : '#1a1a2e';

  return { menuBg, menuContentColor };
};
