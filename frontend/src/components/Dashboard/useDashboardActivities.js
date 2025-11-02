import { useMemo } from 'react';

/**
 * Custom hook for filtering dashboard activities
 * @param {Array} allActivities - All activities
 * @param {string} dateFilter - Date filter ('today', 'yesterday', 'week', 'all', 'custom')
 * @param {string} typeFilter - Activity type filter
 * @param {Object} customDateRange - Custom date range {start, end}
 * @returns {Array} Filtered activities
 */
export const useDashboardActivities = (
  allActivities,
  dateFilter,
  typeFilter,
  customDateRange
) => {
  const filteredActivities = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    return allActivities.filter(activity => {
      // Filter by date
      const activityDate = new Date(activity.timestamp);
      const activityDay = new Date(
        activityDate.getFullYear(),
        activityDate.getMonth(),
        activityDate.getDate()
      );

      let dateMatch = false;
      switch (dateFilter) {
        case 'today':
          dateMatch = activityDay.getTime() === today.getTime();
          break;
        case 'yesterday':
          dateMatch = activityDay.getTime() === yesterday.getTime();
          break;
        case 'week':
          dateMatch = activityDate >= weekAgo;
          break;
        case 'custom':
          if (customDateRange.start && customDateRange.end) {
            const startDate = new Date(customDateRange.start);
            const endDate = new Date(customDateRange.end);
            endDate.setHours(23, 59, 59, 999); // Include the entire end date
            dateMatch = activityDate >= startDate && activityDate <= endDate;
          } else {
            dateMatch = true;
          }
          break;
        case 'all':
        default:
          dateMatch = true;
      }

      // Filter by activity type
      let typeMatch = false;
      if (typeFilter === 'all') {
        typeMatch = true;
      } else if (typeFilter === 'order') {
        typeMatch = activity.type === 'order' || activity.type === 'order-update';
      } else if (typeFilter === 'menu') {
        typeMatch = activity.type === 'menu-add' || activity.type === 'menu-update';
      } else if (typeFilter === 'inventory') {
        typeMatch = activity.type === 'inventory-add' || activity.type === 'inventory-update';
      } else if (typeFilter === 'low-stock') {
        typeMatch = activity.type === 'low-stock';
      } else if (typeFilter === 'completed') {
        typeMatch = activity.icon === 'completed';
      } else if (typeFilter === 'cancelled') {
        typeMatch = activity.icon === 'cancelled';
      }

      return dateMatch && typeMatch;
    });
  }, [allActivities, dateFilter, typeFilter, customDateRange]);

  return filteredActivities;
};
