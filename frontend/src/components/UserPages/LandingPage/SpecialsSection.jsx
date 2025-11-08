import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, TrendingUp, ChefHat, Plus, ArrowRight } from 'lucide-react';
import API_BASE_URL from '../../../config/api';

/**
 * Today's Specials / Offers Section
 * Displays featured and popular menu items
 */
const SpecialsSection = () => {
  const navigate = useNavigate();
  const [specialItems, setSpecialItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSpecials();
  }, []);

  const loadSpecials = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/menu`);
      const data = await response.json();

      // Filter available items and get first 6 for "specials"
      // In production, backend should have a "featured" or "special" flag
      const availableItems = data.filter(item => item.available);
      const specials = availableItems.slice(0, 6);

      setSpecialItems(specials);
    } catch (error) {
      console.error('Failed to load specials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div id="specials" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7A00] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading today's specials...</p>
        </div>
      </div>
    );
  }

  if (!specialItems || specialItems.length === 0) {
    return null;
  }

  return (
    <div id="specials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 border-3 border-gray-800 bg-yellow-100 px-4 py-2 mb-4 transform rotate-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)]">
            <Sparkles className="w-5 h-5 text-gray-800" />
            <span className="text-gray-800 font-bold">Limited Time</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 underline decoration-wavy decoration-2 underline-offset-8">
            Today's Specials
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Fresh, delicious, and handpicked just for you!
          </p>
        </div>

        {/* Specials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {specialItems.map((item, index) => (
            <div
              key={item._id}
              className="group bg-white border-4 border-gray-900 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all transform hover:-translate-y-1 hover:rotate-1 cursor-pointer"
              onClick={() => navigate('/order')}
            >
              {/* Badge */}
              {index === 0 && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-1 bg-yellow-200 border-2 border-gray-800 text-gray-900 px-3 py-1 text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] transform -rotate-3">
                    <TrendingUp className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className={`absolute inset-0 bg-[#FF7A00] bg-opacity-20 flex items-center justify-center ${
                    item.image ? 'hidden' : ''
                  }`}
                >
                  <ChefHat className="w-16 h-16 text-[#FF7A00]" />
                </div>

                {/* Veg/Non-Veg Indicator */}
                <div className="absolute top-3 right-3">
                  <div className={`w-6 h-6 border-2 flex items-center justify-center bg-white ${
                    item.isVeg ? 'border-green-600' : 'border-red-600'
                  }`}>
                    <div className={`w-3 h-3 rounded-full ${
                      item.isVeg ? 'bg-green-600' : 'bg-red-600'
                    }`}></div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 bg-gray-50">
                <h3 className="text-xl font-black text-gray-900 mb-2">{item.itemName}</h3>
                {item.description && (
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{item.description}</p>
                )}

                {/* Category Tag */}
                <span className="inline-block text-xs font-bold text-gray-900 border-2 border-gray-900 bg-white px-2 py-1 mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                  {item.category}
                </span>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-dashed border-gray-300">
                  <div>
                    <div className="text-2xl font-black text-gray-900">₹{item.price}</div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-2 border-gray-900 text-white hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] transition-all font-bold transform hover:-rotate-2">
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/order')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 border-4 border-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all transform hover:scale-105 hover:-rotate-1 font-black text-lg"
          >
            View Full Menu
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialsSection;
