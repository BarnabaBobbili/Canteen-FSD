import React from 'react';
import { Search } from 'lucide-react';

/**
 * Search bar component for filtering menu items
 * @param {Object} props
 * @param {string} props.searchQuery - Current search query
 * @param {Function} props.onSearchChange - Handler for search input change
 */
const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="mt-4 relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-900" />
      <input
        type="text"
        placeholder="Search for dishes, ingredients..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-white border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] focus:outline-none text-gray-900 placeholder-gray-500 font-medium transform focus:-rotate-1 transition-all"
      />
    </div>
  );
};

export default SearchBar;
