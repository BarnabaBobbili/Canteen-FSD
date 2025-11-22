import { XCircle } from 'lucide-react';

/**
 * Error State Component
 * Displays error message when order cannot be found
 */
const ErrorState = ({ error, onGoHome }) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.4)] p-8 max-w-md w-full text-center">
        <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-gray-900 mb-2">Order Not Found</h2>
        <p className="text-gray-600 font-medium mb-6">{error}</p>
        <button
          onClick={onGoHome}
          className="px-6 py-3 bg-gray-900 text-white font-black border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorState;
