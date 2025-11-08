import React from 'react';
import { Wallet, CreditCard, Banknote, QrCode } from 'lucide-react';

/**
 * Payment methods selector
 * @param {Object} props
 * @param {string} props.selectedMethod - Current selected method
 * @param {Function} props.onMethodChange - Handler for method change
 */
const PaymentMethods = ({ selectedMethod, onMethodChange }) => {
  const methods = [
    {
      id: 'cash',
      label: 'Cash on Delivery/Pickup',
      description: 'Pay with cash when you receive',
      icon: Banknote,
      color: 'text-[#8FCB9B]',
      bgColor: 'bg-[#F9F9F9]',
    },
    {
      id: 'card',
      label: 'Credit/Debit Card',
      description: 'Pay securely with your card',
      icon: CreditCard,
      color: 'text-[#2E3A47]',
      bgColor: 'bg-[#F9F9F9]',
    },
    {
      id: 'upi',
      label: 'UPI',
      description: 'Pay with any UPI app',
      icon: QrCode,
      color: 'text-[#2E3A47]',
      bgColor: 'bg-[#F9F9F9]',
    },
    {
      id: 'wallet',
      label: 'Digital Wallet',
      description: 'Pay with Paytm, PhonePe, etc.',
      icon: Wallet,
      color: 'text-[#FF7A00]',
      bgColor: 'bg-[#F9F9F9]',
    },
  ];

  return (
    <div className="bg-white border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] p-6">
      <h2 className="text-xl font-black text-gray-900 mb-4 underline decoration-wavy decoration-2 underline-offset-4">Payment Method</h2>

      <div className="space-y-3">
        {methods.map((method, index) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <button
              key={method.id}
              onClick={() => onMethodChange(method.id)}
              className={`w-full p-4 border-3 transition-all text-left transform ${
                isSelected
                  ? 'border-gray-900 bg-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] scale-105 rotate-1'
                  : 'border-gray-900 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] hover:rotate-1'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={`w-10 h-10 border-2 border-gray-900 bg-gray-100 flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 text-gray-900`} />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-black text-gray-900">{method.label}</h3>
                  <p className="text-xs text-gray-600 font-medium">{method.description}</p>
                </div>

                {/* Radio Indicator */}
                <div
                  className={`w-6 h-6 border-3 border-gray-900 flex items-center justify-center ${
                    isSelected ? 'bg-gray-900' : 'bg-white'
                  }`}
                >
                  {isSelected && (
                    <div className="w-3 h-3 bg-white"></div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethods;
