import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">BintaxDigital</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#products" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Products
            </a>
            <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Contact
            </a>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;