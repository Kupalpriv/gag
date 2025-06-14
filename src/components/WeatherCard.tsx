import React from 'react';
import { Star } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="bg-blue-500 rounded-lg p-4 text-white relative overflow-hidden">
      <div className="absolute top-2 right-2">
        <Star className="h-4 w-4 text-yellow-300 fill-current" />
      </div>
      
      <div className="flex items-center space-x-3 mb-3">
        <div className="text-3xl">{weather.icon}</div>
        <div>
          <h3 className="font-bold text-lg">Current Weather</h3>
          <p className="text-blue-100">{weather.currentWeather}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div>
          <h4 className="font-semibold text-sm">Crop Bonuses</h4>
          <p className="text-blue-100 text-sm">{weather.cropBonuses}</p>
        </div>
        
        <div className="text-xs text-blue-200">
          Last updated: {new Date(weather.updatedAt * 1000).toLocaleString('en-PH', {
            timeZone: 'Asia/Manila',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })} (Philippines)
        </div>
      </div>
    </div>
  );
};