import React from 'react';
import { Cloud, Sun, CloudRain, Wind } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
  lastUpdated: Date;
}

export function WeatherCard({ weather, lastUpdated }: WeatherCardProps) {
  const getWeatherIcon = (weatherType: string) => {
    switch (weatherType.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'rainy':
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case 'windy':
        return <Wind className="h-8 w-8 text-gray-500" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-400" />;
    }
  };

  const updatedTime = lastUpdated.toLocaleString("en-PH", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Manila"
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-lg border border-blue-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          {getWeatherIcon(weather.currentWeather)}
          <span>Current Weather</span>
        </h3>
        <span className="text-2xl">{weather.icon}</span>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600">Weather</p>
          <p className="text-xl font-bold text-blue-700">{weather.currentWeather}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Crop Bonuses</p>
          <p className="text-lg font-medium text-green-700">{weather.cropBonuses}</p>
        </div>
        
        <div className="pt-2 border-t border-blue-200">
          <p className="text-xs text-gray-500">
            Last updated: {updatedTime} (Philippines)
          </p>
        </div>
      </div>
    </div>
  );
}