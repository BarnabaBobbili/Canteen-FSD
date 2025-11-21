import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart, UtensilsCrossed, Package, TrendingUp,
  Clock, Users, UtensilsCrossed, BarChart3, ArrowRight, CheckCircle
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'Order Management',
      description: 'Track and manage customer orders efficiently with real-time status updates',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <UtensilsCrossed className="w-8 h-8" />,
      title: 'Menu Management',
      description: 'Organize your menu items with categories, pricing, and allergen information',
      color: 'from-sky-500 to-sky-600'
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: 'Inventory Control',
      description: 'Monitor stock levels, suppliers, and expiry dates to reduce waste',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Analytics Dashboard',
      description: 'Visualize sales trends, popular items, and revenue with interactive charts',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const benefits = [
    'Real-time order tracking and status management',
    'Comprehensive inventory management system',
    'Beautiful data visualization and analytics',
    'Easy-to-use interface for staff',
    'Multi-category menu organization',
    'Supplier and batch tracking'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-sky-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-56 h-56 sm:w-96 sm:h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        {/* Navigation */}
        <nav className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-gradient-to-br from-sky-400 to-blue-500 p-1.5 sm:p-2 rounded-lg sm:rounded-xl">
              <UtensilsCrossed className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 truncate">Smart Canteen</h1>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => navigate('/signup')}
              className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-white text-sky-600 border-2 border-sky-500 rounded-lg hover:bg-sky-50 transition-all transform hover:scale-105 shadow-lg font-medium text-xs sm:text-sm md:text-base"
            >
              <span className="hidden sm:inline">Sign Up</span>
              <span className="sm:hidden">Join</span>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all transform hover:scale-105 shadow-lg text-xs sm:text-sm md:text-base"
            >
              Login
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 md:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block bg-sky-100 text-sky-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 md:mb-6">
                Modern Canteen Solution
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
                Manage Your Canteen
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-500">
                  Effortlessly
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-5 sm:mb-6 md:mb-8 leading-relaxed">
                A comprehensive management system designed to streamline your canteen operations,
                from orders to inventory, with powerful analytics at your fingertips.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => navigate('/signup')}
                  className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 font-semibold text-base sm:text-lg"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-sky-500 text-sky-600 rounded-xl hover:bg-sky-50 transition-all font-semibold text-base sm:text-lg"
                >
                  Login
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-12">
                <div className="text-center bg-white/50 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">3</div>
                  <div className="text-xs sm:text-sm text-gray-600">Modules</div>
                </div>
                <div className="text-center bg-white/50 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">24/7</div>
                  <div className="text-xs sm:text-sm text-gray-600">Available</div>
                </div>
                <div className="text-center bg-white/50 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">100%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Efficient</div>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative order-1 lg:order-2 max-w-md mx-auto lg:max-w-none w-full">
              <div className="bg-gradient-to-br from-sky-400 to-blue-400 rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 transform -rotate-2">
                  <div className="space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-4">
                    <div className="flex items-center justify-between p-2 sm:p-2.5 md:p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-md sm:rounded-lg md:rounded-xl">
                      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base truncate">Orders</div>
                          <div className="text-[10px] sm:text-xs text-gray-600">24 active</div>
                        </div>
                      </div>
                      <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
                    </div>
                    <div className="flex items-center justify-between p-2 sm:p-2.5 md:p-3 lg:p-4 bg-gradient-to-r from-sky-50 to-sky-100 rounded-md sm:rounded-lg md:rounded-xl">
                      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                        <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-sky-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base truncate">Menu Items</div>
                          <div className="text-[10px] sm:text-xs text-gray-600">45 items</div>
                        </div>
                      </div>
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-sky-600 flex-shrink-0" />
                    </div>
                    <div className="flex items-center justify-between p-2 sm:p-2.5 md:p-3 lg:p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-md sm:rounded-lg md:rounded-xl">
                      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                        <Package className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base truncate">Inventory</div>
                          <div className="text-[10px] sm:text-xs text-gray-600">Stock managed</div>
                        </div>
                      </div>
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="hidden md:block absolute -top-3 md:-top-4 lg:-top-6 -left-3 md:-left-4 lg:-left-6 bg-white p-2 md:p-3 lg:p-4 rounded-xl md:rounded-2xl shadow-xl animate-bounce">
                <Users className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-sky-500" />
              </div>
              <div className="hidden md:block absolute -bottom-3 md:-bottom-4 lg:-bottom-6 -right-3 md:-right-4 lg:-right-6 bg-white p-2 md:p-3 lg:p-4 rounded-xl md:rounded-2xl shadow-xl animate-pulse">
                <UtensilsCrossed className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Everything You Need to Run Your Canteen
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Powerful features designed to simplify operations and boost efficiency
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer"
            >
              <div className={`inline-block p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br ${feature.color} text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-sky-400 to-blue-500 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-2">
                Why Choose Smart Canteen?
              </h2>
              <p className="text-sky-50 text-base sm:text-lg mb-6 sm:mb-8 px-2">
                Built with modern technology and designed for efficiency, our system helps you manage every aspect of your canteen operations seamlessly.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3 px-2">
                    <div className="bg-white/20 p-1 rounded-full mt-0.5 sm:mt-1 flex-shrink-0">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-white text-sm sm:text-base md:text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20 mt-6 lg:mt-0">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">3 in 1</div>
                <div className="text-xl sm:text-2xl text-sky-50 mb-6 sm:mb-8">Integrated System</div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 text-white">
                  <div className="bg-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur">
                    <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-1 sm:mb-2" />
                    <div className="font-semibold text-xs sm:text-sm md:text-base">Orders</div>
                  </div>
                  <div className="bg-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur">
                    <UtensilsCrossed className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-1 sm:mb-2" />
                    <div className="font-semibold text-xs sm:text-sm md:text-base">Menu</div>
                  </div>
                  <div className="bg-white/20 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur">
                    <Package className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-1 sm:mb-2" />
                    <div className="font-semibold text-xs sm:text-sm md:text-base">Inventory</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-12 sm:py-16 md:py-20">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center shadow-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Transform your canteen operations today with our comprehensive management system
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/signup')}
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 font-semibold text-base sm:text-lg"
            >
              Sign Up Now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-white text-gray-900 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 font-semibold text-base sm:text-lg"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6 text-sky-500" />
            <span className="text-white font-semibold text-sm sm:text-base">Smart Canteen Management</span>
          </div>
          <p className="text-xs sm:text-sm px-4">
            Built with React & Node.js - Modern Canteen Management System
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
