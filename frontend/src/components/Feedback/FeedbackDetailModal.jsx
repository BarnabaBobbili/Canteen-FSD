import React from 'react';
import { Star, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

const FeedbackDetailModal = ({
  feedback,
  response,
  setResponse,
  submitting,
  onSubmit,
  onClose
}) => {
  const { t } = useTranslation();

  if (!feedback) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="macos-modal macos-animate max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{t('feedback.feedbackDetails')}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          {/* Customer Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">{t('feedback.customerInformation')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">{t('feedback.name')}</label>
                <p className="text-gray-900">{feedback.customerName}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">{t('feedback.email')}</label>
                <p className="text-gray-900">{feedback.customerEmail}</p>
              </div>
            </div>
          </div>

          {/* Ratings */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">{t('feedback.ratings')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">{t('feedback.overallRating')}</label>
                <div className="flex items-center gap-2">
                  {renderStars(feedback.rating)}
                  <span className="text-sm text-gray-600">({feedback.rating}/5)</span>
                </div>
              </div>
              {feedback.foodQuality && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">{t('feedback.foodQuality')}</label>
                  <div className="flex items-center gap-2">
                    {renderStars(feedback.foodQuality)}
                    <span className="text-sm text-gray-600">({feedback.foodQuality}/5)</span>
                  </div>
                </div>
              )}
              {feedback.serviceQuality && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">{t('feedback.serviceQuality')}</label>
                  <div className="flex items-center gap-2">
                    {renderStars(feedback.serviceQuality)}
                    <span className="text-sm text-gray-600">({feedback.serviceQuality}/5)</span>
                  </div>
                </div>
              )}
              {feedback.cleanliness && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">{t('feedback.cleanliness')}</label>
                  <div className="flex items-center gap-2">
                    {renderStars(feedback.cleanliness)}
                    <span className="text-sm text-gray-600">({feedback.cleanliness}/5)</span>
                  </div>
                </div>
              )}
              {feedback.valueForMoney && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">{t('feedback.valueForMoney')}</label>
                  <div className="flex items-center gap-2">
                    {renderStars(feedback.valueForMoney)}
                    <span className="text-sm text-gray-600">({feedback.valueForMoney}/5)</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Comments */}
          {feedback.comments && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{t('feedback.comments')}</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{feedback.comments}</p>
            </div>
          )}

          {/* Previous Response */}
          {feedback.response && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{t('feedback.previousResponse')}</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700">{feedback.response}</p>
                <div className="text-sm text-gray-500 mt-2">
                  {t('feedback.respondedBy')}: {feedback.respondedBy?.name || 'N/A'} {t('feedback.on')} {new Date(feedback.respondedAt).toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {/* Response Form */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              {feedback.response ? t('feedback.updateResponse') : t('feedback.addResponse')}
            </h3>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder={t('feedback.enterResponse')}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              onClick={onSubmit}
              disabled={submitting || !response.trim()}
              className="mt-3 flex items-center gap-2 px-6 py-2 macos-btn text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
              {submitting ? t('feedback.submitting') : t('feedback.submitResponse')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDetailModal;
