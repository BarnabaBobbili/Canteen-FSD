import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Category section component showing food categories with images
 */
const CategorySection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: 'Biryani',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80'
    },
    {
      name: 'Parotta',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80'
    },
    {
      name: 'South Indian',
      image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80'
    },
    {
      name: 'Burger',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80'
    },
    {
      name: 'Cake',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80'
    },
    {
      name: 'Shawarma',
      image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80'
    },
    {
      name: 'Pizza',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80'
    },
    {
      name: 'Noodles',
      image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&q=80'
    },
    {
      name: 'North Indian',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80'
    },
    {
      name: 'Rolls',
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80'
    },
    {
      name: 'Paratha',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80'
    },
    {
      name: 'Pastry',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80'
    },
    {
      name: 'Shake',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80'
    },
    {
      name: 'Chinese',
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80'
    }
  ];

  return (
    <div id="menu" className="py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 underline decoration-wavy decoration-2 underline-offset-8">
            Explore Our Menu
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            From traditional favorites to modern delights, discover a world of flavors
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 md:gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => navigate('/order')}
              className="group cursor-pointer flex flex-col items-center transform transition-all hover:scale-105"
            >
              <div className="relative w-full aspect-square rounded-full overflow-hidden border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transition-all mb-3 transform group-hover:-rotate-3">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 grayscale-[30%]"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400?text=' + category.name;
                  }}
                />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 text-center group-hover:underline transition-all">
                {category.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/order')}
            className="px-8 py-4 bg-gray-900 border-4 border-gray-900 text-white font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] transform hover:scale-105 hover:-rotate-1 transition-all"
          >
            View Full Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
