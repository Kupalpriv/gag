import React from 'react';
import { WeatherData } from '../types';

interface WeatherCardProps {
  weatherData: WeatherData | null;
  loading: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, loading }) => {
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="animate-pulse">
          <div className="h-6 bg-white/20 rounded mb-4"></div>
          <div className="h-4 bg-white/20 rounded mb-2"></div>
          <div className="h-4 bg-white/20 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl shadow-lg p-6 text-white">
        <div className="text-center">
          <div className="text-4xl mb-2">🌤️</div>
          <h3 className="text-lg font-bold mb-2">Weather Unavailable</h3>
          <p className="text-sm opacity-90">Unable to fetch weather data</p>
        </div>
      </div>
    );
  }

  const getWeatherGradient = (weatherType: string) => {
    switch (weatherType.toLowerCase()) {
      case 'rain':
        return 'from-blue-600 to-blue-800';
      case 'sunny':
      case 'sun':
        return 'from-yellow-400 to-orange-500';
      case 'cloudy':
        return 'from-gray-500 to-gray-700';
      case 'storm':
        return 'from-purple-600 to-gray-800';
      default:
        return 'from-blue-500 to-purple-600';
    }
  };

  const formatUpdatedTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`bg-gradient-to-br ${getWeatherGradient(weatherData.weatherType)} rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-300`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{weatherData.icon}</span>
          <div>
            <h3 className="text-lg font-bold">{weatherData.currentWeather}</h3>
            <p className="text-sm opacity-90">{weatherData.weatherType}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs opacity-75">Updated</div>
          <div className="text-sm font-mono">
            {formatUpdatedTime(weatherData.updatedAt)}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <h4 className="font-semibold text-sm mb-1">Effect</h4>
          <p className="text-xs opacity-90 leading-relaxed">
            {weatherData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-1">Crop Bonuses</h4>
            <p className="text-xs opacity-90">{weatherData.cropBonuses}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-1">Rarity</h4>
            <p className="text-xs opacity-90">{weatherData.rarity}</p>
          </div>
        </div>

        {weatherData.mutations && weatherData.mutations.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-1">Mutations</h4>
            <div className="flex flex-wrap gap-1">
              {weatherData.mutations.map((mutation, index) => (
                <span 
                  key={index}
                  className="bg-white/20 text-xs px-2 py-1 rounded-full"
                >
                  {mutation}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <h4 className="font-semibold text-sm mb-1">Visual Cue</h4>
          <p className="text-xs opacity-90">{weatherData.visualCue}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
