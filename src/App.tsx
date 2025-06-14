import React from 'react';
import { useStockData } from './hooks/useStockData';
import { Header } from './components/Header';
import { WeatherCard } from './components/WeatherCard';
import { CategoryCard } from './components/CategoryCard';
import { SearchBar } from './components/SearchBar';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { CategoryKey } from './types';

function App() {
  const { stockData, weatherData, loading, error, lastUpdated, refetch } = useStockData();

  if (loading && !stockData) {
    return <LoadingSpinner />;
  }

  if (error && !stockData) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  if (!stockData) {
    return <ErrorMessage message="No data available" onRetry={refetch} />;
  }

  const categories: { key: CategoryKey; color: string; icon: string; name: string }[] = [
    { key: 'gear', color: 'orange', icon: '🔧', name: 'GEAR' },
    { key: 'seed', color: 'green', icon: '🌱', name: 'SEEDS' },
    { key: 'egg', color: 'yellow', icon: '🥚', name: 'EGGS' },
    { key: 'honey', color: 'amber', icon: '🍯', name: 'HONEY' },
    { key: 'cosmetics', color: 'purple', icon: '✨', name: 'COSMETICS' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <Header 
        lastUpdated={lastUpdated} 
        onRefresh={refetch} 
        loading={loading} 
      />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Weather Section */}
          <div className="w-full">
            {weatherData && <WeatherCard weather={weatherData} />}
          </div>

          {/* Category Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            {categories.map((category) => {
              const categoryData = stockData.data[category.key];
              const getColorClasses = (color: string) => {
                const colorMap = {
                  orange: 'bg-gradient-to-br from-orange-400 to-orange-500 text-white',
                  green: 'bg-gradient-to-br from-green-400 to-green-500 text-white',
                  yellow: 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white',
                  amber: 'bg-gradient-to-br from-amber-400 to-amber-500 text-white',
                  purple: 'bg-gradient-to-br from-purple-400 to-purple-500 text-white'
                };
                return colorMap[color as keyof typeof colorMap] || 'bg-gradient-to-br from-gray-400 to-gray-500 text-white';
              };

              return (
                <div 
                  key={category.key} 
                  className={`${getColorClasses(category.color)} rounded-xl p-3 sm:p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                >
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{category.icon}</div>
                  <div className="text-xs font-bold uppercase tracking-wider mb-1 sm:mb-2 opacity-90">
                    {category.name}
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-bold bg-black/20 rounded-lg py-1 px-2 mb-1">
                    {categoryData?.countdown || '00h 00m 00s'}
                  </div>
                  <div className="text-xs opacity-80">Until Restock</div>
                </div>
              );
            })}
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Category Sections */}
          <div className="space-y-4 sm:space-y-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.key}
                category={category.key}
                data={stockData.data[category.key]}
                color={category.color}
                icon={category.icon}
              />
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 sm:mt-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-green-500 p-2 rounded-lg">
                <span className="text-xl sm:text-2xl">🏆</span>
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-800 text-base sm:text-lg">Grow A Garden Stock Tracker</div>
                <div className="text-green-600 text-sm">Built with ❤️ by Churchill</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-green-500">📊</span>
                <span>Real-time stock tracking</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-blue-500">🇵🇭</span>
                <span>Philippine timezone</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-yellow-500">🔄</span>
                <span>Auto-refresh every 30 seconds</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;