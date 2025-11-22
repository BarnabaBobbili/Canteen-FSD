import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import SuccessMessage from './SuccessMessage';
import FeedbackHeader from './FeedbackHeader';
import RatingSection from './RatingSection';
import { fetchMyOrders, submitFeedback } from './feedbackHelpers';

const FeedbackForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myOrders, setMyOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [ratings, setRatings] = useState({
    overall: 0,
    foodQuality: 0,
    serviceQuality: 0,
    cleanliness: 0,
    valueForMoney: 0
  });
  const [comments, setComments] = useState('');
  const [hoverRating, setHoverRating] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const orders = await fetchMyOrders();
      setMyOrders(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRatingClick = (category, value) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const handleHoverEnter = (category, value) => {
    setHoverRating(prev => ({ ...prev, [category]: value }));
  };

  const handleHoverLeave = (category) => {
    setHoverRating(prev => ({ ...prev, [category]: 0 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOrderId) {
      alert('Please select an order to provide feedback for');
      return;
    }

    if (ratings.overall === 0) {
      alert('Please provide an overall rating');
      return;
    }

    setSubmitting(true);

    try {
      const feedbackData = {
        orderId: selectedOrderId,
        customerName: user?.name || 'Guest',
        customerEmail: user?.email || '',
        rating: ratings.overall,
        foodQuality: ratings.foodQuality || undefined,
        serviceQuality: ratings.serviceQuality || undefined,
        cleanliness: ratings.cleanliness || undefined,
        valueForMoney: ratings.valueForMoney || undefined,
        comments: comments.trim() || undefined
      };

      const response = await submitFeedback(feedbackData);

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/order-history');
        }, 2000);
      } else {
        alert('Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return <SuccessMessage />;
  }

  const ratingCategories = [
    { category: 'foodQuality', label: 'Food Quality' },
    { category: 'serviceQuality', label: 'Service Quality' },
    { category: 'cleanliness', label: 'Cleanliness' },
    { category: 'valueForMoney', label: 'Value for Money' }
  ];

  return (
    <div className="min-h-screen bg-white relative" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
      fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
    }}>
      <FeedbackHeader onBack={() => navigate(-1)} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit} className="bg-white border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)] p-6 sm:p-8">
          {/* Select Order */}
          <div className="mb-8">
            <label className="block text-lg font-black text-gray-900 mb-3">
              Select Your Order <span className="text-red-600">*</span>
            </label>
            {loading ? (
              <div className="text-gray-600">Loading your orders...</div>
            ) : myOrders.length === 0 ? (
              <div className="bg-yellow-50 border-2 border-yellow-400 p-4 rounded">
                <p className="text-yellow-800 font-medium">
                  You don't have any completed orders yet. Place an order and come back to share your feedback!
                </p>
              </div>
            ) : (
              <select
                value={selectedOrderId}
                onChange={(e) => setSelectedOrderId(e.target.value)}
                required
                className="w-full px-4 py-3 border-3 border-gray-900 font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-900 focus:ring-offset-2"
              >
                <option value="">-- Select an Order --</option>
                {myOrders.map((order) => (
                  <option key={order._id} value={order._id}>
                    {order.orderNumber} - {order.customerName} - ₹{order.totalAmount} ({new Date(order.createdAt).toLocaleDateString()})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Overall Rating */}
          <div className="mb-8 pb-6 border-b-2 border-gray-200">
            <RatingSection
              label="Overall Rating"
              category="overall"
              ratings={ratings}
              hoverRating={hoverRating}
              isRequired={true}
              onRatingClick={handleRatingClick}
              onHoverEnter={handleHoverEnter}
              onHoverLeave={handleHoverLeave}
            />
          </div>

          {/* Detailed Ratings */}
          <div className="mb-8">
            <h3 className="text-lg font-black text-gray-900 mb-4">Rate Different Aspects (Optional)</h3>
            <div className="space-y-6">
              {ratingCategories.map(({ category, label }) => (
                <RatingSection
                  key={category}
                  label={label}
                  category={category}
                  ratings={ratings}
                  hoverRating={hoverRating}
                  onRatingClick={handleRatingClick}
                  onHoverEnter={handleHoverEnter}
                  onHoverLeave={handleHoverLeave}
                />
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="mb-8">
            <label className="block text-lg font-black text-gray-900 mb-3">Additional Comments</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border-3 border-gray-900 font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-900 focus:ring-offset-2"
              placeholder="Tell us more about your experience..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gray-900 text-white font-black py-4 px-6 border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
