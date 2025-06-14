import React from 'react';
import { RefreshCw, Leaf } from 'lucide-react';
import { formatTimeAgo } from '../utils/timeUtils';

interface HeaderProps {
  lastUpdated: Date | null;
  onRefresh: () => void;
  loading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ lastUpdated, onRefresh, loading }) => {
  return (
    <header className="bg-green-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Grow A Garden</h1>
              <p className="text-green-100 text-sm">Stock Tracker</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right text-green-100">
              <div className="text-sm">
                Created by Churchill
              </div>
              <div className="text-xs">
                {lastUpdated ? `Updated ${formatTimeAgo(lastUpdated)}` : 'Loading...'}
              </div>
            </div>
            
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm disabled:opacity-50 group"
            >
              <RefreshCw className={`h-4 w-4 transition-transform duration-500 ${loading ? 'animate-spin' : 'group-hover:rotate-180'}`} />
              <span className="text-sm font-medium">Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};