import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { TravelPlace } from '../types/TravelPlace';
import PersonalityModal from './PersonalityModal';
import CoinCounter from './CoinCounter';

const GalleryPage: React.FC = () => {
  const [likedPlaces, setLikedPlaces] = useState<TravelPlace[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, you'd fetch this from localStorage or a backend
    const saved = localStorage.getItem('likedPlaces');
    if (saved) {
      setLikedPlaces(JSON.parse(saved));
    }
  }, []);

  const clearGallery = () => {
    setLikedPlaces([]);
    localStorage.removeItem('likedPlaces');
  };

  const removePlace = (placeId: string) => {
    const updated = likedPlaces.filter(place => place.id !== placeId);
    setLikedPlaces(updated);
    localStorage.setItem('likedPlaces', JSON.stringify(updated));
  };

  const handleTravelPlan = (personality: string, duration: string) => {
    navigate('/routing', { 
      state: { personality, duration } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <Link 
          to="/"
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back</span>
        </Link>
        
        <div className="text-center">
          <h1 className="text-xl font-bold text-purple-800">My Gallery</h1>
          <p className="text-sm text-purple-500">{likedPlaces.length} saved places</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <CoinCounter />
          {likedPlaces.length > 0 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
            >
              Travel
            </button>
          )}
          {likedPlaces.length > 0 && (
            <button
              onClick={clearGallery}
              className="text-red-500 hover:text-red-600 text-sm font-medium"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {likedPlaces.length === 0 ? (
          // Empty state
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-purple-800 mb-4">
              No places saved yet
            </h2>
            
            <p className="text-purple-600 mb-8 max-w-sm mx-auto">
              Start swiping through destinations to build your dream travel collection!
            </p>
            
            <Link
              to="/tinder"
              className="inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
            >
              Start Exploring
            </Link>
          </div>
        ) : (
          // Gallery grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedPlaces.map((place) => (
              <div 
                key={place.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-48 object-cover"
                  />
                  
                  <button
                    onClick={() => removePlace(place.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold text-purple-800 mb-2">
                    {place.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {place.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-purple-600">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span className="font-mono text-xs">
                        {place.lat.toFixed(4)}, {place.long.toFixed(4)}
                      </span>
                    </div>
                    
                    {place.rating && (
                      <div className="flex items-center text-sm">
                        <span className="mr-1">⭐</span>
                        <span className="text-gray-700 font-medium">{place.rating}</span>
                        <span className="text-gray-500 ml-1">/ 5.0</span>
                      </div>
                    )}
                    
                    {place.country && (
                      <div className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                        {place.country}
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => {
                      window.open(`https://www.google.com/maps?q=${place.lat},${place.long}`, '_blank');
                    }}
                    className="w-full mt-4 bg-purple-100 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-200 transition-colors duration-200 font-medium text-sm"
                  >
                    View on Map
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Personality Modal */}
      <PersonalityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleTravelPlan}
      />
    </div>
  );
};

export default GalleryPage;
