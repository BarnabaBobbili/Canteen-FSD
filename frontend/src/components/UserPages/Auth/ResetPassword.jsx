import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, ChefHat, AlertCircle, CheckCircle } from 'lucide-react';
import API_BASE_URL from '../../../config/api';

/**
 * Reset Password Page
 * Allows users to set a new password using the reset token from email
 */
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: formData.password })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white relative flex items-center justify-center p-6" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
        fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
      }}>
        <div className="bg-white border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] p-8 lg:p-12 max-w-md w-full text-center transform -rotate-1">
          <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-6" />
          <h2 className="text-2xl font-black text-gray-900 mb-4">Password Reset Successful!</h2>
          <p className="text-gray-600 font-medium mb-6">
            Your password has been reset successfully. You can now log in with your new password.
          </p>
          <p className="text-sm text-gray-500 font-medium">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative flex items-center justify-center p-6" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
      fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
    }}>
      <div className="bg-white border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] p-8 lg:p-12 max-w-md w-full transform rotate-1">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-900 border-3 border-gray-900 p-4 transform -rotate-3">
            <Lock className="w-12 h-12 text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-black text-gray-900 mb-2 underline decoration-wavy decoration-2 underline-offset-4 text-center">
          Reset Password
        </h2>
        <p className="text-gray-600 font-medium mb-8 text-center">
          Enter your new password below
        </p>

        {error && (
          <div className="mb-6 bg-red-50 border-4 border-red-500 shadow-[3px_3px_0px_0px_rgba(220,38,38,0.3)] p-4 flex items-start gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-red-700 text-sm font-bold">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-black text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-12 py-3 border-3 border-gray-900 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] font-medium transform focus:-rotate-1 transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-black text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full pl-10 pr-12 py-3 border-3 border-gray-900 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] font-medium transform focus:-rotate-1 transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 border-4 border-gray-900 text-white py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all transform hover:scale-105 hover:-rotate-1 font-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-gray-900 hover:text-gray-600 font-black underline decoration-wavy decoration-2 underline-offset-2"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
