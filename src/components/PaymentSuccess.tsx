import React from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface PaymentSuccessProps {
  product: Product;
  onClose: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ product, onClose }) => {
  // Handle opening the Google Drive link
  const handleOpenDriveLink = () => {
    if (product.driveLink) {
      window.open(product.driveLink, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-slide-up">
        <div className="p-6 text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600">
              Thank you for your purchase. You now have lifetime access to {product.name}.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-green-50 border border-green-200 rounded-lg p-6 mb-8 shadow-inner">
            <h3 className="font-bold text-gray-900 text-lg mb-2">Access Your Product</h3>
            <p className="text-gray-600 mb-4">
              Your purchase was successful! Click the button below to access your product on Google Drive.
            </p>
            <button
              onClick={handleOpenDriveLink}
              className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md transition-colors duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
            >
              <ExternalLink className="mr-2 h-5 w-5" /> Access Your Product Now
            </button>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-1">Order Details</h3>
            <p className="text-sm text-gray-600">Product: {product.name}</p>
            <p className="text-sm text-gray-600">
              Amount Paid: {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0,
              }).format(product.purchasePrice)}
            </p>
            <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;