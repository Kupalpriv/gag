import React from 'react';
import { StockCategory, CategoryKey } from '../types';
import { StockItem } from './StockItem';
import { LiveCountdown } from './LiveCountdown';

interface CategoryCardProps {
  category: CategoryKey;
  data: StockCategory;
  color: string;
  icon: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, data, color, icon }) => {
  const hasItems = data.items && data.items.length > 0;
  const restockTime = `Restock in ${data.countdown}`;

  const getColorClasses = (color: string) => {
    const colorMap = {
      orange: 'bg-orange-500 border-orange-400',
      green: 'bg-green-500 border-green-400',
      yellow: 'bg-yellow-500 border-yellow-400',
      amber: 'bg-amber-500 border-amber-400',
      purple: 'bg-purple-500 border-purple-400'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-500 border-gray-400';
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
      <div className={`${getColorClasses(color)} p-4 flex items-center justify-between`}>
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h3 className="font-bold text-white capitalize text-lg">
              {category === 'gear' ? 'Gear & Tools' : 
               category === 'seed' ? 'Seeds & Plants' :
               category === 'egg' ? 'Eggs' :
               category === 'honey' ? 'Honey Products' :
               'Cosmetics'}
            </h3>
          </div>
        </div>
        
        <div className="text-right text-white">
          <div className="text-sm font-medium">
            <LiveCountdown countdown={data.countdown} />
          </div>
          <div className="text-xs opacity-75">Until Restock</div>
        </div>
      </div>
      
      <div className="p-4">
        {!hasItems ? (
          <div className="text-center py-8 text-gray-400">
            <div className="text-4xl mb-2">📦</div>
            <p>No items available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.items.map((item, index) => (
              <StockItem key={`${item.name}-${index}`} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};