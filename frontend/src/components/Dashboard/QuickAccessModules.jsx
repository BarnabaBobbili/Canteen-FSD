import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickAccessModules = ({ accessibleModules }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 md:mb-8">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
        Quick Access
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {accessibleModules.slice(1, 5).map((module, index) => {
          const Icon = module.icon;
          return (
            <button
              key={index}
              onClick={() => navigate(module.path)}
              className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-left group"
            >
              <div
                className={`inline-block p-2 sm:p-3 rounded-lg bg-gradient-to-br ${module.color} text-white mb-2 sm:mb-3 group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                {module.name}
              </h4>
              <p className="text-xs text-gray-600">{module.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickAccessModules;
