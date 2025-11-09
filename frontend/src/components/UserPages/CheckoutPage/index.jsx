import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import UserDetails from './UserDetails';
import DeliveryOptions from './DeliveryOptions';
import PaymentMethods from './PaymentMethods';
import OrderSummary from './OrderSummary';
import TestPaymentModal from './TestPaymentModal';
import API_BASE_URL from '../../../config/api';
import { processOnlinePayment } from '../../../services/paymentService';

/**
 * Main Checkout Page Orchestrator
 * Uses Cart Context for state management
 *
 * Auto-logs out staff members (admin, manager, cashier, staff) when they access this page
 * This ensures staff can only browse as customers or guests
 */
const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart, clearCart, getCartTotal } = useCart();
  const [deliveryOption, setDeliveryOption] = useState('dine-in');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showTestPaymentModal, setShowTestPaymentModal] = useState(false);
  const [testPaymentDetails, setTestPaymentDetails] = useState(null);
  const [testPaymentCallbacks, setTestPaymentCallbacks] = useState(null);

  // Auto-logout staff roles when they access checkout page
  useEffect(() => {
    if (user && ['admin', 'manager', 'cashier', 'staff'].includes(user.role)) {
      logout();
    }
  }, [user, logout]);

  // Redirect if cart is empty
  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{
        fontFamily: '"Arial Black", "Hiragino Sans", sans-serif',
        background: `linear-gradient(135deg, #fff5f7 0%, #fffacd 25%, #e0f7fa 50%, #fce4ec 75%, #fff9c4 100%)`
      }}>
        {/* Colorful manga gradient overlays */}
        <div className="fixed top-0 left-0 w-full h-1/3 pointer-events-none opacity-20" style={{
          background: 'radial-gradient(ellipse at top, rgba(255,182,193,0.6) 0%, transparent 70%)'
        }}></div>
        <div className="fixed bottom-0 right-0 w-full h-1/3 pointer-events-none opacity-20" style={{
          background: 'radial-gradient(ellipse at bottom right, rgba(135,206,250,0.6) 0%, transparent 70%)'
        }}></div>

        {/* Colorful manga speed lines from center */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.05]" style={{
          background: `
            repeating-conic-gradient(
              from 0deg at 50% 50%,
              transparent 0deg,
              transparent 2deg,
              rgba(255,105,180,0.4) 2deg,
              rgba(255,105,180,0.4) 3deg,
              transparent 3deg,
              transparent 5deg,
              rgba(135,206,250,0.4) 5deg,
              rgba(135,206,250,0.4) 6deg
            )
          `
        }}></div>

        {/* Manga sparkle effects */}
        <div className="fixed inset-0 pointer-events-none opacity-20">
          <div className="absolute top-20 left-20 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-40 w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-32 left-32 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 font-medium">Add some items to proceed with checkout</p>
          <button
            onClick={() => navigate('/order')}
            className="px-8 py-3 bg-gray-900 border-4 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all font-black transform hover:scale-105 hover:-rotate-1"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  const openTestPaymentModal = (options, onSuccess, onFailure) => {
    setTestPaymentDetails(options);
    setTestPaymentCallbacks({ onSuccess, onFailure });
    setShowTestPaymentModal(true);
  };

  const handleTestPaymentSuccess = (paymentResponse) => {
    setShowTestPaymentModal(false);
    if (testPaymentCallbacks?.onSuccess) {
      testPaymentCallbacks.onSuccess(paymentResponse);
    }
  };

  const handleTestPaymentClose = () => {
    setShowTestPaymentModal(false);
    if (testPaymentCallbacks?.onFailure) {
      testPaymentCallbacks.onFailure(new Error('Payment cancelled by user'));
    }
    setIsPlacingOrder(false);
  };

  const handlePlaceOrder = async () => {
    // Validate phone number
    if (!phoneNumber || phoneNumber.trim() === '') {
      alert('Please enter your phone number');
      return;
    }

    // Validate phone format (10 digits)
    if (!/^[0-9]{10}$/.test(phoneNumber)) {
      alert('Phone number must be exactly 10 digits');
      return;
    }

    setIsPlacingOrder(true);

    try {
      // Calculate total items quantity
      const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

      // Add ₹5 per item for takeaway (separate from item price)
      const takeawayCharge = deliveryOption === 'takeaway' ? totalQuantity * 5 : 0;

      const orderData = {
        items: cart.map(item => ({
          itemName: item.itemName,
          quantity: item.quantity,
          price: item.price // Keep original price, don't mutate
        })),
        totalAmount: (getCartTotal() * 1.05) + takeawayCharge, // Including 5% tax + takeaway charges
        orderType: deliveryOption, // 'dine-in' or 'takeaway'
        paymentMethod: paymentMethod, // Use state instead of hardcoded value
        customerName: user?.name || 'Guest',
        customerPhone: phoneNumber,
        customerEmail: user?.email || ''
      };

      // Process online payment with Razorpay (or test modal)
      processOnlinePayment(
        orderData,
        (order) => {
          // Payment successful
          clearCart();
          navigate('/order-confirmation', {
            state: {
              orderId: order._id,
              orderNumber: order.orderNumber,
              estimatedTime: deliveryOption === 'dine-in' ? '15-20' : '20-25',
              deliveryOption,
              paymentMethod: 'online',
              total: Math.round(orderData.totalAmount),
              paymentStatus: 'completed'
            }
          });
          setIsPlacingOrder(false);
        },
        (error) => {
          // Payment failed
          console.error('Payment failed:', error);
          alert(error.message || 'Payment failed. Please try again.');
          setIsPlacingOrder(false);
        },
        openTestPaymentModal
      );
    } catch (error) {
      console.error('Failed to place order:', error);
      alert(error.message || 'Failed to place order. Please try again.');
      setIsPlacingOrder(false);
    }
  };

  return (
    <>
      {/* Test Payment Modal */}
      {showTestPaymentModal && testPaymentDetails && (
        <TestPaymentModal
          isOpen={showTestPaymentModal}
          onSuccess={handleTestPaymentSuccess}
          onClose={handleTestPaymentClose}
          orderDetails={testPaymentDetails}
        />
      )}

      <div className="min-h-screen bg-white relative" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
      fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
    }}>
      {/* Header */}
      <div className="bg-white border-b-4 border-gray-900 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/cart')}
              className="p-2 border-2 border-gray-900 hover:bg-gray-100 transition-all transform hover:-rotate-3"
            >
              <ArrowLeft className="w-6 h-6 text-gray-900" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-gray-900">Checkout</h1>
              <p className="text-gray-600 text-sm font-medium">Complete your order</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - User Details & Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Details */}
            <UserDetails
              user={user}
              phone={phoneNumber}
              onPhoneChange={setPhoneNumber}
            />

            {/* Delivery Options */}
            <DeliveryOptions
              selectedOption={deliveryOption}
              onOptionChange={setDeliveryOption}
            />

            {/* Payment Methods */}
            <PaymentMethods />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <OrderSummary deliveryOption={deliveryOption} />

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="w-full py-4 bg-gray-900 border-4 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all font-black text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:-rotate-1"
              >
                {isPlacingOrder ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Placing Order...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Place Order</span>
                  </>
                )}
              </button>

              <button
                onClick={() => navigate('/order')}
                className="w-full py-3 border-4 border-gray-900 bg-white text-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-all font-bold transform hover:rotate-1"
              >
                Add More Items
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CheckoutPage;
