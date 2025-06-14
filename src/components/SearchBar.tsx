import React, { useState } from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Search Input */}
        <div className="flex-1 relative w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for items (e.g., Watering Can, Sunflower, Egg...)"
            className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
          />
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button className="bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white px-4 py-4 rounded-xl transition-all duration-200 flex items-center space-x-2 border border-gray-600/50 hover:border-gray-500">
            <Filter className="h-5 w-5" />
            <span className="hidden sm:inline font-medium">Filter</span>
          </button>
          
          <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-4 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105 font-medium">
            <RefreshCw className="h-5 w-5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>
      
      {/* Search Stats */}
      {searchTerm && (
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <p className="text-sm text-gray-400">
            Searching for "<span className="text-white font-medium">{searchTerm}</span>"
          </p>
        </div>
      )}
    </div>
  );
};