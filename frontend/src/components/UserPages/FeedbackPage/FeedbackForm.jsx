import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../../config/api';
import {
  Star, ThumbsUp, Send, CheckCircle, ArrowLeft
} from 'lucide-react';

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
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/orders/my-orders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      // Only show completed orders
      const completedOrders = data.filter(order => order.status === 'completed');
      setMyOrders(completedOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  const handleRatingClick = (category, value) => {
    setRatings(prev => ({ ...prev, [category]: value }));
  };

  const renderStars = (category, value) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHoverRating(prev => ({ ...prev, [category]: star }))}
            onMouseLeave={() => setHoverRating(prev => ({ ...prev, [category]: 0 }))}
            onClick={() => handleRatingClick(category, star)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              size={32}
              className={
                star <= (hoverRating[category] || ratings[category])
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }
            />
          </button>
        ))}
      </div>
    );
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

      const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackData)
      });

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
    return (
      <div className="min-h-screen bg-white relative flex items-center justify-center" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
        fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
      }}>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 font-medium">Your feedback has been submitted successfully.</p>
          <p className="text-sm text-gray-500 mt-4">Redirecting to order history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
      fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
    }}>
      {/* Header */}
      <div className="bg-white border-b-4 border-gray-900 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 border-2 border-gray-900 hover:bg-gray-100 transition-all transform hover:-rotate-3"
            >
              <ArrowLeft className="w-6 h-6 text-gray-900" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-gray-900">Share Your Feedback</h1>
              <p className="text-gray-600 text-sm font-medium">Help us improve your experience</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
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
            <label className="block text-lg font-black text-gray-900 mb-3">
              Overall Rating <span className="text-red-600">*</span>
            </label>
            <div className="flex items-center gap-3">
              {renderStars('overall', ratings.overall)}
              {ratings.overall > 0 && (
                <span className="text-xl font-bold text-gray-900">
                  {ratings.overall} / 5
                </span>
              )}
            </div>
          </div>

          {/* Detailed Ratings */}
          <div className="mb-8">
            <h3 className="text-lg font-black text-gray-900 mb-4">Rate Different Aspects (Optional)</h3>

            <div className="space-y-6">
              {/* Food Quality */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Food Quality</label>
                <div className="flex items-center gap-3">
                  {renderStars('foodQuality', ratings.foodQuality)}
                  {ratings.foodQuality > 0 && (
                    <span className="text-sm font-bold text-gray-600">
                      {ratings.foodQuality} / 5
                    </span>
                  )}
                </div>
              </div>

              {/* Service Quality */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Service Quality</label>
                <div className="flex items-center gap-3">
                  {renderStars('serviceQuality', ratings.serviceQuality)}
                  {ratings.serviceQuality > 0 && (
                    <span className="text-sm font-bold text-gray-600">
                      {ratings.serviceQuality} / 5
                    </span>
                  )}
                </div>
              </div>

              {/* Cleanliness */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Cleanliness</label>
                <div className="flex items-center gap-3">
                  {renderStars('cleanliness', ratings.cleanliness)}
                  {ratings.cleanliness > 0 && (
                    <span className="text-sm font-bold text-gray-600">
                      {ratings.cleanliness} / 5
                    </span>
                  )}
                </div>
              </div>

              {/* Value for Money */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Value for Money</label>
                <div className="flex items-center gap-3">
                  {renderStars('valueForMoney', ratings.valueForMoney)}
                  {ratings.valueForMoney > 0 && (
                    <span className="text-sm font-bold text-gray-600">
                      {ratings.valueForMoney} / 5
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="mb-8">
            <label className="block text-lg font-black text-gray-900 mb-3">
              Additional Comments (Optional)
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Tell us more about your experience..."
              rows="5"
              className="w-full px-4 py-3 border-3 border-gray-900 font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-900 focus:ring-offset-2 resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting || myOrders.length === 0 || !selectedOrderId || ratings.overall === 0}
              className="flex-1 py-4 bg-gray-900 border-4 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all font-black text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:-rotate-1"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Feedback</span>
                </>
              )}
            </button>
          </div>

          {/* Appreciation Message */}
          <div className="mt-6 bg-blue-50 border-2 border-blue-400 p-4 rounded flex items-start gap-3">
            <ThumbsUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-900 font-bold">We Value Your Opinion!</p>
              <p className="text-blue-700 text-sm mt-1">
                Your feedback helps us serve you better and improve our services. Thank you for taking the time to share your experience!
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
