import React from 'react';
import { StockCategory, FilterType } from '../types';
import { formatQuantity } from '../utils/formatUtils';

interface StockSectionProps {
  title: string;
  category: StockCategory;
  categoryKey: FilterType;
  activeFilter: FilterType;
}

const StockSection: React.FC<StockSectionProps> = ({ 
  title, 
  category, 
  categoryKey, 
  activeFilter 
}) => {
  if (activeFilter !== 'all' && activeFilter !== categoryKey) {
    return null;
  }

  const getCategoryIcon = (categoryKey: FilterType) => {
    switch (categoryKey) {
      case 'gear': return '⚙️';
      case 'egg': return '🥚';
      case 'seed': return '🌱';
      case 'honey': return '🍯';
      case 'cosmetics': return '💄';
      default: return '📦';
    }
  };

  const getCategoryColor = (categoryKey: FilterType) => {
    switch (categoryKey) {
      case 'gear': return 'from-blue-500 to-blue-600';
      case 'egg': return 'from-yellow-500 to-orange-500';
      case 'seed': return 'from-green-500 to-green-600';
      case 'honey': return 'from-amber-500 to-yellow-500';
      case 'cosmetics': return 'from-pink-500 to-purple-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className={`bg-gradient-to-r ${getCategoryColor(categoryKey)} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getCategoryIcon(categoryKey)}</span>
            <h2 className="text-xl font-bold text-white capitalize">{title}</h2>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-white font-mono text-sm">{category.countdown}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {category.items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📭</div>
            <p>No items available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.items.map((item, index) => (
              <div 
                key={`${item.name}-${index}`}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 object-contain rounded-lg bg-white p-1 border border-gray-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/48x48/e5e7eb/6b7280?text=${item.name.charAt(0)}`;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">
                      {item.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">Qty:</span>
                      <span className={`font-bold text-sm ${
                        item.quantity > 10 ? 'text-green-600' : 
                        item.quantity > 5 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {formatQuantity(item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockSection;
