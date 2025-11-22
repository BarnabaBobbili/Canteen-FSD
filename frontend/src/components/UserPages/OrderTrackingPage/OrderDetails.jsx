/**
 * Order Details Component
 * Displays order items and total
 */
const OrderDetails = ({ order }) => {
  return (
    <div className="bg-white border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] p-6 sm:p-8 mb-6 transform -rotate-1">
      <h2 className="text-xl font-black text-gray-900 mb-6 underline decoration-wavy decoration-2 underline-offset-4">Order Details</h2>

      <div className="space-y-4">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between pb-4 border-b-2 border-dashed border-gray-400 last:border-0"
          >
            <div>
              <p className="font-black text-gray-900">{item.itemName}</p>
              <p className="text-sm text-gray-600 font-bold">Qty: {item.quantity}</p>
            </div>
            <p className="font-black text-gray-900">₹{item.price * item.quantity}</p>
          </div>
        ))}

        <div className="border-t-4 border-gray-900 pt-4 mt-4">
          <div className="flex items-center justify-between text-xl font-black text-gray-900">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
