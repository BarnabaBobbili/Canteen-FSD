import React from 'react';
import { MessageSquare, Star, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';

const FeedbackStats = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <MessageSquare className="w-8 h-8 opacity-80" />
        </div>
        <div className="text-2xl font-bold">{stats.totalFeedbacks || 0}</div>
        <div className="text-sm opacity-90">Total Feedbacks</div>
      </div>

      <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <Star className="w-8 h-8 opacity-80" />
        </div>
        <div className="text-2xl font-bold">{stats.avgRating?.toFixed(1) || 'N/A'}</div>
        <div className="text-sm opacity-90">Average Rating</div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <ThumbsUp className="w-8 h-8 opacity-80" />
          <span className="text-lg font-semibold">{stats.positive || 0}</span>
        </div>
        <div className="text-2xl font-bold">
          {stats.totalFeedbacks > 0 ? Math.round((stats.positive / stats.totalFeedbacks) * 100) : 0}%
        </div>
        <div className="text-sm opacity-90">Positive</div>
      </div>

      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <Meh className="w-8 h-8 opacity-80" />
          <span className="text-lg font-semibold">{stats.neutral || 0}</span>
        </div>
        <div className="text-2xl font-bold">
          {stats.totalFeedbacks > 0 ? Math.round((stats.neutral / stats.totalFeedbacks) * 100) : 0}%
        </div>
        <div className="text-sm opacity-90">Neutral</div>
      </div>

      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <ThumbsDown className="w-8 h-8 opacity-80" />
          <span className="text-lg font-semibold">{stats.negative || 0}</span>
        </div>
        <div className="text-2xl font-bold">
          {stats.totalFeedbacks > 0 ? Math.round((stats.negative / stats.totalFeedbacks) * 100) : 0}%
        </div>
        <div className="text-sm opacity-90">Negative</div>
      </div>
    </div>
  );
};

export default FeedbackStats;
