import React, { useState } from 'react';
import { CreditCard, X, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * Test Payment Modal - Simulates Razorpay for testing
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal visibility
 * @param {Function} props.onSuccess - Success callback
 * @param {Function} props.onClose - Close callback
 * @param {Object} props.orderDetails - Order details
 */
const TestPaymentModal = ({ isOpen, onSuccess, onClose, orderDetails }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock payment response
    const mockPaymentResponse = {
      razorpay_order_id: orderDetails.orderId,
      razorpay_payment_id: `test_pay_${Date.now()}`,
      razorpay_signature: 'test_signature'
    };

    setIsProcessing(false);
    onSuccess(mockPaymentResponse);
  };

  const handleCancel = () => {
    if (!isProcessing) {
      onClose();
    }
  };

  const amount = (orderDetails.amount / 100).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] relative">
        {/* Header */}
        <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            <h2 className="font-black text-lg">Test Payment Gateway</h2>
          </div>
          {!isProcessing && (
            <button
              onClick={handleCancel}
              className="hover:bg-gray-800 p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Test Mode Banner */}
          <div className="bg-yellow-50 border-2 border-yellow-400 p-3 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-yellow-800 text-sm">TEST MODE</p>
              <p className="text-xs text-yellow-700">
                This is a simulation. No real payment will be processed.
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div>
            <h3 className="font-black text-gray-900 mb-2">Order Details</h3>
            <div className="bg-gray-50 border-2 border-gray-200 p-3 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Order ID:</span>
                <span className="font-bold text-gray-900">{orderDetails.orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-medium">Amount:</span>
                <span className="font-black text-lg text-gray-900">₹{amount}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <h3 className="font-black text-gray-900 mb-3">Select Payment Method</h3>
            <div className="space-y-2">
              {[
                { id: 'card', label: 'Card' },
                { id: 'upi', label: 'UPI' },
                { id: 'netbanking', label: 'Netbanking' },
                { id: 'wallet', label: 'Wallet' }
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  disabled={isProcessing}
                  className={`w-full p-3 border-2 text-left font-bold transition-all ${
                    paymentMethod === method.id
                      ? 'border-gray-900 bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]'
                      : 'border-gray-300 bg-white hover:border-gray-900'
                  } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {method.label}
                  {paymentMethod === method.id && (
                    <span className="float-right">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full py-3 bg-gray-900 border-3 border-gray-900 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] transition-all font-black flex items-center justify-center gap-2 ${
                isProcessing ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Pay ₹{amount}</span>
                </>
              )}
            </button>

            {!isProcessing && (
              <button
                onClick={handleCancel}
                className="w-full py-3 border-3 border-gray-900 bg-white text-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] transition-all font-bold"
              >
                Cancel
              </button>
            )}
          </div>

          {/* Test Info */}
          <div className="text-center">
            <p className="text-xs text-gray-500 font-medium">
              In test mode, all payments are auto-approved after 2 seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPaymentModal;
