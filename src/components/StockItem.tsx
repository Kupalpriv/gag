import React from 'react';
import { Package, AlertTriangle, CheckCircle } from 'lucide-react';
import { StockItem as StockItemType } from '../types';
import { formatQuantity, getStockStatus } from '../utils/formatUtils';

interface StockItemProps {
  item: StockItemType;
}

export const StockItem: React.FC<StockItemProps> = ({ item }) => {
  const stockStatus = getStockStatus(item.quantity);
  
  const getStatusIcon = () => {
    switch (stockStatus) {
      case 'in-stock':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'low-stock':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'out-of-stock':
        return <Package className="h-4 w-4 text-red-500" />;
    }
  };
  
  const getStatusColor = () => {
    switch (stockStatus) {
      case 'in-stock':
        return 'bg-green-50 border-green-200';
      case 'low-stock':
        return 'bg-yellow-50 border-yellow-200';
      case 'out-of-stock':
        return 'bg-red-50 border-red-200';
    }
  };
  
  const getQuantityColor = () => {
    switch (stockStatus) {
      case 'in-stock':
        return 'text-green-700';
      case 'low-stock':
        return 'text-yellow-700';
      case 'out-of-stock':
        return 'text-red-700';
    }
  };

  return (
    <div className={`rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${getStatusColor()}`}>
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 object-contain rounded-lg bg-white p-1 shadow-sm"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
          <div className="flex items-center space-x-2 mt-1">
            {getStatusIcon()}
            <span className={`text-sm font-medium ${getQuantityColor()}`}>
              {formatQuantity(item.quantity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};