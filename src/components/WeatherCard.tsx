import React from 'react';
import { Cloud, Info, Zap } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const getWeatherColor = (weatherType: string) => {
    switch (weatherType.toLowerCase()) {
      case 'rain':
        return 'from-blue-500 to-blue-600';
      case 'sun':
      case 'sunny':
        return 'from-yellow-400 to-orange-500';
      case 'storm':
        return 'from-purple-600 to-indigo-700';
      case 'snow':
        return 'from-blue-200 to-blue-300';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className={`bg-gradient-to-r ${getWeatherColor(weather.weatherType)} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-4xl">{weather.icon}</div>
            <div>
              <h3 className="text-xl font-bold">{weather.currentWeather}</h3>
              <p className="text-white/90">{weather.weatherType}</p>
            </div>
          </div>
          <Cloud className="h-8 w-8 text-white/70" />
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Description</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{weather.description}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Zap className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Crop Effects</h4>
            <p className="text-gray-600 text-sm">{weather.cropBonuses}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Rarity</p>
          <p className="text-sm font-medium text-gray-700">{weather.rarity}</p>
        </div>
      </div>
    </div>
  );
};