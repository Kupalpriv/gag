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

  const categories: { key: CategoryKey; color: string; icon: string }[] = [
    { key: 'gear', color: 'orange', icon: '🔧' },
    { key: 'seed', color: 'green', icon: '🌱' },
    { key: 'egg', color: 'yellow', icon: '🥚' },
    { key: 'honey', color: 'amber', icon: '🍯' },
    { key: 'cosmetics', color: 'purple', icon: '✨' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header 
        lastUpdated={lastUpdated} 
        onRefresh={refetch} 
        loading={loading} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Weather and Category Headers */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              {weatherData && <WeatherCard weather={weatherData} />}
            </div>
            <div className="lg:col-span-4">
              <div className="grid grid-cols-5 gap-3">
                {categories.map((category) => (
                  <div key={category.key} className={`bg-${category.color}-500 rounded-lg p-4 text-center text-white`}>
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="text-xs font-medium uppercase tracking-wide">
                      {category.key}
                    </div>
                    <div className="text-lg font-bold">
                      {stockData.data[category.key]?.countdown || '00h 00m 00s'}
                    </div>
                    <div className="text-xs opacity-75">Until Restock</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Category Sections */}
          <div className="space-y-6">
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
      <footer className="bg-gray-800 border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-400">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-2xl">🏆</span>
              <span className="font-bold text-white">Grow A Garden Stock Tracker</span>
            </div>
            <p className="text-sm">
              Built with ❤️ by Churchill • Real-time stock tracking • Philippine timezone • Auto-refresh every 30 seconds
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;