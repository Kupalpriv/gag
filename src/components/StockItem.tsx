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
          bgColor: 'bg-white hover:bg-gray-50',
          borderColor: 'border-green-200 hover:border-green-300',
          textColor: 'text-green-600',
          icon: <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />,
          badge: 'bg-green-100 text-green-700 border-green-200'
        };
      case 'low-stock':
        return {
          bgColor: 'bg-white hover:bg-gray-50',
          borderColor: 'border-yellow-200 hover:border-yellow-300',
          textColor: 'text-yellow-600',
          icon: <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />,
          badge: 'bg-yellow-100 text-yellow-700 border-yellow-200'
        };
      case 'out-of-stock':
        return {
          bgColor: 'bg-gray-50 hover:bg-gray-100',
          borderColor: 'border-red-200 hover:border-red-300',
          textColor: 'text-red-600',
          icon: <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />,
          badge: 'bg-red-100 text-red-700 border-red-200'
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
    <div className={`${statusConfig.bgColor} ${statusConfig.borderColor} rounded-xl border-2 p-3 sm:p-4 transition-all duration-300 hover:shadow-lg hover:scale-105`}>
      <div className="flex items-start space-x-3">
        {/* Item Image */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg p-1 shadow-sm">
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
          <h4 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 leading-tight">
            {item.name}
          </h4>
          
          <div className={`inline-flex items-center space-x-2 px-2 sm:px-3 py-1 rounded-lg border text-xs font-bold ${statusConfig.badge}`}>
            {statusConfig.icon}
            <span>{getQuantityDisplay()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};