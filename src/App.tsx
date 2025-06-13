import React from 'react';
import { useStockData } from './hooks/useStockData';
import { Header } from './components/Header';
import { WeatherCard } from './components/WeatherCard';
import { StockSection } from './components/StockSection';
import { StockSummary } from './components/StockSummary';
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

  const categories: CategoryKey[] = ['gear', 'egg', 'seed', 'honey', 'cosmetics'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
      <Header 
        lastUpdated={lastUpdated} 
        onRefresh={refetch} 
        loading={loading} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Weather and Summary Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              {weatherData && <WeatherCard weather={weatherData} />}
            </div>
            <div className="lg:col-span-2">
              <StockSummary stockData={stockData.data} />
            </div>
          </div>
          
          {/* Stock Sections */}
          <div className="space-y-6">
            {categories.map((category) => (
              <StockSection
                key={category}
                category={category}
                data={stockData.data[category]}
              />
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Grow a Garden Stock Tracker • Data updates every 30 seconds
            </p>
            <p className="text-xs mt-1">
              Created by{' '}
              <a 
                href="https://www.facebook.com/Churchill.Dev4100" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Churchill.Dev
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;