import React from 'react';
import { TrendingUp, Package, AlertTriangle, CheckCircle } from 'lucide-react';
import { StockData } from '../types';

interface StockSummaryProps {
  stockData: StockData;
}

export const StockSummary: React.FC<StockSummaryProps> = ({ stockData }) => {
  const categories = ['gear', 'egg', 'seed', 'honey', 'cosmetics'] as const;
  
  const stats = categories.reduce((acc, category) => {
    const items = stockData[category]?.items || [];
    const totalItems = items.length;
    const availableItems = items.filter(item => item.quantity > 0).length;
    const lowStockItems = items.filter(item => item.quantity > 0 && item.quantity <= 2).length;
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    
    acc.totalItems += totalItems;
    acc.availableItems += availableItems;
    acc.lowStockItems += lowStockItems;
    acc.totalQuantity += totalQuantity;
    
    return acc;
  }, {
    totalItems: 0,
    availableItems: 0,
    lowStockItems: 0,
    totalQuantity: 0
  });

  const availabilityRate = stats.totalItems > 0 ? (stats.availableItems / stats.totalItems * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <TrendingUp className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Stock Overview</h2>
          <p className="text-gray-600">Current inventory status</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center space-x-2 mb-2">
            <Package className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Total Items</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{stats.totalQuantity}</p>
          <p className="text-xs text-blue-600">{stats.totalItems} unique items</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-700">Available</span>
          </div>
          <p className="text-2xl font-bold text-green-900">{stats.availableItems}</p>
          <p className="text-xs text-green-600">{availabilityRate.toFixed(1)}% in stock</p>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-700">Low Stock</span>
          </div>
          <p className="text-2xl font-bold text-yellow-900">{stats.lowStockItems}</p>
          <p className="text-xs text-yellow-600">≤2 items remaining</p>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-center space-x-2 mb-2">
            <Package className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-red-700">Out of Stock</span>
          </div>
          <p className="text-2xl font-bold text-red-900">{stats.totalItems - stats.availableItems}</p>
          <p className="text-xs text-red-600">Items unavailable</p>
        </div>
      </div>
    </div>
  );
};