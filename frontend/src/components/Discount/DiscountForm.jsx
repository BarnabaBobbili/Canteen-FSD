import React, { useState, useMemo } from 'react';
import { X, Plus, Minus } from 'lucide-react';

const DiscountForm = ({
  selectedItem,
  onClose,
  onSubmit,
  loading
}) => {
  const [manualDiscount, setManualDiscount] = useState({
    discountType: selectedItem.discount?.type && selectedItem.discount.type !== 'none'
      ? selectedItem.discount.type
      : 'percentage',
    discountValue: selectedItem.discount?.value ? Number(selectedItem.discount.value) : 10,
    reason: selectedItem.discount?.reason && selectedItem.discount.reason !== 'none'
      ? selectedItem.discount.reason
      : 'manual'
  });

  // Calculate discounted price preview
  const discountPreview = useMemo(() => {
    if (!selectedItem || !manualDiscount) return { finalPrice: 0, savings: 0 };

    const originalPrice = selectedItem.price || 0;
    const discountValue = Number(manualDiscount.discountValue) || 0;
    const discountType = manualDiscount.discountType;

    let finalPrice = originalPrice;
    if (discountType === 'percentage') {
      finalPrice = originalPrice - (originalPrice * discountValue / 100);
    } else if (discountType === 'fixed') {
      finalPrice = Math.max(0, originalPrice - discountValue);
    }

    const savings = originalPrice - finalPrice;
    return { finalPrice, savings };
  }, [selectedItem, manualDiscount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(manualDiscount);
  };

  const adjustValue = (delta) => {
    const currentValue = Number(manualDiscount.discountValue) || 0;
    const step = manualDiscount.discountType === 'percentage' ? 5 : 10;
    const maxValue = manualDiscount.discountType === 'percentage' ? 100 : selectedItem.price;
    const newValue = Math.max(0, Math.min(maxValue, currentValue + delta * step));
    setManualDiscount({ ...manualDiscount, discountValue: Number(newValue) });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Apply Discount</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Item</p>
            <p className="font-bold text-gray-900">{selectedItem.itemName}</p>
            <p className="text-sm text-gray-600 mt-1">Current Price: Rs. {selectedItem.price.toFixed(2)}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Type
                </label>
                <select
                  value={manualDiscount.discountType}
                  onChange={(e) => setManualDiscount({ ...manualDiscount, discountType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (Rs.)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Value
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => adjustValue(-1)}
                    className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                  >
                    <Minus size={20} />
                  </button>
                  <input
                    type="number"
                    value={manualDiscount.discountValue}
                    onChange={(e) => {
                      const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                      if (!isNaN(value) && value >= 0) {
                        setManualDiscount({ ...manualDiscount, discountValue: Number(value) });
                      }
                    }}
                    min="0"
                    max={manualDiscount.discountType === 'percentage' ? 100 : selectedItem.price}
                    step="1"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-center text-lg font-semibold"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => adjustValue(1)}
                    className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  {manualDiscount.discountType === 'percentage' ?
                    `${manualDiscount.discountValue}% discount` :
                    `Rs. ${manualDiscount.discountValue} off`}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason
                </label>
                <select
                  value={manualDiscount.reason}
                  onChange={(e) => setManualDiscount({ ...manualDiscount, reason: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="manual">Manual Discount</option>
                  <option value="clearance">Clearance Sale</option>
                  <option value="low_stock">Low Stock</option>
                  <option value="expiry">Near Expiry</option>
                </select>
              </div>

              <div className="p-4 bg-indigo-50 rounded-lg border-2 border-indigo-200">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-700">Original Price:</p>
                  <p className="text-lg text-gray-600 line-through">Rs. {selectedItem.price.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-700">You Save:</p>
                  <p className="text-lg font-bold text-green-600">
                    Rs. {discountPreview.savings.toFixed(2)}
                  </p>
                </div>
                <div className="pt-2 border-t-2 border-indigo-300">
                  <div className="flex justify-between items-center">
                    <p className="text-base font-semibold text-gray-800">Final Price:</p>
                    <p className="text-3xl font-bold text-indigo-600">
                      Rs. {discountPreview.finalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'Applying...' : 'Apply Discount'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DiscountForm;
