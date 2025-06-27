import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import type { TravelPlace } from '../types/TravelPlace';
import { CoinSystem } from '../utils/coinSystem';
import CoinCounter from './CoinCounter';
import PhotoUpload from './PhotoUpload';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface RoutingPageProps {
  personality?: string;
  duration?: string;
}

const RoutingPage: React.FC = () => {
  const location = useLocation();
  const { personality, duration } = (location.state as RoutingPageProps) || {};
  const [optimizedRoute, setOptimizedRoute] = useState<TravelPlace[]>([]);
  const [currentJourney, setCurrentJourney] = useState<any>(null);
  const [visitedPlaces, setVisitedPlaces] = useState<Set<string>>(new Set());
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('likedPlaces');
    if (saved) {
      const places = JSON.parse(saved);
      
      // Simple routing algorithm based on personality and duration
      const route = optimizeRoute(places, personality, duration);
      setOptimizedRoute(route);

      // Create or load current journey
      const existingJourney = CoinSystem.getCurrentJourney();
      if (existingJourney && existingJourney.personality === personality && existingJourney.duration === duration) {
        setCurrentJourney(existingJourney);
        const visited = new Set(existingJourney.places.filter((p: any) => p.visited).map((p: any) => p.id));
        setVisitedPlaces(visited);
      } else {
        const newJourney = CoinSystem.createNewJourney(personality || 'default', duration || 'custom', route);
        setCurrentJourney(newJourney);
      }
    }
  }, [personality, duration]);

  const handlePlaceVisit = (placeId: string, photos: string[] = []) => {
    if (photos.length > 0) {
      const coinsEarned = CoinSystem.markPlaceAsVisited(placeId, photos);
      if (coinsEarned > 0) {
        setVisitedPlaces(prev => new Set([...prev, placeId]));
        
        // Trigger coin animation
        window.dispatchEvent(new CustomEvent('coinUpdate', { detail: { earned: coinsEarned } }));
        
        // Update current journey state
        const updatedJourney = CoinSystem.getCurrentJourney();
        setCurrentJourney(updatedJourney);
      }
    }
  };

  const handlePhotoUpload = (placeId: string, photos: string[]) => {
    if (photos.length > 0) {
      photos.forEach(photo => {
        CoinSystem.addPhotoToPlace(placeId, photo);
      });
      
      // Mark place as visited when photos are uploaded and earn coins
      handlePlaceVisit(placeId, photos);
    }
  };

  const isPlaceVisited = (placeId: string) => {
    return visitedPlaces.has(placeId);
  };

  const optimizeRoute = (places: TravelPlace[], personality?: string, duration?: string): TravelPlace[] => {
    if (places.length === 0) return [];

    let filteredPlaces = [...places];
    
    // Sort based on personality first, then filter by duration
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

    // Filter based on duration with random selection
    let maxPlaces = filteredPlaces.length; // Default: use all places
    
    if (duration === '1 วัน ไม่ค้างคืน') {
      maxPlaces = 3; // Limit to 3 places for a day trip
    } else if (duration === '2 วัน 1 คืน') {
      maxPlaces = 6; // Allow up to 6 places for 2 days
    }

    // If we have more places than the limit, randomly select from the sorted list
    if (filteredPlaces.length > maxPlaces) {
      // For personality-based sorting, take from the top-ranked places with some randomness
      if (personality === 'introvert mode') {
        // Take the best introvert places with some randomness
        const topCandidates = filteredPlaces.slice(0, Math.min(maxPlaces * 2, filteredPlaces.length));
        filteredPlaces = shuffleArray(topCandidates).slice(0, maxPlaces);
      } else {
        // For default sorting, take top-rated places with some randomness
        const topCandidates = filteredPlaces.slice(0, Math.min(maxPlaces * 2, filteredPlaces.length));
        filteredPlaces = shuffleArray(topCandidates).slice(0, maxPlaces);
      }
    }

    return filteredPlaces;
  };

  // Helper function to shuffle array for random selection
  const shuffleArray = (array: TravelPlace[]): TravelPlace[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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

  // Create custom numbered icons for the route
  const createNumberedIcon = (number: number) => {
    return L.divIcon({
      html: `<div style="
        background-color: #8B5CF6;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 14px;
        border: 3px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      ">${number}</div>`,
      className: 'custom-div-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  };

  const MapVisualization = () => {
    const [mapType, setMapType] = useState<'street' | 'satellite'>('street');
    
    // Center the map on Thailand (Chiang Mai area)
    const thailandCenter: [number, number] = [18.7883, 98.9930];
    
    // Create path coordinates for the polyline
    const pathCoordinates = optimizedRoute.map(place => [place.lat, place.long] as [number, number]);

    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-purple-800">Interactive Route Map - Thailand</h3>
          
          {/* Map Type Toggle */}
          <div className="flex bg-purple-100 rounded-lg p-1">
            <button
              onClick={() => setMapType('street')}
              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                mapType === 'street' 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'text-purple-600 hover:bg-purple-200'
              }`}
            >
              Street
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                mapType === 'satellite' 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'text-purple-600 hover:bg-purple-200'
              }`}
            >
              Satellite
            </button>
          </div>
        </div>
        
        <div className="h-[500px] rounded-xl overflow-hidden border-2 border-purple-100">
          <MapContainer
            center={thailandCenter}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            className="rounded-xl"
          >
            {/* Conditional tile layers based on map type */}
            {mapType === 'street' ? (
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            ) : (
              <TileLayer
                attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            )}
            
            {/* Add markers for each place in the route */}
            {optimizedRoute.map((place, index) => (
              <Marker
                key={place.id}
                position={[place.lat, place.long]}
                icon={createNumberedIcon(index + 1)}
              >
                <Popup className="custom-popup">
                  <div className="text-center min-w-[200px]">
                    <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                      Stop {index + 1}
                    </div>
                    <h4 className="font-bold text-purple-800 mb-2 text-lg">
                      {place.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">{place.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-yellow-50 p-2 rounded">
                        <div className="text-yellow-600">⭐ Rating</div>
                        <div className="font-bold">{place.rating}</div>
                      </div>
                      <div className="bg-blue-50 p-2 rounded">
                        <div className="text-blue-600">📍 Distance</div>
                        <div className="font-bold">{place.distance}</div>
                      </div>
                    </div>
                    {index < optimizedRoute.length - 1 && (
                      <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                        Next: {calculateDistance(place, optimizedRoute[index + 1]).toFixed(2)} km
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
            
            {/* Draw the route path */}
            {pathCoordinates.length > 1 && (
              <Polyline
                positions={pathCoordinates}
                pathOptions={{
                  color: '#8B5CF6',
                  weight: 5,
                  opacity: 0.8,
                  dashArray: '15, 10',
                  lineCap: 'round',
                  lineJoin: 'round'
                }}
              />
            )}
          </MapContainer>
        </div>
        
        {/* Enhanced Map Controls and Legend */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Map Legend */}
          <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
            <h4 className="font-semibold text-purple-800 mb-3">Map Guide</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <span>Route sequence (click for details)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <div className="w-6 h-1 bg-purple-600"></div>
                  <div className="w-2 h-1 bg-transparent"></div>
                  <div className="w-6 h-1 bg-purple-600"></div>
                </div>
                <span>Optimized travel path</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-purple-600">🖱️</span>
                <span>Zoom and pan to explore</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-purple-600">🗺️</span>
                <span>Switch between Street/Satellite view</span>
              </div>
            </div>
          </div>
          
          {/* Map Statistics */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl">
            <h4 className="font-semibold text-indigo-800 mb-3">Route Statistics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-indigo-600">Region:</span>
                <span className="font-bold">Chiang Mai, Thailand</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-600">Total Stops:</span>
                <span className="font-bold">{optimizedRoute.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-600">Avg Rating:</span>
                <span className="font-bold">
                  {optimizedRoute.length > 0 && 
                    (optimizedRoute.reduce((sum, place) => sum + (place.rating || 0), 0) / optimizedRoute.length).toFixed(1)
                  } ⭐
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-indigo-600">Est. Travel Time:</span>
                <span className="font-bold">
                  {duration === '1 วัน ไม่ค้างคืน' ? '8-10 hours' : '2 days'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const regenerateRoute = () => {
    const saved = localStorage.getItem('likedPlaces');
    if (saved) {
      const places = JSON.parse(saved);
      const newRoute = optimizeRoute(places, personality, duration);
      setOptimizedRoute(newRoute);
      
      // Reset visited places for the new route
      setVisitedPlaces(new Set());
      setSelectedPlace(null);
      
      // Create a new journey with the regenerated route
      const newJourney = CoinSystem.createNewJourney(personality || 'default', duration || 'custom', newRoute);
      setCurrentJourney(newJourney);
    }
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
        
        <div className="flex items-center space-x-4">
          <CoinCounter showAnimation={true} />
        </div>
      </div>

      <div className="p-6">
        {/* Travel Settings Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-purple-800 mb-4">Trip Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Selected Places</p>
                <p className="font-semibold text-green-800">
                  {optimizedRoute.length} {duration === '1 วัน ไม่ค้างคืน' ? '/ 3 max' : duration === '2 วัน 1 คืน' ? '/ 6 max' : 'places'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Selection Info */}
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-sm text-blue-800">
                  {duration === '1 วัน ไม่ค้างคืน' 
                    ? `Randomly selected 3 places from your gallery for a perfect day trip`
                    : duration === '2 วัน 1 คืน'
                    ? `Optimally selected up to 6 places for your 2-day adventure`
                    : `All your favorite places included in this itinerary`
                  }
                </span>
              </div>
              
              {/* Regenerate Button - only show for limited duration trips */}
              {(duration === '1 วัน ไม่ค้างคืน' || duration === '2 วัน 1 คืน') && (
                <button
                  onClick={regenerateRoute}
                  className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors duration-200"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                  </svg>
                  <span>New Selection</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Route List */}
          <div className="xl:col-span-1 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-purple-800 mb-6">Optimized Route Order</h3>
            <div className="space-y-4">
              {optimizedRoute.map((place, index) => (
                <div key={place.id} className="p-4 bg-purple-50 rounded-xl border-2 border-purple-100">
                  <div className="flex items-start space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      isPlaceVisited(place.id) 
                        ? 'bg-green-500 text-white' 
                        : 'bg-purple-600 text-white'
                    }`}>
                      {isPlaceVisited(place.id) ? '✓' : index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-purple-800">{place.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{place.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-purple-600 mb-3">
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
                        <div className="mb-3 text-xs text-gray-500">
                          Distance to next: {calculateDistance(place, optimizedRoute[index + 1]).toFixed(2)} km
                        </div>
                      )}

                      {/* Visit Status */}
                      {isPlaceVisited(place.id) ? (
                        <div className="w-full bg-green-100 text-green-800 py-2 px-4 rounded-lg font-medium text-center mb-3">
                          ✅ Visited! You earned coins from your photos!
                        </div>
                      ) : (
                        <div className="w-full bg-blue-100 text-blue-800 py-2 px-4 rounded-lg font-medium text-center mb-3">
                          📸 Upload photos to mark as visited and earn coins!
                        </div>
                      )}

                      {/* Photo Upload Section */}
                      {selectedPlace === place.id && (
                        <div className="mt-4">
                          <PhotoUpload
                            placeId={place.id}
                            placeName={place.name}
                            onPhotosUploaded={(photos) => handlePhotoUpload(place.id, photos)}
                          />
                        </div>
                      )}

                      {/* Toggle Photo Upload */}
                      {!isPlaceVisited(place.id) && (
                        <button
                          onClick={() => setSelectedPlace(selectedPlace === place.id ? null : place.id)}
                          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 text-sm"
                        >
                          {selectedPlace === place.id ? '📸 Hide Photo Upload' : '📸 Upload Photos (+10 🪙 each)'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Total Distance Summary */}
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl">
              <h4 className="font-semibold text-purple-800 mb-2">Route Summary</h4>
              <div className="text-sm text-purple-700">
                <div className="flex justify-between mb-1">
                  <span>Total Places:</span>
                  <span className="font-bold">{optimizedRoute.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Distance:</span>
                  <span className="font-bold">
                    {optimizedRoute.length > 1 && 
                      optimizedRoute.slice(0, -1).reduce((total, place, index) => 
                        total + calculateDistance(place, optimizedRoute[index + 1]), 0
                      ).toFixed(2)
                    } km
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Visualization */}
          <div className="xl:col-span-2">
            <MapVisualization />
          </div>
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
