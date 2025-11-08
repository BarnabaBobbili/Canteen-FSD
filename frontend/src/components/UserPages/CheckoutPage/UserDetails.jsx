import React from 'react';
import { User, Phone, Mail, MapPin } from 'lucide-react';

/**
 * User details display component
 * @param {Object} props
 * @param {Object} props.user - User object from AuthContext
 * @param {string} props.deliveryOption - Current delivery option ('pickup' or 'delivery')
 * @param {string} props.deliveryAddress - Delivery address if delivery option selected
 * @param {Function} props.onAddressChange - Handler for address change
 */
const UserDetails = ({ user, deliveryOption, deliveryAddress, onAddressChange }) => {
  return (
    <div className="bg-white border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] p-6">
      <h2 className="text-xl font-black text-gray-900 mb-4 underline decoration-wavy decoration-2 underline-offset-4">Your Details</h2>

      <div className="space-y-4">
        {/* Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-gray-900 bg-gray-900 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold">Name</p>
            <p className="font-black text-gray-900">{user?.name || 'Guest User'}</p>
          </div>
        </div>

        {/* Email */}
        {user?.email && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-gray-900 bg-gray-900 flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold">Email</p>
              <p className="font-black text-gray-900">{user.email}</p>
            </div>
          </div>
        )}

        {/* Phone */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-gray-900 bg-gray-900 flex items-center justify-center">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold">Phone</p>
            <p className="font-black text-gray-900">{user?.phone || 'Not provided'}</p>
          </div>
        </div>

        {/* Delivery Address (only shown for delivery option) */}
        {deliveryOption === 'delivery' && (
          <div className="pt-4 border-t-2 border-dashed border-gray-400">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 border-2 border-gray-900 bg-gray-900 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-bold mb-2">Delivery Address</p>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => onAddressChange(e.target.value)}
                  placeholder="Enter your delivery address..."
                  className="w-full px-3 py-2 border-3 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] focus:outline-none text-gray-900 placeholder-gray-500 font-medium resize-none transform focus:-rotate-1 transition-all"
                  rows="3"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
