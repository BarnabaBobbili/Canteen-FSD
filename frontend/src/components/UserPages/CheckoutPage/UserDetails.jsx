import React from 'react';
import { User, Phone, Mail } from 'lucide-react';

/**
 * User details display and input component
 * @param {Object} props
 * @param {Object} props.user - User object from AuthContext
 * @param {string} props.phone - Phone number state
 * @param {Function} props.onPhoneChange - Phone change handler
 */
const UserDetails = ({ user, phone, onPhoneChange }) => {
  // Validate phone format (10 digits for Indian numbers)
  const isValidPhone = phone ? /^[0-9]{10}$/.test(phone) : true;

  return (
    <div className="bg-white border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] p-6">
      <h2 className="text-xl font-black text-gray-900 mb-4 underline decoration-wavy decoration-2 underline-offset-4">Your Details</h2>

      <div className="space-y-4">
        {/* Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-2 border-gray-900 bg-gray-900 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-bold">Name</p>
            <p className="font-black text-gray-900">{user?.name || 'Guest User'}</p>
          </div>
        </div>

        {/* Email */}
        {user?.email && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-gray-900 bg-gray-900 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-bold">Email</p>
              <p className="font-black text-gray-900 break-all">{user.email}</p>
            </div>
          </div>
        )}

        {/* Phone - Editable */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 border-2 border-gray-900 bg-gray-900 flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-500 font-bold block mb-1">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              placeholder="Enter your 10-digit phone number"
              required
              maxLength="10"
              className="w-full px-3 py-2 border-2 border-gray-900 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            />
            {!phone && (
              <p className="text-xs text-red-600 font-medium mt-1">Phone number is required</p>
            )}
            {phone && !isValidPhone && (
              <p className="text-xs text-red-600 font-medium mt-1">Phone number must be exactly 10 digits</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
