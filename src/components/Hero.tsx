import React from 'react';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-blue-500 opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-purple-500 opacity-10 animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-indigo-500 opacity-15 animate-pulse delay-500"></div>
        <svg
          className="absolute left-0 right-0 bottom-0 h-32 w-full text-white"
          preserveAspectRatio="none"
          viewBox="0 0 1440 48"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 48h1440V0C722 0 0 48 0 48z" />
        </svg>
      </div>
      <div className="relative pt-16 pb-32 sm:pt-24 sm:pb-40 lg:pt-32 lg:pb-48">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center bg-indigo-800 bg-opacity-30 backdrop-blur-sm px-4 py-2 rounded-full text-indigo-200 mb-6 border border-indigo-700">
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Discover Premium Digital Products</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">BintaxDigital</span> Products
            </h1>
            
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
              Premium digital resources crafted for creative professionals. Get lifetime access to our exclusive collection of AI-powered tools, templates, and premium content.
            </p>
            
            <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-4">
              <a
                href="#products"
                className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all duration-300 flex items-center"
              >
                View Products <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#features"
                className="rounded-lg bg-white bg-opacity-10 backdrop-blur-sm px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-opacity-20 hover:-translate-y-1 transition-all duration-300 flex items-center border border-white/20"
              >
                Learn More <ChevronDown className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;