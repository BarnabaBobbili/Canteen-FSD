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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
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
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <div className="inline-block bg-sky-100 text-sky-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                Modern Canteen Solution
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Manage Your Canteen
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-500">
                  Effortlessly
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
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
              <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-8 sm:mt-12">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">3</div>
                  <div className="text-xs sm:text-sm text-gray-600">Modules</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">24/7</div>
                  <div className="text-xs sm:text-sm text-gray-600">Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">100%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Efficient</div>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative mt-8 lg:mt-0">
              <div className="bg-gradient-to-br from-sky-400 to-blue-400 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 transform -rotate-3">
                  <div className="space-y-2 sm:space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between p-2 sm:p-3 md:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg sm:rounded-xl">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
                        <div>
                          <div className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base">Orders</div>
                          <div className="text-xs text-gray-600">24 active</div>
                        </div>
                      </div>
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <div className="flex items-center justify-between p-2 sm:p-3 md:p-4 bg-gradient-to-r from-sky-50 to-sky-100 rounded-lg sm:rounded-xl">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-sky-600" />
                        <div>
                          <div className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base">Menu Items</div>
                          <div className="text-xs text-gray-600">45 items</div>
                        </div>
                      </div>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600" />
                    </div>
                    <div className="flex items-center justify-between p-2 sm:p-3 md:p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg sm:rounded-xl">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Package className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />
                        <div>
                          <div className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base">Inventory</div>
                          <div className="text-xs text-gray-600">Stock managed</div>
                        </div>
                      </div>
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="hidden sm:block absolute -top-4 sm:-top-6 -left-4 sm:-left-6 bg-white p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-xl animate-bounce">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-sky-500" />
              </div>
              <div className="hidden sm:block absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-white p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl shadow-xl animate-pulse">
                <UtensilsCrossed className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Run Your Canteen
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to simplify operations and boost efficiency
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer"
            >
              <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-sky-400 to-blue-500 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Why Choose Smart Canteen?
              </h2>
              <p className="text-sky-50 text-lg mb-8">
                Built with modern technology and designed for efficiency, our system helps you manage every aspect of your canteen operations seamlessly.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-white/20 p-1 rounded-full mt-1">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <div className="text-6xl font-bold text-white mb-2">3 in 1</div>
                <div className="text-2xl text-sky-50 mb-8">Integrated System</div>
                <div className="grid grid-cols-3 gap-4 text-white">
                  <div className="bg-white/20 rounded-xl p-4 backdrop-blur">
                    <ShoppingCart className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-semibold">Orders</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 backdrop-blur">
                    <UtensilsCrossed className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-semibold">Menu</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 backdrop-blur">
                    <Package className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-semibold">Inventory</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
            Transform your canteen operations today with our comprehensive management system
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="group inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 font-semibold text-lg"
            >
              Sign Up Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-gray-900 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105 font-semibold text-lg"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <UtensilsCrossed className="w-6 h-6 text-sky-500" />
            <span className="text-white font-semibold">Smart Canteen Management</span>
          </div>
          <p className="text-sm">
            Built with React & Node.js - Modern Canteen Management System
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
