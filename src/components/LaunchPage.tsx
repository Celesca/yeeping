import React from 'react';
import { Link } from 'react-router-dom';
import CoinCounter from './CoinCounter';

const LaunchPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white flex flex-col items-center justify-center p-6">
      {/* Coin Counter - Top Right */}
      <div className="fixed top-6 right-6 z-10">
        <CoinCounter />
      </div>

      <div className="text-center space-y-8 max-w-md">
        {/* Logo/Icon */}
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-4xl font-bold text-purple-800 mb-2">
            YEEPING
          </h1>
          <p className="text-purple-600 text-lg">
            Discover amazing places you'll love
          </p>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Swipe through beautiful travel destinations, save your favorites to your personal gallery, and plan your next adventure!
          </p>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-purple-600">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-500">✕</span>
              </div>
              <span>Skip</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-500">♥</span>
              </div>
              <span>Love it</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <Link 
            to="/tinder"
            className="block w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
          >
            Start Exploring
          </Link>
          
          <Link 
            to="/gallery"
            className="block w-full bg-white text-purple-600 py-4 px-8 rounded-xl font-semibold text-lg border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 transform hover:scale-105 transition-all duration-200"
          >
            View My Gallery
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-purple-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-700">50+</div>
            <div className="text-sm text-purple-500">Destinations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-700">0</div>
            <div className="text-sm text-purple-500">Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-700">∞</div>
            <div className="text-sm text-purple-500">Adventures</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchPage;
