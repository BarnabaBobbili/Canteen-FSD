/**
 * OTP Display Component
 * Shows the OTP for pickup verification
 */
const OTPDisplay = ({ order }) => {
  return (
    <div className="bg-yellow-50 border-4 border-yellow-600 shadow-[4px_4px_0px_0px_rgba(202,138,4,0.4)] p-6 mb-6 transform -rotate-1">
      <h3 className="text-lg font-black text-yellow-900 mb-3 text-center">Your Pickup OTP</h3>
      <div className="bg-white border-3 border-yellow-600 p-4 text-center mb-3">
        <p className="text-5xl font-black text-yellow-900 tracking-widest">{order.otp}</p>
      </div>
      <p className="text-center text-sm font-bold text-yellow-900">
        Show this OTP to staff when collecting your order
      </p>
      {order.otpExpires && (
        <p className="text-center text-xs font-medium text-yellow-700 mt-2">
          ⏱️ Valid until {new Date(order.otpExpires).toLocaleTimeString()}
        </p>
      )}
    </div>
  );
};

export default OTPDisplay;
