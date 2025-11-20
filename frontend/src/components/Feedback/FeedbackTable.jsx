import React from 'react';
import { Star, ThumbsUp, ThumbsDown, Meh, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getSentimentColor, getStatusColor } from './feedbackHelpers';

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

const getSentimentIcon = (sentiment) => {
  switch (sentiment) {
    case 'positive':
      return <ThumbsUp className="w-5 h-5 text-green-600" />;
    case 'negative':
      return <ThumbsDown className="w-5 h-5 text-red-600" />;
    default:
      return <Meh className="w-5 h-5 text-yellow-600" />;
  }
};

const FeedbackTable = ({ feedbacks, loading, onViewDetails }) => {
  const { t } = useTranslation();

  return (
    <div className="macos-card macos-animate overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="macos-table-header">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('feedback.customer')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('feedback.rating')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('feedback.sentiment')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('feedback.comments')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('common.status')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('common.date')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {t('common.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  {t('feedback.loadingFeedbacks')}
                </td>
              </tr>
            ) : feedbacks.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  {t('feedback.noFeedbacksFound')}
                </td>
              </tr>
            ) : (
              feedbacks.map((feedback) => (
                <tr key={feedback._id} className="macos-table-row-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{feedback.customerName}</div>
                    <div className="text-sm text-gray-500">{feedback.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4">
                    {renderStars(feedback.rating)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getSentimentIcon(feedback.sentiment)}
                      <span className={`inline-flex px-2 py-1 rounded-md text-xs font-semibold ${getSentimentColor(feedback.sentiment)}`}>
                        {feedback.sentiment}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {feedback.comments || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-md text-xs font-semibold ${getStatusColor(feedback.status)}`}>
                      {feedback.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onViewDetails(feedback)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title={t('feedback.viewDetailsAndRespond')}
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackTable;
