/**
 * Staff Management Helper Functions
 * Pure utility functions for staff data processing
 */

/**
 * Calculate role distribution from staff array
 * @param {Array} staff - Array of staff members
 * @returns {Array} Array of {name, value} objects for chart
 */
export const calculateRoleDistribution = (staff) => {
  const roles = {};
  staff.forEach(member => {
    roles[member.role] = (roles[member.role] || 0) + 1;
  });
  return Object.entries(roles).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));
};

/**
 * Calculate department distribution from staff array
 * @param {Array} staff - Array of staff members
 * @returns {Array} Array of {name, count} objects for chart
 */
export const calculateDepartmentDistribution = (staff) => {
  const departments = {};
  staff.forEach(member => {
    const dept = member.department || 'None';
    departments[dept] = (departments[dept] || 0) + 1;
  });
  return Object.entries(departments).map(([name, count]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    count
  }));
};

/**
 * Count active staff members
 * @param {Array} staff - Array of staff members
 * @returns {number} Count of active staff
 */
export const countActiveStaff = (staff) => {
  return staff.filter(m => m.status === 'active').length;
};

/**
 * Count inactive staff members
 * @param {Array} staff - Array of staff members
 * @returns {number} Count of inactive staff
 */
export const countInactiveStaff = (staff) => {
  return staff.filter(m => m.status === 'inactive').length;
};

/**
 * Get badge styling classes for role
 * @param {string} role - Staff role
 * @returns {string} CSS classes for badge
 */
export const getRoleBadgeClass = (role) => {
  switch (role) {
    case 'admin':
      return 'bg-purple-100 text-purple-700';
    case 'manager':
      return 'bg-blue-100 text-blue-700';
    case 'cashier':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

/**
 * Get badge styling classes for status
 * @param {string} status - Staff status (active/inactive)
 * @returns {string} CSS classes for badge
 */
export const getStatusBadgeClass = (status) => {
  return status === 'active'
    ? 'bg-green-100 text-green-700 hover:bg-green-200'
    : 'bg-red-100 text-red-700 hover:bg-red-200';
};

/**
 * Filter staff by search term
 * @param {Array} staff - Array of staff members
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered staff array
 */
export const filterStaff = (staff, searchTerm) => {
  const term = searchTerm.toLowerCase();
  return staff.filter(member =>
    member.name?.toLowerCase().includes(term) ||
    member.email?.toLowerCase().includes(term) ||
    member.role?.toLowerCase().includes(term)
  );
};
