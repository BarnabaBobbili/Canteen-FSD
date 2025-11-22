import { ArrowLeft } from 'lucide-react';

/**
 * Order Header Component
 * Displays page title and back button
 */
const OrderHeader = ({ orderNumber, onBack }) => {
  return (
    <div className="bg-white border-b-4 border-gray-900 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 border-2 border-gray-900 hover:bg-gray-100 transition-all transform hover:-rotate-3"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-900">Track Your Order</h1>
            <p className="text-gray-600 text-sm font-medium">Order #{orderNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHeader;
