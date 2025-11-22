import React from 'react';

/**
 * Shared Summary Cards Component for Reports
 * Displays metric cards with icons and values in a responsive grid
 *
 * @param {Array} cards - Array of card objects with structure:
 *   {
 *     title: string,
 *     value: string|number,
 *     icon: LucideIcon,
 *     bgColor: string (hex),
 *     iconColor: string (hex)
 *   }
 */
const ReportSummaryCards = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="macos-stat-card macos-animate cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <div className="macos-icon-bg" style={{ backgroundColor: card.bgColor }}>
                <Icon className="w-6 h-6" style={{ color: card.iconColor }} />
              </div>
            </div>
            <p className="macos-text text-sm font-medium mb-1">{card.title}</p>
            <h3 className="macos-metric text-2xl sm:text-3xl">
              {card.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default ReportSummaryCards;
