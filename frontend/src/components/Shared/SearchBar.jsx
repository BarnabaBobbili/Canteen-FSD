import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Search..." }) => {
  return (
    <div className="flex-1 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          type="button"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
