import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TinderCard from '../components/TinderCard';
import { mockTravelPlaces } from '../data/travelPlaces';
import type { TravelPlace } from '../types/TravelPlace';

const TinderPage: React.FC = () => {
  const [places] = useState(mockTravelPlaces);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedPlaces, setLikedPlaces] = useState<TravelPlace[]>([]);

  // Load liked places from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('likedPlaces');
    if (saved) {
      setLikedPlaces(JSON.parse(saved));
    }
  }, []);

  // Save liked places to localStorage whenever likedPlaces changes
  useEffect(() => {
    localStorage.setItem('likedPlaces', JSON.stringify(likedPlaces));
  }, [likedPlaces]);

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    const currentPlace = places[currentIndex];
    
    if (direction === 'right' && currentPlace) {
      setLikedPlaces(prev => [...prev, currentPlace]);
    }
    
    setCurrentIndex(prev => prev + 1);
  }, [places, currentIndex]);

  const handleButtonAction = (direction: 'left' | 'right') => {
    handleSwipe(direction);
  };

  const remainingPlaces = places.slice(currentIndex, currentIndex + 2);
  const isFinished = currentIndex >= places.length;

  if (isFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-3xl">🎉</span>
          </div>
          
          <h2 className="text-3xl font-bold text-purple-800">
            That's all for now!
          </h2>
          
          <p className="text-purple-600">
            You've explored all available destinations. Check out your gallery to see what you loved!
          </p>
          
          <div className="bg-white p-4 rounded-xl border border-purple-100">
            <div className="text-2xl font-bold text-purple-700">{likedPlaces.length}</div>
            <div className="text-sm text-purple-500">Places saved to gallery</div>
          </div>
          
          <div className="space-y-3">
            <Link
              to="/gallery"
              className="block w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
            >
              View My Gallery
            </Link>
            
            <Link
              to="/"
              className="block w-full bg-white text-purple-600 py-3 px-6 rounded-xl font-semibold border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6">
        <Link 
          to="/"
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium text-sm sm:text-base">Back</span>
        </Link>
        
        <div className="text-center">
          <div className="text-lg sm:text-xl font-bold text-purple-800">YEEPING</div>
        </div>
        
        <Link 
          to="/gallery"
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
        >
          <span className="font-medium text-sm sm:text-base">Gallery</span>
          <div className="bg-purple-100 text-purple-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {likedPlaces.length}
          </div>
        </Link>
      </div>

      {/* Progress bar */}
      <div className="px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="w-full bg-purple-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / places.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Cards container */}
      <div className="flex justify-center items-start pt-8 sm:pt-12 min-h-[60vh] px-4 pb-32">
        <div className="relative flex justify-center items-center">
          {remainingPlaces.map((place, index) => (
            <TinderCard
              key={place.id}
              place={place}
              onSwipe={handleSwipe}
              isTop={index === 0}
            />
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-purple-100 p-4 sm:p-6">
        <div className="flex justify-center space-x-6 sm:space-x-8 max-w-sm mx-auto">
          <button
            onClick={() => handleButtonAction('left')}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full shadow-lg border-2 border-red-200 flex items-center justify-center hover:border-red-300 hover:bg-red-50 transition-all duration-200 transform hover:scale-110 active:scale-95"
          >
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <button
            onClick={() => handleButtonAction('right')}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full shadow-lg border-2 border-green-200 flex items-center justify-center hover:border-green-300 hover:bg-green-50 transition-all duration-200 transform hover:scale-110 active:scale-95"
          >
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>
        
        <div className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-purple-500">
          Swipe or tap to choose • ❤️ to save • ✕ to pass
        </div>
      </div>
    </div>
  );
};

export default TinderPage;
