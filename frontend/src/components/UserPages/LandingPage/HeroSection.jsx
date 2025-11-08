import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react';

/**
 * Hero section component for landing page
 */
const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative pt-24 sm:pt-32 pb-20 overflow-hidden">
      {/* Sketch Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 border-4 border-dashed border-gray-400 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 border-4 border-dashed border-gray-400 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 border-4 border-dashed border-gray-400 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 border-3 border-dashed border-gray-800 bg-yellow-100 px-4 py-2 mb-6 transform -rotate-1">
              <Sparkles className="w-4 h-4 text-gray-800" />
              <span className="text-gray-800 font-bold text-sm">Fresh & Delicious</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-6 leading-tight transform -rotate-1" style={{
              textShadow: '3px 3px 0px rgba(0,0,0,0.1)',
              letterSpacing: '-0.02em'
            }}>
              Your Favorite
              <span className="block underline decoration-wavy decoration-4 underline-offset-8">
                Meals Delivered
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0 font-medium">
              Order fresh, delicious meals from our canteen. Quick, easy, and always hot!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate('/order')}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white border-4 border-gray-900 hover:bg-gray-800 transition-all transform hover:scale-105 hover:-rotate-1 font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
              >
                Order Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-8 py-4 border-4 border-gray-900 text-gray-900 bg-white hover:bg-gray-100 transition-all transform hover:rotate-1 font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
              >
                Create Account
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center lg:text-left p-3 border-2 border-dashed border-gray-400 transform rotate-1">
                <div className="text-3xl sm:text-4xl font-black text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Menu Items</div>
              </div>
              <div className="text-center lg:text-left p-3 border-2 border-dashed border-gray-400 transform -rotate-1">
                <div className="text-3xl sm:text-4xl font-black text-gray-900">1000+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center lg:text-left p-3 border-2 border-dashed border-gray-400 transform rotate-1">
                <div className="text-3xl sm:text-4xl font-black text-gray-900 flex items-center gap-1 justify-center lg:justify-start">
                  4.9
                  <TrendingUp className="w-5 h-5 text-gray-900" />
                </div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </div>

          {/* Hero Image/Animation */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Floating Food Cards - Sketch Style */}
              <div className="absolute -top-4 -right-4 bg-white border-4 border-gray-900 p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-float transform rotate-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-200 border-2 border-gray-800"></div>
                  <div>
                    <div className="font-bold text-gray-900">Pizza Slice</div>
                    <div className="text-sm text-gray-600">₹80</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white border-4 border-gray-900 p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-float transform -rotate-2" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-200 border-2 border-gray-800"></div>
                  <div>
                    <div className="font-bold text-gray-900">Fresh Juice</div>
                    <div className="text-sm text-gray-600">₹40</div>
                  </div>
                </div>
              </div>

              {/* Main Illustration - Sketch Style */}
              <div className="bg-gray-100 border-4 border-gray-900 p-8 transform rotate-3 hover:rotate-0 transition-all duration-500 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="bg-white border-2 border-dashed border-gray-700 p-8 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-gray-200 border-2 border-gray-400"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
