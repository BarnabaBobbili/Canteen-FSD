import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../DashboardLayout';
import FeedbackStats from './FeedbackStats';
import FeedbackQualityMetrics from './FeedbackQualityMetrics';
import FeedbackFilters from './FeedbackFilters';
import FeedbackTable from './FeedbackTable';
import FeedbackDetailModal from './FeedbackDetailModal';
import { fetchFeedbacks, fetchStats, submitFeedbackResponse } from './feedbackService';
import { filterFeedbacks } from './feedbackHelpers';

const FeedbackManagement = () => {
  const { token } = useAuth();
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

  const loadFeedbacks = useCallback(async () => {
    try {
      const data = await fetchFeedbacks(token);
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const loadStats = useCallback(async () => {
    try {
      const data = await fetchStats(token);
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error.message || 'Unknown error');
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    loadFeedbacks();
    loadStats();
  }, [loadFeedbacks, loadStats, token]);

  const handleSubmitResponse = async () => {
    if (!response.trim()) return;

    setSubmittingResponse(true);
    try {
      const updatedFeedback = await submitFeedbackResponse(
        selectedFeedback._id,
        response,
        token
      );
      setFeedbacks(feedbacks.map(f => f._id === updatedFeedback._id ? updatedFeedback : f));
      setResponse('');
      setShowDetailsModal(false);
      setSelectedFeedback(null);
    } catch (error) {
      console.error('Error submitting response:', error.message || 'Unknown error');
      alert('Failed to submit response. Please try again.');
    } finally {
      setSubmittingResponse(false);
    }
  };

  const handleViewDetails = (feedback) => {
    setSelectedFeedback(feedback);
    setResponse(feedback.response || '');
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedFeedback(null);
    setResponse('');
  };

  const filteredFeedbacks = filterFeedbacks(feedbacks, searchTerm, filterSentiment, filterStatus);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Feedback Management</h1>
          <p className="text-gray-600 mt-1">View and respond to customer feedback</p>
        </div>

        {/* Stats Cards */}
        <FeedbackStats stats={stats} />

        {/* Quality Ratings */}
        <FeedbackQualityMetrics stats={stats} />

        {/* Filters and Search */}
        <FeedbackFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterSentiment={filterSentiment}
          setFilterSentiment={setFilterSentiment}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        {/* Feedbacks Table */}
        <FeedbackTable
          feedbacks={filteredFeedbacks}
          loading={loading}
          onViewDetails={handleViewDetails}
        />

        {/* Feedback Details Modal */}
        {showDetailsModal && (
          <FeedbackDetailModal
            feedback={selectedFeedback}
            response={response}
            setResponse={setResponse}
            submitting={submittingResponse}
            onSubmit={handleSubmitResponse}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default FeedbackManagement;
