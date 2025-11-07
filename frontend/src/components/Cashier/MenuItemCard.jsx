import React from 'react';
import { Plus, Minus, ChefHat } from 'lucide-react';
import { getImageUrl } from './cashierHelpers';
import API_BASE_URL from '../../config/api';

const MenuItemCard = React.memo(({ item, quantityInCart, onAddToCart, onUpdateQuantity }) => {
  const imageUrl = getImageUrl(item.image, API_BASE_URL);

  // Calculate actual price with discount
  const hasDiscount = item.discount?.type !== 'none' && item.discount?.value > 0;
  const actualPrice = hasDiscount
    ? item.discount.type === 'percentage'
      ? item.price - (item.price * item.discount.value / 100)
      : item.price - item.discount.value
    : item.price;

  const handleIncrement = (e) => {
    e.stopPropagation();
    if (quantityInCart > 0) {
      onUpdateQuantity(item._id, 1);
    } else {
      onAddToCart(item);
    }
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    onUpdateQuantity(item._id, -1);
  };

  return (
    <div
      className="bg-white border border-gray-300 rounded p-2 hover:border-sky-500 relative"
    >
      {imageUrl ? (
        <div className="w-full bg-gray-100 rounded mb-2 overflow-hidden relative" style={{ height: '120px' }}>
          <img
            src={imageUrl}
            alt={item.itemName}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          {hasDiscount && (
            <div className="absolute top-1 right-1 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
              {item.discount.value}{item.discount.type === 'percentage' ? '%' : '₹'} OFF
            </div>
          )}
        </div>
      ) : (
        <div className="w-full bg-gray-100 rounded mb-2 flex items-center justify-center" style={{ height: '120px' }}>
          <ChefHat className="w-10 h-10 text-gray-400" />
        </div>
      )}
      <h3 className="font-semibold text-sm text-gray-800 mb-1">{item.itemName}</h3>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">₹{item.price}</span>
          )}
          <p className={`font-bold ${hasDiscount ? 'text-green-600' : 'text-sky-600'}`}>
            ₹{actualPrice.toFixed(2)}
          </p>
        </div>
        {quantityInCart > 0 ? (
          <div className="flex items-center gap-1 bg-sky-500 rounded">
            <button
              onClick={handleDecrement}
              className="w-6 h-6 text-white flex items-center justify-center hover:bg-sky-600"
            >
              <Minus size={12} />
            </button>
            <span className="w-6 text-center font-bold text-sm text-white">{quantityInCart}</span>
            <button
              onClick={handleIncrement}
              className="w-6 h-6 text-white flex items-center justify-center hover:bg-sky-600"
            >
              <Plus size={12} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleIncrement}
            className="bg-sky-500 text-white p-1 rounded hover:bg-sky-600"
          >
            <Plus size={14} />
          </button>
        )}
      </div>
    </div>
  );
});

MenuItemCard.displayName = 'MenuItemCard';

export default MenuItemCard;
