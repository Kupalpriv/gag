import React from 'react';
import { Cloud, CloudRain, Sun, CloudSnow, Wind } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
}

const getWeatherEmoji = (weatherType: string, description: string): string => {
  const weather = weatherType?.toLowerCase() || description?.toLowerCase() || '';
  
  if (weather.includes('rain') || weather.includes('rainy') || weather.includes('shower')) {
    return '🌧️';
  }
  if (weather.includes('storm') || weather.includes('thunder')) {
    return '⛈️';
  }
  if (weather.includes('snow') || weather.includes('snowy')) {
    return '❄️';
  }
  if (weather.includes('cloud') || weather.includes('cloudy') || weather.includes('overcast')) {
    return '☁️';
  }
  if (weather.includes('fog') || weather.includes('mist')) {
    return '🌫️';
  }
  if (weather.includes('wind') || weather.includes('windy')) {
    return '💨';
  }
  if (weather.includes('clear') || weather.includes('sunny') || weather.includes('sun')) {
    return '☀️';
  }
  
  // Default based on description keywords
  if (description?.toLowerCase().includes('ended')) {
    return '🌤️'; // Sun behind cloud for "ended" weather
  }
  
  return '🌤️'; // Default partly cloudy
};

const getWeatherGradient = (weatherType: string, description: string): string => {
  const weather = weatherType?.toLowerCase() || description?.toLowerCase() || '';
  
  if (weather.includes('rain') || weather.includes('rainy')) {
    return 'from-blue-600 to-blue-800';
  }
  if (weather.includes('storm')) {
    return 'from-gray-700 to-gray-900';
  }
  if (weather.includes('snow')) {
    return 'from-blue-300 to-blue-500';
  }
  if (weather.includes('cloud') || weather.includes('overcast')) {
    return 'from-gray-500 to-gray-700';
  }
  if (weather.includes('clear') || weather.includes('sunny')) {
    return 'from-yellow-400 to-orange-500';
  }
  
  return 'from-blue-400 to-blue-600'; // Default
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const weatherEmoji = getWeatherEmoji(weather.weatherType, weather.description);
  const gradientClass = getWeatherGradient(weather.weatherType, weather.description);
  
  // Fix the date formatting
  const formatDate = (timestamp: number): string => {
    try {
      const date = new Date(timestamp * 1000);
      return date.toLocaleString('en-PH', {
        timeZone: 'Asia/Manila',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className={`bg-gradient-to-br ${gradientClass} rounded-xl p-6 text-white relative overflow-hidden shadow-lg`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-4xl">{weatherEmoji}</div>
            <div>
              <h3 className="font-bold text-lg">Current Weather</h3>
              <p className="text-white/90 text-sm">{weather.currentWeather || weather.description}</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
            <div className="text-xs font-medium">LIVE</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <h4 className="font-semibold text-sm mb-1 flex items-center">
              <span className="mr-2">🌱</span>
              Crop Bonuses
            </h4>
            <p className="text-white/90 text-sm">{weather.cropBonuses}</p>
          </div>
          
          {weather.mutations && weather.mutations.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <h4 className="font-semibold text-sm mb-1 flex items-center">
                <span className="mr-2">🧬</span>
                Mutations
              </h4>
              <p className="text-white/90 text-sm">{weather.mutations.join(', ')}</p>
            </div>
          )}
          
          <div className="text-xs text-white/70 bg-black/20 rounded-lg p-2">
            <div className="flex items-center justify-between">
              <span>Last updated:</span>
              <span className="font-medium">{formatDate(weather.updatedAt)}</span>
            </div>
            <div className="text-center mt-1 text-white/60">Philippines Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};