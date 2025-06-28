import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import type { TravelPlace } from '../types/TravelPlace';

interface TinderCardProps {
  place: TravelPlace;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
}

const TinderCard: React.FC<TinderCardProps> = ({ place, onSwipe, isTop }) => {
  const [{ x, y, rotate, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
  }));

  const bind = useDrag(
    ({ movement: [mx, my], direction: [xDir], down }) => {
      const trigger = Math.abs(mx) > 100;
      const dir = xDir < 0 ? 'left' : 'right';
      
      if (!down && trigger) {
        onSwipe(dir);
        api.start({
          x: (200 + window.innerWidth) * (mx > 0 ? 1 : -1),
          y: my,
          rotate: mx / 10,
          scale: 1,
          config: { tension: 200, friction: 30 }
        });
      } else {
        api.start({
          x: down ? mx : 0,
          y: down ? my : 0,
          rotate: down ? mx / 10 : 0,
          scale: down ? 1.1 : 1,
          config: { tension: 300, friction: 30 }
        });
      }
    },
    { enabled: isTop }
  );

  return (
    <animated.div
      {...bind()}
      style={{
        x,
        y,
        rotate,
        scale,
        touchAction: 'none',
      }}
      className={`absolute bg-white rounded-2xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing ${
        isTop ? 'z-20' : 'z-10'
      } w-[85vw] max-w-sm h-[70vh] max-h-[600px] min-h-[500px] mt-120`}
    >
      <div className="relative h-full">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-3/5 sm:h-2/3 object-cover"
          draggable={false}
        />
        
        {/* Overlay indicators */}
        <animated.div
          style={{
            opacity: x.to((val) => (val > 0 ? val / 100 : 0)),
          }}
          className="absolute top-6 sm:top-8 right-6 sm:right-8 bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg font-bold text-base sm:text-lg transform rotate-12"
        >
          LOVE IT!
        </animated.div>
        
        <animated.div
          style={{
            opacity: x.to((val) => (val < 0 ? Math.abs(val) / 100 : 0)),
          }}
          className="absolute top-6 sm:top-8 left-6 sm:left-8 bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg font-bold text-base sm:text-lg transform -rotate-12"
        >
          PASS
        </animated.div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 text-white">
          <h3 className="text-xl sm:text-2xl font-bold mb-1">{place.name}</h3>
          <p className="text-xs sm:text-sm opacity-90 mb-2 line-clamp-2">{place.description}</p>
          
          {/* Tags Section */}
          {place.tags && place.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {place.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tag === 'Green' 
                      ? 'bg-green-500/20 text-green-100 border border-green-400/30'
                      : tag === 'Culture'
                      ? 'bg-purple-500/20 text-purple-100 border border-purple-400/30'
                      : tag === 'PM2.5 free'
                      ? 'bg-blue-500/20 text-blue-100 border border-blue-400/30'
                      : tag === 'Street'
                      ? 'bg-orange-500/20 text-orange-100 border border-orange-400/30'
                      : 'bg-gray-500/20 text-gray-100 border border-gray-400/30'
                  }`}
                >
                  {tag === 'Green' && '🌿'} 
                  {tag === 'Culture' && '🏛️'} 
                  {tag === 'PM2.5 free' && '💨'} 
                  {tag === 'Street' && '🛣️'} 
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span className="text-xs">{place.lat.toFixed(4)}, {place.long.toFixed(4)}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="text-xs">{place.distance}</span>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default TinderCard;
