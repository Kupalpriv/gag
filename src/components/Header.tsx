import React from 'react';
import { formatLastUpdated } from '../utils/formatUtils';

interface HeaderProps {
  lastUpdated: string;
  loading: boolean;
  onRefresh: () => void;
}

const Header: React.FC<HeaderProps> = ({ lastUpdated, loading, onRefresh }) => {
  return (
    <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">GAG Stock Tracker</h1>
              <p className="text-sm opacity-90">Grow A Garden - Live Stock Monitor</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-xs opacity-75">Last Updated</div>
              <div className="text-sm font-mono">
                {lastUpdated ? formatLastUpdated(lastUpdated) : 'Never'}
              </div>
            </div>
            
            <button
              onClick={onRefresh}
              disabled={loading}
              className="bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <span className={`${loading ? 'animate-spin' : ''}`}>
                {loading ? '⟳' : '🔄'}
              </span>
              <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
