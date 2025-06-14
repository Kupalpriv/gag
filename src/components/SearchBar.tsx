import React, { useState } from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
        {/* Search Input */}
        <div className="flex-1 relative w-full">
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for items (e.g., Watering Can, Sunflower, Egg...)"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 sm:pl-12 pr-4 py-3 sm:py-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 px-4 py-3 sm:py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-200 hover:border-gray-300">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium">Filter</span>
          </button>
          
          <button className="flex-1 sm:flex-none bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105 font-medium">
            <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>
      
      {/* Search Stats */}
      {searchTerm && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Searching for "<span className="text-gray-800 font-medium">{searchTerm}</span>"
          </p>
        </div>
      )}
    </div>
  );
};