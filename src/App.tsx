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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header 
        lastUpdated={lastUpdated} 
        onRefresh={refetch} 
        loading={loading} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Weather and Category Overview */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Weather Card */}
            <div className="xl:col-span-4">
              {weatherData && <WeatherCard weather={weatherData} />}
            </div>
            
            {/* Category Overview Cards */}
            <div className="xl:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {categories.map((category) => {
                  const categoryData = stockData.data[category.key];
                  const getColorClasses = (color: string) => {
                    const colorMap = {
                      orange: 'bg-gradient-to-br from-orange-500 to-orange-600 border-orange-400',
                      green: 'bg-gradient-to-br from-green-500 to-green-600 border-green-400',
                      yellow: 'bg-gradient-to-br from-yellow-500 to-yellow-600 border-yellow-400',
                      amber: 'bg-gradient-to-br from-amber-500 to-amber-600 border-amber-400',
                      purple: 'bg-gradient-to-br from-purple-500 to-purple-600 border-purple-400'
                    };
                    return colorMap[color as keyof typeof colorMap] || 'bg-gradient-to-br from-gray-500 to-gray-600 border-gray-400';
                  };

                  return (
                    <div 
                      key={category.key} 
                      className={`${getColorClasses(category.color)} rounded-xl p-4 text-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border`}
                    >
                      <div className="text-3xl mb-2">{category.icon}</div>
                      <div className="text-xs font-bold uppercase tracking-wider mb-2">
                        {category.name}
                      </div>
                      <div className="text-sm font-mono font-bold bg-black/20 rounded-lg py-1 px-2 mb-1">
                        {categoryData?.countdown || '00h 00m 00s'}
                      </div>
                      <div className="text-xs opacity-80">Until Restock</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Category Sections */}
          <div className="space-y-8">
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
      
      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-lg">Grow A Garden Stock Tracker</div>
                <div className="text-green-400 text-sm">Built with ❤️ by Churchill</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-green-400">📊</span>
                <span>Real-time stock tracking</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-blue-400">🇵🇭</span>
                <span>Philippine timezone</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-yellow-400">🔄</span>
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