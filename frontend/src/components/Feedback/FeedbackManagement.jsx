import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../DashboardLayout';
import API_BASE_URL from '../../config/api';
import {
  MessageSquare, Star, ThumbsUp, ThumbsDown, Meh,
  Search, Filter, Send, Eye
} from 'lucide-react';

const FeedbackManagement = () => {
  const { token, user } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSentiment, setFilterSentiment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [response, setResponse] = useState('');
  const [submittingResponse, setSubmittingResponse] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
    fetchStats();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/feedback`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch feedbacks: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/feedback/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch stats: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error.message || 'Unknown error');
    }
  };

  const handleSubmitResponse = async () => {
    if (!response.trim()) return;

    setSubmittingResponse(true);
    try {
      const res = await fetch(`${API_BASE_URL}/feedback/${selectedFeedback._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ response })
      });

      if (res.ok) {
        const updatedFeedback = await res.json();
        setFeedbacks(feedbacks.map(f => f._id === updatedFeedback._id ? updatedFeedback : f));
        setResponse('');
        setShowDetailsModal(false);
        setSelectedFeedback(null);
      } else {
        const errorText = await res.text();
        console.error('Failed to submit response:', res.status, res.statusText);
        alert('Failed to submit response. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting response:', error.message || 'Unknown error');
      alert('Failed to submit response. Please try again.');
    } finally {
      setSubmittingResponse(false);
    }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.comments?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSentiment = filterSentiment === 'all' || feedback.sentiment === filterSentiment;
    const matchesStatus = filterStatus === 'all' || feedback.status === filterStatus;

    return matchesSearch && matchesSentiment && matchesStatus;
  });

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

  const getSentimentColor = (sentiment) => {
    const colors = {
      positive: 'bg-green-100 text-green-700',
      neutral: 'bg-yellow-100 text-yellow-700',
      negative: 'bg-red-100 text-red-700'
    };
    return colors[sentiment] || 'bg-gray-100 text-gray-700';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      reviewed: 'bg-blue-100 text-blue-700',
      resolved: 'bg-green-100 text-green-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

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

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Feedback Management</h1>
          <p className="text-gray-600 mt-1">View and respond to customer feedback</p>
        </div>

        {/* Stats Cards */}
        {stats && (
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
        )}

        {/* Quality Ratings */}
        {stats && (
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
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search feedbacks..."
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
                <option value="all">All Sentiments</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feedbacks Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Sentiment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Comments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      Loading feedbacks...
                    </td>
                  </tr>
                ) : filteredFeedbacks.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No feedbacks found
                    </td>
                  </tr>
                ) : (
                  filteredFeedbacks.map((feedback) => (
                    <tr key={feedback._id} className="hover:bg-gray-50 transition-colors">
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
                          onClick={() => {
                            setSelectedFeedback(feedback);
                            setResponse(feedback.response || '');
                            setShowDetailsModal(true);
                          }}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="View Details & Respond"
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

        {/* Feedback Details Modal */}
        {showDetailsModal && selectedFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Feedback Details</h2>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedFeedback(null);
                    setResponse('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                {/* Customer Info */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Name</label>
                      <p className="text-gray-900">{selectedFeedback.customerName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Email</label>
                      <p className="text-gray-900">{selectedFeedback.customerEmail}</p>
                    </div>
                  </div>
                </div>

                {/* Ratings */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Ratings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Overall Rating</label>
                      <div className="flex items-center gap-2">
                        {renderStars(selectedFeedback.rating)}
                        <span className="text-sm text-gray-600">({selectedFeedback.rating}/5)</span>
                      </div>
                    </div>
                    {selectedFeedback.foodQuality && (
                      <div>
                        <label className="text-sm font-semibold text-gray-600">Food Quality</label>
                        <div className="flex items-center gap-2">
                          {renderStars(selectedFeedback.foodQuality)}
                          <span className="text-sm text-gray-600">({selectedFeedback.foodQuality}/5)</span>
                        </div>
                      </div>
                    )}
                    {selectedFeedback.serviceQuality && (
                      <div>
                        <label className="text-sm font-semibold text-gray-600">Service Quality</label>
                        <div className="flex items-center gap-2">
                          {renderStars(selectedFeedback.serviceQuality)}
                          <span className="text-sm text-gray-600">({selectedFeedback.serviceQuality}/5)</span>
                        </div>
                      </div>
                    )}
                    {selectedFeedback.cleanliness && (
                      <div>
                        <label className="text-sm font-semibold text-gray-600">Cleanliness</label>
                        <div className="flex items-center gap-2">
                          {renderStars(selectedFeedback.cleanliness)}
                          <span className="text-sm text-gray-600">({selectedFeedback.cleanliness}/5)</span>
                        </div>
                      </div>
                    )}
                    {selectedFeedback.valueForMoney && (
                      <div>
                        <label className="text-sm font-semibold text-gray-600">Value for Money</label>
                        <div className="flex items-center gap-2">
                          {renderStars(selectedFeedback.valueForMoney)}
                          <span className="text-sm text-gray-600">({selectedFeedback.valueForMoney}/5)</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Comments */}
                {selectedFeedback.comments && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Comments</h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedFeedback.comments}</p>
                  </div>
                )}

                {/* Previous Response */}
                {selectedFeedback.response && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Previous Response</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-gray-700">{selectedFeedback.response}</p>
                      <div className="text-sm text-gray-500 mt-2">
                        Responded by: {selectedFeedback.respondedBy?.name || 'N/A'} on {new Date(selectedFeedback.respondedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}

                {/* Response Form */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {selectedFeedback.response ? 'Update Response' : 'Add Response'}
                  </h3>
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Enter your response to this feedback..."
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    onClick={handleSubmitResponse}
                    disabled={submittingResponse || !response.trim()}
                    className="mt-3 flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                    {submittingResponse ? 'Submitting...' : 'Submit Response'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default FeedbackManagement;
