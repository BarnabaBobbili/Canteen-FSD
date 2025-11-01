/**
 * Custom hook for managing discount filter and search state
 */
import { useState } from 'react';

export const useDiscountFilters = () => {
  // Filter and sort states
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expiryFilter, setExpiryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('discount-desc');
  const [showFilters, setShowFilters] = useState(false);

  // Search states for each tab
  const [discountedSearch, setDiscountedSearch] = useState('');
  const [allItemsSearch, setAllItemsSearch] = useState('');
  const [popularSearch, setPopularSearch] = useState('');

  /**
   * Clear all filters to default values
   */
  const clearAllFilters = () => {
    setCategoryFilter('all');
    setExpiryFilter('all');
  };

  /**
   * Reset all search fields
   */
  const clearAllSearches = () => {
    setDiscountedSearch('');
    setAllItemsSearch('');
    setPopularSearch('');
  };

  /**
   * Reset everything to defaults
   */
  const resetAll = () => {
    clearAllFilters();
    clearAllSearches();
    setSortBy('discount-desc');
    setShowFilters(false);
  };

  return {
    // Filter states
    categoryFilter,
    setCategoryFilter,
    expiryFilter,
    setExpiryFilter,
    sortBy,
    setSortBy,
    showFilters,
    setShowFilters,

    // Search states
    discountedSearch,
    setDiscountedSearch,
    allItemsSearch,
    setAllItemsSearch,
    popularSearch,
    setPopularSearch,

    // Utility functions
    clearAllFilters,
    clearAllSearches,
    resetAll
  };
};
