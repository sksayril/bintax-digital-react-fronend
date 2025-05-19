import React from 'react';
import { Zap, Lock, Clock, Star } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-8 w-8 text-amber-500" />,
    title: 'Instant Access',
    description: 'Get immediate access to your purchased digital products through secure Google Drive links.'
  },
  {
    icon: <Lock className="h-8 w-8 text-amber-500" />,
    title: 'Secure Transactions',
    description: 'All payments are processed securely through Razorpay, ensuring your financial information is protected.'
  },
  {
    icon: <Clock className="h-8 w-8 text-amber-500" />,
    title: 'Lifetime Updates',
    description: 'Enjoy free updates and improvements to your purchased products for the lifetime of the product.'
  },
  {
    icon: <Star className="h-8 w-8 text-amber-500" />,
    title: 'Premium Quality',
    description: 'All products are created to the highest standards, ensuring you get the best value for your investment.'
  }
];

const Features: React.FC = () => {
  return (
    <div id="features" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Products?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide high-quality digital products with benefits that set us apart from the competition.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-indigo-50 rounded-full">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;