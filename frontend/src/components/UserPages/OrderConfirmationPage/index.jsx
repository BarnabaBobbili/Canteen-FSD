import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, CreditCard, ArrowRight, Package } from 'lucide-react';

/**
 * Order Confirmation Page
 * Displays after successful order placement
 */
const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderDetails = location.state || {};

  // Redirect if no order details
  useEffect(() => {
    if (!orderDetails.orderId) {
      navigate('/order');
    }
  }, [orderDetails.orderId, navigate]);

  if (!orderDetails.orderId) {
    return null;
  }

  const {
    orderNumber,
    estimatedTime,
    deliveryOption,
    paymentMethod,
    total
  } = orderDetails;

  const getPaymentMethodLabel = (method) => {
    const labels = {
      cash: 'Cash on Delivery/Pickup',
      card: 'Credit/Debit Card',
      upi: 'UPI',
      wallet: 'Digital Wallet'
    };
    return labels[method] || method;
  };

  return (
    <div className="min-h-screen bg-white relative py-12 px-4 sm:px-6" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
      fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
    }}>
      <div className="max-w-2xl mx-auto">
        {/* Success Icon and Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white border-4 border-gray-900 mb-4 animate-bounce shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)]">
            <CheckCircle className="w-12 h-12 text-gray-900" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 font-medium">Thank you for your order. We'll have it ready soon!</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] overflow-hidden mb-6 transform -rotate-1">
          {/* Order Number Banner */}
          <div className="bg-gray-900 border-b-4 border-gray-900 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1 font-bold">Order Number</p>
                <p className="text-2xl font-black">#{orderNumber}</p>
              </div>
              <Package className="w-12 h-12 text-white/80" />
            </div>
          </div>

          {/* Order Info */}
          <div className="p-6 space-y-6">
            {/* Estimated Time */}
            <div className="flex items-start gap-4 pb-6 border-b-2 border-dashed border-gray-400">
              <div className="w-12 h-12 border-2 border-gray-900 bg-gray-900 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-gray-900 mb-1">Estimated Time</h3>
                <p className="text-gray-600 font-medium">Your order will be ready in approximately</p>
                <p className="text-2xl font-black text-gray-900 mt-1">{estimatedTime} minutes</p>
              </div>
            </div>

            {/* Delivery/Pickup Method */}
            <div className="flex items-start gap-4 pb-6 border-b-2 border-dashed border-gray-400">
              <div className="w-12 h-12 border-2 border-gray-900 bg-gray-900 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-gray-900 mb-1">
                  {deliveryOption === 'pickup' ? 'Pickup Location' : 'Delivery'}
                </h3>
                <p className="text-gray-600 font-medium">
                  {deliveryOption === 'pickup'
                    ? 'Collect your order from the canteen counter'
                    : 'Your order will be delivered to your location'}
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="flex items-start gap-4 pb-6 border-b-2 border-dashed border-gray-400">
              <div className="w-12 h-12 border-2 border-gray-900 bg-gray-900 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-gray-900 mb-1">Payment Method</h3>
                <p className="text-gray-600 font-medium">{getPaymentMethodLabel(paymentMethod)}</p>
              </div>
            </div>

            {/* Total Amount */}
            <div className="flex items-center justify-between bg-white border-3 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] p-4">
              <span className="text-lg font-black text-gray-900">Total Amount</span>
              <span className="text-2xl font-black text-gray-900">₹{total}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/order-tracking', { state: orderDetails })}
            className="w-full py-4 bg-gray-900 border-4 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all font-black text-lg flex items-center justify-center gap-2 transform hover:scale-105 hover:-rotate-1"
          >
            <span>Track Your Order</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate('/order')}
            className="w-full py-3 border-4 border-gray-900 bg-white text-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-all font-bold transform hover:rotate-1"
          >
            Order More Items
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full py-3 text-gray-600 hover:text-gray-900 transition-all font-bold border-2 border-transparent hover:border-gray-900"
          >
            Back to Home
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-gray-600 text-sm font-medium">
          <p>You will receive updates about your order status</p>
          <p className="mt-1 font-bold">Thank you for choosing our canteen!</p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
