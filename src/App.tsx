import React, { useState } from 'react';
import { Header } from './components/Header';
import { WeatherCard } from './components/WeatherCard';
import { CountdownTimer } from './components/CountdownTimer';
import { StockSection } from './components/StockSection';
import { FilterBar } from './components/FilterBar';
import { useStockData } from './hooks/useStockData';
import { Wrench, Sprout, Egg, Sparkles, Bone as Honey } from 'lucide-react';

function App() {
  const { stockData, weatherData, restockTimers, isLoading, lastUpdated, refreshData } = useStockData();
  const [filter, setFilter] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Weather and Timers Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <WeatherCard weather={weatherData} lastUpdated={lastUpdated} />
          </div>
          
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              <CountdownTimer
                time={restockTimers.gear}
                label="Gear"
                color="from-orange-500 to-red-600"
              />
              <CountdownTimer
                time={restockTimers.seed}
                label="Seeds"
                color="from-green-500 to-emerald-600"
              />
              <CountdownTimer
                time={restockTimers.egg}
                label="Eggs"
                color="from-yellow-500 to-orange-600"
              />
              <CountdownTimer
                time={restockTimers.honey}
                label="Honey"
                color="from-yellow-600 to-amber-700"
              />
              <CountdownTimer
                time={restockTimers.cosmetics}
                label="Cosmetics"
                color="from-purple-500 to-pink-600"
              />
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          onRefresh={refreshData}
          isLoading={isLoading}
        />

        {/* Stock Sections */}
        <div className="space-y-8">
          <StockSection
            title="Gear & Tools"
            items={stockData.gearStock}
            icon={<Wrench className="h-6 w-6 text-orange-600" />}
            restockTime={restockTimers.gear}
            bgColor="bg-gradient-to-br from-orange-50 to-red-100 border-orange-200"
            filter={filter}
          />

          <StockSection
            title="Seeds & Plants"
            items={stockData.seedsStock}
            icon={<Sprout className="h-6 w-6 text-green-600" />}
            restockTime={restockTimers.seed}
            bgColor="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200"
            filter={filter}
          />

          <StockSection
            title="Eggs"
            items={stockData.eggStock}
            icon={<Egg className="h-6 w-6 text-yellow-600" />}
            restockTime={restockTimers.egg}
            bgColor="bg-gradient-to-br from-yellow-50 to-orange-100 border-yellow-200"
            filter={filter}
          />

          <StockSection
            title="Honey Products"
            items={stockData.honeyStock}
            icon={<Honey className="h-6 w-6 text-amber-600" />}
            restockTime={restockTimers.honey}
            bgColor="bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-200"
            filter={filter}
          />

          <StockSection
            title="Cosmetics"
            items={stockData.cosmeticsStock}
            icon={<Sparkles className="h-6 w-6 text-purple-600" />}
            restockTime={restockTimers.cosmetics}
            bgColor="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200"
            filter={filter}
          />
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center py-8 border-t border-gray-200">
          <p className="text-gray-600 mb-2">
            🌱 Grow A Garden Stock Tracker - Built with ❤️ by Churchill
          </p>
          <p className="text-sm text-gray-500">
            Real-time stock tracking • Philippine timezone • Auto-refresh every 30 seconds
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;