import React from 'react';
import { Store, ShoppingBag } from 'lucide-react';

/**
 * Order type selector
 * @param {Object} props
 * @param {string} props.selectedOption - Current selected option ('dine-in' or 'takeaway')
 * @param {Function} props.onOptionChange - Handler for option change
 */
const DeliveryOptions = ({ selectedOption, onOptionChange }) => {
  const options = [
    {
      id: 'dine-in',
      label: 'Dine-In',
      description: 'Eat at the canteen',
      icon: Store,
      bgColor: 'from-[#FF7A00] to-[#FF7A00]',
    },
    {
      id: 'takeaway',
      label: 'Takeaway',
      description: 'Take your order to go',
      icon: ShoppingBag,
      bgColor: 'from-[#8FCB9B] to-[#8FCB9B]',
    },
  ];

  return (
    <div className="bg-white border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] p-6">
      <h2 className="text-xl font-black text-gray-900 mb-4 underline decoration-wavy decoration-2 underline-offset-4">Order Type</h2>

      <div className="grid gap-4">
        {options.map((option, index) => {
          const Icon = option.icon;
          const isSelected = selectedOption === option.id;

          return (
            <button
              key={option.id}
              onClick={() => onOptionChange(option.id)}
              className={`relative p-4 border-3 transition-all text-left transform ${
                isSelected
                  ? 'border-gray-900 bg-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] scale-105 -rotate-1'
                  : 'border-gray-900 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] hover:-rotate-1'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className={`w-12 h-12 border-2 border-gray-900 bg-gray-900 flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-black text-gray-900 mb-1">{option.label}</h3>
                  <p className="text-sm text-gray-600 font-medium">{option.description}</p>
                </div>

                {/* Radio Indicator */}
                <div
                  className={`w-6 h-6 border-3 border-gray-900 flex items-center justify-center ${
                    isSelected ? 'bg-gray-900' : 'bg-white'
                  }`}
                >
                  {isSelected && (
                    <div className="w-3 h-3 bg-white"></div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryOptions;
