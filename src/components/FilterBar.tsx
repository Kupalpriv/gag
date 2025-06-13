import React from 'react';
import { FilterType } from '../types';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  stockData: any;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, onFilterChange, stockData }) => {
  const filters: { key: FilterType; label: string; icon: string }[] = [
    { key: 'all', label: 'All Items', icon: '📦' },
    { key: 'gear', label: 'Gear', icon: '⚙️' },
    { key: 'egg', label: 'Eggs', icon: '🥚' },
    { key: 'seed', label: 'Seeds', icon: '🌱' },
    { key: 'honey', label: 'Honey', icon: '🍯' },
    { key: 'cosmetics', label: 'Cosmetics', icon: '💄' },
  ];

  const getItemCount = (filterKey: FilterType) => {
    if (filterKey === 'all') {
      return stockData ? Object.values(stockData).reduce((total: number, category: any) => {
        return total + (category.items ? category.items.length : 0);
      }, 0) : 0;
    }
    return stockData && stockData[filterKey] ? stockData[filterKey].items.length : 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <h2 className="text-lg font-semibold text-gray-800">Filter Categories</h2>
        
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const itemCount = getItemCount(filter.key);
            const isActive = activeFilter === filter.key;
            
            return (
              <button
                key={filter.key}
                onClick={() => onFilterChange(filter.key)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-500 text-white shadow-md transform scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                  }
                `}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
                <span className={`
                  text-xs px-2 py-1 rounded-full font-bold
                  ${isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {itemCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
