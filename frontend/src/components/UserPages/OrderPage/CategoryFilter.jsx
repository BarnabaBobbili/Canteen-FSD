import React from 'react';
import { Sparkles, ChefHat, TrendingUp, Star, Clock, Heart } from 'lucide-react';

/**
 * Category filter component for menu items
 * @param {Object} props
 * @param {string} props.selectedCategory - Currently selected category
 * @param {Function} props.onCategoryChange - Handler for category change
 */
const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All Items', icon: Sparkles },
    { id: 'breakfast', name: 'Breakfast', icon: ChefHat },
    { id: 'meals', name: 'Meals', icon: TrendingUp },
    { id: 'snacks', name: 'Snacks', icon: Star },
    { id: 'beverages', name: 'Beverages', icon: Clock },
    { id: 'desserts', name: 'Desserts', icon: Heart }
  ];

  return (
    <div className="mb-6 overflow-x-auto">
      <div className="flex gap-3 pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-2 px-4 py-2.5 border-3 font-black whitespace-nowrap transition-all transform ${
              selectedCategory === category.id
                ? 'bg-gray-900 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] scale-105 -rotate-1'
                : 'bg-white border-gray-900 text-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] hover:-rotate-1'
            }`}
          >
            <category.icon className="w-4 h-4" />
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
