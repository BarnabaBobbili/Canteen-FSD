import React from 'react';
import { ChefHat } from 'lucide-react';

/**
 * Shared footer component for user-facing pages
 */
const Footer = () => {
  return (
    <footer className="relative border-t-4 border-gray-900 text-gray-400 py-8" style={{ fontFamily: '"Comic Sans MS", "Marker Felt", cursive' }}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="bg-white border-2 border-white p-1.5">
            <ChefHat className="w-6 h-6 text-gray-900" />
          </div>
          <span className="text-white font-black">Smart Canteen Management</span>
        </div>
        <p className="text-sm font-medium">
          Built with React & Node.js - Modern Canteen Management System
        </p>
      </div>
    </footer>
  );
};

export default Footer;
