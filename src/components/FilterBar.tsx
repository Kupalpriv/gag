import React from 'react';
import { Search, RefreshCw } from 'lucide-react';

interface FilterBarProps {
  filter: string;
  onFilterChange: (filter: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export function FilterBar({ filter, onFilterChange, onRefresh, isLoading }: FilterBarProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for items (e.g., Watering Can, Sunflower, Egg...)"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          />
        </div>
        
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>
      
      {filter && (
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Filtering by: <span className="font-medium text-emerald-600">"{filter}"</span>
          </p>
          <button
            onClick={() => onFilterChange('')}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}