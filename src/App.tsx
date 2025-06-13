import React, { useState } from 'react';
import { useStockData } from './hooks/useStockData';
import { FilterType } from './types';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import StockSection from './components/StockSection';
import WeatherCard from './components/WeatherCard';

function App() {
  const { stockData, weatherData, loading, error, lastUpdated, refreshData } = useStockData();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={refreshData}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (loading && !stockData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="animate-spin text-6xl mb-4">🌱</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading GAG Stock Data</h2>
          <p className="text-gray-600">Fetching the latest inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header 
        lastUpdated={lastUpdated}
        loading={loading}
        onRefresh={refreshData}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Weather Card */}
        <div className="mb-8">
          <WeatherCard weatherData={weatherData} loading={loading} />
        </div>

        {/* Filter Bar */}
        {stockData && (
          <FilterBar 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            stockData={stockData}
          />
        )}

        {/* Stock Sections */}
        {stockData && (
          <div className="space-y-8">
            <StockSection 
              title="Gear" 
              category={stockData.gear} 
              categoryKey="gear"
              activeFilter={activeFilter}
            />
            <StockSection 
              title="Eggs" 
              category={stockData.egg} 
              categoryKey="egg"
              activeFilter={activeFilter}
            />
            <StockSection 
              title="Seeds" 
              category={stockData.seed} 
              categoryKey="seed"
              activeFilter={activeFilter}
            />
            <StockSection 
              title="Honey" 
              category={stockData.honey} 
              categoryKey="honey"
              activeFilter={activeFilter}
            />
            <StockSection 
              title="Cosmetics" 
              category={stockData.cosmetics} 
              categoryKey="cosmetics"
              activeFilter={activeFilter}
            />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>GAG Stock Tracker • Data refreshes every 30 seconds</p>
          <p className="mt-1">
            API: <a href="https://gagstock.gleeze.com/grow-a-garden" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              gagstock.gleeze.com
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
