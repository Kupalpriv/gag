import { useState, useEffect } from 'react';
import { ApiResponse, WeatherData } from '../types';

const proxy = 'https://corsproxy.io/?';
const STOCK_API_URL = proxy + 'https://gagstock.gleeze.com/grow-a-garden';
const WEATHER_API_URL = proxy + 'https://growagardenstock.com/api/stock/weather';

export const useStockData = () => {
  const [stockData, setStockData] = useState<ApiResponse | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [stockResponse, weatherResponse] = await Promise.all([
        fetch(STOCK_API_URL),
        fetch(WEATHER_API_URL)
      ]);

      if (!stockResponse.ok || !weatherResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const stockResult = await stockResponse.json();
      const weatherResult = await weatherResponse.json();

      setStockData(stockResult);
      setWeatherData(weatherResult);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    stockData,
    weatherData,
    loading,
    error,
    lastUpdated,
    refetch: fetchData
  };
};