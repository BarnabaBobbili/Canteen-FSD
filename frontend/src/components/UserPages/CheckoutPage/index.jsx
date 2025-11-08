import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import UserDetails from './UserDetails';
import DeliveryOptions from './DeliveryOptions';
import PaymentMethods from './PaymentMethods';
import OrderSummary from './OrderSummary';
import API_BASE_URL from '../../../config/api';

/**
 * Main Checkout Page Orchestrator
 * Uses Cart Context for state management
 */
const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, clearCart, getCartTotal } = useCart();
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Redirect if cart is empty
  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-white relative" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
        fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
      }}>
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

  const handlePlaceOrder = async () => {
    // Validate delivery address if delivery option selected
    if (deliveryOption === 'delivery' && !deliveryAddress.trim()) {
      alert('Please enter your delivery address');
      return;
    }

    setIsPlacingOrder(true);

    try {
      const orderData = {
        items: cart.map(item => ({
          itemId: item._id,
          itemName: item.itemName,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: getCartTotal() * 1.05, // Including 5% tax
        orderType: deliveryOption === 'pickup' ? 'counter' : 'online',
        paymentMethod: paymentMethod,
        deliveryAddress: deliveryOption === 'delivery' ? deliveryAddress : null,
        customerName: user?.name || 'Guest',
        customerPhone: user?.phone || '',
        customerEmail: user?.email || ''
      };

      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const result = await response.json();

      // Clear cart
      clearCart();

      // Navigate to order confirmation with order details
      navigate('/order-confirmation', {
        state: {
          orderId: result._id,
          orderNumber: result.orderNumber,
          estimatedTime: deliveryOption === 'pickup' ? '15-20' : '30-40',
          deliveryOption,
          paymentMethod,
          total: Math.round(getCartTotal() * 1.05)
        }
      });
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
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
              deliveryOption={deliveryOption}
              deliveryAddress={deliveryAddress}
              onAddressChange={setDeliveryAddress}
            />

            {/* Delivery Options */}
            <DeliveryOptions
              selectedOption={deliveryOption}
              onOptionChange={setDeliveryOption}
            />

            {/* Payment Methods */}
            <PaymentMethods
              selectedMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <OrderSummary />

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
  );
};

export default CheckoutPage;
