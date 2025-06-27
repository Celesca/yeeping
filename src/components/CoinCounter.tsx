import React, { useState, useEffect } from 'react';
import { CoinSystem } from '../utils/coinSystem';

interface CoinCounterProps {
  showAnimation?: boolean;
  onCoinEarned?: (amount: number) => void;
}

const CoinCounter: React.FC<CoinCounterProps> = ({ showAnimation = false, onCoinEarned }) => {
  const [coins, setCoins] = useState<number>(0);
  const [animatingCoins, setAnimatingCoins] = useState<number>(0);

  useEffect(() => {
    const updateCoins = () => {
      const profile = CoinSystem.getUserProfile();
      setCoins(profile.totalCoins);
    };

    updateCoins();
    
    // Listen for storage changes to update coins in real time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userProfile') {
        updateCoins();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    const handleCoinUpdate = (e: CustomEvent) => {
      updateCoins();
      if (showAnimation && e.detail.earned) {
        setAnimatingCoins(e.detail.earned);
        setTimeout(() => setAnimatingCoins(0), 2000);
        onCoinEarned?.(e.detail.earned);
      }
    };

    window.addEventListener('coinUpdate' as any, handleCoinUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('coinUpdate' as any, handleCoinUpdate);
    };
  }, [showAnimation, onCoinEarned]);

  return (
    <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-4 py-2 rounded-full shadow-lg">
      <div className="relative">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <text x="12" y="16" textAnchor="middle" className="text-xs font-bold fill-current">₿</text>
        </svg>
        
        {animatingCoins > 0 && (
          <div className="absolute -top-8 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
            +{animatingCoins}
          </div>
        )}
      </div>
      
      <span className="font-bold text-lg">
        {coins.toLocaleString()}
      </span>
      
      <span className="text-sm font-medium opacity-80">
        Coins
      </span>
    </div>
  );
};

export default CoinCounter;
