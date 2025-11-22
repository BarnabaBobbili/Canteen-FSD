/**
 * Loading State Component
 * Displays loading spinner while fetching order details
 */
const LoadingState = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900"></div>
        <p className="mt-4 text-lg font-bold text-gray-900">Loading order details...</p>
      </div>
    </div>
  );
};

export default LoadingState;
