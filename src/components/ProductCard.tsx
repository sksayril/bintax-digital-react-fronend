import React from 'react';
import { Product } from '../types';
import { ShoppingBag, Loader2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onPurchase: (product: Product) => void;
  isLoading?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPurchase, isLoading = false }) => {
  // Format price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Calculate discount percentage
  const discountPercentage = Math.round(
    ((product.originalPrice - product.purchasePrice) / product.originalPrice) * 100
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100/50 backdrop-blur-sm">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 mix-blend-overlay"></div>
        <img
          src={product.imageUrl !== "https://example.com/laptop.jpg" 
            ? product.imageUrl 
            : "https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
          alt={product.name}
          className="h-56 w-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-3 py-1.5 rounded-bl-2xl font-semibold text-sm flex items-center">
          <span className="mr-1">-{discountPercentage}%</span>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* BintaxDigital watermark */}
        <div className="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-white font-medium flex items-center">
          <span className="text-blue-300">Bintax</span>
          <span className="text-white">Digital</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="mb-5 bg-indigo-50 px-4 py-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-gray-500 line-through text-sm">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-2xl font-bold text-indigo-600">
                {formatPrice(product.purchasePrice)}
              </span>
            </div>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded">
              Save {formatPrice(product.originalPrice - product.purchasePrice)}
            </span>
          </div>
        </div>
        
        <button
          onClick={() => onPurchase(product)}
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-5 py-3 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-indigo-500/30'
          }`}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <ShoppingBag className="mr-2 h-5 w-5" />
          )}
          <span className="font-semibold">{isLoading ? 'Processing...' : 'Buy Now'}</span>
        </button>
        
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <div className="flex items-center">
            <span className="inline-block bg-green-100 text-green-800 rounded-full px-2.5 py-0.5 text-xs font-medium">
              Lifetime Access
            </span>
          </div>
          <span className="flex items-center text-xs">Instant Delivery</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;