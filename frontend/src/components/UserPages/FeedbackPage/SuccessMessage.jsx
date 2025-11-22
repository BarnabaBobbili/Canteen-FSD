import { CheckCircle } from 'lucide-react';

/**
 * Success Message Component
 * Displays success message after feedback submission
 */
const SuccessMessage = () => {
  return (
    <div className="min-h-screen bg-white relative flex items-center justify-center" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='%23fafafa'/%3E%3Cpath d='M10 10h80v80H10z' fill='none' stroke='%23e5e5e5' stroke-width='0.5'/%3E%3C/svg%3E")`,
      fontFamily: '"Comic Sans MS", "Marker Felt", cursive'
    }}>
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Thank You!</h2>
        <p className="text-gray-600 font-medium">Your feedback has been submitted successfully.</p>
        <p className="text-sm text-gray-500 mt-4">Redirecting to order history...</p>
      </div>
    </div>
  );
};

export default SuccessMessage;
