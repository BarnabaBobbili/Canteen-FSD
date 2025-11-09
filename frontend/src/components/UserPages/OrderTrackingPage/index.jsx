import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, Package, ChefHat, CheckCircle, Clock, Store, Truck, XCircle } from 'lucide-react';
import API_BASE_URL from '../../../config/api';

/**
 * Order Tracking Page
 * Shows real-time order status with progress indicator
 * Supports both authenticated (via state) and public (via URL orderNumber) access
 */
const OrderTrackingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderNumber } = useParams();
  const orderDetails = location.state || {};
  const [orderStatus, setOrderStatus] = useState('pending');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Determine tracking mode: authenticated (via orderId in state) or public (via orderNumber in URL)
  const trackingMode = orderNumber ? 'public' : 'authenticated';

  // Fetch order details
  useEffect(() => {
    // For authenticated mode, require orderId
    if (trackingMode === 'authenticated' && !orderDetails.orderId) {
      navigate('/order');
      return;
    }

    // For public mode, require orderNumber
    if (trackingMode === 'public' && !orderNumber) {
      setError('Invalid order number');
      setLoading(false);
      return;
    }

    // Fetch order details
    fetchOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetails.orderId, orderNumber, navigate]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Use orderNumber for public mode, orderId for authenticated mode
      const identifier = trackingMode === 'public' ? orderNumber : orderDetails.orderId;

      const response = await fetch(
        `${API_BASE_URL}/orders/${identifier}`,
        { headers }
      );

      if (!response.ok) {
        throw new Error('Order not found');
      }

      const data = await response.json();
      setOrder(data);
      setOrderStatus(data.status);
      setError('');
    } catch (error) {
      console.error('Failed to fetch order:', error);
      setError(error.message || 'Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  // Poll for order updates every 10 seconds
  useEffect(() => {
    const identifier = trackingMode === 'public' ? orderNumber : orderDetails.orderId;
    if (!identifier) return;

    const interval = setInterval(() => {
      fetchOrderDetails();
    }, 10000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetails.orderId, orderNumber]);

  const statusSteps = [
    {
      id: 'pending',
      label: 'Order Received',
      description: 'Your order has been placed',
      icon: Package,
      color: 'text-[#2E3A47]',
      bgColor: 'bg-[#F9F9F9]',
    },
    {
      id: 'preparing',
      label: 'Preparing',
      description: 'Your order is being prepared',
      icon: ChefHat,
      color: 'text-[#FF7A00]',
      bgColor: 'bg-[#F9F9F9]',
    },
    {
      id: 'ready',
      label: 'Ready',
      description: orderDetails.deliveryOption === 'pickup' ? 'Ready for pickup' : 'Out for delivery',
      icon: orderDetails.deliveryOption === 'pickup' ? Store : Truck,
      color: 'text-[#8FCB9B]',
      bgColor: 'bg-[#F9F9F9]',
    },
    {
      id: 'completed',
      label: 'Completed',
      description: 'Order completed',
      icon: CheckCircle,
      color: 'text-[#8FCB9B]',
      bgColor: 'bg-[#F9F9F9]',
    },
  ];

  const getStepIndex = (status) => {
    const index = statusSteps.findIndex(step => step.id === status);
    return index !== -1 ? index : 0;
  };

  const currentStepIndex = getStepIndex(orderStatus);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900"></div>
          <p className="mt-4 text-lg font-bold text-gray-900">Loading order details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !order) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)] p-8 max-w-md w-full text-center">
          <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 font-medium mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-900 text-white font-black border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all"
          >
            Go to Home
          </button>
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
              onClick={() => navigate('/order')}
              className="p-2 border-2 border-gray-900 hover:bg-gray-100 transition-all transform hover:-rotate-3"
            >
              <ArrowLeft className="w-6 h-6 text-gray-900" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-gray-900">Track Your Order</h1>
              <p className="text-gray-600 text-sm font-medium">
                Order #{trackingMode === 'public' ? orderNumber : orderDetails.orderNumber || order?.orderNumber}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Status Timeline */}
        <div className="bg-white border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] p-6 sm:p-8 mb-6 transform rotate-1">
          <h2 className="text-xl font-black text-gray-900 mb-8 underline decoration-wavy decoration-2 underline-offset-4">Order Status</h2>

          <div className="space-y-6">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;

              return (
                <div key={step.id} className="relative">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 border-3 border-gray-900 flex items-center justify-center flex-shrink-0 transition-all ${
                        isCompleted
                          ? 'bg-gray-900'
                          : isActive
                          ? 'bg-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Icon
                          className={`w-6 h-6 ${
                            isActive ? 'text-gray-900' : 'text-gray-400'
                          }`}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <h3
                        className={`font-black text-lg mb-1 ${
                          isActive || isCompleted
                            ? 'text-gray-900'
                            : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                      </h3>
                      <p
                        className={`text-sm font-medium ${
                          isActive || isCompleted ? 'text-gray-600' : 'text-gray-400'
                        }`}
                      >
                        {step.description}
                      </p>
                      {isActive && (
                        <div className="mt-3 flex items-center gap-2 text-gray-900">
                          <Clock className="w-4 h-4 animate-pulse" />
                          <span className="text-sm font-bold">In Progress...</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < statusSteps.length - 1 && (
                    <div
                      className={`absolute left-6 top-12 w-1 h-6 ${
                        index < currentStepIndex ? 'bg-gray-900' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* OTP Display for Public Mode */}
        {trackingMode === 'public' && order.otp && !order.otpVerified && orderStatus !== 'completed' && orderStatus !== 'cancelled' && (
          <div className="bg-yellow-50 border-4 border-yellow-600 shadow-[4px_4px_0px_0px_rgba(202,138,4,0.4)] p-6 mb-6 transform -rotate-1">
            <h3 className="text-lg font-black text-yellow-900 mb-3 text-center">Your Pickup OTP</h3>
            <div className="bg-white border-3 border-yellow-600 p-4 text-center mb-3">
              <p className="text-5xl font-black text-yellow-900 tracking-widest">{order.otp}</p>
            </div>
            <p className="text-center text-sm font-bold text-yellow-900">
              Show this OTP to staff when collecting your order
            </p>
            {order.otpExpires && (
              <p className="text-center text-xs font-medium text-yellow-700 mt-2">
                ⏱️ Valid until {new Date(order.otpExpires).toLocaleTimeString()}
              </p>
            )}
          </div>
        )}

        {/* Order Details */}
        {order && (
          <div className="bg-white border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] p-6 sm:p-8 mb-6 transform -rotate-1">
            <h2 className="text-xl font-black text-gray-900 mb-6 underline decoration-wavy decoration-2 underline-offset-4">Order Details</h2>

            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between pb-4 border-b-2 border-dashed border-gray-400 last:border-0"
                >
                  <div>
                    <p className="font-black text-gray-900">{item.itemName}</p>
                    <p className="text-sm text-gray-600 font-bold">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-black text-gray-900">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-400 flex items-center justify-between">
              <span className="text-lg font-black text-gray-900">Total Amount</span>
              <span className="text-2xl font-black text-gray-900">
                ₹{orderDetails.total || order.totalAmount}
              </span>
            </div>
          </div>
        )}

        {/* Estimated Time */}
        {orderStatus !== 'completed' && (
          <div className="bg-white border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] p-6 text-center transform rotate-1">
            <Clock className="w-12 h-12 text-gray-900 mx-auto mb-3" />
            <h3 className="font-black text-gray-900 mb-2">Estimated Time</h3>
            <p className="text-gray-600 mb-1 font-medium">Your order will be ready in</p>
            <p className="text-3xl font-black text-gray-900">
              {orderDetails.estimatedTime} minutes
            </p>
          </div>
        )}

        {/* Completed Message */}
        {orderStatus === 'completed' && (
          <div className="bg-white border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] p-6 text-center transform -rotate-1">
            <CheckCircle className="w-16 h-16 text-gray-900 mx-auto mb-3" />
            <h3 className="text-2xl font-black text-gray-900 mb-2">Order Completed!</h3>
            <p className="text-gray-600 mb-6 font-medium">Thank you for ordering with us!</p>
            <button
              onClick={() => navigate('/order')}
              className="px-8 py-3 bg-gray-900 border-4 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all font-black transform hover:scale-105 hover:-rotate-1"
            >
              Order Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;
