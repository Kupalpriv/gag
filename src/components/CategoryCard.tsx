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
      orange: 'from-orange-400 to-orange-500 border-orange-300',
      green: 'from-green-400 to-green-500 border-green-300',
      yellow: 'from-yellow-400 to-yellow-500 border-yellow-300',
      amber: 'from-amber-400 to-amber-500 border-amber-300',
      purple: 'from-purple-400 to-purple-500 border-purple-300'
    };
    return colorMap[color as keyof typeof colorMap] || 'from-gray-400 to-gray-500 border-gray-300';
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
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getColorClasses(color)} p-4 sm:p-6 border-b border-white/20`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="bg-white/20 p-2 sm:p-3 rounded-xl backdrop-blur-sm">
              <span className="text-2xl sm:text-3xl">{icon}</span>
            </div>
            <div>
              <h3 className="font-bold text-white text-lg sm:text-xl">
                {getCategoryName(category)}
              </h3>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
                <div className="flex items-center space-x-1 text-white/90">
                  <Package className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm font-medium">{availableItems.length}/{hasItems ? data.items.length : 0} available</span>
                </div>
                <div className="flex items-center space-x-1 text-white/90">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm font-medium">{totalQuantity} total items</span>
                </div>
                {lowStockItems.length > 0 && (
                  <div className="flex items-center space-x-1 text-yellow-200">
                    <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm font-medium">{lowStockItems.length} low stock</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-right text-white">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 border border-white/20">
              <div className="text-xs sm:text-sm font-medium mb-1">Restock in</div>
              <div className="text-sm sm:text-lg font-mono font-bold">
                <LiveCountdown countdown={data.countdown} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 sm:p-6">
        {!hasItems ? (
          <div className="text-center py-8 sm:py-12">
            <div className="bg-gray-100 rounded-full p-4 sm:p-6 w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 flex items-center justify-center">
              <Package className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-600 mb-2">No Items Available</h4>
            <p className="text-gray-500">This category is currently empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {data.items.map((item, index) => (
              <StockItem key={`${item.name}-${index}`} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};