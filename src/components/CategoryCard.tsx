import React from 'react';
import { StockCategory, CategoryKey } from '../types';
import { StockItem } from './StockItem';
import { LiveCountdown } from './LiveCountdown';
import { Package, TrendingUp, AlertTriangle } from 'lucide-react';

interface CategoryCardProps {
  category: CategoryKey;
  data: StockCategory;
  color: string;
  icon: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, data, color, icon }) => {
  const hasItems = data.items && data.items.length > 0;
  const availableItems = hasItems ? data.items.filter(item => item.quantity > 0) : [];
  const lowStockItems = hasItems ? data.items.filter(item => item.quantity > 0 && item.quantity <= 2) : [];
  const totalQuantity = hasItems ? data.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

  const getColorClasses = (color: string) => {
    const colorMap = {
      orange: 'from-orange-500 to-orange-600 border-orange-400',
      green: 'from-green-500 to-green-600 border-green-400',
      yellow: 'from-yellow-500 to-yellow-600 border-yellow-400',
      amber: 'from-amber-500 to-amber-600 border-amber-400',
      purple: 'from-purple-500 to-purple-600 border-purple-400'
    };
    return colorMap[color as keyof typeof colorMap] || 'from-gray-500 to-gray-600 border-gray-400';
  };

  const getCategoryName = (category: CategoryKey) => {
    const names = {
      gear: 'Gear & Tools',
      seed: 'Seeds & Plants',
      egg: 'Eggs',
      honey: 'Honey Products',
      cosmetics: 'Cosmetics'
    };
    return names[category];
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getColorClasses(color)} p-6 border-b border-white/10`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <span className="text-3xl">{icon}</span>
            </div>
            <div>
              <h3 className="font-bold text-white text-xl">
                {getCategoryName(category)}
              </h3>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1 text-white/90">
                  <Package className="h-4 w-4" />
                  <span className="text-sm font-medium">{availableItems.length}/{hasItems ? data.items.length : 0} available</span>
                </div>
                <div className="flex items-center space-x-1 text-white/90">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">{totalQuantity} total items</span>
                </div>
                {lowStockItems.length > 0 && (
                  <div className="flex items-center space-x-1 text-yellow-200">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">{lowStockItems.length} low stock</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-right text-white">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
              <div className="text-sm font-medium mb-1">Restock in</div>
              <div className="text-lg font-mono font-bold">
                <LiveCountdown countdown={data.countdown} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {!hasItems ? (
          <div className="text-center py-12">
            <div className="bg-gray-700/50 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-300 mb-2">No Items Available</h4>
            <p className="text-gray-500">This category is currently empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.items.map((item, index) => (
              <StockItem key={`${item.name}-${index}`} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};