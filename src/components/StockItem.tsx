import React from 'react';
import { StockItem as StockItemType } from '../types';
import { formatQuantity, getStockStatus } from '../utils/formatUtils';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface StockItemProps {
  item: StockItemType;
}

export const StockItem: React.FC<StockItemProps> = ({ item }) => {
  const stockStatus = getStockStatus(item.quantity);
  
  const getStatusConfig = () => {
    switch (stockStatus) {
      case 'in-stock':
        return {
          bgColor: 'bg-gray-700/80 hover:bg-gray-600/80',
          borderColor: 'border-green-500/50 hover:border-green-400',
          textColor: 'text-green-400',
          icon: <CheckCircle className="h-4 w-4" />,
          badge: 'bg-green-500/20 text-green-400 border-green-500/30'
        };
      case 'low-stock':
        return {
          bgColor: 'bg-gray-700/80 hover:bg-gray-600/80',
          borderColor: 'border-yellow-500/50 hover:border-yellow-400',
          textColor: 'text-yellow-400',
          icon: <AlertTriangle className="h-4 w-4" />,
          badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
        };
      case 'out-of-stock':
        return {
          bgColor: 'bg-gray-800/80 hover:bg-gray-700/80',
          borderColor: 'border-red-500/50 hover:border-red-400',
          textColor: 'text-red-400',
          icon: <XCircle className="h-4 w-4" />,
          badge: 'bg-red-500/20 text-red-400 border-red-500/30'
        };
    }
  };
  
  const getQuantityDisplay = () => {
    if (item.quantity === 0) return 'Out of Stock';
    if (item.quantity <= 2) return `×${item.quantity} LOW STOCK`;
    return `×${formatQuantity(item.quantity)}`;
  };

  const statusConfig = getStatusConfig();

  return (
    <div className={`${statusConfig.bgColor} ${statusConfig.borderColor} rounded-xl border-2 p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 backdrop-blur-sm`}>
      <div className="flex items-start space-x-3">
        {/* Item Image */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-white rounded-lg p-1 shadow-sm">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = '<div class="w-full h-full bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">No Image</div>';
              }}
            />
          </div>
        </div>
        
        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm mb-2 line-clamp-2 leading-tight">
            {item.name}
          </h4>
          
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-lg border text-xs font-bold ${statusConfig.badge}`}>
            {statusConfig.icon}
            <span>{getQuantityDisplay()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};