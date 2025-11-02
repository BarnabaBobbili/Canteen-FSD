import React from 'react';
import {
  Activity, X, Calendar, Filter, AlertTriangle, CheckCircle,
  ShoppingCart, UtensilsCrossed, Package, Clock
} from 'lucide-react';

const ActivityModal = ({
  showModal,
  onClose,
  activityDateFilter,
  setActivityDateFilter,
  activityTypeFilter,
  setActivityTypeFilter,
  customDateRange,
  setCustomDateRange,
  filteredActivities
}) => {
  if (!showModal) return null;

  const getActivityIcon = (icon) => {
    const iconClass = "w-4 h-4 sm:w-5 sm:h-5";

    switch (icon) {
      case 'alert':
        return <AlertTriangle className={`${iconClass} text-red-600`} />;
      case 'completed':
        return <CheckCircle className={`${iconClass} text-green-600`} />;
      case 'cancelled':
        return <X className={`${iconClass} text-red-600`} />;
      case 'order':
        return <ShoppingCart className={`${iconClass} text-blue-600`} />;
      case 'menu':
        return <UtensilsCrossed className={`${iconClass} text-sky-600`} />;
      case 'inventory':
        return <Package className={`${iconClass} text-purple-600`} />;
      case 'update':
        return <Clock className={`${iconClass} text-yellow-600`} />;
      default:
        return null;
    }
  };

  const getActivityBgColor = (icon) => {
    switch (icon) {
      case 'alert':
      case 'cancelled':
        return 'bg-red-100';
      case 'completed':
        return 'bg-green-100';
      case 'order':
        return 'bg-blue-100';
      case 'menu':
        return 'bg-sky-100';
      case 'inventory':
        return 'bg-purple-100';
      case 'update':
        return 'bg-yellow-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-sky-400 to-blue-500 p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-2xl font-bold flex items-center gap-1.5 sm:gap-2">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="truncate">All Activities</span>
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* Date Filter Dropdown */}
            <div>
              <label className="text-xs sm:text-sm text-sky-100 mb-1.5 sm:mb-2 font-medium flex items-center gap-1.5 sm:gap-2">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Filter by Date
              </label>
              <select
                value={activityDateFilter}
                onChange={(e) => {
                  setActivityDateFilter(e.target.value);
                  if (e.target.value !== 'custom') {
                    setCustomDateRange({ start: '', end: '' });
                  }
                }}
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-white text-sm"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">Last 7 Days</option>
                <option value="all">All Time</option>
                <option value="custom">Custom Date Range</option>
              </select>

              {/* Custom Date Range Inputs */}
              {activityDateFilter === 'custom' && (
                <div className="mt-2 sm:mt-3 space-y-2">
                  <div>
                    <label className="text-xs text-sky-100 mb-1 block">Start Date</label>
                    <input
                      type="date"
                      value={customDateRange.start}
                      onChange={(e) =>
                        setCustomDateRange({ ...customDateRange, start: e.target.value })
                      }
                      className="w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-sky-100 mb-1 block">End Date</label>
                    <input
                      type="date"
                      value={customDateRange.end}
                      onChange={(e) =>
                        setCustomDateRange({ ...customDateRange, end: e.target.value })
                      }
                      className="w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white text-gray-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Activity Type Filter Dropdown */}
            <div>
              <label className="text-xs sm:text-sm text-sky-100 mb-1.5 sm:mb-2 font-medium flex items-center gap-1.5 sm:gap-2">
                <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Filter by Type
              </label>
              <select
                value={activityTypeFilter}
                onChange={(e) => setActivityTypeFilter(e.target.value)}
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-white text-sm"
              >
                <option value="all">All Activities</option>
                <option value="order">Orders</option>
                <option value="menu">Menu</option>
                <option value="inventory">Inventory</option>
                <option value="low-stock">Low Stock</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Activities Count */}
        <div className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-50 border-b">
          <p className="text-xs sm:text-sm text-gray-600">
            Showing{' '}
            <span className="font-semibold text-gray-900">{filteredActivities.length}</span>{' '}
            {filteredActivities.length === 1 ? 'activity' : 'activities'}
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-3 sm:p-6 overflow-y-auto max-h-[calc(95vh-200px)] sm:max-h-[calc(90vh-240px)]">
          {filteredActivities.length > 0 ? (
            <div className="space-y-2">
              {filteredActivities.map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 sm:gap-4 p-2 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {/* Activity Icon */}
                  <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${getActivityBgColor(activity.icon)}`}>
                    {getActivityIcon(activity.icon)}
                  </div>

                  {/* Activity Details */}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-0.5 sm:mb-1">
                      {activity.text}
                    </div>
                    {activity.detail && (
                      <div className="text-xs sm:text-sm text-gray-600">{activity.detail}</div>
                    )}
                    <div className="text-xs text-gray-500 mt-0.5 sm:mt-1">
                      {new Date(activity.timestamp).toLocaleString()}
                    </div>
                  </div>

                  {/* Time Ago */}
                  <div className="text-xs text-gray-500 flex-shrink-0 font-medium">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12 text-gray-500">
              <Activity className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-20" />
              <p className="text-base sm:text-lg font-medium">No activities found</p>
              <p className="text-xs sm:text-sm mt-1 sm:mt-2">
                Try selecting a different date range
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-1.5 sm:py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityModal;
