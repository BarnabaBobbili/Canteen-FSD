import React from 'react';
import { Search, X } from 'lucide-react';
import { searchSections } from '../aboutHelpers';

/**
 * AboutSearchModal Component
 * Search overlay for finding documentation sections
 */
const AboutSearchModal = ({
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
  darkMode,
  setActiveSection
}) => {
  if (!searchOpen) return null;

  const searchResults = searchSections(searchQuery);

  return (
    <div
      className="fixed inset-0 z-[1001] flex items-start justify-center pt-20"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="w-full max-w-xl mx-4 rounded-lg shadow-2xl"
        style={{ backgroundColor: darkMode ? '#242526' : '#ffffff' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b" style={{ borderColor: darkMode ? '#3e3e3e' : '#e3e3e3' }}>
          <div className="flex items-center gap-3">
            <Search size={20} style={{ color: darkMode ? '#b4b4b4' : '#606770' }} />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-lg"
              style={{ color: darkMode ? '#e3e3e3' : '#1c1e21' }}
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="p-1 rounded hover:bg-gray-100"
              style={{ color: darkMode ? '#b4b4b4' : '#606770' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto p-2">
          {searchQuery.trim() === '' ? (
            <p className="p-4 text-center" style={{ color: darkMode ? '#b4b4b4' : '#606770' }}>
              Start typing to search...
            </p>
          ) : searchResults.length === 0 ? (
            <p className="p-4 text-center" style={{ color: darkMode ? '#b4b4b4' : '#606770' }}>
              No results found for "{searchQuery}"
            </p>
          ) : (
            searchResults.map(item => (
              <button
                key={item.id}
                className="w-full text-left p-3 rounded-md transition-colors"
                style={{
                  color: darkMode ? '#e3e3e3' : '#1c1e21',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                onClick={() => {
                  setActiveSection(item.id);
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
              >
                <div className="font-medium">{item.label}</div>
                <div className="text-sm" style={{ color: darkMode ? '#b4b4b4' : '#606770' }}>
                  {item.category}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutSearchModal;
