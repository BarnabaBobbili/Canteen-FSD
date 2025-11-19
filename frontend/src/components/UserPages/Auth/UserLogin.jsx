import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { LogIn, User, Lock, AlertCircle, Eye, EyeOff, UtensilsCrossed, ArrowLeft } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { getDefaultRedirect } from '../../Shared/Auth/authHelpers';

/**
 * User (Customer) Login Page
 * Sketch-style simplified login flow for customers
 */
const UserLogin = () => {
  const navigate = useNavigate();
  const { login, googleLogin, isAuthenticated, user } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = getDefaultRedirect(user.role);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        const redirectPath = getDefaultRedirect(result.user?.role);
        navigate(redirectPath, { replace: true });
      } else {
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError('');
    setLoading(true);

    try {
      const result = await googleLogin(credentialResponse.credential);

      if (result.success) {
        const redirectPath = getDefaultRedirect(result.user?.role);
        navigate(redirectPath, { replace: true });
      } else {
        setError(result.message || 'Google login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during Google login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <div className="min-h-screen bg-white relative flex items-center justify-center p-6" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
      fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
    }}>
      <div className="relative max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block">
          <div className="bg-gray-900 border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)] p-12 transform -rotate-2">
            <div className="bg-white border-3 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] p-8 transform rotate-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gray-900 border-3 border-gray-900 p-3 transform -rotate-3">
                  <UtensilsCrossed className="w-10 h-10 text-white" />
                </div>
                <div className="text-gray-900">
                  <h1 className="text-3xl font-black">CanteenDelight</h1>
                  <p className="text-gray-600 font-medium">Order delicious food!</p>
                </div>
              </div>

              <div className="space-y-4 text-gray-900">
                <div className="flex items-start gap-3 p-3 border-2 border-gray-900 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
                  <div className="bg-gray-900 border-2 border-gray-900 p-2 mt-1">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black">Quick & Easy</h3>
                    <p className="text-sm text-gray-600 font-medium">Order food in just a few clicks</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border-2 border-gray-900 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] transform rotate-1">
                  <div className="bg-gray-900 border-2 border-gray-900 p-2 mt-1">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black">Secure & Safe</h3>
                    <p className="text-sm text-gray-600 font-medium">Your data is protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] p-8 lg:p-12 transform rotate-1">
          <button
            onClick={() => navigate('/demo')}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-bold border-2 border-transparent hover:border-gray-900 p-2 transform hover:-rotate-3"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-2 underline decoration-wavy decoration-2 underline-offset-4">Welcome Back!</h2>
            <p className="text-gray-600 font-medium">Login to your account to order food</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-4 border-red-500 shadow-[3px_3px_0px_0px_rgba(220,38,38,0.3)] p-4 flex items-start gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
              <div className="text-red-700 text-sm font-bold">{error}</div>
            </div>
          )}

          {/* Google Sign-in */}
          <div className="mb-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              text="signin_with"
              shape="rectangular"
              theme="outline"
              size="large"
            />
          </div>

          {/* Divider */}
          <div className="mb-6 flex items-center">
            <div className="flex-1 border-t-2 border-dashed border-gray-400"></div>
            <span className="px-4 text-gray-500 text-sm font-black">OR</span>
            <div className="flex-1 border-t-2 border-dashed border-gray-400"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-3 border-gray-900 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] font-medium transform focus:-rotate-1 transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-black text-gray-700 mb-2">
                Password
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

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 border-4 border-gray-900 text-white py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all transform hover:scale-105 hover:-rotate-1 font-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>Processing...</>
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-gray-600 font-medium">
              <button
                onClick={() => navigate('/forgot-password')}
                className="text-gray-900 hover:text-gray-600 font-black underline decoration-wavy decoration-2 underline-offset-2"
              >
                Forgot Password?
              </button>
            </p>
            <p className="text-gray-600 font-medium">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-gray-900 hover:text-gray-600 font-black underline decoration-wavy decoration-2 underline-offset-2"
              >
                Sign Up
              </button>
            </p>
            <p className="text-sm text-gray-500 font-medium">
              Staff member?{' '}
              <button
                onClick={() => navigate('/staff/login')}
                className="text-gray-900 hover:text-gray-600 font-black underline decoration-wavy decoration-2 underline-offset-2"
              >
                Staff Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
