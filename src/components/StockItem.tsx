import React from 'react';
import { StockItem as StockItemType } from '../types';
import { formatQuantity, getStockStatus } from '../utils/formatUtils';

interface StockItemProps {
  item: StockItemType;
}

export const StockItem: React.FC<StockItemProps> = ({ item }) => {
  const stockStatus = getStockStatus(item.quantity);
  
  const getStatusColor = () => {
    switch (stockStatus) {
      case 'in-stock':
        return 'bg-gray-700 border-green-500 text-green-400';
      case 'low-stock':
        return 'bg-gray-700 border-yellow-500 text-yellow-400';
      case 'out-of-stock':
        return 'bg-gray-700 border-red-500 text-red-400';
    }
  };
  
  const getQuantityDisplay = () => {
    if (item.quantity === 0) return 'Out of Stock';
    if (item.quantity <= 2) return `x${item.quantity} LOW STOCK`;
    return `x${formatQuantity(item.quantity)}`;
  };

  return (
    <div className={`rounded-lg border-2 p-3 transition-all duration-200 hover:shadow-lg ${getStatusColor()}`}>
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-10 h-10 object-contain rounded-lg bg-white p-1"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-white text-sm truncate">{item.name}</h4>
          <div className="text-xs font-bold mt-1">
            {getQuantityDisplay()}
          </div>
        </div>
      </div>
    </div>
  );
};