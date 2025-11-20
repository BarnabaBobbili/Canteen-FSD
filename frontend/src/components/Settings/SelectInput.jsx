import React from 'react';

/**
 * SelectInput Component
 * Reusable select dropdown for settings
 */
const SelectInput = ({ label, value, onChange, options, children }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 pr-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none text-gray-900 font-medium hover:border-gray-300"
          style={{ '--tw-ring-color': '#1570EF' }}
        >
          {children || options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectInput;
