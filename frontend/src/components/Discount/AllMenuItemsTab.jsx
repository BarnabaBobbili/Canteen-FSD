import React from 'react';
import { ShoppingCart, Tag, Plus } from 'lucide-react';

const AllMenuItemsTab = ({
  items,
  onEdit,
  formatDate
}) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
        <p className="text-lg">No menu items available</p>
        <p className="text-sm">Add menu items to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.itemName}</td>
              <td className="px-6 py-4 text-sm text-gray-600 capitalize">{item.category}</td>
              <td className="px-6 py-4 text-sm text-gray-900">Rs. {item.price.toFixed(2)}</td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {item.stockQuantity !== undefined ? `${item.stockQuantity}` : 'N/A'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {item.expiryDate ? (
                  <span className={
                    new Date(item.expiryDate) < new Date()
                      ? 'text-red-600 font-semibold'
                      : new Date(item.expiryDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                      ? 'text-orange-600 font-semibold'
                      : 'text-gray-600'
                  }>
                    {formatDate(item.expiryDate)}
                  </span>
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </td>
              <td className="px-6 py-4 text-sm">
                {item.discount?.type !== 'none' && item.discount?.value > 0 ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                    {item.discount.type === 'percentage'
                      ? `${item.discount.value}% OFF`
                      : `Rs. ${item.discount.value} OFF`}
                  </span>
                ) : (
                  <span className="text-gray-400">None</span>
                )}
              </td>
              <td className="px-6 py-4 text-sm">
                <button
                  onClick={() => onEdit(item)}
                  className={`px-3 py-1.5 rounded-lg font-medium text-xs flex items-center gap-1 transition-colors ${
                    item.discount?.type !== 'none' && item.discount?.value > 0
                      ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {item.discount?.type !== 'none' && item.discount?.value > 0 ? (
                    <>
                      <Tag size={14} />
                      Edit Discount
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      Add Discount
                    </>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllMenuItemsTab;
