/**
 * Get sentiment badge color classes
 * @param {string} sentiment - Sentiment value (positive, neutral, negative)
 * @returns {string} Tailwind CSS classes for sentiment color
 */
export const getSentimentColor = (sentiment) => {
  const colors = {
    positive: 'bg-green-100 text-green-700',
    neutral: 'bg-yellow-100 text-yellow-700',
    negative: 'bg-red-100 text-red-700'
  };
  return colors[sentiment] || 'bg-gray-100 text-gray-700';
};

/**
 * Get status badge color classes
 * @param {string} status - Status value (pending, reviewed, resolved)
 * @returns {string} Tailwind CSS classes for status color
 */
export const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-700',
    reviewed: 'bg-blue-100 text-blue-700',
    resolved: 'bg-green-100 text-green-700'
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

/**
 * Filter feedbacks based on search term, sentiment, and status
 * @param {Array} feedbacks - Array of feedback objects
 * @param {string} searchTerm - Search term to filter by
 * @param {string} filterSentiment - Sentiment filter (all, positive, neutral, negative)
 * @param {string} filterStatus - Status filter (all, pending, reviewed, resolved)
 * @returns {Array} Filtered feedback array
 */
export const filterFeedbacks = (feedbacks, searchTerm, filterSentiment, filterStatus) => {
  return feedbacks.filter(feedback => {
    const matchesSearch = feedback.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.comments?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSentiment = filterSentiment === 'all' || feedback.sentiment === filterSentiment;
    const matchesStatus = filterStatus === 'all' || feedback.status === filterStatus;

    return matchesSearch && matchesSentiment && matchesStatus;
  });
};
