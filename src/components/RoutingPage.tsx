import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { TravelPlace } from '../types/TravelPlace';

interface RoutingPageProps {
  personality?: string;
  duration?: string;
}

const RoutingPage: React.FC = () => {
  const location = useLocation();
  const { personality, duration } = (location.state as RoutingPageProps) || {};
  const [optimizedRoute, setOptimizedRoute] = useState<TravelPlace[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('likedPlaces');
    if (saved) {
      const places = JSON.parse(saved);
      
      // Simple routing algorithm based on personality and duration
      const route = optimizeRoute(places, personality, duration);
      setOptimizedRoute(route);
    }
  }, [personality, duration]);

  const optimizeRoute = (places: TravelPlace[], personality?: string, duration?: string): TravelPlace[] => {
    if (places.length === 0) return [];

    let filteredPlaces = [...places];
    
    // Filter based on duration
    if (duration === '1 วัน ไม่ค้างคืน') {
      // Limit to 3-4 places for a day trip
      filteredPlaces = places.slice(0, 4);
    } else if (duration === '2 วัน 1 คืน') {
      // Allow up to 6 places for 2 days
      filteredPlaces = places.slice(0, 6);
    }

    // Sort based on personality
    if (personality === 'introvert mode') {
      // Prioritize less crowded places (temples, nature)
      filteredPlaces.sort((a, b) => {
        const introvertKeywords = ['temple', 'nature', 'park', 'sanctuary'];
        const aScore = introvertKeywords.some(keyword => 
          a.name.toLowerCase().includes(keyword) || 
          (a.description?.toLowerCase().includes(keyword) ?? false)
        ) ? 1 : 0;
        const bScore = introvertKeywords.some(keyword => 
          b.name.toLowerCase().includes(keyword) || 
          (b.description?.toLowerCase().includes(keyword) ?? false)
        ) ? 1 : 0;
        return bScore - aScore;
      });
    } else {
      // Default: sort by rating
      filteredPlaces.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    return filteredPlaces;
  };

  const calculateDistance = (place1: TravelPlace, place2: TravelPlace): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (place2.lat - place1.lat) * Math.PI / 180;
    const dLon = (place2.long - place1.long) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(place1.lat * Math.PI / 180) * Math.cos(place2.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const GraphVisualization = () => {
    const svgSize = 400;
    const centerX = svgSize / 2;
    const centerY = svgSize / 2;
    const radius = 150;

    const nodePositions = optimizedRoute.map((_, index) => {
      const angle = (index / optimizedRoute.length) * 2 * Math.PI - Math.PI / 2;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    });

    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-purple-800 mb-4">Route Visualization</h3>
        <svg width={svgSize} height={svgSize} className="mx-auto">
          {/* Draw connections */}
          {optimizedRoute.map((_, index) => {
            if (index === optimizedRoute.length - 1) return null;
            const start = nodePositions[index];
            const end = nodePositions[index + 1];
            return (
              <line
                key={`line-${index}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="#8B5CF6"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            );
          })}
          
          {/* Draw nodes */}
          {optimizedRoute.map((place, index) => {
            const pos = nodePositions[index];
            return (
              <g key={place.id}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="20"
                  fill="#8B5CF6"
                  stroke="white"
                  strokeWidth="3"
                />
                <text
                  x={pos.x}
                  y={pos.y + 5}
                  textAnchor="middle"
                  className="fill-white text-sm font-bold"
                >
                  {index + 1}
                </text>
                <text
                  x={pos.x}
                  y={pos.y - 30}
                  textAnchor="middle"
                  className="fill-purple-800 text-xs font-medium"
                  style={{ maxWidth: '80px' }}
                >
                  {place.name.length > 12 ? place.name.substring(0, 12) + '...' : place.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <Link 
          to="/gallery"
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back to Gallery</span>
        </Link>
        
        <div className="text-center">
          <h1 className="text-xl font-bold text-purple-800">Your Travel Route</h1>
          <p className="text-sm text-purple-500">{optimizedRoute.length} destinations</p>
        </div>
        
        <div className="w-20"></div> {/* Spacer for alignment */}
      </div>

      <div className="p-6">
        {/* Travel Settings Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-purple-800 mb-4">Trip Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Personality</p>
                <p className="font-semibold text-purple-800">{personality || 'Default'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-semibold text-purple-800">{duration || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Route List */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-purple-800 mb-6">Optimized Route Order</h3>
            <div className="space-y-4">
              {optimizedRoute.map((place, index) => (
                <div key={place.id} className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-purple-800">{place.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{place.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-purple-600">
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        {place.lat.toFixed(4)}, {place.long.toFixed(4)}
                      </span>
                      
                      {place.rating && (
                        <span className="flex items-center">
                          ⭐ {place.rating}
                        </span>
                      )}
                    </div>
                    
                    {index < optimizedRoute.length - 1 && (
                      <div className="mt-2 text-xs text-gray-500">
                        Distance to next: {calculateDistance(place, optimizedRoute[index + 1]).toFixed(2)} km
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Graph Visualization */}
          <GraphVisualization />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button 
            onClick={() => {
              const url = optimizedRoute.map(place => `${place.lat},${place.long}`).join('/');
              window.open(`https://www.google.com/maps/dir/${url}`, '_blank');
            }}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
          >
            Open in Google Maps
          </button>
          
          <Link 
            to="/gallery"
            className="bg-gray-200 text-gray-700 py-3 px-8 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200"
          >
            Modify Selection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoutingPage;
