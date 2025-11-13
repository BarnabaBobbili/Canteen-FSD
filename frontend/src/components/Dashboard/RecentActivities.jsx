import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Activity, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const RecentActivities = ({ recentActivity, loading }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useTranslation();

  const getActivityIconColor = (icon) => {
    switch (icon) {
      case 'alert':
        return '#EF4444';
      case 'completed':
        return '#10B981';
      case 'cancelled':
        return '#F87171';
      case 'order':
        return '#1570EF';
      case 'menu':
        return '#0EA5E9';
      case 'inventory':
        return '#8B5CF6';
      case 'update':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  return (
    <div
      className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100"
      style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.06)' }}
    >
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <h3 className="text-base sm:text-lg font-bold flex items-center gap-2" style={{ color: '#111827' }}>
          <Activity className="w-5 h-5" style={{ color: '#1570EF' }} />
          <span className="truncate">{t('dashboard.recentActivity')}</span>
        </h3>
        <button
          onClick={() => navigate(user?.role === 'admin' ? '/admin/activities' : '/activities')}
          className="flex items-center gap-1 text-sm font-medium flex-shrink-0 hover:underline"
          style={{ color: '#1570EF' }}
        >
          <span className="hidden sm:inline">{t('common.viewAll')}</span>
          <span className="sm:hidden">{t('common.viewAll')}</span>
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="space-y-2">
        {loading ? (
          <div className="text-center py-6 text-sm" style={{ color: '#9CA3AF' }}>{t('common.loading')}...</div>
        ) : recentActivity.length > 0 ? (
          recentActivity.map((activity, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div
                className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: getActivityIconColor(activity.icon) }}
              ></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate" style={{ color: '#111827' }}>
                  {activity.text}
                </div>
                {activity.detail && (
                  <div className="text-xs mt-0.5 truncate" style={{ color: '#6B7280' }}>
                    {activity.detail}
                  </div>
                )}
              </div>
              <span className="text-xs flex-shrink-0" style={{ color: '#9CA3AF' }}>{activity.time}</span>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-sm" style={{ color: '#9CA3AF' }}>{t('dashboard.noActivities')}</div>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;
