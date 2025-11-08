import React, { useState } from 'react';
import { User, Mail, Phone, Save, Edit2, X } from 'lucide-react';

/**
 * Profile Details component for editing user information
 * @param {Object} props
 * @param {Object} props.user - User data
 * @param {Function} props.onUpdate - Handler for updating profile
 * @param {boolean} props.updating - Update in progress state
 */
const ProfileDetails = ({ user, onUpdate, updating }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const success = await onUpdate(formData);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="bg-white border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] p-6 transform rotate-1">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-gray-900 underline decoration-wavy decoration-2 underline-offset-4">Profile Details</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 text-gray-900 border-3 border-gray-900 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] transition-all font-black transform hover:-rotate-1"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full pl-10 pr-4 py-3 border-3 border-gray-900 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] font-medium transform focus:-rotate-1 transition-all ${
                isEditing ? 'bg-white' : 'bg-gray-50 text-gray-900'
              } ${errors.name ? 'border-red-500' : ''}`}
              placeholder="John Doe"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 font-bold">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full pl-10 pr-4 py-3 border-3 border-gray-900 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] font-medium transform focus:-rotate-1 transition-all ${
                isEditing ? 'bg-white' : 'bg-gray-50 text-gray-900'
              } ${errors.email ? 'border-red-500' : ''}`}
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 font-bold">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full pl-10 pr-4 py-3 border-3 border-gray-900 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] font-medium transform focus:-rotate-1 transition-all ${
                isEditing ? 'bg-white' : 'bg-gray-50 text-gray-900'
              } ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="1234567890"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 font-bold">{errors.phone}</p>
          )}
        </div>

        {/* Role Badge */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Account Type
          </label>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-900 border-3 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
            <User className="w-4 h-4" />
            <span className="font-black capitalize">{user?.role || 'Customer'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={updating}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 border-4 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all font-black transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={updating}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-4 border-gray-900 bg-white text-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-all font-black transform hover:rotate-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-5 h-5" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileDetails;
