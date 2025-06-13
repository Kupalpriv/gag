import React from 'react';
import { Package } from 'lucide-react';
import { StockItem } from '../types';
import { formatValue, addEmoji } from '../utils/formatUtils';

interface StockSectionProps {
  title: string;
  items: StockItem[];
  icon: React.ReactNode;
  restockTime: string;
  bgColor: string;
  filter: string;
}

export function StockSection({ title, items, icon, restockTime, bgColor, filter }: StockSectionProps) {
  const filteredItems = filter 
    ? items.filter(item => 
        item.name.toLowerCase().includes(filter.toLowerCase())
      )
    : items;

  if (filteredItems.length === 0 && filter) {
    return null;
  }

  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-lg border`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {icon}
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Restock in</p>
          <p className="text-lg font-bold text-orange-600 font-mono">{restockTime}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredItems.map((item, index) => {
          const isLowStock = item.value < 50;
          const isOutOfStock = item.value === 0;
          
          return (
            <div 
              key={index}
              className={`bg-white/80 backdrop-blur-sm rounded-lg p-3 border transition-all duration-200 hover:shadow-md hover:scale-102 ${
                isOutOfStock 
                  ? 'border-red-300 bg-red-50/50' 
                  : isLowStock 
                    ? 'border-yellow-300 bg-yellow-50/50' 
                    : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {addEmoji(item.name)}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${
                    isOutOfStock 
                      ? 'text-red-600' 
                      : isLowStock 
                        ? 'text-yellow-600' 
                        : 'text-green-600'
                  }`}>
                    {formatValue(item.value)}
                  </span>
                  {isOutOfStock && (
                    <div className="text-xs text-red-500 font-medium">OUT OF STOCK</div>
                  )}
                  {isLowStock && !isOutOfStock && (
                    <div className="text-xs text-yellow-600 font-medium">LOW STOCK</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredItems.length === 0 && !filter && (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No items available</p>
        </div>
      )}
    </div>
  );
}