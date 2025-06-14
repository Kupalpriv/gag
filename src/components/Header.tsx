import React from 'react';
import { RefreshCw, Leaf, Activity } from 'lucide-react';
import { formatTimeAgo } from '../utils/timeUtils';

interface HeaderProps {
  lastUpdated: Date | null;
  onRefresh: () => void;
  loading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ lastUpdated, onRefresh, loading }) => {
  return (
    <header className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 shadow-2xl border-b border-green-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm border border-white/30 shadow-lg">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Grow A Garden</h1>
              <div className="flex items-center space-x-2">
                <p className="text-green-100 text-sm font-medium">Stock Tracker</p>
                <div className="flex items-center space-x-1 bg-green-500/30 px-2 py-1 rounded-full">
                  <Activity className="h-3 w-3 text-green-200" />
                  <span className="text-xs text-green-200 font-medium">LIVE</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Status and Refresh */}
          <div className="flex items-center space-x-6">
            <div className="text-right text-green-100 hidden sm:block">
              <div className="text-sm font-medium">
                Created by Churchill
              </div>
              <div className="text-xs text-green-200">
                {lastUpdated ? `Updated ${formatTimeAgo(lastUpdated)}` : 'Loading...'}
              </div>
            </div>
            
            <button
              onClick={onRefresh}
              disabled={loading}
              className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/30 disabled:opacity-50 group shadow-lg hover:shadow-xl hover:scale-105"
            >
              <RefreshCw className={`h-5 w-5 transition-transform duration-500 ${loading ? 'animate-spin' : 'group-hover:rotate-180'}`} />
              <span className="text-sm font-semibold">
                {loading ? 'Refreshing...' : 'Refresh'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};