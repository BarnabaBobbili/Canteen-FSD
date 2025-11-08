import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const RecentActivities = ({ recentActivity, loading }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const getActivityIconColor = (icon) => {
    switch (icon) {
      case 'alert':
        return 'bg-red-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-400';
      case 'order':
        return 'bg-blue-500';
      case 'menu':
        return 'bg-sky-500';
      case 'inventory':
        return 'bg-purple-500';
      case 'update':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-1.5 sm:gap-2">
          <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500" />
          <span className="truncate">Recent Activity</span>
        </h3>
        <button
          onClick={() => navigate(user?.role === 'admin' ? '/admin/activities' : '/activities')}
          className="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm text-sky-600 hover:text-sky-700 font-medium flex-shrink-0"
        >
          <span className="hidden sm:inline">View More</span>
          <span className="sm:hidden">More</span>
          <ChevronRight size={14} className="sm:w-4 sm:h-4" />
        </button>
      </div>
      <div className="space-y-2">
        {loading ? (
          <div className="text-center py-4 text-gray-500 text-sm">Loading...</div>
        ) : recentActivity.length > 0 ? (
          recentActivity.map((activity, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-1.5 sm:mt-2 flex-shrink-0 ${getActivityIconColor(
                  activity.icon
                )}`}
              ></div>
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm text-gray-900 font-medium truncate">
                  {activity.text}
                </div>
                {activity.detail && (
                  <div className="text-xs text-gray-500 mt-0.5 truncate">
                    {activity.detail}
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-500 flex-shrink-0">{activity.time}</span>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500 text-sm">No recent activity</div>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;
