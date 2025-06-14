import React, { useState, useMemo } from 'react';
import { useStockData } from './hooks/useStockData';
import { Header } from './components/Header';
import { WeatherCard } from './components/WeatherCard';
import { CategoryCard } from './components/CategoryCard';
import { StockSummary } from './components/StockSummary';
import { SearchBar } from './components/SearchBar';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { CategoryType } from './types';

function App() {
  const { stockData, weatherData, loading, error, lastUpdated, refetch } = useStockData();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filteredStockData = useMemo(() => {
    if (!stockData?.data) return null;

    const filtered = { ...stockData.data };

    if (categoryFilter) {
      Object.keys(filtered).forEach(key => {
        if (key !== 'updated_at' && key !== categoryFilter) {
          delete (filtered as any)[key];
        }
      });
    }

    if (searchQuery) {
      Object.keys(filtered).forEach(key => {
        if (key !== 'updated_at') {
          const categoryData = (filtered as any)[key];
          if (categoryData?.items) {
            categoryData.items = categoryData.items.filter((item: any) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }
        }
      });
    }

    return { ...stockData, data: filtered };
  }, [stockData, searchQuery, categoryFilter]);

  if (loading && !stockData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" text="Loading garden data..." />
          <p className="mt-4 text-gray-600 max-w-md">
            Fetching the latest stock information and weather updates for your garden...
          </p>
        </div>
      </div>
    );
  }

  if (error && !stockData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100">
      <Header
        lastUpdated={lastUpdated}
        onRefresh={refetch}
        isLoading={loading}
        isOnline={navigator.onLine}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <SearchBar
            onSearch={setSearchQuery}
            onCategoryFilter={setCategoryFilter}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {weatherData && (
              <WeatherCard weather={weatherData} />
            )}

            {filteredStockData?.data && (
              <StockSummary stockData={filteredStockData.data} />
            )}
          </div>

          {filteredStockData?.data && (
            <div className="space-y-8">
              {Object.entries(filteredStockData.data).map(([category, data]) => {
                if (category === 'updated_at') return null;
                
                return (
                  <CategoryCard
                    key={category}
                    title={category.charAt(0).toUpperCase() + category.slice(1)}
                    category={category as CategoryType}
                    data={data}
                  />
                );
              })}
            </div>
          )}

          {filteredStockData?.data && 
           Object.keys(filteredStockData.data).filter(key => key !== 'updated_at').length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <SearchBar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🌱</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Grow a Garden Tracker</h3>
                  <p className="text-gray-400 text-sm">Professional Stock & Weather Monitor</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed max-w-md">
                Stay updated with real-time stock information and weather conditions for your garden. 
                Track inventory, monitor restocks, and plan your gardening activities with precision.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-emerald-400">Features</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                  <span>Real-time Stock Tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                  <span>Weather Monitoring</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                  <span>Live Countdown Timers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                  <span>Advanced Search & Filters</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                  <span>Responsive Design</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Statistics</h4>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white">
                    {stockData?.data ? 
                      Object.values(stockData.data)
                        .filter(item => typeof item === 'object' && item.items)
                        .reduce((sum, category: any) => sum + category.items.length, 0) 
                      : '0'
                    }
                  </div>
                  <div className="text-gray-400 text-sm">Item Types Tracked</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white">5</div>
                  <div className="text-gray-400 text-sm">Categories</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-gray-400 text-sm">Monitoring</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-xl p-6 mb-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-2xl">👨‍💻</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Developed by Churchill</h4>
                    <p className="text-blue-100 text-sm">tyortyil abinega Developer</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-red-400 text-lg">❤️</span>
                  <a 
                    href="https://www.facebook.com/Churchill.Dev4100" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center space-x-2"
                  >
                    <span className="text-blue-300">📘</span>
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2025 chillimansi. Built with React & TypeScript.
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Data</span>
              </div>
              <div className="text-gray-400 text-sm">
                Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Never'}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
