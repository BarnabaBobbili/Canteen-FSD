import { Package, UtensilsCrossed, CheckCircle, Store, Truck } from 'lucide-react';

/**
 * Get status steps configuration
 * @param {string} deliveryOption - 'pickup' or 'delivery'
 * @returns {Array} Status steps array
 */
export const getStatusSteps = (deliveryOption) => [
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
    icon: UtensilsCrossed,
    color: 'text-[#FF7A00]',
    bgColor: 'bg-[#F9F9F9]',
  },
  {
    id: 'ready',
    label: 'Ready',
    description: deliveryOption === 'pickup' ? 'Ready for pickup' : 'Out for delivery',
    icon: deliveryOption === 'pickup' ? Store : Truck,
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

/**
 * Get step index by status
 * @param {Array} statusSteps - Status steps array
 * @param {string} status - Current status
 * @returns {number} Step index
 */
export const getStepIndex = (statusSteps, status) => {
  const index = statusSteps.findIndex(step => step.id === status);
  return index !== -1 ? index : 0;
};

/**
 * Fetch order details from API
 * @param {string} identifier - Order ID or order number
 * @returns {Promise<Object>} Order data
 */
export const fetchOrderDetails = async (identifier) => {
  const token = localStorage.getItem('token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(
    `${process.env.REACT_APP_API_URL || 'http://localhost:5001/api'}/orders/${identifier}`,
    { headers }
  );

  if (!response.ok) {
    throw new Error('Order not found');
  }

  return response.json();
};
