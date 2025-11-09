import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail, CheckCircle, XCircle, Loader, ChefHat } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import API_BASE_URL from '../../../config/api';

/**
 * Email Verification Page
 * Handles email verification from link sent to user
 */
const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { setAuthData } = useAuth();
  const [status, setStatus] = useState('verifying'); // verifying | success | error
  const [message, setMessage] = useState('');

  useEffect(() => {
    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-email/${token}`);
      const data = await response.json();

      if (response.ok && data.verified) {
        setStatus('success');
        setMessage(data.message);

        // Auto-login the user after verification
        if (data.token && data.user) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          if (setAuthData) {
            setAuthData(data.user, data.token);
          }

          // Redirect to order page after 2 seconds
          setTimeout(() => {
            navigate('/order', { replace: true });
          }, 2000);
        }
      } else {
        setStatus('error');
        setMessage(data.message || 'Verification failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred during verification. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white relative flex items-center justify-center p-6" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
      fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
    }}>
      <div className="bg-white border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.4)] p-8 lg:p-12 max-w-md w-full text-center transform rotate-1">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-900 border-3 border-gray-900 p-4 transform -rotate-3">
            <ChefHat className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-4 underline decoration-wavy decoration-2 underline-offset-4">
          Email Verification
        </h1>

        {status === 'verifying' && (
          <div className="space-y-4">
            <Loader className="w-16 h-16 mx-auto text-gray-900 animate-spin" />
            <p className="text-gray-600 font-medium">Verifying your email address...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <CheckCircle className="w-16 h-16 mx-auto text-green-600" />
            <p className="text-gray-900 font-bold text-lg">{message}</p>
            <p className="text-gray-600 font-medium">Redirecting you to order page...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-6">
            <XCircle className="w-16 h-16 mx-auto text-red-600" />
            <p className="text-gray-900 font-bold text-lg">{message}</p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gray-900 border-4 border-gray-900 text-white py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all transform hover:scale-105 hover:-rotate-1 font-black"
              >
                Go to Login
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full bg-white border-4 border-gray-900 text-gray-900 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all transform hover:scale-105 hover:rotate-1 font-black"
              >
                Go to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
