import React from 'react';
import { Search, RefreshCw } from 'lucide-react';

export const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search for items (e.g., Watering Can, Sunflower, Egg...)"
          className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2">
        <RefreshCw className="h-4 w-4" />
        <span>Refresh</span>
      </button>
    </div>
  );
};