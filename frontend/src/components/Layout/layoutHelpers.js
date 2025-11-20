/**
 * Layout Helper Functions
 * Utility functions for DashboardLayout component
 */

/**
 * Get navigation path with role-based prefix
 * @param {string} basePath - Base navigation path
 * @param {string} role - User role ('admin', 'manager', etc.)
 * @returns {string} Full path with role prefix
 */
export const getPath = (basePath, role) => {
  if (role === 'admin') {
    return `/admin${basePath === '/dashboard' ? '' : basePath}`;
  } else if (role === 'manager') {
    return `/manager${basePath === '/dashboard' ? '' : basePath}`;
  }
  return basePath;
};

/**
 * Format date and time based on settings
 * @param {Date} currentDateTime - Current date/time object
 * @param {string} timezone - Timezone setting
 * @returns {{date: string, time: string}} Formatted date and time
 */
export const formatDateTime = (currentDateTime, timezone = 'Asia/Kolkata') => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  try {
    // Get current time in the selected timezone
    const timeInZone = new Date().toLocaleString('en-US', { timeZone: timezone });
    const dateInZone = new Date(timeInZone);

    const dayName = days[dateInZone.getDay()];
    const day = dateInZone.getDate();
    const month = months[dateInZone.getMonth()];
    const year = dateInZone.getFullYear();

    const hours = String(dateInZone.getHours()).padStart(2, '0');
    const minutes = String(dateInZone.getMinutes()).padStart(2, '0');
    const seconds = String(dateInZone.getSeconds()).padStart(2, '0');

    return {
      date: `${dayName}, ${day} ${month} ${year}`,
      time: `${hours}:${minutes}:${seconds}`
    };
  } catch (error) {
    // Fallback to local time if timezone conversion fails
    const dayName = days[currentDateTime.getDay()];
    const day = currentDateTime.getDate();
    const month = months[currentDateTime.getMonth()];
    const year = currentDateTime.getFullYear();

    const hours = String(currentDateTime.getHours()).padStart(2, '0');
    const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentDateTime.getSeconds()).padStart(2, '0');

    return {
      date: `${dayName}, ${day} ${month} ${year}`,
      time: `${hours}:${minutes}:${seconds}`
    };
  }
};

/**
 * Get navigation items with translations
 * @param {function} t - Translation function
 * @returns {Array} Array of navigation items
 */
export const getNavigationItems = (t) => [
  { name: t('common.dashboard'), path: '/dashboard', icon: 'LayoutDashboard', roles: ['admin', 'manager', 'cashier', 'staff', 'customer'] },
  { name: t('common.orders'), path: '/orders', icon: 'ShoppingCart', roles: ['admin', 'manager', 'cashier', 'staff'] },
  { name: t('common.menu'), path: '/menu', icon: 'UtensilsCrossed', roles: ['admin', 'manager', 'staff'] },
  { name: t('common.inventory'), path: '/inventory', icon: 'Package', roles: ['admin', 'manager', 'staff'] },
  { name: t('common.staff'), path: '/staff', icon: 'Users', roles: ['admin'] },
  { name: t('common.activities'), path: '/activities', icon: 'Activity', roles: ['admin'] },
  { name: t('common.suppliers'), path: '/suppliers', icon: 'Truck', roles: ['admin', 'manager'] },
  { name: t('common.discounts'), path: '/discounts', icon: 'Tag', roles: ['admin', 'manager'] },
  { name: t('common.feedback'), path: '/feedback', icon: 'MessageSquare', roles: ['admin', 'manager'] },
  { name: t('common.payments'), path: '/payments', icon: 'CreditCard', roles: ['admin', 'manager', 'cashier'] },
  { name: t('common.reports'), path: '/reports', icon: 'FileText', roles: ['admin', 'manager'] }
];

/**
 * Filter navigation items based on user role
 * @param {Array} navItems - All navigation items
 * @param {string} userRole - Current user role
 * @returns {Array} Filtered navigation items
 */
export const filterNavigationByRole = (navItems, userRole) => {
  return navItems.filter(item => item.roles.includes(userRole));
};

/**
 * Calculate tooltip position for nav items
 * @param {number} index - Index of nav item
 * @param {number} totalItems - Total number of items
 * @returns {string} CSS top position
 */
export const calculateTooltipPosition = (index, totalItems) => {
  const totalHeight = window.innerHeight;
  const navStartY = 64; // Logo height
  const navEndY = totalHeight - 140; // Subtract bottom sections
  const itemHeight = (navEndY - navStartY) / totalItems;
  return `${navStartY + (index * itemHeight) + (itemHeight / 2) - 20}px`;
};
