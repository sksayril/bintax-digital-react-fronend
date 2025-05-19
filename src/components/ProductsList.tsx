import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductsListProps {
  products: Product[];
  onPurchase: (product: Product) => void;
  isLoading: boolean;
  processingProductId?: string | null;
}

const ProductsList: React.FC<ProductsListProps> = ({ 
  products, 
  onPurchase, 
  isLoading,
  processingProductId 
}) => {
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-indigo-600">BintaxDigital</span> Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Loading our premium digital collection...
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse border border-gray-100">
              <div className="h-56 bg-gradient-to-r from-gray-200 to-gray-300 w-full"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-300 rounded-full w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded-full w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded-full w-2/3 mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-8 bg-gray-300 rounded-full w-1/3"></div>
                  <div className="h-10 bg-indigo-200 rounded-lg w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="inline-flex items-center justify-center bg-indigo-100 p-3 rounded-full mb-4">
            <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No BintaxDigital Products Available</h3>
          <p className="text-gray-600">Our team is working on adding new premium digital products to our collection.</p>
          <p className="mt-4 text-indigo-600 font-medium">Please check back soon for updates!</p>
        </div>
      </div>
    );
  }

  return (
    <div id="products" className="container mx-auto px-4 py-20 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -mt-10 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-purple-500/10 to-pink-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-indigo-100 px-4 py-2 rounded-full text-indigo-800 font-medium mb-4">
            <span>Premium Collection</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-indigo-600">BintaxDigital</span> Products
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our collection of high-quality digital products crafted to enhance your creative workflow, boost productivity, and unlock new possibilities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div key={product._id} className="transform transition duration-300 hover:-translate-y-2">
              <ProductCard 
                product={product} 
                onPurchase={onPurchase}
                isLoading={processingProductId === product._id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;