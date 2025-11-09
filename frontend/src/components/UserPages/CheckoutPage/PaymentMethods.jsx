import React from 'react';
import { CreditCard, Shield, Lock } from 'lucide-react';

/**
 * Payment methods selector - Razorpay only
 */
const PaymentMethods = () => {
  return (
    <div className="bg-white border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] p-6">
      <h2 className="text-xl font-black text-gray-900 mb-4 underline decoration-wavy decoration-2 underline-offset-4">Payment Method</h2>

      {/* Razorpay Payment Info */}
      <div className="p-4 border-3 border-gray-900 bg-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)]">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-12 h-12 border-2 border-gray-900 bg-white flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-6 h-6 text-gray-900" />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h3 className="font-black text-gray-900 mb-1">Secure Online Payment</h3>
            <p className="text-sm text-gray-600 font-medium mb-3">
              Pay securely using Card, UPI, Netbanking, or Wallet
            </p>

            {/* Payment Options */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 bg-white border-2 border-gray-900 text-xs font-bold">Cards</span>
              <span className="px-3 py-1 bg-white border-2 border-gray-900 text-xs font-bold">UPI</span>
              <span className="px-3 py-1 bg-white border-2 border-gray-900 text-xs font-bold">Netbanking</span>
              <span className="px-3 py-1 bg-white border-2 border-gray-900 text-xs font-bold">Wallets</span>
            </div>

            {/* Security Features */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Shield className="w-3 h-3" />
                <span className="font-medium">100% Secure & Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Lock className="w-3 h-3" />
                <span className="font-medium">Powered by Razorpay</span>
              </div>
            </div>
          </div>

          {/* Selected Indicator */}
          <div className="w-6 h-6 border-3 border-gray-900 bg-gray-900 flex items-center justify-center flex-shrink-0">
            <div className="w-3 h-3 bg-white"></div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 p-3 bg-gray-50 border-2 border-gray-200">
        <p className="text-xs text-gray-600 font-medium text-center">
          You will be redirected to a secure payment gateway to complete your payment
        </p>
      </div>
    </div>
  );
};

export default PaymentMethods;
