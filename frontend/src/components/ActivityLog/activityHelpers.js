/**
 * Activity Log Helper Functions
 * Pure utility functions for activity log processing
 */

/**
 * Get severity badge color classes
 * @param {string} severity - Activity severity (critical, warning, info)
 * @returns {string} Tailwind CSS classes
 */
export const getSeverityColor = (severity) => {
  switch (severity) {
    case 'critical':
      return 'text-red-600 bg-red-50';
    case 'warning':
      return 'text-yellow-600 bg-yellow-50';
    case 'info':
      return 'text-blue-600 bg-blue-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

/**
 * Get severity icon component
 * @param {string} severity - Activity severity
 * @param {React.Component} AlertCircle - Icon component
 * @param {React.Component} AlertTriangle - Icon component
 * @param {React.Component} Info - Icon component
 * @returns {React.Element} Icon element
 */
export const getSeverityIcon = (severity, AlertCircle, AlertTriangle, Info) => {
  switch (severity) {
    case 'critical':
      return <AlertCircle className="w-4 h-4" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4" />;
    case 'info':
      return <Info className="w-4 h-4" />;
    default:
      return <Info className="w-4 h-4" />;
  }
};

/**
 * Format activity type for display
 * @param {string} type - Activity type (e.g., "menu_create")
 * @returns {string} Formatted type (e.g., "Menu Create")
 */
export const formatActivityType = (type) => {
  return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
