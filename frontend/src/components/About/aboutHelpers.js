/**
 * About Page Helper Functions
 * Utility functions for navigation and section management
 */

import { sidebarItems } from './aboutConfig';

/**
 * Get the category that contains the current section
 * @param {string} activeSection - Current active section ID
 * @returns {Object} Category object containing the section
 */
export const getCurrentCategory = (activeSection) => {
  for (const category of sidebarItems) {
    if (category.items.find(item => item.id === activeSection)) {
      return category;
    }
  }
  return sidebarItems[0];
};

/**
 * Get the current section item metadata
 * @param {string} activeSection - Current active section ID
 * @returns {Object} Section item object
 */
export const getCurrentItem = (activeSection) => {
  return sidebarItems.flatMap(cat => cat.items).find(item => item.id === activeSection);
};

/**
 * Get previous and next navigation links
 * @param {string} activeSection - Current active section ID
 * @returns {Object} Object with prev and next section items
 */
export const getNavigation = (activeSection) => {
  const allItems = sidebarItems.flatMap(cat => cat.items);
  const currentIndex = allItems.findIndex(item => item.id === activeSection);
  return {
    prev: currentIndex > 0 ? allItems[currentIndex - 1] : null,
    next: currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null
  };
};

/**
 * Filter sidebar items based on search query
 * @param {string} query - Search query string
 * @returns {Array} Filtered array of matching items
 */
export const searchSections = (query) => {
  if (!query || query.trim() === '') return [];

  const lowerQuery = query.toLowerCase();
  const results = [];

  sidebarItems.forEach(category => {
    category.items.forEach(item => {
      if (
        item.label.toLowerCase().includes(lowerQuery) ||
        item.id.includes(lowerQuery) ||
        category.category.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          ...item,
          category: category.category
        });
      }
    });
  });

  return results;
};
