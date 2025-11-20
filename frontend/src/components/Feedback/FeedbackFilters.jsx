import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

const FeedbackFilters = ({
  searchTerm,
  setSearchTerm,
  filterSentiment,
  setFilterSentiment,
  filterStatus,
  setFilterStatus
}) => {
  const { t } = useTranslation();
  return (
    <div className="macos-card macos-animate p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('feedback.searchFeedbacks')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Sentiment Filter */}
        <div>
          <select
            value={filterSentiment}
            onChange={(e) => setFilterSentiment(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">{t('feedback.allSentiments')}</option>
            <option value="positive">{t('feedback.positive')}</option>
            <option value="neutral">{t('feedback.neutral')}</option>
            <option value="negative">{t('feedback.negative')}</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">{t('feedback.allStatus')}</option>
            <option value="pending">{t('feedback.pending')}</option>
            <option value="reviewed">{t('feedback.reviewed')}</option>
            <option value="resolved">{t('feedback.resolved')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FeedbackFilters;
