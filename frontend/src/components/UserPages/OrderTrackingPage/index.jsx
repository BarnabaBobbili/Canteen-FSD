import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import OrderHeader from './OrderHeader';
import StatusTimeline from './StatusTimeline';
import OTPDisplay from './OTPDisplay';
import OrderDetails from './OrderDetails';
import { getStatusSteps, getStepIndex, fetchOrderDetails } from './orderTrackingHelpers';

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
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetails.orderId, orderNumber, navigate]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const identifier = trackingMode === 'public' ? orderNumber : orderDetails.orderId;
      const data = await fetchOrderDetails(identifier);
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
      fetchOrder();
    }, 10000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetails.orderId, orderNumber]);

  const statusSteps = getStatusSteps(orderDetails.deliveryOption);
  const currentStepIndex = getStepIndex(statusSteps, orderStatus);

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  // Error state
  if (error || !order) {
    return <ErrorState error={error} onGoHome={() => navigate('/demo')} />;
  }

  const displayOrderNumber = trackingMode === 'public' ? orderNumber : (orderDetails.orderNumber || order?.orderNumber);
  const showOTP = trackingMode === 'public' && order.otp && !order.otpVerified &&
                   orderStatus !== 'completed' && orderStatus !== 'cancelled';

  return (
    <div className="min-h-screen bg-white relative" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
      fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
    }}>
      <OrderHeader orderNumber={displayOrderNumber} onBack={() => navigate('/order')} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <StatusTimeline statusSteps={statusSteps} currentStepIndex={currentStepIndex} />
        {showOTP && <OTPDisplay order={order} />}
        <OrderDetails order={order} />
      </div>
    </div>
  );
};

export default OrderTrackingPage;
