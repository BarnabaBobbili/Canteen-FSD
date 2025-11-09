import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickAccessModules = ({ accessibleModules }) => {
  const navigate = useNavigate();

  // Map module colors to DashStack colors
  const colorMap = {
    'from-blue-500 to-blue-600': { bg: '#EEF2FF', icon: '#4A6CF7' },
    'from-sky-500 to-sky-600': { bg: '#DBEAFE', icon: '#0EA5E9' },
    'from-green-500 to-green-600': { bg: '#ECFDF5', icon: '#10B981' },
    'from-purple-500 to-purple-600': { bg: '#F5F3FF', icon: '#8B5CF6' },
    'from-cyan-500 to-cyan-600': { bg: '#ECFEFF', icon: '#06B6D4' },
    'from-pink-500 to-pink-600': { bg: '#FCE7F3', icon: '#EC4899' },
    'from-indigo-500 to-indigo-600': { bg: '#EEF2FF', icon: '#6366F1' },
    'from-emerald-500 to-emerald-600': { bg: '#D1FAE5', icon: '#059669' },
  };

  return (
    <div className="mb-6 md:mb-8">
      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4" style={{ color: '#111827' }}>
        Quick Access
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {accessibleModules.slice(1, 5).map((module, index) => {
          const Icon = module.icon;
          const colors = colorMap[module.color] || { bg: '#EEF2FF', icon: '#4A6CF7' };

          return (
            <button
              key={index}
              onClick={() => navigate(module.path)}
              className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-1 text-left group"
              style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.08)' }}
            >
              <div
                className="inline-flex items-center justify-center p-3 rounded-lg mb-3 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: colors.bg }}
              >
                <Icon className="w-6 h-6" style={{ color: colors.icon }} />
              </div>
              <h4 className="text-base font-bold mb-1" style={{ color: '#111827' }}>
                {module.name}
              </h4>
              <p className="text-sm" style={{ color: '#6B7280' }}>{module.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickAccessModules;
