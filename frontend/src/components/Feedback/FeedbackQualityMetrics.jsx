import React from 'react';
import { Star } from 'lucide-react';

const renderStars = (rating) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );
};

const FeedbackQualityMetrics = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
      <h2 className="text-lg font-bold mb-4">Quality Metrics</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <div className="text-sm text-gray-600 mb-1">Food Quality</div>
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold text-gray-900">{stats.avgFoodQuality?.toFixed(1) || 'N/A'}</div>
            {renderStars(Math.round(stats.avgFoodQuality || 0))}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Service Quality</div>
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold text-gray-900">{stats.avgServiceQuality?.toFixed(1) || 'N/A'}</div>
            {renderStars(Math.round(stats.avgServiceQuality || 0))}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Cleanliness</div>
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold text-gray-900">{stats.avgCleanliness?.toFixed(1) || 'N/A'}</div>
            {renderStars(Math.round(stats.avgCleanliness || 0))}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600 mb-1">Value for Money</div>
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold text-gray-900">{stats.avgValueForMoney?.toFixed(1) || 'N/A'}</div>
            {renderStars(Math.round(stats.avgValueForMoney || 0))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackQualityMetrics;
