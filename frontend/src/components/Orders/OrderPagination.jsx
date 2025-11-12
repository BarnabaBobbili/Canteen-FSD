import React from 'react';

/**
 * Order Pagination Component
 * Handles display limits and completed/ready order visibility
 */
const OrderPagination = ({
  displayedCount,
  totalCount,
  displayLimit,
  setDisplayLimit,
  showCompletedReady,
  setShowCompletedReady
}) => {
  const hasMoreOrders = totalCount > displayLimit;

  return (
    <div className="mt-4 space-y-3">
      {/* Order Count */}
      <div className="text-center text-sm text-gray-600">
        Showing <span className="font-semibold text-gray-900">{displayedCount}</span> of{' '}
        <span className="font-semibold text-gray-900">{totalCount}</span> orders
        {!showCompletedReady && (
          <span className="text-gray-500"> (excluding completed & ready)</span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
        {/* View More Button */}
        {hasMoreOrders && (
          <button
            onClick={() => setDisplayLimit(displayLimit + 10)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            View More ({totalCount - displayLimit} more)
          </button>
        )}

        {/* Show/Hide Completed & Ready Toggle */}
        <button
          onClick={() => setShowCompletedReady(!showCompletedReady)}
          className={`px-6 py-2 rounded-lg border-2 transition-colors font-medium ${
            showCompletedReady
              ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
              : 'bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-50'
          }`}
        >
          {showCompletedReady ? 'Hide' : 'Show'} Completed & Ready
        </button>

        {/* Show Less Button */}
        {displayLimit > 10 && (
          <button
            onClick={() => setDisplayLimit(10)}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderPagination;
